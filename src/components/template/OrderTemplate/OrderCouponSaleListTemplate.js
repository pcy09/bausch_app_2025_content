import { alignCenter, contentsContainerStyle, descStyle, marginBottomStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection, PageTitle, TableFilterSection, UserSearchBox } from '@/components/molecules';
import { Buttons, CardContainer, ColGrid, DividingLine, RowGrid, SelectBox, SelectInputSearchAtom, TradeStatus } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { getOpticianListAction, opticianReset } from '@/store/reducers/admin/opticianReducer';
import NoticeLabel from '@/components/atom/Notice';
import { Button, Form, Modal } from 'antd';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AdminOrderCouponSaleSearchBox } from '@/components/molecules/SearchBox';
import { COUPON_OPTIONS, TRADE_OPTIONS } from '@/common/options';
import { codeListResetAction, getCommonCodeListAction } from '@/store/reducers/commonCodeReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { couponOrderResetAction, getCouponSalesListAction } from '@/store/reducers/admin/couponOrderReducer';
import usePagination from '@/hooks/usePagination';
import dayjs from 'dayjs';
import { downloadExcel } from '@/common/utiles';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const columns = [
  {
    title: '거래 ID',
    dataIndex: 'transactionCode',
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
    title: '쿠폰 유형',
    dataIndex: 'couponType',
    align: 'center',
  },
  {
    title: '쿠폰 명',
    dataIndex: 'couponName',
    align: 'center',
  },
  {
    title: '수량',
    dataIndex: 'totalOrderQuantity',
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
    title: '휴대폰 번호',
    dataIndex: 'phoneNumber',
    align: 'center',
  },
  {
    title: '판매일',
    dataIndex: 'transactionDate',
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

const OrderCouponSaleListTemplate = () => {
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
  const onSubmit = data => console.log('submit', data);
  const onError = errors => console.log('fail', errors);

  const { couponType, transactionStatus, transactionCouponListSearchCode } = useSelector(state => state?.commonCode?.commonCodeList);
  const { content, totalElements } = useSelector(state => state?.couponOrder?.couponSalesListData);

  const [couponOptions, setCouponOptions] = useState([]);
  const [tradeOptions, setTradeOptions] = useState([]);
  const [headerOptions, setHeaderOptions] = useState([]);

  useEffect(() => {
    getInitData({ page: 0, size: 10 });
    dispatch(getCommonCodeListAction());

    return () => {
      dispatch(couponOrderResetAction());
      dispatch(codeListResetAction());
    };
  }, []);

  const goRouterHandler = () => {
    push('/admin/order/coupon-sales/sub');
  };

  const { handlePageChange, getInitData, pagination } = usePagination(
    state => state?.couponOrder?.couponSalesListData,
    getCouponSalesListAction,
    null,
  );

  // 쿠폰 필터 박스
  useEffect(() => {
    if (couponType) {
      const options = [{ label: '전체', value: 'all' }].concat(
        couponType.map(item => ({
          value: item.key,
          label: item.value,
        })),
      );
      setCouponOptions(options);
    }
  }, [couponType]);

  // 거래상태 필터 박스
  useEffect(() => {
    if (transactionStatus) {
      const options = [{ label: '전체', value: 'all' }].concat(
        transactionStatus.map(item => ({
          value: item.key,
          label: item.value,
        })),
      );
      setTradeOptions(options);
    }
  }, [transactionStatus]);

  // 헤더 필터 박스
  useEffect(() => {
    if (transactionCouponListSearchCode) {
      const options = transactionCouponListSearchCode.map(item => ({
        value: item.key,
        label: item.value,
      }));
      setHeaderOptions(options);
    }
  }, [transactionCouponListSearchCode]);

  // 초기화
  const handleResetSearch = () => {
    reset();
    getInitData({ page: 0, size: 10 });
  };

  // 필터적용
  const handleFilterSearch = () => {
    const { date, couponType, transactionStatus, transactionCouponListSearchCode, searchText } = getValues();
    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      couponType: couponType === 'all' ? null : couponType,
      transactionStatus: transactionStatus === 'all' ? null : transactionStatus,
      transactionCouponListSearchCode: null,
      searchText: null,
    };
    setValue(`transactionCouponListSearchCode`, 'MEMBER_NAME');
    setValue(`searchText`, null);
    getInitData({ page: 0, size: 10 }, searchData); // 검색시 초기화
  };

  // TABLE 헤더 검색
  const handleHeaderSearch = () => {
    // 헤더 검색, 필터적용 연동 시***************************************************************************
    // const { date, couponType, transactionStatus, transactionCouponListSearchCode, searchText } = getValues();
    // const searchData = {
    //   startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
    //   endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
    //   couponType: couponType === 'all' ? null : couponType,
    //   transactionStatus: transactionStatus === 'all' ? null : transactionStatus,
    //   transactionCouponListSearchCode: transactionCouponListSearchCode || null,
    //   searchText: searchText || null,
    // };
    // getInitData({ page: 0, size: 10 }, searchData);
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    // 헤더 검색 시 필터적용 초기화************************************************************************
    const { transactionCouponListSearchCode, searchText } = getValues();
    const searchData = {
      transactionCouponListSearchCode: transactionCouponListSearchCode || null,
      searchText: searchText || null,
    };
    setValue(`date`, null);
    setValue(`couponType`, 'all');
    setValue(`transactionStatus`, 'all');

    getInitData({ page: 0, size: 10 }, searchData);
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = content?.map(item => {
    // 원하는 변수 설정
    const {
      transactionCode,
      storeCode,
      storeName,
      couponType,
      couponName,
      totalOrderQuantity,
      phoneNumber,
      transactionDate,
      transactionStatus,
      memberName,
      transactionInfoId,
      memberId,
    } = item;

    // 객체 반환
    return {
      '거래 ID': transactionCode,
      '스토어 코드': storeCode,
      '스토어 명': storeName,
      '쿠폰 유형': couponType,
      쿠폰명: couponName,
      수량: totalOrderQuantity,
      회원명: memberName,
      '휴대폰 번호': phoneNumber,
      판매일: transactionDate,
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

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <div css={descStyle}>
          <NoticeLabel title={'👉🏼 쿠폰을 사용하여 소비자에게 판매한 거래 리스트입니다.'} />
        </div>
        <DividingLine border={false} />
        {/* 필터 */}
        <AdminOrderCouponSaleSearchBox
          control={control}
          couponOptions={couponOptions}
          tradeOptions={tradeOptions}
          handleFilterSearch={handleFilterSearch}
          handleResetSearch={handleResetSearch}
        />

        <CardContainer>
          <TableFilterSection
            control={control}
            defaultValue={'MEMBER_NAME'}
            optionName={'transactionCouponListSearchCode'}
            handleHeaderSearch={handleHeaderSearch}
            headerOptions={headerOptions}
            total={totalElements}
          />
          <Tables pagination={pagination} listData={content} columns={columns} handleChangePageOption={handlePageChange} />
        </CardContainer>

        <DividingLine border={false} />

        <CardContainer>
          <ListFooterSection
            goRouterHandler={goRouterHandler}
            showButton={true}
            showRightBtn={true}
            rtText="판매 등록"
            showLeftBtn={true}
            lfText="엑셀 다운로드"
            onClick={handleDownloadExcelClick}
          />
        </CardContainer>
      </Form>
    </>
  );
};

export default OrderCouponSaleListTemplate;
