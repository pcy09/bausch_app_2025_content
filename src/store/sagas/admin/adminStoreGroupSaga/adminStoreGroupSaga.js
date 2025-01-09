import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import {
  getStoreGroupDetailListApi,
  getStoreGroupListApi,
  updateStoreGroupDetailAutoOrderStatusApi,
  updateStoreGroupDetailOnceAutoApi,
  updateStoreGroupNameDetailApi,
} from '@/api/admin/storeGroupApi';
import {
  changeSearchData,
  getStoreGroupDetailListAction,
  getStoreGroupListAction,
  insertStoreGroupDetailListAction,
  insertStoreGroupListAction,
  updateStoreGroupDetailAutoOrderStatusAction,
  updateStoreGroupDetailOnceAction,
  updateStoreGroupNameDetailAction,
} from '@/store/reducers/admin/storeGroupReducer';

// 스토어 그룹 리스트 saga
function* adminStoreGroupListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    yield put(
      changeSearchData({
        searchText: params.searchText,
      }),
    );

    const response = yield call(getStoreGroupListApi, params);
    if (response?.success && response?.status === 200) {
      const data =
        response?.data
          ?.reverse() // 데이터를 역순으로 정렬 (최신 데이터가 앞에 오도록)
          .map((cur, index) => ({
            ...cur,
            key: response.data.length - index, // 가장 최신 항목이 가장 큰 key 값을 갖도록 설정
          })) || [];
      yield put(
        insertStoreGroupListAction({
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

// 스토어그룹 상세
function* getStoreGroupDetailSaga(action) {
  try {
    yield put(startLoading());
    const { id, params = {} } = action?.payload;
    const response = yield call(getStoreGroupDetailListApi, id, params);

    if (response.status === 200) {
      const data =
        response?.data?.result?.content?.map((cur, index) => ({
          ...cur,
          key: index + 1, // 각 항목에 고유한 키 부여
        })) || [];
      yield put(
        insertStoreGroupDetailListAction({
          content: data,
          pageable: response.data.result.pageable,
          totalElements: response.data.result.totalElements,
          groupName: response.data.groupName,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getStoreGroupDetailSaga::::', e);
    yield put(
      errorSnackOpen({
        message: '스토어 상세 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
    action.payload.callback.push('/admin/store/manage');
  }
}

function* updateStoreGroupNameDetailSaga(action) {
  try {
    yield put(startLoading());
    const { id, params = {} } = action.payload;

    const response = yield call(updateStoreGroupNameDetailApi, id, params);
    console.log('updateStoreGroupNameDetailSaga response:', response);

    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: response.message || '업데이트가 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      yield put(getStoreGroupDetailListAction({ id }));
    } else {
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
    console.error('updateStoreGroupNameDetailSaga Error:', e);
  }
}

function* updateStoreGroupDetailAutoOrderStatusSaga(action) {
  try {
    yield put(startLoading());
    const { id, params } = action.payload;
    const response = yield call(updateStoreGroupDetailAutoOrderStatusApi, id, params);

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
      yield put(getStoreGroupDetailListAction({ id }));
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
    console.error('updateStoreDeailsSaga Error:', e);
  }
}

function* updateStoreGroupDetailOnceAutoSaga(action) {
  try {
    yield put(startLoading());
    const { id, params } = action.payload;
    console.log('updateStoreGroupDetailOnceAutoSaga::::', params);

    const response = yield call(updateStoreGroupDetailOnceAutoApi, params);

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
      yield put(getStoreGroupDetailListAction({ id }));
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
    console.error('updateStoreDeailsSaga Error:', e);
  }
}

export function* adminStoreGroupSaga() {
  yield takeEvery(getStoreGroupListAction, adminStoreGroupListSaga);
  yield takeEvery(getStoreGroupDetailListAction, getStoreGroupDetailSaga);
  yield takeEvery(updateStoreGroupNameDetailAction, updateStoreGroupNameDetailSaga);
  yield takeEvery(updateStoreGroupDetailAutoOrderStatusAction, updateStoreGroupDetailAutoOrderStatusSaga);
  yield takeEvery(updateStoreGroupDetailOnceAction, updateStoreGroupDetailOnceAutoSaga);
}
