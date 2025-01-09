import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import {
  bannerReset,
  deleteBannerAction,
  getBannerListAction,
  insertBannerListAction,
  registerBannerAction,
  updateBannerAction,
  updateThumbnailAction,
} from '@/store/reducers/bannerReducer';
import { deleteBannerApi, getBannerListApi, registerBannerApi, updateBannerApi, updateThumbnailApi } from '@/api/lensly/bannerApi';
import { closeDrawer } from '@/store/reducers/modalReducer';

// 배너 리스트 saga
function* getBannerListSaga() {
  try {
    yield put(startLoading());
    const response = yield call(getBannerListApi);
    if (response?.code === 200) {
      const bannerList = response?.data?.bannerList;
      yield put(insertBannerListAction({ bannerList }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '배너리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}
// 배너 등록 saga
function* registerBannerSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject } = action.payload;
    const response = yield call(registerBannerApi, sendObject);
    if (response?.code === 200) {
      yield put(
        successSnackOpen({
          message: '배너 등록 성공',
          description: '',
        }),
      );
      yield put(closeDrawer());
      yield put(getBannerListAction());
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '배너 등록 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}
// 배너 삭제
function* deleteBannerSaga(action) {
  try {
    const { sendObject } = action.payload;
    yield put(startLoading());
    const response = yield call(deleteBannerApi, sendObject);
    if (response?.code === 200) {
      yield put(
        successSnackOpen({
          message: '배너 삭제 완료',
          description: '',
        }),
      );
      yield put(getBannerListAction());
    }
    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '배너 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}
// 배너 정보(이미지 제외) 수정
function* updateBannerSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject } = action.payload;
    const response = yield call(updateBannerApi, sendObject);

    if (response?.code === 200) {
      yield put(
        successSnackOpen({
          message: '배너 수정 성공',
          description: '',
        }),
      );
      yield put(getBannerListAction());
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '배너 수정 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 배너 이미지 수정
function* updateThumbnailSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject } = action.payload;
    const response = yield call(updateThumbnailApi, sendObject);

    if (response?.code === 200) {
      yield put(
        successSnackOpen({
          message: '배너 이미지 수정 성공',
          description: '',
        }),
      );
      yield put(getBannerListAction());
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '배너 이미지 수정 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}
export function* bannerSaga() {
  yield takeEvery(getBannerListAction, getBannerListSaga);
  yield takeEvery(registerBannerAction, registerBannerSaga);
  yield takeEvery(deleteBannerAction, deleteBannerSaga);
  yield takeEvery(updateBannerAction, updateBannerSaga);
  yield takeEvery(updateThumbnailAction, updateThumbnailSaga);
}
