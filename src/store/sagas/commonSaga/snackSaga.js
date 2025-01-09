import { delay, takeEvery } from '@redux-saga/core/effects';
import { notification } from 'antd';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';

const openNotification = (type, message, description, placement) => {
  notification[type]({ message, description, placement });
};
function* showSnackBarSaga({ payload }) {
  try {
    yield delay(100);
    const { type, message, description, placement } = payload;
    openNotification(type, message, description, placement);
  } catch (e) {
    console.error(e);
  }
}

function* successSnackHandlerSaga({ payload }) {
  try {
    yield delay(100);
    const { message, description } = payload;
    openNotification('success', message, description, 'top');
  } catch (e) {
    console.error(e);
  }
}

function* errorSnackHandlerSaga({ payload }) {
  try {
    yield delay(100);
    const { message, description } = payload;
    openNotification('error', message, description, 'top');
  } catch (e) {
    console.error(e);
  }
}

export function* snackSaga() {
  yield takeEvery(snackOpen, showSnackBarSaga);
  yield takeEvery(successSnackOpen, successSnackHandlerSaga);
  yield takeEvery(errorSnackOpen, errorSnackHandlerSaga);
}
