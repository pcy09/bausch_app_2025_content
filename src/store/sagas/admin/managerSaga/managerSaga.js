import { call, put, takeEvery } from '@redux-saga/core/effects';
import { deleteManagerApi, fetchManagerDetailApi, fetchMangerAllList, updateManagerApi } from '@/api/admin/managerApi';
import {
  deleteManagerAction,
  getManagerDetail,
  getManagerList,
  insertManagerDetail,
  insertManagerList,
  managerReset,
  updateManagerAction,
} from '@/store/reducers/admin/managerReducer';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

// 관리자 리스트 saga
function* getManagerListSaga(action) {
  try {
    const response = yield call(fetchMangerAllList, action?.payload?.params);

    if (response?.code === 200) {
      const data = response?.data.list.reduce(
        (acc, cur, index) =>
          acc.concat({
            key: cur.id,
            ...cur,
          }),
        [],
      );
      yield put(insertManagerList({ list: data, paging: response.data.paging }));
    }
  } catch (e) {
    console.error('getManagerListSaga::::', e);
    if (e.response.data) {
      yield put(
        snackOpen({
          type: 'error',
          message: '관리자 리스트 호출 실패',
          description: `${e.response.data.message}`,
          placement: 'top',
        }),
      );
    }
  }
}

// 관리자 상세 saga
function* getManagerDetailSaga(action) {
  try {
    yield put(startLoading());
    const response = yield call(fetchManagerDetailApi, action.payload.id);

    if (response.code === 200) {
      const detailData = response?.data.managerDetail;
      yield put(insertManagerDetail({ detailData }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getManagerDetailSaga::::', e);
    if (e.response.data) {
      yield put(
        snackOpen({
          type: 'error',
          message: '관리자 상세 호출 실패',
          description: `${e.response.data.message}`,
          placement: 'top',
        }),
      );
    }
  }
}

// 관리자 정보 업데이트 saga
function* updateMangerSaga(action) {
  try {
    const response = yield call(updateManagerApi, action.payload.id, action.payload.sendObject);

    if (response.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: `${response.message}`,
          placement: 'top',
        }),
      );
      const detailData = response?.data.managerDetail;
      yield put(insertManagerDetail({ detailData }));
    }
  } catch (e) {
    yield put(
      errorSnackOpen({
        message: '업데이트 실패',
        description: '관리자 정보 업데이트에 실패하였습니다.',
      }),
    );
    console.error('updateMangerSaga::::', e);
  }
}

// 관리자 삭제
function* deleteManagerSaga(action) {
  try {
    const { id, callback } = action.payload;
    const response = yield call(deleteManagerApi, id);

    if (response.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '삭제 성공',
          description: `${response.message}`,
          placement: 'top',
        }),
      );
      callback.push('/account-management');
    }
  } catch (e) {
    console.error('deleteManagerSaga::::', e);
    yield put(
      errorSnackOpen({
        message: '삭제 실패',
        description: '관리자 삭제에 실패하였습니다.',
      }),
    );
  }
}

export function* managerSaga() {
  yield takeEvery(getManagerList, getManagerListSaga);
  yield takeEvery(getManagerDetail, getManagerDetailSaga);
  yield takeEvery(updateManagerAction, updateMangerSaga);
  yield takeEvery(deleteManagerAction, deleteManagerSaga);
}
