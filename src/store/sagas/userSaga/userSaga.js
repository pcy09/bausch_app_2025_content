// 회원 리스트 saga
import { call, put, takeEvery } from '@redux-saga/core/effects';
import { fetchUserDetailApi, fetchUserListApi, updateManyUserStatusApi, updateUserStatusApi } from '@/api/userApi';
import {
  changeSearch,
  changeTabMenu,
  getUserDetailAction,
  getUserListAction,
  insertUserDetailAction,
  insertUserListAction,
  updateManyUserStatusAction,
  updateUserStatusAction,
} from '@/store/reducers/userReducer';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import dayjs from 'dayjs';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

// 회원 리스트 saga
function* getUserListSaga(action) {
  try {
    yield put(startLoading());

    const { params, findUserStatusCode } = action.payload;

    const response = yield call(fetchUserListApi, params);

    if (response?.code === 200) {
      const data = response?.data.list.reduce(
        (acc, cur, index) =>
          acc.concat({
            ...cur,
            key: cur.id,
            user_register_date: dayjs(cur.user_register_date).format('YYYY-MM-DD'),
            user_modify_date: dayjs(cur.user_modify_date).format('YYYY-MM-DD'),
            user_status_name: findUserStatusCode[cur.user_status],
          }),
        [],
      );
      yield put(insertUserListAction({ list: data, paging: response.data.paging }));
      yield put(
        changeSearch({
          search: {
            searchType: params.searchType,
            searchText: params.searchText,
          },
        }),
      );
    }
  } catch (e) {
    yield put(endLoading());
    console.error('getUserListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '회원 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  } finally {
    yield put(endLoading());
  }
}

// 회원 상세 saga
function* getUserDetailSaga(action) {
  try {
    const response = yield call(fetchUserDetailApi, action.payload.id);

    if (response.code === 200) {
      const detailData = response.data.userDetail;
      const reservationDetails = response.data.reservationDetails;
      const storesInterest = response.data.storesInterest;
      yield put(
        insertUserDetailAction({
          detailData: {
            ...detailData,
            storesInterest,
            reservationDetails,
            user_register_date: dayjs(detailData.user_register_date).format('YYYY-MM-DD'),
            user_modify_date: dayjs(detailData.user_modify_date).format('YYYY-MM-DD'),
          },
        }),
      );
    }
  } catch (e) {
    console.error('getUserDetailSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '관리자 상세 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 회원 상태 업데이트 saga
function* updateUserStatusSaga(action) {
  try {
    const response = yield call(updateUserStatusApi, action.payload.id, action.payload.sendObject);
    if (response.code === 200) {
      const detailData = response.data.userDetail;
      yield put(
        insertUserDetailAction({
          detailData: {
            ...detailData,
            user_register_date: dayjs(detailData.user_register_date).format('YYYY-MM-DD'),
            user_modify_date: dayjs(detailData.user_modify_date).format('YYYY-MM-DD'),
          },
        }),
      );

      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: `${response.message}`,
          placement: 'top',
        }),
      );
    }
  } catch (e) {
    console.error('updateUserStatusSaga::::', e);
    errorSnackOpen({
      message: '상태 업데이트 실패',
      description: '회원 상태 업데이트에 실패하였습니다.',
    });
  }
}

// 회원 상태 업데이트 saga
function* updateManyUserStatusSaga({ payload }) {
  try {
    yield put(startLoading());
    const { sendObject, params, findUserStatusCode } = payload;
    const response = yield call(updateManyUserStatusApi, sendObject);
    if (response.code === 200) {
      yield put(getUserListAction({ params, findUserStatusCode }));

      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: `${response.message}`,
          placement: 'top',
        }),
      );
    }
  } catch (e) {
    yield put(endLoading());
    console.error('updateUserStatusSaga::::', e);
    errorSnackOpen({
      message: '상태 업데이트 실패',
      description: '회원 상태 업데이트에 실패하였습니다.',
    });
  } finally {
    yield put(endLoading());
  }
}

export function* userSaga() {
  yield takeEvery(getUserListAction, getUserListSaga);
  yield takeEvery(getUserDetailAction, getUserDetailSaga);
  yield takeEvery(updateUserStatusAction, updateUserStatusSaga);
  yield takeEvery(updateManyUserStatusAction, updateManyUserStatusSaga);
}
