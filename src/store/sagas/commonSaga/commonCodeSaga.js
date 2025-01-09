import { call, delay, put, takeEvery } from '@redux-saga/core/effects';
import { notification } from 'antd';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { getBrandInfoApi, getCommonCodeListApi } from '@/api/commonCodeApi';
import { getCommonCodeListAction, getManyCommonCodeListAction, insertCommonCodeListAction } from '@/store/reducers/commonCodeReducer';
import { Cookies } from 'react-cookie';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

const cookies = new Cookies();

function* getCommonCodeSaga({ payload }) {
  yield put(startLoading());
  try {
    const response = yield call(getCommonCodeListApi);
    const data = response.data;

    if (data) {
      yield put(insertCommonCodeListAction({ data }));
      if (payload && typeof payload.callback === 'function') {
        payload.callback();
      }
    }
    yield put(endLoading());
  } catch (e) {
    console.error(e);
    cookies.remove('accessToken', { path: '/' });
    yield put(
      snackOpen({
        type: 'error',
        message: '공통 코드 호출 실패',
        description: '다시 로그인 해주세요. 지속적인 호출 실패 시 관리자에게 문의하세요.',
        placement: 'top',
      }),
    );
    yield put(endLoading());
  }
}

export function* commonCodeSaga() {
  yield takeEvery(getCommonCodeListAction, getCommonCodeSaga);
}
