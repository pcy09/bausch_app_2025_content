import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { asyncReturnOrderApi, asyncWebOrderDataApi, getReturnOrderDataApi, getWebOrderDataApi } from '@/api/lensly/webOrderApi';
import {
  asyncReturnOrderAction,
  asyncWebOrderDataAction,
  getReturnOrderDataAction,
  getWebOrderDataAction,
  insertReturnOrderDataAction,
  insertWebOrderDataAction,
} from '@/store/reducers/lensly/webOrderReducer';
import { closeModal } from '@/store/reducers/modalReducer';
import { getReservationListAction } from '@/store/reducers/lensly/reservationReducer';

function* getWebOrderDataSaga(action) {
  try {
    yield put(startLoading());

    const { sendObject } = action.payload;

    const response = yield call(getWebOrderDataApi, sendObject);

    if (response?.code === 200) {
      yield put(
        insertWebOrderDataAction({
          orderHeaderFile: response.data.orderHeaderFile,
          orderDetailFile: response.data.orderDetailFile,
          successData: response.data.successData,
          failData: response.data.failData,
          mappingData: response.data.mappingData,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getWebOrderDataSaga::::', e);
    if (e.response.data) {
      yield put(closeModal());
      yield put(
        errorSnackOpen({
          message: `${e.response.data.message}`,
          description: ``,
        }),
      );
    }
  }
}

function* asyncWebOrderDataSaga(action) {
  try {
    yield put(startLoading());

    const { sendObject } = action.payload;

    const response = yield call(asyncWebOrderDataApi, sendObject);

    if (response?.code === 200) {
      // yield put(insertWebOrderDataAction({ orderHeaderFile: response.data.orderHeaderFile, orderDetailFile: response.data.orderDetailFile }));
      yield put(
        successSnackOpen({
          message: response.message,
          description: '',
        }),
      );
      const params = {
        pageSize: 100,
        offset: 1,
        status: 'R',
      };
      yield put(getReservationListAction({ params }));
      yield put(closeModal());
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('asyncWebOrderDataSaga::::', e);
    if (e.response.data) {
      yield put(closeModal());
      yield put(
        errorSnackOpen({
          message: '웹 오더 동기화 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* getReturnOrderDataSaga(action) {
  try {
    yield put(startLoading());

    const { sendObject } = action.payload;

    const response = yield call(getReturnOrderDataApi, sendObject);

    if (response?.code === 200) {
      yield put(
        insertReturnOrderDataAction({
          returnData: response.data.returnData,
          successData: response.data.successData,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getWebOrderDataSaga::::', e);
    if (e.response.data) {
      yield put(closeModal());
      yield put(
        errorSnackOpen({
          message: `${e.response.data.message}`,
          description: ``,
        }),
      );
    }
  }
}

function* asyncReturnOrderSaga(action) {
  try {
    yield put(startLoading());

    const { sendObject } = action.payload;

    const response = yield call(asyncReturnOrderApi, sendObject);

    if (response?.code === 200) {
      yield put(
        successSnackOpen({
          message: response.message,
          description: '',
        }),
      );
      const params = {
        pageSize: 100,
        offset: 1,
        status: 'RE',
      };
      yield put(getReservationListAction({ params }));
      yield put(closeModal());
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getWebOrderDataSaga::::', e);
    if (e.response.data) {
      yield put(closeModal());
      yield put(
        errorSnackOpen({
          message: `${e.response.data.message}`,
          description: ``,
        }),
      );
    }
  }
}

export function* webOrderSaga() {
  yield takeEvery(getWebOrderDataAction, getWebOrderDataSaga);
  yield takeEvery(asyncWebOrderDataAction, asyncWebOrderDataSaga);
  yield takeEvery(getReturnOrderDataAction, getReturnOrderDataSaga);
  yield takeEvery(asyncReturnOrderAction, asyncReturnOrderSaga);
}
