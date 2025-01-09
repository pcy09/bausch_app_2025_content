import { CardContainer, Form, RowGrid, Buttons, DividingLine, Inputs } from '@/components/atom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { OrderUserSection } from '@/components/molecules/OrderCouponSection';

import { useDispatch, useSelector } from 'react-redux';
import { getPointProductOrderDetailSellingStoreAction } from '@/store/reducers/admin/pointProductOrderReducer';
import { couponOrderResetAction, createSalesAction, getCouponOrderDetailAction } from '@/store/reducers/admin/couponOrderReducer';
import { OrderCouponCardStatusSection, OrderBioCouponSection } from '@/components/molecules/OrderCouponCardStatusSection';
import { createLenslyProductGroupApi } from '@/api/admin/productApi';
import { errorSnackOpen } from '@/store/reducers/snackReducer';

const OrderPointSalesAddTemplate = ({}) => {
  const dispatch = useDispatch();

  const orderUserSelling = useSelector(state => state.couponOrder.orderUserListData);
  const couponCardList = useSelector(state => state.couponOrder.orderReserveData);
  const couponDropData = useSelector(state => state.couponOrder.dropData);
  const [userData, setUserData] = useState({
    memberId: '',
    myopiaLeft: '', //근시 좌
    astiLeft: '', // 난시 좌
    axisLeft: '', // 축 좌
    myopiaRight: '', // 근시 우
    astiRight: '', // 난시 우
    axisRight: '', // 축 우
  });
  const [selectedCards, setSelectedCards] = useState([]);
  const [optionData, setOptionData] = useState([]);

  const router = useRouter();
  const methods = useForm();

  const { register, handleSubmit, control, setValue, getValues, watch, reset } = methods;

  // 판매 등록
  const handleAddData = () => {
    const values = getValues();
    const { couponRegisterModels } = values;

    // 삭제처리한 쿠폰은 value에서 제외
    const updatedCouponRegisterModels = couponRegisterModels?.filter(itemB =>
      couponDropData.some(itemA => itemA.couponIssueId === itemB.couponIssueId),
    );

    // productId 자식만 추출하기
    const updatedData = updatedCouponRegisterModels.map(item => {
      const updatedCouponRegisterInfoModels = item.couponRegisterInfoModels.map(infoModel => {
        if (Array.isArray(infoModel.productId)) {
          return {
            ...infoModel,
            productId: infoModel.productId[infoModel.productId.length - 1], // 마지막 인덱스 값으로 변경
          };
        }
        return infoModel;
      });
      return {
        ...item,
        couponRegisterInfoModels: updatedCouponRegisterInfoModels,
      };
    });

    // 동일제품,동일도수 작업하기

    // 대상 배열의 모든 객체를 순회
    updatedData.forEach(targetItem => {
      // 동일한 couponIssueId를 가진 참고 배열의 객체를 찾기
      const referenceItem = couponDropData.find(ref => ref.couponIssueId === targetItem.couponIssueId);

      // 조건에 따라 memberDiopterModel 값을 변경

      // 동일제품인 경우 productId 값을 변경
      if (referenceItem && referenceItem.syncSaleGiftStatus === 'SYNC_SALE_ON') {
        const firstProductId = targetItem.couponRegisterInfoModels[0].productId;
        targetItem.couponRegisterInfoModels.forEach(model => {
          model.productId = firstProductId;
        });
      }
    });

    const sendObject = {
      memberId: userData.memberId,
      couponRegisterModels: updatedData,
    };

    let hasValues = false;

    if (sendObject?.couponRegisterModels?.length > 0) {
      hasValues = checkForInvalidValues(sendObject.couponRegisterModels);
    }

    if (hasValues) {
      const replaceEmptyStringsWithNull = obj => {
        for (let key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            replaceEmptyStringsWithNull(obj[key]);
          } else if (obj[key] === '') {
            obj[key] = null;
          }
          if (key === 'eyeSide') {
            obj[key] = null;
          }
        }
      };

      sendObject?.couponRegisterModels.forEach(coupon => replaceEmptyStringsWithNull(coupon));

      dispatch(createSalesAction({ sendObject, callback: router }));
    } else {
      dispatch(
        errorSnackOpen({
          message: '제품 또는 도수정보를 확인해주세요',
        }),
      );
    }
  };

  // 스토어 관리 검색
  const handleSearch = params => {
    dispatch(getCouponOrderDetailAction({ params }));
  };

  // reset
  useEffect(() => {
    return () => {
      dispatch(couponOrderResetAction());
    };
  }, []);

  // 체크 함수
  const checkForInvalidValues = data => {
    let hasValues = true;
    data.forEach(item => {
      const index = couponCardList.findIndex(item2 => item2.couponIssueId === item.couponIssueId);

      item.couponRegisterInfoModels.forEach((infoModel, i) => {
        const myopiaOption = optionData[index]?.[i]?.options?.myopia;
        const astiOption = optionData[index]?.[i]?.options?.asti;
        const axisOption = optionData[index]?.[i]?.options?.axis;
        const addOption = optionData[index]?.[i]?.options?.add;

        // 도수선택을 해야하는데 안한 경우 false 처리 (동일도수용)
        // 근시
        if (myopiaOption?.length > 0 && !infoModel.memberDiopterModel.memberMyopia) {
          hasValues = false;
          return;
        }
        // 난시
        if (astiOption?.length > 0 && !infoModel.memberDiopterModel.memberAsti) {
          hasValues = false;
          return;
        }
        // 축
        if (axisOption?.length > 0 && !infoModel.memberDiopterModel.memberAxis) {
          hasValues = false;
          return;
        }
        // ADD
        if (addOption?.length > 0 && !infoModel.memberDiopterModel.memberAdd) {
          hasValues = false;
          return;
        }

        // 제품 선택 안한 경우 false 처리
        if (!infoModel.productId) {
          hasValues = false;
          return;
        }
      });
    });

    return hasValues;
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 관리자가 쿠폰판매를 등록할 수 있는 페이지입니다.'} />
      <DividingLine border={false} />
      <FormProvider {...methods}>
        <Form>
          <CardContainer size={'default'} bordered={false}>
            {/* 판매 스토어 선택 설정 */}
            <OrderUserSection storeData={orderUserSelling} onSearch={handleSearch} setUserData={setUserData} />
          </CardContainer>
          <DividingLine border={false} />
          {/* 사용쿠폰 현황 */}
          {couponCardList.length > 0 && (
            <>
              <OrderCouponCardStatusSection
                couponCardList={couponCardList}
                setSelectedCards={setSelectedCards}
                selectedCards={selectedCards}
                watch={watch}
                setValue={setValue}
              />
              <DividingLine border={false} />
            </>
          )}

          {/* 제품 선택 */}
          {couponDropData?.length > 0 && (
            <>
              <OrderBioCouponSection
                couponCardList={couponCardList}
                couponDropData={couponDropData}
                userData={userData}
                setSelectedCards={setSelectedCards}
                selectedCards={selectedCards}
                optionData={optionData}
                setOptionData={setOptionData}
              />
              <DividingLine border={false} />
            </>
          )}

          <CardContainer>
            <RowGrid justify="space-between">
              <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => router.push('admin/order/point-sales')} />
              <Buttons type={'primary'} name={'판매 등록'} onClick={handleAddData} />
            </RowGrid>
          </CardContainer>
        </Form>
      </FormProvider>
    </>
  );
};

export default OrderPointSalesAddTemplate;
