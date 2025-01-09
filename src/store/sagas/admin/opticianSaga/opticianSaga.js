import { call, put, takeEvery } from '@redux-saga/core/effects';
import { changeSearch, getUserListAction } from '@/store/reducers/userReducer';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import dayjs from 'dayjs';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { getOpticianDetailApi, getOpticianListApi, updateOpticianApi } from '@/api/admin/opticianApi';
import {
  changeSearchData,
  getOpticianDetailAction,
  getOpticianListAction,
  insertOpticianDetailAction,
  insertOpticianListAction,
  updateOpticianAction,
} from '@/store/reducers/admin/opticianReducer';

// 안경원 리스트 saga
function* getOpticianListSaga(action) {
  try {
    yield put(startLoading());

    const { params = {} } = action.payload || {};

    const response = yield call(getOpticianListApi, params);

    if (response?.code === 200) {
      const data = response?.data.opticianList.reduce(
        (acc, cur, index) =>
          acc.concat({
            ...cur,
            key: cur.fiStoreSeq,
            fdRegdate: dayjs(cur.fdRegdate).format('YYYY-MM-DD'),
            store_show_status: cur.store_show_status === 'Y' ? '취급매장' : '미취급매장',
          }),
        [],
      );
      yield put(insertOpticianListAction({ opticianList: data, paging: response.data.paging }));
      yield put(
        changeSearchData({
          searchType: params?.searchType ?? null,
          searchText: params?.searchText ?? null,
          searchInputText: params?.searchInputText ?? null,
          showStatus: params?.showStatus ?? null,
          startDate: params?.startDate ?? null,
          endDate: params?.endDate ?? null,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getOpticianListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '안경원 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 안경원 상세
function* getOpticianDetailSaga(action) {
  const { id, callback, params } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(getOpticianDetailApi, id, params);
    console.log(response);
    if (response.status === 200) {
      yield put(insertOpticianDetailAction({ opticianDetail: response.data.opticianDetail }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getOpticianDetailSaga::::', e);
    yield put(
      errorSnackOpen({
        message: '안경원 상세 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
    callback.push('/optician');
  }
}

// 안경원 수정
function* updateOpticianSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject } = action.payload;
    const response = yield call(updateOpticianApi, id, sendObject);

    if (response.code === 200) {
      yield put(insertOpticianDetailAction({ opticianDetail: response.data.opticianDetail }));
      yield put(
        successSnackOpen({
          message: response.message,
          description: '',
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('updateOpticianSaga::::', e);
    yield put(
      errorSnackOpen({
        message: `${e.response.data.message}`,
        description: `${e.response.data.message}`,
      }),
    );
  }
}

export function* opticianSaga() {
  yield takeEvery(getOpticianListAction, getOpticianListSaga);
  yield takeEvery(getOpticianDetailAction, getOpticianDetailSaga);
  yield takeEvery(updateOpticianAction, updateOpticianSaga);
}
