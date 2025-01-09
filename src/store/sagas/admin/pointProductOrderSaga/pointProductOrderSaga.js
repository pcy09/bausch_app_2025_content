import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { createOrderApi, getPointProductListApi, getSelectStorePointApi, getSellingStoreListApi } from '@/api/admin/orderApi';
import {
  getPointProductOrderDetailSellingStoreAction,
  insertPointProductOrderDetailSellingStoreAction,
  getStorePointAction,
  insertStorePointAction,
  getPointProductListAction,
  insertPointProductListAction,
  createOrderAction,
} from '@/store/reducers/admin/pointProductOrderReducer';
import { snackOpen } from '@/store/reducers/snackReducer';

// 판매 스토어 리스트 호출
function* getPointProductOrderDetailSellingSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};
    const response = yield call(getSellingStoreListApi, params);

    if (response.status === 200) {
      yield put(insertPointProductOrderDetailSellingStoreAction({ sellingStoreList: response.data }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    yield put(
      errorSnackOpen({
        message: '판매 스토어 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
  }
}

// 적립금 스토어 리스트 적립금 saga
function* getStorePointSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action?.payload;
    const response = yield call(getSelectStorePointApi, id);
    if (response.data) {
      const data =
        response?.data?.storePoint?.map((cur, index) => ({
          ...cur,
          key: index + 1, // 각 항목에 고유한 키 부여
        })) || [];
      yield put(
        insertStorePointAction({
          pointStoreData: data,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());

    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '적립금 스토어 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 제품선택 드롭 가져오기
function* getPointProductListSaga(action) {
  const { params } = action.payload;
  const { pointId, pointProductGroupId } = params;
  const getDropData = state => state.pointProductOrder.pointProductList;
  const dropData = yield select(getDropData);
  const getPointData = state => state.pointProductOrder.pointStoreData;
  const pointData = yield select(getPointData);
  function updatePoints(points, newPoints) {
    // 배열에서 동일한 pointId를 가진 객체가 있는지 찾기
    const existingPointCoupon = points.find(point => point.pointId === newPoints.pointId);

    if (existingPointCoupon) {
      // 동일한 pointId가 있으면 해당 객체를 제외하고 나머지만 반환
      return points.filter(point => point.pointId !== newPoints.pointId);
    } else {
      // 동일한 pointId가 없으면 배열에 새 객체를 추가
      return [...points, newPoints];
    }
  }

  try {
    yield put(startLoading());
    const response = yield call(getPointProductListApi, params);
    const dropProductInfoList = response.data.result;
    // pointId가 1인 첫 번째 객체를 find로 추출
    const filteredPointData = pointData.find(point => point.pointId === pointId);
    if (filteredPointData) {
      const { pointName, balance, pointProductGroupId, key, pointId } = filteredPointData;
      const newPoint = {
        pointId,
        pointProductGroupId,
        dropProductInfoList,
        balance,
        pointName,
        key,
      };
      const updatedDropData = updatePoints(dropData, newPoint);
      yield put(
        insertPointProductListAction({
          pointProductList: updatedDropData,
        }),
      );
    } else {
      console.log('포인트 아이디 오류', pointId);
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '판매,증정제품 옵션 가져오기 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 주문 등록 saga
function* createOrderSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(createOrderApi, sendObject);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '주문 등록 성공',
          description: '등록되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/order/point-sales');
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
    if (e.code) {
      yield put(
        errorSnackOpen({
          message: `등록 실패`,
          description: `요청되지 않은 응답값입니다.관리자에게 문의해주세요.`,
        }),
      );
    }
  }
}

export function* pointProductOrderSaga() {
  yield takeEvery(getPointProductOrderDetailSellingStoreAction, getPointProductOrderDetailSellingSaga);
  yield takeEvery(getStorePointAction, getStorePointSaga);
  yield takeEvery(getPointProductListAction, getPointProductListSaga);
  yield takeEvery(createOrderAction, createOrderSaga);
}
