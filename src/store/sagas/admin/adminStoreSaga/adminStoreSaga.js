import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import {
  getStoreDetailApi,
  getStoreDetailOpticianApi,
  getStoreDetailPointApi,
  getStoreDetailPointModalApi,
  getStoreListApi,
  postStoreDetailPointCreateApi,
  updateStoreDetailApi,
  updateStoreDetailPointApi,
} from '@/api/admin/storeApi';
import {
  changeSearchData,
  getPointDetailPopupAction,
  getStoreDetailAction,
  getStoreDetailOpticianAction,
  getStoreDetailPointAction,
  getStoreListAction,
  insertPointDetailPopupAction,
  insertStoreDetailAction,
  insertStoreDetailOpticianAction,
  insertStoreDetailPointAction,
  insertStoreListAction,
  postStoreDetailPointCreateAction,
  updateStoreDetailAction,
  updateStoreDetailPointAction,
} from '@/store/reducers/admin/storeReducer';
import dayjs from 'dayjs';

// 스토어 리스트 saga
function* getStoreListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    if (params.storeType === null) {
      delete params.storeType;
    }
    // Handle potential null values for params
    yield put(
      changeSearchData({
        searchText: params.searchText,
        startDate: params.startDate,
        endDate: params.endDate,
        storeType: params.storeType,
        storeGroup: params.storeGroup,
        lenslyStatus: params.lenslyStatus,
        autoOrderStatus: params.autoOrderStatus,
        storeLocation: params.storeLocation,
      }),
    );

    const response = yield call(getStoreListApi, params);

    if (response?.success && response?.status === 200) {
      const data =
        response?.data?.content?.map(cur => ({
          ...cur,
          key: cur.storeId,
          storeRegDate: dayjs(cur.storeRegDate).format('YYYY-MM-DD'),
        })) || [];

      const pageable = response.data.pageable;

      yield put(
        insertStoreListAction({
          content: data,
          pageable: response.data.pageable,
          totalElements: response.data.totalElements,
        }),
      );
    } else {
      yield put(
        errorSnackOpen({
          message: '스토어 리스트 호출 실패',
          description: `${response.message}`,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getStoreListSaga::::', e);
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

// 스토어 상세
function* getStorenDetailSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.payload;
    const response = yield call(getStoreDetailApi, id);
    if (response.status === 200) {
      yield put(insertStoreDetailAction({ storeDetailData: response.data.storeDetailData, appStoreHistories: response.data.appStoreHistories }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getOpticianDetailSaga::::', e);
    yield put(
      errorSnackOpen({
        message: '스토어 상세 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
    action.payload.callback.push('/admin/store/manage');
  }
}

function* getStorenDetailOpticianSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.payload;
    const response = yield call(getStoreDetailOpticianApi, id);

    if (response.status === 200) {
      yield put(insertStoreDetailOpticianAction({ storeOpticianList: response.data.storeOpticianList }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getOpticianDetailSaga::::', e);
    yield put(
      errorSnackOpen({
        message: '스토어 상세 안경원 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
    action.payload.callback.push('/admin/store');
  }
}

// 스토어 리스트 적립금 saga
function* getStoreDetailPointSaga(action) {
  try {
    yield put(startLoading());
    const { params } = action?.payload;

    const response = yield call(getStoreDetailPointApi, params);

    const data = response; // response.data 대신 response 직접 사용

    if (data?.pointList?.content) {
      yield put(
        insertStoreDetailPointAction({
          pointList: response.pointList.content,
          pageable: response.pointList.pageable,
          totalElements: response.pointList.totalElements,
          pointGroups: response.pointGroups,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getStoreDetailPointSagagetStoreDetailPointSaga::::', e);
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

// 적립금 적립/차감하기
function* postStoreDetailPointCreateSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject } = action.payload;

    const response = yield call(postStoreDetailPointCreateApi, id, sendObject);
    if (response?.status === 200) {
      yield put(
        successSnackOpen({
          type: 'success',
          message: '적립금 등록 성공',
          description: response.message,
          placement: 'top',
        }),
      );
      // 적립금 등록이 성공하면 적립금 상세 리스트를 다시 불러옴
      yield put(getStoreDetailPointAction({ params: { storeId: id } }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('Saga error:', e);

    const errorMessage = e.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: '적립금 등록 실패',
        description: errorMessage,
      }),
    );
  }
}
function* updateStoreDeailsSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject, callback } = action.payload;
    const response = yield call(updateStoreDetailApi, id, sendObject);
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
      callback.push('/admin/store/manage');
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

// 적립금 상세 get
function* getPointDetailPopupSaga(action) {
  try {
    yield put(startLoading());
    const { id, callback } = action.payload;
    const response = yield call(getStoreDetailPointModalApi, id);

    if (response) {
      yield put(insertPointDetailPopupAction({ pointDetailData: response.pointDetailData }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getPointDetailPopupSaga 에러::::', e);
    yield put(
      errorSnackOpen({
        message: '스토어 상세 리스트 호출 실패',
        description: `${e.response?.data?.message || 'Unknown error'}`,
      }),
    );
    action.payload.callback.push('/admin/store/manage');
  }
}

function* updateStoreDetailPointSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject } = action.payload;
    const response = yield call(updateStoreDetailPointApi, sendObject);

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

export function* adminStoreSaga() {
  yield takeEvery(getStoreListAction, getStoreListSaga);
  yield takeEvery(getStoreDetailAction, getStorenDetailSaga);
  yield takeEvery(getStoreDetailOpticianAction, getStorenDetailOpticianSaga);
  yield takeEvery(getStoreDetailPointAction, getStoreDetailPointSaga);
  yield takeEvery(postStoreDetailPointCreateAction, postStoreDetailPointCreateSaga);
  yield takeEvery(updateStoreDetailAction, updateStoreDeailsSaga);
  yield takeEvery(getPointDetailPopupAction, getPointDetailPopupSaga);
  yield takeEvery(updateStoreDetailPointAction, updateStoreDetailPointSaga);
}
