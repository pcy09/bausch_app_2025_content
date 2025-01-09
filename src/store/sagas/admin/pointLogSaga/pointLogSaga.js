import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';

import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { changePointLogSearchData, getPointLogListAction, insertPointLogListAction } from '../../../reducers/admin/pointLogReducer';
import { getPointLogListApi } from '../../../../api/admin/pointLogApi';

// 제품 리스트
function* getPointLogListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    yield put(
      changePointLogSearchData({
        searchCode: params.searchCode,
        pointProductGroupName: params.pointProductGroupName,
        startDate: params.startDate,
        searchText: params.searchText,
        endDate: params.endDate,
      }),
    );
    const response = yield call(getPointLogListApi, params);

    if (response.status === 200) {
      yield put(
        insertPointLogListAction({
          content: response.data.result.content,
          pageable: response.data.result.pageable,
          totalElements: response.data.result.totalElements,
        }),
      );
    } else if (response?.status === 204) {
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

    if (e) {
      yield put(
        errorSnackOpen({
          message: '적립금 내역 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

export function* pointLogSaga() {
  yield takeEvery(getPointLogListAction, getPointLogListSaga);
}
