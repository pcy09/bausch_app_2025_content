import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import dayjs from 'dayjs';
import {
  createSalesApi,
  deleteCouponSalesDetailApi,
  getCouponOrderDetailApi,
  getCouponOrderDropApi,
  getCouponSalesDetailApi,
  getCouponSalesListApi,
  getMemberCouponApi,
} from '@/api/admin/orderApi';
import {
  getCouponOrderDetailAction,
  insertCouponOrderDetailAction,
  getCouponOrderReserveAction,
  insertCouponOrderReserveAction,
  getCouponOrderDropAction,
  insertCouponOrderDropAction,
  createSalesAction,
  getCouponSalesListAction,
  insertCouponSalesListAction,
  getCouponSalesDetailAction,
  insertCouponSalesDetailAction,
  deleteCouponSalesDetailAction,
} from '@/store/reducers/admin/couponOrderReducer';

// 쿠폰 거래내역 리스트 조회하기
function* getCouponSalesListSaga(action) {
  try {
    const { params } = action.payload;
    yield put(startLoading());
    const response = yield call(getCouponSalesListApi, params);

    if (response.status === 200) {
      const { content, pageable, totalElements } = response.data.result;
      const filteredContent = content.map(item => ({
        ...item,
        key: item.transactionInfoId,
      }));

      yield put(insertCouponSalesListAction({ couponSalesListData: filteredContent, pageable, totalElements }));
    }
    yield put(endLoading());
  } catch (e) {
    console.error(e);
    yield put(endLoading());
  }
}

function* getCouponOrderDetailSaga(action) {
  try {
    const { params } = action.payload;
    yield put(startLoading());
    const response = yield call(getCouponOrderDetailApi, params);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '회원 검색에 성공하였습니다.',
          description: '회원 검색에 성공하였습니다.',
        }),
      );
      yield put(insertCouponOrderDetailAction({ orderUserListData: response.data.result }));
    } else {
      yield put(
        errorSnackOpen({
          message: '회원 검색에 실패하였습니다.',
          description: `${response.message}`,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '회원 검색에 실패하였습니다.',
          description: `${e.response.data.message}`,
        }),
      );
    }
    console.error('deleteEventSaga::::', e);
  }
}

// 적립금 스토어 리스트 적립금 saga
function* getCouponOrderReserveSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action?.payload;
    const response = yield call(getMemberCouponApi, id);
    if (response.status === 200) {
      yield put(
        insertCouponOrderReserveAction({
          orderReserveData: response.data.result,
        }),
      );
    } else {
      yield put(
        errorSnackOpen({
          message: '사용 쿠폰 리스트 호출 실패',
          description: `${response.message}`,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '사용 쿠폰 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 판매,증정 제품 드롭 가져오기
function* getCouponOrderDropSaga(action) {
  const { params } = action.payload;
  const { couponId, couponIssueId } = params;
  const getDropData = state => state.couponOrder.dropData;
  const dropData = yield select(getDropData);
  const getCouponData = state => state.couponOrder.orderReserveData;
  const couponData = yield select(getCouponData);
  function updateCoupons(coupons, newCoupon) {
    // 배열에서 동일한 couponId를 가진 객체가 있는지 찾기
    const existingCoupon = coupons.find(coupon => coupon.couponId === newCoupon.couponId);

    if (existingCoupon) {
      // 동일한 couponId가 있으면 해당 객체를 제외하고 나머지만 반환
      return coupons.filter(coupon => coupon.couponId !== newCoupon.couponId);
    } else {
      // 동일한 couponId가 없으면 배열에 새 객체를 추가
      return [...coupons, newCoupon];
    }
  }

  try {
    yield put(startLoading());
    const response = yield call(getCouponOrderDropApi, params);
    const { productDropData, giftDropData } = response;

    // couponId가 1인 첫 번째 객체를 find로 추출
    const filteredCouponData = couponData.find(coupon => coupon.couponId === couponId);
    const { couponName, salesProductQuantity, giftProductQuantity, couponType, syncLensPowerStatus, syncSaleGiftStatus } = filteredCouponData;

    const newCoupon = {
      couponId,
      couponIssueId,
      couponName,
      couponType,
      salesProductQuantity,
      productDropData,
      giftProductQuantity,
      giftDropData,
      syncLensPowerStatus,
      syncSaleGiftStatus,
    };

    console.log('newCoupon', newCoupon);

    const updatedDropData = updateCoupons(dropData, newCoupon);
    yield put(
      insertCouponOrderDropAction({
        dropData: updatedDropData,
      }),
    );

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '판매,증정제품 옵션 가져오기 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 판매 등록 saga
function* createSalesSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(createSalesApi, sendObject);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '판매 등록 성공',
          description: '등록되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/order/coupon-sales');
    } else {
      yield put(
        errorSnackOpen({
          message: response.message,
          description: response.message,
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.code) {
      yield put(
        errorSnackOpen({
          message: `등록 실패`,
          description: `요청되지 않은 응답값입니다.관리자에게 문의해주세요.`,
        }),
      );
    }
  }
}

// 거래내역 상세 가져오기
function* getCouponSalesDetailSaga(action) {
  try {
    const { id } = action.payload;
    yield put(startLoading());
    const response = yield call(getCouponSalesDetailApi, id);

    if (response.status === 200) {
      const couponSalesDetailData = response.data;

      yield put(insertCouponSalesDetailAction({ couponSalesDetailData }));
    }
    yield put(endLoading());
  } catch (e) {
    console.error(e);
    yield put(endLoading());
  }
}

// 거래내역 거래취소
function* deleteCouponSalesDetailSaga(action) {
  try {
    const { id, callback, type } = action.payload;
    yield put(startLoading());
    const response = yield call(deleteCouponSalesDetailApi, id);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '거래 취소 성공',
          description: '취소되었습니다.',
          placement: 'top',
        }),
      );
      if (type === 'point') {
        callback.push('/admin/order/point-sales');
      } else {
        callback.push('/admin/order/coupon-sales');
      }
    }
    yield put(endLoading());
  } catch (e) {
    console.error(e);
    yield put(endLoading());
  }
}

export function* couponOrderSaga() {
  yield takeEvery(getCouponSalesListAction, getCouponSalesListSaga);
  yield takeEvery(getCouponOrderDetailAction, getCouponOrderDetailSaga);
  yield takeEvery(getCouponOrderReserveAction, getCouponOrderReserveSaga);
  yield takeEvery(getCouponOrderDropAction, getCouponOrderDropSaga);
  yield takeEvery(createSalesAction, createSalesSaga);
  yield takeEvery(getCouponSalesDetailAction, getCouponSalesDetailSaga);
  yield takeEvery(deleteCouponSalesDetailAction, deleteCouponSalesDetailSaga);
}
