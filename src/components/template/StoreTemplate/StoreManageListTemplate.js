import { descStyle } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection } from '@/components/molecules';
import { CardContainer, DividingLine } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { opticianReset } from '@/store/reducers/admin/opticianReducer';
import NoticeLabel from '@/components/atom/Notice';
import { Modal, Tabs } from 'antd';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useRouter } from 'next/router';
import { AdminStoreManageSearchBox } from '@/components/molecules/SearchBox';
import { getStoreListAction, storeReset } from '@/store/reducers/admin/storeReducer';
import usePagination from '@/hooks/usePagination';
import useCommonCode from '@/hooks/useCommonCode';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

import { downloadExcel, transFilterSelectBox, transSelectBox } from '@/common/utiles';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const columns = [
  { title: '매장 유형', dataIndex: 'storeType', align: 'center' },
  { title: '스토어 코드', dataIndex: 'storeCode', align: 'center' },
  { title: '스토어명', dataIndex: 'storeName', align: 'center' },
  { title: '스토어 그룹', dataIndex: 'storeGroupName', align: 'center' },
  { title: 'ABC S/M', dataIndex: 'abcSm', align: 'center' },
  { title: '자동 발주', dataIndex: 'autoOrderStatus', align: 'center' },
  { title: 'LENSLY', dataIndex: 'lenslyStatus', align: 'center' },
  { title: '지역 (시/도)', dataIndex: 'city', align: 'center' },
  { title: '주소(시/군/구)', dataIndex: 'district', align: 'center' },
  { title: '등록일', dataIndex: 'storeRegDate', align: 'center' },
];

const StoreManageListTemplate = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.store, getStoreListAction);

  const { content } = useSelector(state => state?.store);

  const { storeType, storeLocation, autoOrderStatus, lenslyStatus, storeSearchCord, storeGroup } = useCommonCodeBatch([
    'storeType',
    'storeLocation',
    'autoOrderStatus',
    'lenslyStatus',
    'storeSearchCord',
    'storeGroup',
  ]);

  const [autoOrderStatusOptions, setAutoOrderStatusOptions] = useState([]);
  const [lenslyStatusOptions, setLenslyStatusOptions] = useState([]);
  const [storeLocationOptions, setStoreLocationOptions] = useState([]);
  const [storeGroupOptions, setStoreGroupOptions] = useState([]);
  const [storeSearchCordOptions, setStoreSearchCordOptions] = useState([]);
  const [resetState, setResetState] = useState(false);
  const [tabStatus, setTabStatus] = useState(null);

  // 자동발주옵션
  useEffect(() => {
    if (autoOrderStatus) {
      const options = transFilterSelectBox(autoOrderStatus);
      setAutoOrderStatusOptions(options);
    }
  }, [autoOrderStatus]);
  storeSearchCord;
  // lensly옵션
  useEffect(() => {
    if (lenslyStatus) {
      const options = transFilterSelectBox(lenslyStatus);
      setLenslyStatusOptions(options);
    }
  }, [lenslyStatus]);

  // 스토어 지역
  useEffect(() => {
    if (storeLocation) {
      const options = transFilterSelectBox(storeLocation);
      setStoreLocationOptions(options);
    }
  }, [storeLocation]);

  // 스토어 그룹
  useEffect(() => {
    if (storeGroup) {
      const options = transFilterSelectBox(storeGroup);
      setStoreGroupOptions(options);
    }
  }, [storeGroup]);

  // 테이블 헤더 옵션
  useEffect(() => {
    if (storeSearchCord) {
      const options = transSelectBox(storeSearchCord);
      setStoreSearchCordOptions(options);
    }
  }, [storeSearchCord]);

  const tabMenuList = [
    { label: '전체', key: null }, // Default tab for all
    ...(storeType || []).map(type => ({
      label: type.value,
      key: type.key,
    })),
  ];

  useEffect(() => {
    getInitData({ page: 0, size: 10 });
    return () => {
      dispatch(storeReset());
    };
  }, [dispatch, getInitData]);

  const handleChangeTabMenu = key => {
    const params = {
      storeType: key,
    };
    setTabStatus(key);
    getInitData({ page: 0, size: 10 }, params);
  };

  const handleSearch = data => {
    const { selectOptions, searchText } = data;

    const searchData = {
      storeType: tabStatus || null,
      storeSearchCord: selectOptions,
      searchText,
    };

    getInitData({ page: 0, size: 10 }, searchData);
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = content =>
    content?.map(item => ({
      '매장 유형': item.storeType,
      '스토어 코드': item.storeCode,
      스토어명: item.storeName,
      '스토어 그룹': item.storeGroupName,
      'ABC S/M': item.abcSm,
      '자동 발주': item.autoOrderStatus,
      LENSLY: item.lenslyStatus,
      '지역 (시/도)': item.city,
      '주소(시/군/구)': item.district,
      등록일: item.storeRegDate,
    }));

  const handleDownloadExcelClick = () => {
    Modal.confirm({
      title: '엑셀 다운로드',
      icon: <ExclamationCircleOutlined />,
      content: '현재 테이블을 엑셀 다운로드 하시겠습니까?',
      okText: '다운로드',
      cancelText: '취소',
      onOk: () => downloadExcel(exportData(content)),
    });
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel
          title={'👉🏼바슈롬의 제품을 취급하는 스토어 리스트입니다. 스토어의 전체 현황을 확인할 수 있으며 조건에 맞는 스토어를 검색할 수 있습니다. '}
        />
      </div>
      <DividingLine border={false} />
      <Tabs onTabClick={handleChangeTabMenu} type="line" centered size={'small'} items={tabMenuList} />
      <AdminStoreManageSearchBox
        selectOptions1={autoOrderStatusOptions}
        selectOptions2={lenslyStatusOptions}
        selectOptions3={storeLocationOptions}
        selectOptions4={storeGroupOptions}
        onHandleSearchData={getInitData}
        tabStatus={tabStatus}
        setResetState={setResetState}
      />
      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          selectOptions={storeSearchCordOptions}
          resetState={resetState}
          setResetState={setResetState}
          tabStatus={tabStatus}
          defaultValue="STORE_CODE"
        />
        <Tables listData={content} columns={columns} handleChangePageOption={handlePageChange} pagination={pagination} />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <ListFooterSection showButton={true} showLeftBtn={true} lfText="엑셀 다운로드" onClick={handleDownloadExcelClick} />
      </CardContainer>
    </>
  );
};

export default StoreManageListTemplate;

const test = css`
  background-color: #8c8c8c;
`;
