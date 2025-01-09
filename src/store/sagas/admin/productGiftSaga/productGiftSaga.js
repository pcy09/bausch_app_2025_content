import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  createProductBauschGiftAction,
  deleteProductBauschGiftAction,
  getProductBauschGiftListAction,
  insertProductBauschGiftListAction,
  insertProductLenslyGiftListAction,
} from '@/store/reducers/admin/productGiftReducer';
import {
  giftLenslyProductCreateApi,
  giftLenslyProductDeleteApi,
  giftLenslyProductListApi,
  giftProductCreateApi,
  giftProductDeleteApi,
  giftProductListApi,
} from '@/api/admin/productApi';

//증정 제품 리스트(공통)
function* getProductBauschGiftListSaga(action) {
  try {
    yield put(startLoading());

    const { tabType } = action.payload;

    const apiMap = {
      bausch: giftProductListApi,
      lensly: giftLenslyProductListApi,
    };

    const response = yield call(apiMap[tabType]);

    if (response.status === 200) {
      if (tabType === 'bausch') {
        const productBauschGiftList = response?.data.giftProducts;
        yield put(insertProductBauschGiftListAction({ productBauschGiftList }));
      } else if (tabType === 'lensly') {
        const productLenslyGiftList = response?.data.giftProducts;
        yield put(insertProductLenslyGiftListAction({ productLenslyGiftList }));
      }
    } else {
      yield put(
        errorSnackOpen({
          message: '증정 제품 리스트 조회 실패',
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
          message: '증정 제품 리스트 호출 실패',
          description: `증정 제품 리스트 호출에 실패하였습니다.`,
        }),
      );
    }
  }
}

// 증정 제품 등록
function* createBauschProductGiftSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, activeTab } = action.payload;

    const apiCreateMap = {
      bausch: giftProductCreateApi,
      lensly: giftLenslyProductCreateApi,
    };

    const response = yield call(apiCreateMap[activeTab], sendObject);

    const apiMap = {
      bausch: giftProductListApi,
      lensly: giftLenslyProductListApi,
    };

    if (response.status === 200) {
      const listResponse = yield call(apiMap[activeTab]);
      const productBauschGiftList = listResponse?.data?.giftProducts;

      if (activeTab === 'bausch') {
        yield put(insertProductBauschGiftListAction({ productBauschGiftList }));
      } else if (activeTab === 'lensly') {
        yield put(insertProductLenslyGiftListAction({ productBauschGiftList }));
      }

      yield put(
        successSnackOpen({
          message: response.message,
          description: '증정 제품 등록에 성공하였습니다.',
        }),
      );
      yield put(getProductBauschGiftListAction({ tabType: activeTab }));
    } else {
      yield put(
        errorSnackOpen({
          message: '증정 제품 등록 실패',
          description: response.message,
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());

    if (e.response) {
      yield put(
        errorSnackOpen({
          message: `증정 제품 등록 실패`,
          description: `증정 제품 등록에 실패하였습니다.`,
        }),
      );
    }
  }
}

// 증정제품 삭제
function* deleteGiftBauschProductSaga(action) {
  try {
    const { id, activeTab } = action.payload;

    yield put(startLoading());

    const apiMap = {
      bausch: giftProductDeleteApi,
      lensly: giftLenslyProductDeleteApi,
    };

    const response = yield call(apiMap[activeTab], id);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '증정제품 삭제 완료',
          description: '선택한 증정제품이 삭제 되었습니다.',
        }),
      );

      // 증정 제품 삭제 성공시 목록을 새로고침
      yield put(getProductBauschGiftListAction({ tabType: activeTab }));
    } else {
      yield put(
        errorSnackOpen({
          message: '증정 제품 삭제 실패',
          description: response.message,
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::');
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '증정제품 삭제 실패',
          description: `증정제품 삭제에 실패하였습니다.`,
        }),
      );
    }
  }
}

export function* productGiftSaga() {
  yield takeEvery(getProductBauschGiftListAction, getProductBauschGiftListSaga);
  yield takeEvery(createProductBauschGiftAction, createBauschProductGiftSaga);
  yield takeEvery(deleteProductBauschGiftAction, deleteGiftBauschProductSaga);
}
