import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { changeReservationStatusApi, getReservationListApi } from '@/api/lensly/reservationApi';
import { changeReservationStatusAction, getReservationListAction, insertReservationListAction } from '@/store/reducers/lensly/reservationReducer';
import { closeModal } from '@/store/reducers/modalReducer';

// 예약 리스트 saga
function* getReservationListSaga(action) {
  try {
    yield put(startLoading());

    const { params } = action.payload;

    const response = yield call(getReservationListApi, params);

    if (response?.code === 200) {
      const data = response?.data.reservationList.map(item => {
        return {
          ...item,
          key: item.id,
        };
      });
      yield put(insertReservationListAction({ reservationList: data, paging: response.data.paging }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getReservationListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '예약완료 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 예약 상태 변경 saga
function* changeReservationStatusSaga(action) {
  try {
    yield put(startLoading());

    const { sendObject } = action.payload;

    const response = yield call(changeReservationStatusApi, sendObject);

    if (response.code === 200) {
      yield put(closeModal());
      yield put(
        successSnackOpen({
          message: '예약상태 변경 완료',
          description: response.message,
        }),
      );

      const params = {
        pageSize: 20,
        offset: 1,
        status: sendObject.tab,
      };
      yield put(getReservationListAction({ params }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('changeReservationStatusSaga:::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '배송상태 변경 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

export function* reservationSaga() {
  yield takeEvery(getReservationListAction, getReservationListSaga);
  yield takeEvery(changeReservationStatusAction, changeReservationStatusSaga);
}
