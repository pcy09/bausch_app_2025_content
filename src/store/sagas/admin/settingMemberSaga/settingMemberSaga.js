import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  deleteSettingAdminMemberApi,
  deleteSettingIpListApi,
  getSettingAdminIpListApi,
  getSettingAdminLevelDropApi,
  getSettingAdminMemberApi,
  postSettingIpApi,
} from '@/api/admin/adminMeberApi';
import {
  getSettingAdminMemberListAction,
  changeSearchData,
  insertSettingAdminMemberListAction,
  deleteSettingAdminMemberListAction,
  insertSettingAdminMemberLevelDropsAction,
  getSettingAdminMemberLevelDropsAction,
  settingAdminIpListAction,
  insertSettingAdminIpListAction,
  deleteSettingIPListAction,
  createIpAction,
} from '@/store/reducers/admin/settingMemberReducer';

// 설정 어드민 회원 리스트 saga
function* settingAdminMemberListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    yield put(
      changeSearchData({
        searchText: params.searchText,
      }),
    );

    const response = yield call(getSettingAdminMemberApi, params);
    if (response?.success && response?.status === 200) {
      const data =
        response?.data?.result?.map(cur => ({
          key: cur.id,
          ...cur,
        })) || [];
      yield put(
        insertSettingAdminIpListAction({
          content: data,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '스토어 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 설정 어드민 회원 리스트 삭제
function* deleteSettingAdminMemberListSaga(action) {
  try {
    const { ids } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(deleteSettingAdminMemberApi, ids);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '어드민 회원 삭제 완료',
          description: '선택한 어드민 회원 삭제가 되었습니다.',
        }),
      );
      // 제품 삭제 성공시 목록을 새로고침
      yield put(getSettingAdminMemberListAction());
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '어드민 회원 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 설정 어드민 회원 레벨 saga
function* settingAdminMemberLevelDropsSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    const response = yield call(getSettingAdminLevelDropApi, params);
    if (response?.success && response?.status === 200) {
      yield put(
        insertSettingAdminMemberLevelDropsAction({
          level: response?.data?.result,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '레벨 드롭 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 설정 어드민 IP 리스트 saga
function* settingAdminIpListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    const response = yield call(getSettingAdminIpListApi, params);
    console.log('response::::', response);
    if (response?.success && response?.status === 200) {
      const data =
        response?.data?.content?.map(cur => ({
          key: cur.id,
          ...cur,
        })) || [];
      console.log('response?.data::::', response?.data);
      yield put(
        insertSettingAdminIpListAction({
          content: data,
          pageable: response?.data?.pageable,
          totalElements: response?.data?.totalElements,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '어드민 IP 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 설정 어드민 회원 리스트 삭제
function* deleteSettingIPListSaga(action) {
  try {
    const { ids } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(deleteSettingIpListApi, ids);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '어드민 회원 삭제 완료',
          description: '선택한 어드민 회원 삭제가 되었습니다.',
        }),
      );
      // 제품 삭제 성공시 목록을 새로고침
      yield put(settingAdminIpListAction());
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: 'IP 리스트 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// IP등록 saga
function* createIpSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject } = action.payload;

    const response = yield call(postSettingIpApi, sendObject);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: 'IP 등록 성공',
          description: '등록되었습니다.',
          placement: 'top',
        }),
      );
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
          message: `IP 등록 실패`,
          description: `요청되지 않은 응답값입니다. 관리자에게 문의해주세요.`,
        }),
      );
    }
  }
}

export function* settingMemberSaga() {
  yield takeEvery(getSettingAdminMemberListAction, settingAdminMemberListSaga);
  yield takeEvery(settingAdminIpListAction, settingAdminIpListSaga);
  yield takeEvery(getSettingAdminMemberLevelDropsAction, settingAdminMemberLevelDropsSaga);
  yield takeEvery(deleteSettingAdminMemberListAction, deleteSettingAdminMemberListSaga);
  yield takeEvery(createIpAction, createIpSaga);
  yield takeEvery(deleteSettingIPListAction, deleteSettingIPListSaga);
}
