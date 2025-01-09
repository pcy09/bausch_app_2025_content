import { descStyle } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection } from '@/components/molecules';
import { CardContainer, DividingLine, TradeStatus } from '@/components/atom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import NoticeLabel from '@/components/atom/Notice';
import { Modal } from 'antd';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AdminOrderPointSalesSearchBox } from '@/components/molecules/SearchBox';
import usePagination from '@/hooks/usePagination';
import { getPointOrderListAction, PointOrderReset } from '@/store/reducers/admin/orderPointListReducer';
import { downloadExcel, transFilterSelectBox } from '@/common/utiles';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

const columns = [
  {
    title: '거래 ID',
    dataIndex: 'transactionCode',
    align: 'center',
  },
  {
    title: '적립금',
    dataIndex: 'pointProductGroupName',
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
    dataIndex: 'totalOrderQuantity',
    align: 'center',
  },
  {
    title: '사용적립금',
    dataIndex: 'totalUsedPoint',
    align: 'center',
  },
  {
    title: '주문일',
    dataIndex: 'orderDate',
    align: 'center',
  },
  {
    title: '거래상태',
    dataIndex: 'transactionStatus',
    align: 'center',
    render: status => {
      return <TradeStatus status={status} />;
    },
  },
];

const OrderPointSalesListTemplate = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  // 에러 콘솔
  const onSubmit = data => console.log('submit', data);
  const onError = errors => console.log('fail', errors);
  const [pointOptions, setPointOptions] = useState([]);
  const [transactionStatusOptions, setTransactionStatusOptions] = useState([]);
  const [headerOptions, setHeaderOptions] = useState([]);
  const [resetState, setResetState] = useState(false);
  // 옵션 훅
  const { pointProductGroup, transactionStatus, transactionPointListSearchCode } = useCommonCodeBatch([
    'pointProductGroup',
    'transactionStatus',
    'transactionPointListSearchCode',
  ]);

  // 적립금 옵션
  useEffect(() => {
    if (pointProductGroup) {
      const options = transFilterSelectBox(pointProductGroup);
      setPointOptions(options);
    }
  }, [pointProductGroup]);

  // 거래상태 옵션
  useEffect(() => {
    if (transactionStatus) {
      const options = transFilterSelectBox(transactionStatus);
      setTransactionStatusOptions(options);
    }
  }, [transactionStatus]);

  // 테이블 헤더 옵션
  useEffect(() => {
    if (transactionPointListSearchCode) {
      const options = transFilterSelectBox(transactionPointListSearchCode);
      setHeaderOptions(options);
    }
  }, [transactionPointListSearchCode]);

  // 페이징 & 리스트
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.orderPointList, getPointOrderListAction);

  useEffect(() => {
    getInitData({ page: 0, size: 10 });

    return () => {
      dispatch(PointOrderReset());
    };
  }, []);

  const { content } = useSelector(state => state?.orderPointList);

  const goRouterHandler = () => {
    push('/admin/order/point-sales/sub');
  };

  // 테이블 헤더 검색
  const handleSearch = data => {
    const { selectOptions, searchText } = data;
    const searchData = {
      transactionPointListSearchCode: selectOptions,
      searchText,
    };
    getInitData({ page: 0, size: 10 }, searchData);
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = content?.map(item => {
    // 원하는 변수 설정
    const {
      transactionCode,
      pointProductGroupName,
      storeCode,
      storeName,
      productName,
      sku,
      totalOrderQuantity,
      totalUsedPoint,
      orderDate,
      transactionStatus,
      transactionInfoId,
      pointProductGroupId,
    } = item;

    // 객체 반환
    return {
      '거래 ID': transactionCode,
      적립금: pointProductGroupName,
      '스토어 코드': storeCode,
      '스토어 명': storeName,
      제품명: productName,
      SKU: sku,
      수량: totalOrderQuantity,
      사용적립금: totalUsedPoint,
      주문일: orderDate,
      거래상태: transactionStatus,
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

  const handleRowClick = record => {
    const id = record?.transactionInfoId;
    const pointProductGroupId = record?.pointProductGroupId;
    push(`/admin/order/point-sales/${id}?pointProductGroupId=${pointProductGroupId}`);
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 소비자가 쿠폰을 사용하여 판매된 판매 및 증정 제품 리스트입니다.'} />
      </div>

      <DividingLine border={false} />

      <AdminOrderPointSalesSearchBox
        pointOptions={pointOptions}
        tradeOptions={transactionStatusOptions}
        onHandleSearchData={getInitData}
        setResetState={setResetState}
      />

      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          selectOptions={headerOptions}
          defaultValue="STORE_CODE"
          resetState={resetState}
          setResetState={setResetState}
        />
        <Tables
          onRow={record => {
            return {
              onClick: () => {
                handleRowClick(record); // 스토어 코드를 상태로 설정
              },
            };
          }}
          listData={content}
          columns={columns}
          handleChangePageOption={handlePageChange}
          pagination={pagination}
        />
      </CardContainer>

      <DividingLine border={false} />

      <CardContainer>
        <ListFooterSection
          goRouterHandler={goRouterHandler}
          showButton={true}
          showRightBtn={true}
          rtText="주문 등록"
          showLeftBtn={true}
          lfText="엑셀 다운로드"
          onClick={handleDownloadExcelClick}
        />
      </CardContainer>
    </>
  );
};

export default OrderPointSalesListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
