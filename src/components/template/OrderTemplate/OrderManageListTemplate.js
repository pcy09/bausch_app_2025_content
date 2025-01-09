import { descStyle } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection } from '@/components/molecules';
import { CardContainer, DividingLine } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import NoticeLabel from '@/components/atom/Notice';
import { Modal, Tabs } from 'antd';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AdminOrderWeborderSearchBox } from '@/components/molecules/SearchBox';
import useCommonCode from '@/hooks/useCommonCode';
import { getOrderListAction, orderReset, webOrderActiveAction } from '@/store/reducers/admin/orderReducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { downloadExcel, transFilterSelectBox, transSelectBox } from '@/common/utiles';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

// 주문 대기 칼럼
const pendingColumns = [
  {
    title: '쿠폰/적립금',
    dataIndex: 'couponType',
    align: 'center',
    render: (data, record) => data || record.pointProductGroupName,
  },
  {
    title: '제품유형',
    dataIndex: 'productType',
    align: 'center',
  },
  {
    title: '스토어 코드',
    dataIndex: 'storeCode',
    align: 'center',
  },

  {
    title: '스토어 명',
    dataIndex: 'storeName',
    align: 'center',
  },

  {
    title: '제품명',
    dataIndex: 'productName',
    align: 'center',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    align: 'center',
  },
  {
    title: '수량',
    dataIndex: 'transactionProductQuantity',
    align: 'center',
  },
  {
    title: '회원명',
    dataIndex: 'memberName',
    align: 'center',
    render: (data, record) => (
      <a
        style={{
          textDecoration: 'none', // 기본 텍스트 데코레이션 제거
          borderBottom: '1px solid #04848c', // 밑줄 효과 추가
        }}
        href={`/admin/member/${record.memberId}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
        }}>
        {data}
      </a>
    ),
  },
  {
    title: '주문일',
    dataIndex: 'transactionDate',
    align: 'center',
  },
  {
    title: '거래 ID',
    dataIndex: 'transactionCode',
    align: 'center',
    render: (data, record) => {
      const href = record.couponType
        ? `/admin/order/coupon-sales/${record.transactionInfoId}`
        : `/admin/order/point-sales/${record.transactionInfoId}?pointProductGroupId=${record.pointProductGroupId}`;
      return (
        <a
          style={{
            textDecoration: 'none', // 기본 텍스트 데코레이션 제거
            borderBottom: '1px solid #04848c', // 밑줄 효과 추가
          }}
          href={href}
          rel="noopener noreferrer"
          onClick={e => {
            e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
          }}>
          {data}
        </a>
      );
    },
  },
];

// 주문 이력 칼럼
const completedColumn = [
  {
    title: '웹오더 ID',
    dataIndex: 'webOrderCode',
    align: 'center',
  },
  {
    title: '쿠폰/적립금',
    dataIndex: 'couponType',
    align: 'center',
    render: (data, record) => data || record.pointProductGroupName,
  },
  {
    title: '제품유형',
    dataIndex: 'productType',
    align: 'center',
  },
  {
    title: '스토어 코드',
    dataIndex: 'storeCode',
    align: 'center',
  },

  {
    title: '스토어 명',
    dataIndex: 'storeName',
    align: 'center',
  },

  {
    title: '제품명',
    dataIndex: 'productName',
    align: 'center',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    align: 'center',
  },
  {
    title: '수량',
    dataIndex: 'transactionProductQuantity',
    align: 'center',
  },
  {
    title: '회원명',
    dataIndex: 'memberName',
    align: 'center',
    render: (data, record) => (
      <a
        style={{
          textDecoration: 'none', // 기본 텍스트 데코레이션 제거
          borderBottom: '1px solid #04848c', // 밑줄 효과 추가
        }}
        href={`/admin/member/${record.memberId}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
        }}>
        {data}
      </a>
    ),
  },
  {
    title: '발송일',
    dataIndex: 'shippingDate',
    align: 'center',
  },
  {
    title: '거래 ID',
    dataIndex: 'transactionCode',
    align: 'center',
    render: (data, record) => {
      const href =
        record.couponType === ('증정' || '할인')
          ? `/admin/order/coupon-sales/${record.transactionInfoId}`
          : `/admin/order/point-sales/3402?pointProductGroupId=2`;
      return (
        <a
          style={{
            textDecoration: 'none', // 기본 텍스트 데코레이션 제거
            borderBottom: '1px solid #04848c', // 밑줄 효과 추가
          }}
          href={href}
          rel="noopener noreferrer"
          onClick={e => {
            e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
          }}>
          {data}
        </a>
      );
    },
  },
];

const OrderManageListTemplate = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { transactionListData } = useSelector(state => state?.order);

  const [activeTabKey, setActiveTabKey] = useState('ORDER_PENDING');
  // reset 함수를 상태로 저장
  const [resetState, setResetState] = useState(false);
  const [couponOptions, setCouponOptions] = useState([]);
  const [pointOptions, setPointOptions] = useState([]);
  const [pendingHeaderOptions, setPendingHeaderOptions] = useState([]);
  const [completedHeaderOptions, setCompletedHeaderOptions] = useState([]);

  // 공통코드 호출
  const {
    transactionPendingSearchCond,
    transactionCompletedSearchCond: transactionCompletedCond,
    pointProductGroup,
    couponType,
  } = useCommonCodeBatch(['transactionPendingSearchCond', 'transactionCompletedSearchCond', 'pointProductGroup', 'couponType']);

  // 쿠폰타입 옵션
  useEffect(() => {
    if (couponType) {
      const options = transFilterSelectBox(couponType);
      setCouponOptions(options);
    }
  }, [couponType]);

  // 적립금 옵션
  useEffect(() => {
    if (pointProductGroup) {
      const options = transFilterSelectBox(pointProductGroup);
      setPointOptions(options);
    }
  }, [pointProductGroup]);

  // 주문대기 헤더 옵션
  useEffect(() => {
    if (transactionPendingSearchCond) {
      const options = transSelectBox(transactionPendingSearchCond);
      setPendingHeaderOptions(options);
    }
  }, [transactionPendingSearchCond]);

  // 주문이력 헤더 옵션
  useEffect(() => {
    if (transactionCompletedCond) {
      const options = transSelectBox(transactionCompletedCond);
      setCompletedHeaderOptions(options);
    }
  }, [transactionCompletedCond]);

  const uniqueListData = transactionListData?.filter(
    (item, index, self) => index === self.findIndex(t => t.transactionProductId === item.transactionProductId),
  );

  const tabMenuList = () => {
    return [
      {
        label: `주문 대기${activeTabKey === 'ORDER_PENDING' && uniqueListData ? `(${uniqueListData?.length})` : ''}`,
        key: 'ORDER_PENDING',
      },
      {
        label: '주문 이력',
        key: 'DELIVERY_COMPLETED',
      },
    ];
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = uniqueListData?.map(item => {
    const isPendingOrder = activeTabKey === 'ORDER_PENDING';
    return {
      '쿠폰/적립금': item.couponType || item.pointProductGroupName,
      제품유형: item.productType,
      '스토어 코드': item.storeCode,
      '스토어 명': item.storeName,
      제품명: item.productName,
      SKU: item.sku,
      수량: item.transactionProductQuantity,
      회원명: item.memberName,
      [isPendingOrder ? '주문일' : '발송일']: isPendingOrder ? item.transactionDate : item.shippingDate,
      '거래 ID': item.transactionCode,
    };
  });

  // 엑셀 다운로드
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

  const getInitData = search => {
    const params = {
      orderStatus: activeTabKey,
      ...search,
    };

    dispatch(getOrderListAction({ params }));
  };

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    getInitData();

    return () => {
      dispatch(orderReset());
    };
  }, []);

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e, url) => {
    setActiveTabKey(key);
    dispatch(orderReset());
    const params = key === 'ORDER_PENDING' ? { orderStatus: 'ORDER_PENDING' } : { orderStatus: 'DELIVERY_COMPLETED' };
    dispatch(getOrderListAction({ params }));
    setSelectedRowKeys([]);
  };

  // 거래중지 오더 신청
  const suspendedOrderRequestHandler = () => {
    Modal.confirm({
      title: '거래중지 오더 신청',
      icon: <ExclamationCircleOutlined />,
      content: '웹 오더를 신청하겠습니까?(거래중지 스토어 포함)',
      okText: '신청',
      cancelText: '취소',
      onOk: () => {
        const sendObject = {
          transactionProductIds: selectedRowKeys,
          isStopOrder: true,
        };

        dispatch(webOrderActiveAction({ sendObject }));
        setSelectedRowKeys([]);
      },
    });
  };

  //웹 오더 신청
  const goRouterHandler = () => {
    Modal.confirm({
      title: '웹 오더 신청',
      icon: <ExclamationCircleOutlined />,
      content: '웹 오더를 신청하시겠습니까?',
      okText: '신청',
      cancelText: '취소',
      onOk: () => {
        const sendObject = {
          transactionProductIds: selectedRowKeys,
          isStopOrder: false,
        };

        dispatch(webOrderActiveAction({ sendObject }));
        setSelectedRowKeys([]);
      },
    });
  };

  // 테이블 헤더 검색
  const handleSearch = data => {
    const { searchText, selectOptions } = data;
    const isPendingOrder = activeTabKey === 'ORDER_PENDING';
    const searchParams = {
      searchText,
      [isPendingOrder ? 'transactionPendingSearchCond' : 'transactionCompletedSearchCond']: selectOptions,
    };

    const params = {
      orderStatus: activeTabKey,
      ...searchParams,
    };

    dispatch(getOrderListAction({ params }));
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 판매 및 주문 제품 리스트이며, ERP로 웹오더 요청과 상태 확인이 가능합니다.'} />
      </div>

      <DividingLine border={false} />

      <Tabs onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)} type="line" centered size={'small'} items={tabMenuList()} />

      <AdminOrderWeborderSearchBox
        couponOptions={couponOptions}
        pointOptions={pointOptions}
        onHandleSearchData={getInitData}
        setResetState={setResetState}
      />

      <CardContainer>
        <ListHeaderSection
          tabStatus={activeTabKey}
          selectOptions={activeTabKey === 'ORDER_PENDING' ? pendingHeaderOptions : completedHeaderOptions}
          handleSearch={handleSearch}
          total={uniqueListData?.length}
          select={selectedRowKeys?.length}
          defaultValue="STORE_CODE"
          resetState={resetState}
          setResetState={setResetState}
        />
        <Tables
          onSelectListItem={selectListItem}
          selectedRowKeys={selectedRowKeys}
          detail={false}
          checkbox={activeTabKey === 'ORDER_PENDING' ? true : false}
          listData={uniqueListData}
          columns={activeTabKey === 'ORDER_PENDING' ? pendingColumns : completedColumn}
          handleChangePageOption={getInitData}
          rowKey="transactionProductId"
        />
      </CardContainer>

      <DividingLine border={false} />

      <CardContainer>
        <ListFooterSection
          goRouterHandler={goRouterHandler}
          mdButtonHandler={suspendedOrderRequestHandler}
          showButton={true}
          showRightBtn={activeTabKey === 'ORDER_PENDING' && selectedRowKeys.length > 0 ? true : false}
          rtText="웹 오더신청"
          showMdBtn={true}
          mdText="거래중지 오더 신청"
          showLeftBtn={true}
          onClick={handleDownloadExcelClick}
        />
      </CardContainer>
    </>
  );
};

export default OrderManageListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
