import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { fetchLoginApi, fetchSignupApi, fetchTokenRenewalApi } from '@/api/authApi';
import { Cookies } from 'react-cookie';
import { loginAction, logoutAction, setAccessToken, signUpAction, tokenRenewalAction } from '@/store/reducers/authReducer';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { codeListResetAction, getCommonCodeListAction } from '@/store/reducers/commonCodeReducer';
import { managerReset } from '@/store/reducers/admin/managerReducer';
import { userReset } from '@/store/reducers/userReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { getSettingAdminMemberListAction } from '@/store/reducers/admin/settingMemberReducer';
const cookies = new Cookies();
const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30일 후

function* loginSaga(action) {
  yield put(startLoading());
  try {
    const { data, callback } = action.payload;
    const sendObject = {
      loginId: data?.manager_email,
      password: data?.manager_password,
    };

    const response = yield call(fetchLoginApi, sendObject);

    if (response.status === 200) {
      // const today = new Date(Date.now());
      // console.log('로그인 시간 : ', today);
      cookies.set(`token`, response.data?.accessToken, { path: '/', expires });
      cookies.set(`refreshToken`, response.data?.refreshToken, { path: '/', expires });
      // yield put(getCommonCodeListAction({ callback }));
      yield put(
        snackOpen({
          type: 'success',
          message: '로그인 성공',
          description: `${response?.message}`,
          placement: 'top',
        }),
      );
      callback.push('/admin');
    } else if (response?.status === 400) {
      yield put(
        errorSnackOpen({
          type: 'error',
          message: '로그인 실패',
          description: `${response?.message}`,
          placement: 'top',
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    console.log('loginSaga::::', e);
    yield put(
      snackOpen({
        type: 'error',
        message: '로그인 실패',
        description: `오류가 발생했습니다. 다시 시도해 주세요.`,
        placement: 'top',
      }),
    );
    yield put(endLoading());
  }
}

// 회원가입 saga
function* signUpSaga(action) {
  try {
    const { sendObject } = action.payload;
    const response = yield call(fetchSignupApi, sendObject);
    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '관리자 등록 성공',
          description: `${response?.message}`,
          placement: 'top',
        }),
      );
      yield put(getSettingAdminMemberListAction());
    } else {
      yield put(
        errorSnackOpen({
          type: 'error',
          message: '관리자 등록 실패',
          description: `${response?.message}`,
          placement: 'top',
        }),
      );
    }
  } catch (e) {
    if (e?.response?.data) {
      yield put(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: `${e.response?.message}`,
        }),
      );
    }
  }
}

// 로그아웃 saga
function* logoutSaga({ payload }) {
  try {
    const { callback } = payload;
    cookies.remove('token', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    callback('/admin/login');

    yield put(
      snackOpen({
        type: 'success',
        message: '로그아웃',
        description: `로그아웃 되었습니다.`,
        placement: 'top',
      }),
    );

    yield put(managerReset());
    yield put(userReset());
    yield put(codeListResetAction());
  } catch (e) {
    yield put(
      errorSnackOpen({
        message: '로그아웃 실패',
        description: `다시 시도해주세요.`,
      }),
    );
  }
}

export function* authSaga() {
  yield takeEvery(loginAction, loginSaga);
  yield takeEvery(signUpAction, signUpSaga);
  yield takeEvery(logoutAction, logoutSaga);
}
