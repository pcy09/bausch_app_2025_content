import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  getSettingAdminMemberDetailAction,
  getSettingAdminPermissionAction,
  insertSettingAdminMemberDetailListAction,
  insertSettingAdminPermissionAction,
  updateSettingChangePwAction,
  updateSettingMemberDetailAction,
  updateSettingMemberPwResetAction,
  updateSettingPermissionAction,
} from '@/store/reducers/admin/settingMemberDetailReducer';
import {
  getSettingAdminChangePwApi,
  getSettingAdminMemberDetailApi,
  getSettingAdminPermissionApi,
  updateSettingAdminMemberDetailApi,
  updateSettingAdminMemberPwResetApi,
  updateSettingAdminPermissionApi,
} from '@/api/admin/adminMemberDetailApi';

// 설정 어드민 회원 리스트 saga
function* settingAdminMemberListSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.payload;

    const response = yield call(getSettingAdminMemberDetailApi, id);
    if (response?.success && response?.status === 200) {
      const data = response?.data?.result; // content를 변수에 저장

      yield put(
        insertSettingAdminMemberDetailListAction({
          content: data, // 저장한 content를 action에 전달
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '관리자 상세 데이터 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

//상세 수정
function* updateSettingAdminMemberDetailSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject, callback } = action.payload;
    const response = yield call(updateSettingAdminMemberDetailApi, id, sendObject);

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: response.message || '업데이트가 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      callback.push(`/admin/setting/account-manage`);
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '업데이트 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error(' Error:', e);
  }
}

//상세 수정
function* updateSettingAdminMemberPwResetSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.payload;
    const response = yield call(updateSettingAdminMemberPwResetApi, id);

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '비밀번호 초기화 성공',
          description: response.message || '비밀번호 초기화가 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '업데이트 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error(' Error:', e);
  }
}

// 설정 어드민 회원 리스트 saga
function* settingAdminPermissionSaga(action) {
  try {
    yield put(startLoading());

    const response = yield call(getSettingAdminPermissionApi);
    if (response?.success && response?.status === 200) {
      const data = response?.data?.result; // content를 변수에 저장

      yield put(
        insertSettingAdminPermissionAction({
          content: data, // 저장한 content를 action에 전달
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '관리자 상세 데이터 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

//관리자 권한 수정
function* updateSettingAdminPermissionSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;
    const response = yield call(updateSettingAdminPermissionApi, sendObject);

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: response.message || '관리자 권한 업데이트가 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      callback.push(`/admin/setting/account-manage`);
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '업데이트 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error(' Error:', e);
  }
}

//관리자 권한 수정
function* updateSettingChangePwSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject } = action.payload;
    const response = yield call(getSettingAdminChangePwApi, sendObject);

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: response.message || '비밀번호 변경이 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '업데이트 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error(' Error:', e);
  }
}

export function* settingMemberDetailSaga() {
  yield takeEvery(updateSettingMemberDetailAction, updateSettingAdminMemberDetailSaga);
  yield takeEvery(getSettingAdminPermissionAction, settingAdminPermissionSaga);
  yield takeEvery(getSettingAdminMemberDetailAction, settingAdminMemberListSaga);
  yield takeEvery(updateSettingPermissionAction, updateSettingAdminPermissionSaga);
  yield takeEvery(updateSettingChangePwAction, updateSettingChangePwSaga);
  yield takeEvery(updateSettingMemberPwResetAction, updateSettingAdminMemberPwResetSaga);
}
