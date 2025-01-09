import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { getPickupGuideAction, insetPickupGuideDataAction, pickupGuideReset, registerPickupGuideAction } from '@/store/reducers/pickupGuideReducer';
import { getPickupGuideContentApi, registerPickupGuideApi } from '@/api/admin/supportApi';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

// 픽업가이드 조회 saga
function* getPickupGuideSaga() {
  try {
    yield put(startLoading());
    const response = yield call(getPickupGuideContentApi);
    if (response?.code === 200) {
      const { pickupContent, usingImagesList } = response.data;
      yield put(
        insetPickupGuideDataAction({
          pickupData: {
            id: pickupContent?.id ?? null,
            pickupContent: pickupContent?.pick_guide_content ?? null,
          },
          imageList: {
            usingImageList: usingImagesList ?? [],
            deletedImageList: [],
          },
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getManagerListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '팍업가이드 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 픽업가이드 등록 및 수정 saga
function* registerPickupGuidSaga(action) {
  try {
    yield put(startLoading());
    yield put(pickupGuideReset());

    const response = yield call(registerPickupGuideApi, action.payload.sendObject);

    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '픽업가이드 업데이트 성공',
          description: '',
          placement: 'top',
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '팍업가이드 정보수정 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

export function* pickupGuideSaga() {
  yield takeEvery(getPickupGuideAction, getPickupGuideSaga);
  yield takeEvery(registerPickupGuideAction, registerPickupGuidSaga);
}
