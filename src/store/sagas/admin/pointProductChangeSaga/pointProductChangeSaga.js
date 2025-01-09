import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { getModalDropDataAction, insertModalDropDataAction, updateCouponProductAction } from '@/store/reducers/admin/modalBoxReducer';
import { getCouponOrderDropApi, getPointDropDataApi, getPointMyopiaApi, updatePointProductApi } from '@/api/admin/orderApi';
import { updateCouponProductApi } from '@/api/admin/modalBoxApi';
import {
  getPointDropDataAction,
  getPointMyopiaAction,
  insertPointDropDataAction,
  insertPointMyopiaAction,
  updatePointProductAction,
} from '@/store/reducers/admin/pointProductChangeReducer';
// 판매,증정 제품 드롭 가져오기
function* getPointDropDataSaga(action) {
  const { params } = action.payload;

  try {
    yield put(startLoading());
    const response = yield call(getPointDropDataApi, params);
    const { productDropData } = response;

    yield put(
      insertPointDropDataAction({
        productDropData,
      }),
    );

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '제품 옵션 가져오기 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 근시 도수 드롭 가져오기
function* getPointMyopiaSaga(action) {
  const { params } = action.payload;

  try {
    yield put(startLoading());
    const response = yield call(getPointMyopiaApi, params);

    yield put(
      insertPointMyopiaAction({
        myopiaData: response.data,
      }),
    );

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '근시 정보 가져오기 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* updatePointProductSaga(action) {
  const { sendObject } = action.payload;

  try {
    yield put(startLoading());
    const response = yield call(updatePointProductApi, sendObject);

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

export function* pointProductChangeSaga() {
  yield takeEvery(getPointDropDataAction, getPointDropDataSaga);
  yield takeEvery(getPointMyopiaAction, getPointMyopiaSaga);
  yield takeEvery(updatePointProductAction, updatePointProductSaga);
}
