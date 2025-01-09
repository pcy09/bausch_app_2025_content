import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { getFaqApi, updateFaqApi } from '@/api/admin/supportApi';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { getFaqAction, insertFaqDataAction, resetFaqAction, updateFaqAction } from '@/store/reducers/admin/faqReducer';

// faq 리스트 가져오기 saga
function* getFaqSaga() {
  try {
    yield put(startLoading());
    const response = yield call(getFaqApi);
    if (response?.code === 200) {
      const data = response.data;
      yield put(insertFaqDataAction({ faqList: data.faqList }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getManagerListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '자주 묻는 질문 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// faq 등록/수정/삭제 saga
function* updateFaqSaga(action) {
  const { sendObject } = action.payload;

  try {
    yield put(startLoading());
    yield put(resetFaqAction());
    const response = yield call(updateFaqApi, sendObject);

    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '자주 묻는 질문 업데이트 성공',
          description: '',
          placement: 'top',
        }),
      );
      console.log('여길 타니?');
      yield put(insertFaqDataAction({ faqList: response.data.faqList }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '자주 묻는 질문 업데이트 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

export function* faqSaga() {
  yield takeEvery(getFaqAction, getFaqSaga);
  yield takeEvery(updateFaqAction, updateFaqSaga);
}
