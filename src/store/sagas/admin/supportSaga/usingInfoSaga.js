import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { getUseInfoApi, updateUseInfoApi } from '@/api/admin/supportApi';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { getUseInfoAction, insertUseInfoDataAction, resetUseInfoAction, updateUseInfoAction } from '@/store/reducers/useInfoReducer';

// 이용가이드 리스트 가져오기 saga
function* getUseInfoSaga() {
  try {
    yield put(startLoading());
    const response = yield call(getUseInfoApi);
    if (response?.code === 200) {
      const data = response.data;
      yield put(insertUseInfoDataAction({ useInfoList: data.useInfoList }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getManagerListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이용 가이드 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이용가이드 등록/수정/삭제 saga
function* updateUseInfoSaga(action) {
  const { sendObject } = action.payload;

  try {
    yield put(startLoading());
    yield put(resetUseInfoAction());
    const response = yield call(updateUseInfoApi, sendObject);
    console.log(response);
    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '이용 가이드 업데이트 성공',
          description: '',
          placement: 'top',
        }),
      );
      yield put(insertUseInfoDataAction({ useInfoList: response.data.faqList }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이용 가이드 업데이트 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

export function* usingInfoSaga() {
  yield takeEvery(getUseInfoAction, getUseInfoSaga);
  yield takeEvery(updateUseInfoAction, updateUseInfoSaga);
}
