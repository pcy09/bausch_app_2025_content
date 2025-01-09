import { ListHeaderSection, PageTitle, UserSearchBox } from '@/components/molecules';
import { CardContainer, DividingLine, Popup } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  getPointDetailPopupAction,
  getStoreDetailPointAction,
  postStoreDetailPointCreateAction,
  updateStoreDetailPointAction,
} from '@/store/reducers/admin/storeReducer';
import usePagination from '@/hooks/usePagination';
import useCommonCode from '@/hooks/useCommonCode';
import StoreDetailPointSearchBox from '@/components/molecules/SearchBox/StoreDetailPointSearchBox';
import { StoreDetailPointModalBox } from '@/components/molecules/ModalBox';
import { openPops } from '@/store/reducers/popupsReducer';

import { EditOutlined, ExportOutlined, EyeOutlined } from '@ant-design/icons';
import { transFilterSelectBox } from '@/common/utiles';
const StoreDetailPointListTemplate = ({ id }) => {
  const dispatch = useDispatch();
  const [pointProductGroup] = useCommonCode('pointProductGroup');
  const { pointList } = useSelector(state => state?.store);
  const [storeId, setStoreId] = useState(null);
  const [pointProductGroupOptions, setPointProductGroup] = useState([]);
  const [resetState, setResetState] = useState(false);

  useEffect(() => {
    if (id) {
      setStoreId(id);
    }
  }, [id]);

  // 적립금 옵션
  useEffect(() => {
    if (pointProductGroup) {
      const options = transFilterSelectBox(pointProductGroup);
      setPointProductGroup(options);
    }
  }, [pointProductGroup]);

  const columns = [
    {
      title: '거래 ID',
      dataIndex: 'transactionInfoId',
      align: 'center',
      render: (data, record) => (
        <>
          {data && (
            <a
              href={`/admin/order/point-sales/${record.transactionInfoId}?pointProductGroupId=${record.pointProductGroupId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#1890ff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}>
              {data} <ExportOutlined style={{ fontSize: '14px', color: '#555' }} />
            </a>
          )}
        </>
      ),
    },
    { title: '적립금', dataIndex: 'pointProductGroupName', align: 'center' },
    {
      title: '제품명/쿠폰명',
      dataIndex: 'productCouponName',
      align: 'center',
      render: (data, record) =>
        data === '관리자 적립' ? (
          <a
            onClick={() => showPopup('상세내역 수정', record)}
            style={{ cursor: 'pointer', color: '#1890ff', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            {data} <EditOutlined />
          </a>
        ) : (
          <span>{data}</span>
        ),
    },
    { title: '수량', dataIndex: 'quantity', align: 'center' },
    { title: '사용 적립금', dataIndex: 'usedPoints', align: 'center' },
    { title: '누적 적립금액', dataIndex: 'accumulatedPoint', align: 'center' },
    { title: '주문일', dataIndex: 'transactionDate', align: 'center' },
  ];

  const { handlePageChange, getInitData, pagination } = usePagination(state => state.store, getStoreDetailPointAction);

  const handleSearch = data => {
    const params = {
      storeId,
      searchText: data.searchText || '',
    };
    getInitData({ page: 0, size: 20 }, params);
  };

  useEffect(() => {
    const params = {
      storeId,
    };
    if (storeId) {
      getInitData({ page: 0, size: 20 }, params);
    }
  }, [storeId, getInitData]);

  // 팝업열기
  const showPopup = (popupTitle, record) => {
    const pointAdminRegistrationId = record.pointAdminRegistrationId;

    if (!pointAdminRegistrationId) {
      alert('Store ID is not defined');
      return;
    }
    dispatch(getPointDetailPopupAction({ id: pointAdminRegistrationId }));

    dispatch(
      openPops({
        width: 520,
        isModalOpen: true,
        content: <StoreDetailPointModalBox handleUpdate={handleRegisterClick} />,
        title: popupTitle,
        buttonsConfig: [],
      }),
    );
  };

  const handleRegisterClick = data => {
    dispatch(updateStoreDetailPointAction({ sendObject: data }));
    dispatch(openPops({ isModalOpen: false }));
  };

  if (!storeId) {
    return <div>Loading...</div>; // storeId가 설정되지 않은 경우 로딩 상태 표시
  }

  return (
    <>
      <StoreDetailPointSearchBox
        selectOptions1={pointProductGroupOptions}
        onHandleSearchData={getInitData}
        storeId={storeId}
        setResetState={setResetState}
      />
      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          defaultValue={'default'}
          selectOptions={[{ label: '제품명/쿠폰명', value: 'default' }]}
          resetState={resetState}
          setResetState={setResetState}
        />
        <Tables
          detail={false}
          listData={pointList}
          columns={columns}
          handleChangePageOption={handlePageChange}
          pagination={pagination}
          rowKey={'storePointHistoryId'}
          scroll={{ y: 300 }}
        />
      </CardContainer>
      <Popup />
    </>
  );
};

export default StoreDetailPointListTemplate;
