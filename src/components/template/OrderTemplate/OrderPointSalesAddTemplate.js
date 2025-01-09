import { CardContainer, Form, RowGrid, Buttons, DividingLine } from '@/components/atom';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OrderPointStoreSection } from '@/components/molecules/OrderPointSection';

import { useDispatch, useSelector } from 'react-redux';
import {
  getPointProductListAction,
  getPointProductOrderDetailSellingStoreAction,
  pointProductOrderResetAction,
  resetPointProductListAction,
} from '@/store/reducers/admin/pointProductOrderReducer';
import { OrderBioFundingSection, OrderFundingStatusSection } from '@/components/molecules/OrderFundingStatusSection';

const OrderPointSalesAddTemplate = ({}) => {
  const dispatch = useDispatch();
  const [selectedStoreId, setSelectedStoreId] = useState(); // 선택된 스토어 ID
  const [selectedCardId, setSelectedCardId] = useState(); // 선택된 카드 ID
  const orderPointSellingStore = useSelector(state => state.pointProductOrder.sellingStoreList); //판매 스토어 리스트
  const pointStoreData = useSelector(state => state.pointProductOrder.pointStoreData); //적립금 리스트
  const pointProductList = useSelector(state => state.pointProductOrder.pointProductList); //선택된 적립금

  const methods = useForm({
    defaultValues: {
      transactionPointModels: [],
      // 초기값 설정
    },
  });
  const { getValues } = methods;

  // 스토어 검색
  const handleStoreSearch = () => {
    const pointStoreSearchCond = getValues('storeOption');
    const searchValue = getValues('searchText');
    const params = {
      pointStoreSearchCond,
      searchValue,
    };
    dispatch(getPointProductOrderDetailSellingStoreAction({ params }));
  };

  // 적립금 선택
  const handleSelectPoint = item => {
    const params = {
      pointId: item.pointId,
      pointProductGroupId: item.pointProductGroupId,
    };
    dispatch(resetPointProductListAction()); // 데이터 초기화
    // 선택된 카드가 동일한지 확인하고, 동일한 경우 선택 해제
    if (selectedCardId === item.pointId) {
      // 선택 해제 시
      setSelectedCardId();
    } else {
      // 새로운 카드 선택 시
      setSelectedCardId(item.pointId); // 새로운 카드 ID로 설정
      dispatch(getPointProductListAction({ params }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetPointProductListAction()); // 기존 리스트 초기화
      dispatch(pointProductOrderResetAction());
    };
  }, []);

  // 적립금 선택 해제
  const handleRemovePoint = () => {
    setSelectedCardId();
    dispatch(resetPointProductListAction()); // 데이터 초기화
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 관리자가 적립금 주문을 등록할 수 있는 페이지입니다.'} />
      <DividingLine border={false} />
      <FormProvider {...methods}>
        <CardContainer size={'default'} bordered={false}>
          {/* 판매 스토어 선택 설정 */}
          <OrderPointStoreSection
            orderPointSellingStore={orderPointSellingStore}
            handleStoreSearch={handleStoreSearch}
            setSelectedStoreId={setSelectedStoreId}
          />
        </CardContainer>
        <DividingLine border={false} />

        {/* 적립금 현황 */}
        {pointStoreData?.length > 0 && (
          <OrderFundingStatusSection pointStoreData={pointStoreData} selectedCardId={selectedCardId} handleSelectPoint={handleSelectPoint} />
        )}
        <DividingLine border={false} />
        {/* 제품 선택 */}
        {pointProductList?.length > 0 && (
          <OrderBioFundingSection storeId={selectedStoreId} pointProductList={pointProductList} handleRemovePoint={handleRemovePoint} />
        )}
      </FormProvider>
    </>
  );
};

export default OrderPointSalesAddTemplate;
