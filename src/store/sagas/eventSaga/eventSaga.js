import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import {
  deleteEventAction,
  evenDetailtSelectListAction,
  eventInsertAction,
  eventInterestProductAction,
  getEventDetailAction,
  getEventListAction,
  insertEventDetailAction,
  insertEventListAction,
  registerEventAction,
  updateAllUsingImageListAction,
  updateEventDetailAction,
} from '@/store/reducers/eventReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import {
  InterestEventProduct,
  deleteEventApi,
  getEventDetailApi,
  getEventListApi,
  interestEventProduct,
  interestEventProductApi,
  registerEventApi,
  updateEventApi,
} from '@/api/eventApi';
import { transDate } from '@/common/utiles';

// 이벤트 리스트 Saga
function* getEventListSaga(action) {
  try {
    yield put(startLoading());
    const { params, findEventStatusCode, findShowStatusCode } = action.payload;
    const response = yield call(getEventListApi, params);

    if (response.code === 200) {
      const data = response.data.eventList.reduce(
        (acc, cur) =>
          acc.concat({
            key: cur.id,
            index: cur.id,
            event_title: cur.event_title,
            event_start_date: transDate(cur.event_start_date, 'YYYY-MM-DD'),
            event_end_date: transDate(cur.event_end_date, 'YYYY-MM-DD'),
            event_register_date: transDate(cur.event_start_date, 'YYYY-MM-DD'),
            event_status: findEventStatusCode[cur.event_status],
            event_show_status: findShowStatusCode[cur.event_show_status],
          }),
        [],
      );
      yield put(insertEventListAction({ eventList: data, paging: response.data.paging }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이벤트 등록 saga
function* registerEventSaga(action) {
  try {
    yield put(startLoading());
    // yield put(eventReset());
    const { sendObject, callback } = action.payload;

    const response = yield call(registerEventApi, sendObject);

    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '이벤트 등록 성공',
          description: '',
          placement: 'top',
        }),
      );
      const eventDetail = response.data?.eventDetail;
      const usingImageList = response.data?.usingImageList;
      yield put(insertEventDetailAction({ eventDetail }));
      yield put(updateAllUsingImageListAction({ usingImageList }));

      callback.push('/events');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이벤트 등록 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이벤트 업데이트
function* updateEventDetailSaga(action) {
  try {
    yield put(startLoading());

    const { sendObject, id, callback } = action.payload;

    const response = yield call(updateEventApi, sendObject, id);

    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '이벤트 업데이트 성공',
          description: '',
          placement: 'top',
        }),
      );
      const eventDetail = response.data?.eventDetail;
      const usingImageList = response.data?.usingImageList;
      yield put(insertEventDetailAction({ eventDetail }));
      yield put(updateAllUsingImageListAction({ usingImageList }));

      callback.push('/events');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이벤트 정보수정 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이벤트 상세
function* getEventDetailSaga(action) {
  try {
    yield put(startLoading());
    const response = yield call(getEventDetailApi, action.payload.id);

    if (response.code === 200) {
      const eventDetail = response.data?.eventDetail;
      const usingImageList = response.data?.usingImageList;
      const eventSelectDetailList = response.data?.eventSelectDetailList;
      yield put(insertEventDetailAction({ eventDetail }));
      yield put(updateAllUsingImageListAction({ usingImageList }));
      yield put(evenDetailtSelectListAction({ eventSelectDetailList }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    action.payload.callback.push('/events');
    console.error('getEventDetailSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이벤트 상세 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이벤트 삭제
function* deleteEventSaga(action) {
  try {
    const { id, callback } = action.payload;
    yield put(startLoading());
    const response = yield call(deleteEventApi, id);

    if (response.code === 200) {
      successSnackOpen({
        message: '이벤트 삭제',
        description: `${response.message}`,
      });

      callback.push('/events');
    }
  } catch (e) {
    action.payload.callback.push('/events');
    console.error('deleteEventSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이벤트 상세 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이벤트 관심 상품
function* eventInterestProductSaga() {
  try {
    yield put(startLoading());
    const response = yield call(interestEventProductApi);

    yield put(endLoading());

    if (response.code === 200) {
      const data = response?.data?.eventSelectList;

      yield put(eventInsertAction({ eventSelectList: data }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(errorSnackOpen({ message: '관심상품 호출 실패', description: `${e.response.data.message}` }));
    }
  }
}

export function* eventSaga() {
  yield takeEvery(registerEventAction, registerEventSaga);
  yield takeEvery(getEventDetailAction, getEventDetailSaga);
  yield takeEvery(updateEventDetailAction, updateEventDetailSaga);
  yield takeEvery(getEventListAction, getEventListSaga);
  yield takeEvery(deleteEventAction, deleteEventSaga);
  yield takeEvery(eventInterestProductAction, eventInterestProductSaga);
}
