import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { changeOrderSearchData, getOrderListAction, insertOrderListAction, webOrderActiveAction } from '@/store/reducers/admin/orderReducer';
import { getOrderListApi, webOrderApplicationApi, webOrderRequestApi } from '@/api/admin/orderApi';

// 주문 오더관리 리스트 saga
function* getOrderListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    yield put(
      changeOrderSearchData({
        searchText: params.searchText,
        startDate: params.startDate,
        endDate: params.endDate,
        productType: params.productType,
        couponType: params.couponType,
        pointGroupName: params.pointGroupName,
        transactionPendingSearchCond: params.transactionPendingSearchCond,
        pendingSearchValue: params.pendingSearchValue,
        transactionPendingSearchCond: params.transactionPendingSearchCond,
        completedSearchValue: params.completedSearchValue,
      }),
    );

    const response = yield call(getOrderListApi, params);

    if (response?.success && response?.status === 200) {
      const data = response?.data.list.reduce((acc, cur, index) => {
        return acc.concat({
          ...cur,
          key: cur.transactionProductId,
        });
      }, []);

      yield put(
        insertOrderListAction({
          transactionListData: data,
        }),
      );
    } else if (response.status === 400) {
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

    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '주문 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* webOrderActiveSaga(action) {
  console.log(action, 'action weborder');
  try {
    const { sendObject } = action.payload;

    console.log(sendObject.isStopOrder, 'sendObject');

    yield put(startLoading());
    const response = yield call(webOrderRequestApi, sendObject);

    const successMessage = sendObject.isStopOrder ? '거래중지 오더 신청 완료' : '웹 오더 신청 완료';
    const successDescription = sendObject.isStopOrder ? '거래중지 오더 신청이 완료되었습니다.' : '웹 오더 신청이 완료되었습니다.';
    const errorMessage = sendObject.isStopOrder ? '거래중지 오더 신청 실패' : '웹 오더 신청 실패';
    const errorDescription = sendObject.isStopOrder ? '거래중지 오더 신청이 실패하였습니다' : '웹 오더 신청이 실패하였습니다';

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: successMessage,
          description: successDescription,
        }),
      );

      const params = {
        orderStatus: 'ORDER_PENDING',
      };

      yield put(getOrderListAction({ params }));
    } else if (response.status === 400) {
      yield put(
        errorSnackOpen({
          message: response.message,
          description: response.message,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: errorMessage,
          description: errorDescription,
        }),
      );
    }
  }
}

export function* adminOrderSaga() {
  yield takeEvery(getOrderListAction, getOrderListSaga);
  yield takeEvery(webOrderActiveAction, webOrderActiveSaga);
}
