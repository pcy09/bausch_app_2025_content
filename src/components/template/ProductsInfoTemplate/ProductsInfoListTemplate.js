// components
import { ListHeaderSection, PageTitle } from '@/components/molecules';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, InputSearchAtom, RowGrid, SelectBox, ShowStatus } from '@/components/atom';
import Tables from '../../atom/Tables';
import NoticeLabel from '@/components/atom/Notice';
import ListFooterSection from '@/components/molecules/ListFooterSection';
//antd
import { Modal, Select, Tabs } from 'antd';
//css
import { css } from '@emotion/react';
//redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
//lib
import { useForm } from 'react-hook-form';
import ProductInfoSearchBox from '@/components/molecules/SearchBox/ProductInfoSearchBox';
import {
  getProductInfoListAction,
  productBauschInfoReset,
  productInfoDeleteBauschAction,
  updateProductInfoExposedAction,
} from '@/store/reducers/admin/productBauschInfoReducer';
import { marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { downloadExcel, transFilterSelectBox } from '@/common/utiles';
import usePagination from '@/hooks/usePagination';
import { getProductInfoLenslyListAction, productLenslyReset } from '@/store/reducers/admin/productLenslyReducer';
import { codeListResetAction, getCommonCodeListAction } from '@/store/reducers/commonCodeReducer';

const tabMenuList = [
  {
    label: 'BAUSCH APP',
    key: 'bausch',
  },
  {
    label: 'LENSLY',
    key: 'lensly',
  },
];

const ProductsInfoListTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { push } = router;
  const { handleSubmit } = useForm();

  const [tabStatus, setTabStatus] = useState('bausch'); // 탭 상태
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 체크박스 선택 값
  const [exposedStatusOptions, setExposedStatusOptions] = useState([]);

  const { exposedStatus } = useSelector(state => state?.commonCode?.commonCodeList);
  const { content, totalElements } = useSelector(state => state.productBauschInfo);
  const { content: lenslyContent, totalElements: lenslyTotalElements } = useSelector(state => state.productLensly);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state.productBauschInfo, getProductInfoListAction);
  const {
    handlePageChange: lenslyHandlePageChange,
    getInitData: lenslyGetInitData,
    pagination: lenslyPagination,
  } = usePagination(state => state.productLensly, getProductInfoLenslyListAction);

  useEffect(() => {
    if (exposedStatus) {
      const options = transFilterSelectBox(exposedStatus);
      setExposedStatusOptions(options);
    }
  }, [exposedStatus]);

  const columns = [
    {
      title: 'No',
      dataIndex: 'productInfoId',
      align: 'center',
    },
    {
      title: '제품명',
      dataIndex: 'productInfoName',
      align: 'center',
    },
    {
      title: '제품 설명',
      dataIndex: 'productInfoDescription',
      align: 'center',
    },
    {
      title: '등록일',
      dataIndex: 'productInfoRegTime',
      align: 'center',
    },
    {
      title: '노출 여부',
      dataIndex: 'exposedStatus',
      align: 'center',
      render: (value, record) => {
        return (
          <Select
            style={{ width: '100%', height: 'auto' }}
            value={value}
            onChange={newValue => handleSelectChange(newValue, record)}
            options={exposedStatus?.map(option => ({ label: option.value, value: option.value }))}
            onClick={e => e.stopPropagation()} // 셀렉트 박스 클릭 시 이벤트 전파 중지
          />
        );
      },
    },
  ];

  const handleSelectChange = (value, record) => {
    const exposedStatusOption = exposedStatus.find(option => option.value === value);
    const exposedStatusKey = exposedStatusOption ? exposedStatusOption.key : null;

    dispatch(
      updateProductInfoExposedAction({
        params: `id=${record.key}&exposedStatus=${exposedStatusKey}`,
        tabStatus,
      }),
    );
  };

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    dispatch(getCommonCodeListAction());

    return () => {
      dispatch(productBauschInfoReset());
      dispatch(productLenslyReset());
      dispatch(codeListResetAction());
    };
  }, []);

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e, url) => {
    setTabStatus(key);
  };

  const goRouterHandler = () => {
    push('/admin/product/page-manage/sub');
  };

  const handleSearch = data => {
    const params = {
      searchText: data.searchText,
      tabStatus: tabStatus,
    };

    if (tabStatus === 'bausch') {
      getInitData({ page: 0, size: 20 }, params);
    } else {
      lenslyGetInitData({ page: 0, size: 20 }, params);
    }
  };

  // 삭제에 대한 상태 변경
  const onSubmit = data => handleSendData(data);

  // 상품 상태 변경 함수
  const handleSendData = data => {
    const sendObject = {
      ids: selectedRowKeys,
      tabStatus,
    };

    dispatch(productInfoDeleteBauschAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = content =>
    content?.map(item => ({
      No: item.productInfoId,
      제품명: item.productInfoName,
      '제품 설명': item.productInfoDescription,
      등록일: item.productInfoRegTime,
      '노출 여부': item.exposedStatus,
    }));

  const handleDownloadExcelClick = () => {
    Modal.confirm({
      title: '엑셀 다운로드',
      icon: <ExclamationCircleOutlined />,
      content: '현재 테이블을 엑셀 다운로드 하시겠습니까?',
      okText: '다운로드',
      cancelText: '취소',
      onOk: () => downloadExcel(exportData(tabStatus === 'bausch' ? content : lenslyContent)),
    });
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 BAUSCH APP, LENSLY 채널의 상품 페이지를 관리하는 페이지입니다. 채널별 상품 리스트를 확인할 수 있습니다.'} />
      <DividingLine border={false} />
      <Tabs
        activeKey={tabStatus}
        onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)}
        type="line"
        centered
        size={'smail'}
        items={tabMenuList}
      />

      {/* 필터 박스 */}
      <ProductInfoSearchBox
        tabStatus={tabStatus}
        selectOptions={exposedStatusOptions}
        onHandleSearchData={tabStatus === 'bausch' ? getInitData : lenslyGetInitData}
      />

      <CardContainer>
        <ListHeaderSection
          tabStatus={tabStatus}
          handleSearch={handleSearch}
          total={tabStatus === 'bausch' ? totalElements : lenslyTotalElements}
          select={selectedRowKeys?.length}
          searchPlaceholder={'제품명 입력'}
        />

        <Tables
          tabStatus={tabStatus === 'bausch' ? 'B' : 'L'}
          checkbox
          selectedRowKeys={selectedRowKeys}
          onSelectListItem={selectListItem}
          listData={tabStatus === 'bausch' ? content : lenslyContent}
          columns={columns}
          pagination={tabStatus === 'bausch' ? pagination : lenslyPagination}
          handleChangePageOption={tabStatus === 'bausch' ? handlePageChange : lenslyHandlePageChange}
          option={
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Buttons htmlType={'danger'} type={'danger'} name="삭제" css={marginLeftStyle(5)}></Buttons>
            </Form>
          }
        />
      </CardContainer>

      <DividingLine border={false} />

      <CardContainer>
        <ListFooterSection
          goRouterHandler={goRouterHandler}
          showButton={true}
          showLeftBtn={true}
          showRightBtn={true}
          onClick={handleDownloadExcelClick}
          lfText="엑셀 다운로드"
          rtText="상품 등록"
        />
      </CardContainer>
    </>
  );
};

export default ProductsInfoListTemplate;

const descStyle = css`
  display: flex;
  justify-content: space-between;
`;
