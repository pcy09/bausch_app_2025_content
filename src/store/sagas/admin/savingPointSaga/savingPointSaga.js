import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  createSavingPointAction,
  deleteSavingPointAction,
  getSavingPointAction,
  getSavingPointDetailAction,
  insertSavingPointAction,
  insertSavingPointDetail,
  updateSavingPointDetailAction,
} from '@/store/reducers/admin/savingPointReducer';
import {
  createSavingPointApi,
  deleteSavingPointApi,
  getSavingPointDetailApi,
  getSavingPointListApi,
  updateSavingPointDetailApi,
} from '@/api/admin/savingPointApi';

//  적립금 리스트
function* getSavingPointListSaga() {
  try {
    yield put(startLoading());

    const response = yield call(getSavingPointListApi);

    if (response.status === 200) {
      const pointProductGroup = response.data.pointProductGroup;
      yield put(insertSavingPointAction({ pointProductGroup: pointProductGroup }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('productgroupList::::');
    if (e) {
      yield put(
        errorSnackOpen({
          message: '적립금 리스트 호출 실패',
          description: `${e.response?.message || 'Unknown error'}`,
        }),
      );
    }
  }
}

// 적립금  등록
function* createProductGroupSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(createSavingPointApi, sendObject);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '적립금 등록 완료',
          description: '적립금이 등록되었습니다.',
        }),
      );
      callback.push('/admin/point/manage');
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
    console.error('sendNextStepSaga::::');
    if (e.response) {
      yield put(
        errorSnackOpen({
          message: `${e.response.message}`,
          description: `${e.response.message}`,
        }),
      );
    }
  }
}

// 적립금 삭제
function* deleteSavingPointSaga(action) {
  try {
    const { savingPointId } = action.payload.sendObject;

    yield put(startLoading());

    const response = yield call(deleteSavingPointApi, savingPointId);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '적립금 삭제 성공',
          description: '선택한 적립금 목록이 삭제 되었습니다.',
        }),
      );

      // 적립금 삭제 성공시 목록을 새로고침
      yield put(getSavingPointAction());
    } else if (response.status === 400 || response.status === 204) {
      yield put(
        errorSnackOpen({
          message: '적립금 삭제 실패',
          description: `${response.message}`,
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '적립금 삭제 실패',
          description: `${e?.response?.message}`,
        }),
      );
    }
  }
}

// 적립금 상세 saga
function* getSavingPointDetailSaga(action) {
  const { id } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(getSavingPointDetailApi, id);

    if (response.status === 200) {
      const pointProductDetail = response?.data.pointProductDetail;

      yield put(insertSavingPointDetail({ pointProductDetail }));
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

// 적립금 업데이트 수정
function* updateSavingPointSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject, callback } = action.payload;

    const response = yield call(updateSavingPointDetailApi, id, sendObject);

    if (response && response.status === 200) {
      yield put(
        successSnackOpen({
          message: '적립금 상세 업데이트',
          description: '적립금 상세 업데이트 성공',
        }),
      );
      callback.push('/admin/point/manage');
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
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '적립금 상세 업데이트 실패',
          description: `${e.response.message}`,
        }),
      );
    }
  }
}

export function* savingPointSaga() {
  yield takeEvery(getSavingPointAction, getSavingPointListSaga);
  yield takeEvery(createSavingPointAction, createProductGroupSaga);
  yield takeEvery(deleteSavingPointAction, deleteSavingPointSaga);
  yield takeEvery(getSavingPointDetailAction, getSavingPointDetailSaga);
  yield takeEvery(updateSavingPointDetailAction, updateSavingPointSaga);
}
