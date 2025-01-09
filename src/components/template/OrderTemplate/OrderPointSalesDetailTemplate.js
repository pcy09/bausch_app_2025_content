import { Buttons, CardContainer, DividingLine, Form, OrderStatus, Tables } from '@/components/atom';
import { Button, Descriptions, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { contentsContainerStyle, descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getOpticianDetailAction, getOpticianListAction, opticianReset, updateOpticianAction } from '@/store/reducers/admin/opticianReducer';
import { storeMaping, transDate } from '@/common/utiles';
import useCommonCode from '@/hooks/useCommonCode';
import { DetailPageTitle, PageTitle, StatisticsCards } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';
import TestTemplate from '../StoreTemplate/TestTemplate';
import { TradeStatus } from '@/components/atom/TableAtoms';
import { AdminOrderPointSaleSection } from '@/components/molecules/DevCreatement';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteCouponSalesDetailAction } from '@/store/reducers/admin/couponOrderReducer';
import { getPointOrderDetailAction, PointOrderReset } from '@/store/reducers/admin/orderPointListReducer';

// 제품 변경 이력
const columns = [
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
    title: '수량',
    dataIndex: 'productQuantity',
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
    title: '구매가',
    dataIndex: 'productPointPrice',
    align: 'center',
  },
  {
    title: '변경일',
    dataIndex: 'updateProductDate',
    align: 'center',
  },
  {
    title: '변경 제품',
    dataIndex: 'updateProductName',
    align: 'center',
  },
];

const OrderPointSalesDetailTemplate = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const { pointOrderDetail } = useSelector(state => state?.orderPointList);
  const { pointDetailInfo, pointDetailProductInfo, pointDetailUpdateInfo } = pointOrderDetail;

  const router = useRouter();
  const { query, back, push } = useRouter();
  const { pointProductGroupId } = query;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleModal();
  const onError = errors => console.log('fail', errors);

  // 거래취소
  const handleCancelData = () => {
    dispatch(deleteCouponSalesDetailAction({ id: query?.id, callback: router, type: 'point' }));
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

  // 상세 데이터 호출
  useEffect(() => {
    if (router.query.id) {
      const params = {
        pointProductGroupId,
      };
      dispatch(getPointOrderDetailAction({ id: router.query.id, callback: router, params }));
    }
    return () => {
      dispatch(PointOrderReset());
    };
  }, [router.query.id]);

  useEffect(() => {
    if (pointDetailProductInfo && pointDetailInfo) {
      const allOrdersWaiting = pointDetailProductInfo.every(item => item.orderStatus === '주문대기');
      const isTransactionCancelled = pointDetailInfo.transactionStatus === '거래취소';
      setIsDisabled(!allOrdersWaiting || isTransactionCancelled);
    }
  }, [pointDetailProductInfo, pointDetailInfo]);

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 거래 상세 내역 페이지 입니다. 상태에 따라 제품 변경 및 취소할 수 있습니다.'} />
      </div>
      <DividingLine border={false} />
      {/* 거래정보 */}
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          <Descriptions title="거래 정보" bordered={true}>
            <Descriptions.Item span={1} label="거래 ID">
              {pointDetailInfo?.transactionCode}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="거래 상태">
              <TradeStatus status={pointDetailInfo?.transactionStatus} />
            </Descriptions.Item>
            <Descriptions.Item span={1} label="안경원 정보">
              {pointDetailInfo?.storeInfo}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="주문일">
              {pointDetailInfo?.transactionDate}
            </Descriptions.Item>
            <Descriptions.Item span={1} label="적립금">
              {pointDetailInfo?.pointGroupName}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="사용적립금">
              {pointDetailInfo?.totalUsedPoint}
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
        </CardContainer>
      </Form>
      <DividingLine border={false} />

      {/* 제품 정보 */}
      <CardContainer>
        <AdminOrderPointSaleSection listData={pointDetailProductInfo} isDisabled={isDisabled} pointProductGroupId={pointProductGroupId} />
      </CardContainer>
      <DividingLine border={false} />

      {/* 제품 변경 이력 */}
      <CardContainer bordered={false}>
        <Descriptions title="제품 변경 이력"></Descriptions>
        <Tables listData={pointDetailUpdateInfo} columns={columns} />
      </CardContainer>
      <DividingLine border={false} />

      {/* 하단 */}
      <CardContainer>
        <div>
          <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => push('/admin/order/point-sales')} css={marginRightStyle(5)} />
          <Buttons
            type={'default'}
            danger
            name={'거래취소'}
            htmlType={'button'}
            onClick={handleModal}
            disabled={isDisabled}
            css={marginRightStyle(5)}
          />
        </div>
      </CardContainer>
      <DividingLine border={false} />
    </>
  );
};

export default OrderPointSalesDetailTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
