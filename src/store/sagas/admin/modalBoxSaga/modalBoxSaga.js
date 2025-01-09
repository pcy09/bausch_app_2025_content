import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { getModalDropDataAction, insertModalDropDataAction, updateCouponProductAction } from '@/store/reducers/admin/modalBoxReducer';
import { getCouponOrderDropApi } from '@/api/admin/orderApi';
import { updateCouponProductApi } from '@/api/admin/modalBoxApi';
// 판매,증정 제품 드롭 가져오기
function* getCouponOrderDropSaga(action) {
  const { params } = action.payload;

  try {
    yield put(startLoading());
    const response = yield call(getCouponOrderDropApi, params);
    const { productDropData, giftDropData } = response;

    yield put(
      insertModalDropDataAction({
        productDropData,
        giftDropData,
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

function* updateCouponProductSaga(action) {
  const { sendObject, callback, id } = action.payload;

  try {
    yield put(startLoading());
    const response = yield call(updateCouponProductApi, sendObject);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '제품 변경 성공',
          description: '변경되었습니다.',
          placement: 'top',
        }),
      );
      window.location.reload();
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
          message: `변경 실패`,
          description: `요청되지 않은 응답값입니다.관리자에게 문의해주세요.`,
        }),
      );
    }
  }
}

export function* modalBoxSaga() {
  yield takeEvery(getModalDropDataAction, getCouponOrderDropSaga);
  yield takeEvery(updateCouponProductAction, updateCouponProductSaga);
}
