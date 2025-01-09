import { Buttons, CardContainer, DividingLine, Popup, Tables } from '@/components/atom';
import { DownloadOutlined, EditOutlined, ExclamationCircleOutlined, ExportOutlined } from '@ant-design/icons';
import ListHeaderSection from '../ListHeaderSection';
import { useDispatch } from 'react-redux';
import { StoreDetailPointModalBox } from '../ModalBox';
import { openPops } from '@/store/reducers/popupsReducer';
import { getPointDetailPopupAction, updateStoreDetailPointAction } from '@/store/reducers/admin/storeReducer';
import { Modal } from 'antd';
import { downloadExcel } from '@/common/utiles';

const PointLogListSection = ({ selectOptions, listData, pagination, handlePageChange, getInitData, resetState, setResetState }) => {
  const columns = [
    {
      title: '거래 ID',
      dataIndex: 'transactionCode',
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
    {
      title: '스코어 코드',
      dataIndex: 'storeCode',
      align: 'center',
    },
    {
      title: '스토어명',
      dataIndex: 'storeName',
      align: 'center',
      render: (data, record) => (
        <a
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
          href={`/admin/store/manage/${record.storeId}`}
          target="_blank"
          rel="noopener noreferrer">
          {data}
          <ExportOutlined style={{ fontSize: '14px', color: '#555' }} />
        </a>
      ),
    },
    {
      title: '적립금',
      dataIndex: 'pointProductGroupName',
      align: 'center',
    },
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
    {
      title: '사용 적립금',
      dataIndex: 'totalUsedPoint',
      align: 'center',
    },
    {
      title: '주문일',
      dataIndex: 'orderDate',
      align: 'center',
    },
  ];

  const dispatch = useDispatch();

  const handleRegisterClick = data => {
    dispatch(updateStoreDetailPointAction({ sendObject: data }));
    dispatch(openPops({ isModalOpen: false }));
  };

  const showPopup = (popupTitle, record) => {
    const pointAdminRegistrationId = record.pointAdminRegistrationId;
    if (!pointAdminRegistrationId) {
      alert('Store ID is not defined');
      return;
    }

    dispatch(getPointDetailPopupAction({ id: pointAdminRegistrationId })); //데이터 호출 GET
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

  const handleSearch = data => {
    const { selectOptions, searchText } = data;

    const searchData = {
      searchCode: selectOptions,
      searchText,
    };

    getInitData({ page: 0, size: 10 }, searchData);
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = listData?.map(item => {
    const {
      storePointHistoryId,
      transactionInfoId,
      storeId,
      pointProductGroupId,
      pointAdminRegistrationId,
      transactionCode,
      storeCode,
      storeName,
      pointProductGroupName,
      productCouponName,
      totalUsedPoint,
      orderDate,
    } = item;

    return {
      거래ID: transactionCode,
      스코어코드: storeCode,
      스토어명: storeName,
      적립금: pointProductGroupName,
      제품명_쿠폰명: productCouponName,
      사용적립금: totalUsedPoint,
      주문일: orderDate,
    };
  });

  const handleDownloadExcelClick = () => {
    Modal.confirm({
      title: '엑셀 다운로드',
      icon: <ExclamationCircleOutlined />,
      content: '현재 테이블을 엑셀 다운로드 하시겠습니까?',
      okText: '다운로드',
      cancelText: '취소',
      onOk: () => downloadExcel(exportData),
    });
  };

  return (
    <>
      <CardContainer>
        <Popup title="적립금 상세" />
        <ListHeaderSection
          selectOptions={selectOptions}
          handleSearch={handleSearch}
          total={pagination?.total}
          resetState={resetState}
          setResetState={setResetState}
          defaultValue="STORE_CODE"
        />

        <Tables
          rowKey={'storePointHistoryId'}
          listData={listData}
          columns={columns}
          pagination={pagination}
          handleChangePageOption={handlePageChange}
          detail={false}
        />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} onClick={handleDownloadExcelClick} />
      </CardContainer>
    </>
  );
};

export default PointLogListSection;
