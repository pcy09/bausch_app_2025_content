import { Buttons, CardContainer, DividingLine, Form, Tables } from '@/components/atom';
import { Descriptions, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { descStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import NoticeLabel from '@/components/atom/Notice';
import { TradeStatus } from '@/components/atom/TableAtoms';
import { couponOrderResetAction, deleteCouponSalesDetailAction, getCouponSalesDetailAction } from '@/store/reducers/admin/couponOrderReducer';
import { getModalDropDataAction, openModalBox } from '@/store/reducers/admin/modalBoxReducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const OrderCouponSaleDetailTemplate = () => {
  // 제품 정보
  const productColumns = [
    {
      title: 'ID',
      dataIndex: 'transactionProductId',
      align: 'center',
    },
    {
      title: '제품 유형',
      dataIndex: 'productType',
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
      title: '근시',
      dataIndex: 'myopia',
      align: 'center',
    },
    {
      title: '난시',
      dataIndex: 'asti',
      align: 'center',
    },
    {
      title: '축',
      dataIndex: 'axis',
      align: 'center',
    },
    {
      title: 'ADD',
      dataIndex: 'add',
      align: 'center',
    },
    {
      title: '판매일',
      dataIndex: 'transactionDate',
      align: 'center',
    },
    {
      title: '제품 오더 상태',
      dataIndex: 'orderStatus',
      align: 'center',
      render: (data, record) => <TradeStatus status={data} />,
    },
    {
      title: '자동발주',
      dataIndex: 'autoOrderStatus',
      align: 'center',
    },
    {
      title: '제품 변경',
      dataIndex: 'transactionProductId',
      align: 'center',
      render: (data, record) => (
        <Buttons
          disabled={isDisabled}
          onClick={() => {
            handleChangeProduct(record);
          }}
          name={'변경'}
        />
      ),
    },
  ];
  // 제품 변경 이력
  const updateColumns = [
    {
      title: '제품 유형',
      dataIndex: 'productType',
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
      title: '근시',
      dataIndex: 'myopia',
      align: 'center',
    },
    {
      title: '난시',
      dataIndex: 'asti',
      align: 'center',
    },
    {
      title: '축',
      dataIndex: 'axis',
      align: 'center',
    },
    {
      title: 'ADD',
      dataIndex: 'add',
      align: 'center',
    },
    {
      title: '자동발주',
      dataIndex: 'autoOrderStatus',
      align: 'center',
    },
    {
      title: '변경일',
      dataIndex: 'updateProductDate',
      align: 'center',
    },
    {
      title: '변경제품',
      dataIndex: 'updateProductName',
      align: 'center',
    },
  ];

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const dispatch = useDispatch();
  const router = useRouter();
  const { query, back, push } = router;

  const { couponDetailInfo, couponDetailProductInfo, couponDetailUpdateInfo } = useSelector(state => state?.couponOrder?.couponSalesDetailData);
  const [productContent, setProductContent] = useState([]);
  const [updateContent, setUpdateContent] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = data => handleModal();
  const onError = errors => console.log('fail', errors);

  // 거래취소
  const handleCancelData = () => {
    dispatch(deleteCouponSalesDetailAction({ id: query?.id, callback: router }));
  };

  // 거래취소 모달
  const handleModal = () => {
    Modal.confirm({
      title: '거래 취소',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: '거래를 취소하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      maskClosable: true,
      onOk: () => handleCancelData(),
    });
  };

  // 배열에서 orderStatus가 '배송완료'인 항목이 있는지 확인
  useEffect(() => {
    const hasDeliveryCompleted = productContent.some(item => item.orderStatus === '배송완료');

    if (hasDeliveryCompleted) {
      setIsDisabled(hasDeliveryCompleted);
    }

    if (couponDetailInfo?.transactionStatus === '거래취소') {
      setIsDisabled(true);
    }
  }, [productContent, couponDetailInfo]);

  // 상세 데이터 호출
  useEffect(() => {
    if (query.id) {
      dispatch(getCouponSalesDetailAction({ id: query.id }));
    }
    // 초기화
    return () => {
      dispatch(couponOrderResetAction());
    };
  }, [query?.id]);

  // table에 key 부여하기
  useEffect(() => {
    if (couponDetailProductInfo) {
      const filteredProductContent = couponDetailProductInfo.map(item => ({
        ...item,
        key: item.transactionProductId,
      }));
      setProductContent(filteredProductContent);

      const filteredUpdateContent = couponDetailUpdateInfo?.map(item => ({
        ...item,
        key: item.transactionUpdateHistoryId,
      }));
      setUpdateContent(filteredUpdateContent);
    }
  }, [couponDetailProductInfo]);

  // 변경버튼 modal
  const handleChangeProduct = record => {
    const data = {
      ...record,
      couponId: couponDetailInfo?.couponId,
      memberId: couponDetailInfo?.memberId,
      transactionInfoId: couponDetailInfo?.transactionInfoId,
    };
    // 모달 열기
    dispatch(openModalBox({ data }));
    // 판매,증정제품 드롭 가져오기
    const params = {
      couponId: couponDetailInfo?.couponId,
    };
    dispatch(getModalDropDataAction({ params }));
  };

  const handleHeaderSearch = () => {
    console.log('first');
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 거래 상세 내역 페이지 입니다. 상태에 따라 제품 변경 및 취소할 수 있습니다.'} />
      </div>
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 거래 정보 */}
        <CardContainer>
          <Descriptions title="거래 정보" bordered={true} column={3}>
            <Descriptions.Item span={1} label="거래 ID">
              {couponDetailInfo?.transactionCode}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="거래 상태">
              <TradeStatus status={couponDetailInfo?.transactionStatus} />
            </Descriptions.Item>

            <Descriptions.Item span={1} label="안경원 정보">
              <a
                style={{
                  textDecoration: 'none', // 기본 텍스트 데코레이션 제거
                  borderBottom: '1px solid #04848c', // 밑줄 효과 추가
                }}
                href={`/admin/store/manage/${couponDetailInfo?.storeId}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => {
                  e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
                }}>
                {couponDetailInfo?.storeInfo}
              </a>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="판매일">
              {couponDetailInfo?.transactionDate}
            </Descriptions.Item>

            <Descriptions.Item span={1} label="회원명">
              <a
                style={{
                  textDecoration: 'none', // 기본 텍스트 데코레이션 제거
                  borderBottom: '1px solid #04848c', // 밑줄 효과 추가
                }}
                href={`/admin/member/${couponDetailInfo?.memberId}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => {
                  e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
                }}>
                {couponDetailInfo?.memberName}
              </a>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="휴대폰 번호">
              {couponDetailInfo?.memberPhone}
            </Descriptions.Item>

            <Descriptions.Item span={1} label="쿠폰 유형">
              {couponDetailInfo?.couponType}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="사용 쿠폰">
              {couponDetailInfo?.couponName}
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
        </CardContainer>

        {/* 제품 정보 */}
        <DividingLine border={false} />
        <CardContainer>
          <Descriptions title="제품 정보"></Descriptions>
          <Tables detail={false} listData={productContent} columns={productColumns} />
        </CardContainer>

        {/* 제품 변경 이력 */}
        <DividingLine border={false} />
        <CardContainer bordered={false}>
          <Descriptions title="제품 변경 이력"></Descriptions>
          <Tables detail={false} listData={updateContent} columns={updateColumns} />
        </CardContainer>

        {/* 하단 */}
        <DividingLine border={false} />
        <CardContainer>
          <div>
            <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => push('/admin/order/coupon-sales')} css={marginRightStyle(5)} />
            <Buttons
              onClick={handleModal}
              type={'default'}
              danger
              name={'거래취소'}
              htmlType={'button'}
              disabled={isDisabled}
              css={marginRightStyle(5)}
            />
          </div>
        </CardContainer>
        <DividingLine border={false} />
      </Form>
    </>
  );
};

export default OrderCouponSaleDetailTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
