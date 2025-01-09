import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { getPointOrderDetailApi, getPointOrderListApi } from '@/api/admin/orderApi';
import {
  getPointOrderDetailAction,
  getPointOrderListAction,
  insertPointOrderDetailAction,
  insertPointOrderListAction,
} from '@/store/reducers/admin/orderPointListReducer';

// 설정 어드민 회원 리스트 saga
function* getPointOrderListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    // yield put(
    //   changeSearchData({
    //     searchText: params.searchText,
    //     startDate: params.startDate,
    //     endDate: params.endDate,
    //     transactionPointListSearchCode: params.transactionPointListSearchCode,
    //     pointProductGroup: params.pointProductGroup,
    //     transactionStatus: params.transactionStatus,
    //   }),
    // );

    const response = yield call(getPointOrderListApi, params);
    if (response.status === 200) {
      const data =
        response?.data?.result?.content?.map((cur, index) => ({
          ...cur,
          key: index + 1, // 각 항목에 고유한 키 부여
        })) || [];
      yield put(
        insertPointOrderListAction({
          content: data,
          pageable: response.data.result.pageable,
          totalElements: response.data.result.totalElements,
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

// 적립금 제품 주문내역 상세
function* getPointOrderDetailSaga(action) {
  const { id, callback, params } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(getPointOrderDetailApi, id, params);
    if (response.status === 200) {
      // pointDetailProductInfo에 key 추가
      response.data.pointDetailProductInfo.forEach((item, index) => {
        item.key = index;
      });

      // pointDetailUpdateInfo에 key 추가 (현재는 빈 배열이지만, 필요시 추가할 수 있어)
      response.data.pointDetailUpdateInfo.forEach((item, index) => {
        item.key = index;
      });
      yield put(insertPointOrderDetailAction({ pointOrderDetail: response.data }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    yield put(
      errorSnackOpen({
        message: '주문내역 상세 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
    callback.push('/admin/order/point-sales');
  }
}

export function* orderPointListSaga() {
  yield takeEvery(getPointOrderListAction, getPointOrderListSaga);
  yield takeEvery(getPointOrderDetailAction, getPointOrderDetailSaga);
}
