import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  // 이용약관 리스트
  getTermsListApi,
  // 이용약관 상세
  getTermsDetailApi,
  // 이용약관 등록
  registerTermsApi,
  // 이용약관 수정
  updateTermsApi,
  // 이용약관 삭제
  deleteTermsApi,
} from '@/api/admin/supportApi';

import {
  // 정보 가져오기
  getTermsAction,
  // 상세 정보 가져오기
  getTermsDetailAction,
  // 정보 넣기
  insetTermsAction,
  // 디테일 정보 넣기
  insertTermsDetailAction,
  // 정보 등록하기
  registerTermsAction,
  // 정보 수정하기
  updateTermsAction,
  // 정보 삭제하기
  deleteTermsAction,
  changeTabMenu,
  changeSearch,
  // 초기화
  termsReset,
} from '@/store/reducers/termsReducer';
import { transDate } from '@/common/utiles';

// 이용약관 리스트 saga *****************************************************
function* getTermsListSaga(action) {
  try {
    const { params, findTermsShowStatusCode } = action.payload;
    yield put(startLoading());
    const response = yield call(getTermsListApi, params);
    if (response?.code === 200) {
      const data = response?.data?.list.reduce(
        (acc, cur) =>
          acc.concat({
            ...cur,
            key: cur.id,
            terms_register_date: transDate(cur.terms_register_date, 'YYYY-MM-DD'),
            terms_modify_date: transDate(cur.terms_modify_date, 'YYYY-MM-DD'),
            terms_show_status: findTermsShowStatusCode[cur.terms_show_status],
          }),
        [],
      );

      yield put(insetTermsAction({ list: data, paging: response.data.paging }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        snackOpen({
          type: 'error',
          message: `${e.response.data.message}`,
          placement: 'top',
        }),
      );
    }
  }
}

// 이용약관 상세 saga *****************************************************
function* getTermsDetailSaga(action) {
  try {
    yield put(startLoading());
    const response = yield call(getTermsDetailApi, action.payload.id);

    if (response?.code === 200) {
      const detailData = response?.data.termsDetail;
      yield put(insertTermsDetailAction({ termsDetail: detailData }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          type: 'error',
          message: `${e.response.data.message}`,
          placement: 'top',
        }),
      );
    }
  }
}

// 이용약관 정보 입력 saga *****************************************************
function* registerTermsSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;
    const response = yield call(registerTermsApi, sendObject);
    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '이용약관 정보입력 성공',
          description: `${response.message}`,
          placement: 'top',
        }),
      );
      callback.push('/support/terms');
    }
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이용약관 정보 업데이트 saga *****************************************************
function* updateTermsSaga(action) {
  try {
    yield put(startLoading());
    const { id, callback, sendObject } = action.payload;
    const response = yield call(updateTermsApi, id, sendObject);

    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: `${response.message}`,
          placement: 'top',
        }),
      );
      callback.push('/support/terms');
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* deleteTermsSaga(action) {
  try {
    yield put(startLoading());
    const { id, callback } = action.payload;
    const response = yield call(deleteTermsApi, id);

    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '삭제 성공',
          description: `${response.message}`,
          placement: 'top',
        }),
      );
      callback.push('/support/terms');
      yield put(termsReset());
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: `${e.response.data.message}`,
        }),
      );
    }
  }
}

export function* termsSaga() {
  // 이용약관 정보
  yield takeEvery(getTermsAction, getTermsListSaga);
  // 이용약관 상세정보
  yield takeEvery(getTermsDetailAction, getTermsDetailSaga);
  // 이용약관 등록
  yield takeEvery(registerTermsAction, registerTermsSaga);
  // 이용약관 수정
  yield takeEvery(updateTermsAction, updateTermsSaga);
  // 이용약관 삭제
  yield takeEvery(deleteTermsAction, deleteTermsSaga);
}
