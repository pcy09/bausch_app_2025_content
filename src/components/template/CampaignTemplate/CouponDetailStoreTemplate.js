import { Button, Descriptions, Modal, Select, Tabs } from 'antd';
import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Buttons, DividingLine, Popup, Tables } from '@/components/atom';
import { emptyTableStyle, marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';
import { CouponStoreSetHeaderSection, ListHeaderSection } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';
import useCommonCode from '@/hooks/useCommonCode';
import { useForm } from 'react-hook-form';
import { CouponDetailStoreModalBox } from '@/components/molecules/ModalBox';
import { openPops } from '@/store/reducers/popupsReducer';
import {
  campaignDetailReset,
  deleteCampaignDetailStoreMergeAction,
  deleteCouponClickAction,
  deleteStoreSetListAction,
  getDetailCouponStoreListAction,
  postCampaignDetailStoreMergeAction,
} from '@/store/reducers/admin/campaignDetailReducer';

const columns = [
  { title: '스토어 코드', dataIndex: 'storeCode', align: 'center' },
  { title: '스토어 명', dataIndex: 'storeName', align: 'center' },
  { title: '스토어 그룹', dataIndex: 'storeGroupName', align: 'center' },
  { title: 'ABC S/M', dataIndex: 'abcSm', align: 'center' },
  { title: '지역 (시/도)', dataIndex: 'city', align: 'center' },
  { title: '주소(시/군/구)', dataIndex: 'district', align: 'center' },
  { title: '등록일', dataIndex: 'storeRegDate', align: 'center' },
];

const CouponDetailStoreTemplate = ({ storeSetSearchCodeOptions }) => {
  const dispatch = useDispatch();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.campaignDetail, getDetailCouponStoreListAction);
  const { result, totalElements } = useSelector(state => state?.campaignDetail);

  // 스토어 비우기
  useEffect(() => {
    dispatch(deleteCouponClickAction());
  }, [dispatch]);

  // 검색하기
  const handleSearch = data => {
    const params = {
      searchCode: 'STORE_CODE',
      searchText: data.searchText || '',
    };
    getInitData({ page: 0, size: 10 }, params);
  };

  // 언마운트
  useEffect(() => {
    return () => {
      dispatch(campaignDetailReset());
    };
  }, [dispatch]);

  // 선택한 항목 삭제하기
  const handleDeleteRecord = (data, event) => {
    const sendObject = {
      ids: selectedRowKeys,
    };
    dispatch(deleteStoreSetListAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  // 레코드 선택하기
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 팝업 불러오기
  const showPopup = popupTitle => {
    dispatch(
      openPops({
        width: 1400,
        isModalOpen: true,
        content: <CouponDetailStoreModalBox />,
        title: popupTitle,
        buttonsConfig: [],
      }),
    );
  };

  return (
    <>
      <Descriptions
        title="스토어 설정 ⭐️"
        extra={<Buttons type={'primary'} name={'대상 스토어 설정'} onClick={() => showPopup('대상 스토어 설정')} />}></Descriptions>
      <DividingLine border={false} />

      {result?.length > 0 ? (
        <>
          <CouponStoreSetHeaderSection
            total={totalElements}
            select={selectedRowKeys.length}
            handleSearch={handleSearch}
            selectOptions={storeSetSearchCodeOptions}
            defaultValue={'스토어 코드'}
          />
          <Tables
            checkbox={true}
            detail={false}
            selectedRowKeys={selectedRowKeys}
            onSelectListItem={selectListItem}
            listData={result}
            columns={columns}
            handleChangePageOption={handlePageChange}
            pagination={pagination}
            option={<Buttons htmlType={'button'} type={'danger'} name="삭제" css={marginLeftStyle(5)} onClick={handleDeleteRecord}></Buttons>}
          />
          <DividingLine border={false} />
        </>
      ) : (
        <div css={emptyTableStyle}>대상 스토어가 설정되지 않았습니다. 대상스토어를 설정해주세요</div>
      )}
    </>
  );
};

export default CouponDetailStoreTemplate;
