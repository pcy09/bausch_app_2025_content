import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';

import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import {
  createProductGroupAction,
  getProductGroupListAction,
  insertLenslyProductGroupListAction,
  insertProductGroupListAction,
  productGroupDeleteAction,
  productUpdateAction,
} from '@/store/reducers/admin/productGroupReducer';
import {
  createLenslyProductGroupApi,
  createProductGroupApi,
  deleteLenslyProductGroupApi,
  deleteProductGroupApi,
  getProductGroupListApi,
  getProductLenslyGroupListApi,
  updateLenslyProductGroupApi,
  updateProductGroupApi,
} from '@/api/admin/productApi';

// 제품 그룹 리스트(bausch, lensly)
function* getProductGroupListSaga(action) {
  try {
    yield put(startLoading());

    const { tabTypes } = action.payload;

    const apiMap = {
      BAUSCH: getProductGroupListApi,
      LENSLY: getProductLenslyGroupListApi,
    };

    const response = yield call(apiMap[tabTypes]);

    if (response && response.status === 200) {
      const productGroupList = response?.data.productGroupDetail;

      if (tabTypes === 'BAUSCH') {
        yield put(insertProductGroupListAction({ productBauschGroupList: productGroupList }));
      } else if (tabTypes === 'LENSLY') {
        yield put(insertLenslyProductGroupListAction({ productLenslyGroupList: productGroupList }));
      }
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('productgroupList::::', e);
    if (e) {
      yield put(
        errorSnackOpen({
          message: '제품 그룹 리스트 호출 실패',
          description: `${e.response?.message || 'Unknown error'}`,
        }),
      );
    }
  }
}

// 제품 그룹 등록
function* createProductGroupSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, activeKey } = action.payload;

    const apiMap = {
      BAUSCH: createProductGroupApi,
      LENSLY: createLenslyProductGroupApi,
    };

    const response = yield call(apiMap[activeKey], sendObject);

    if (response.status === 200) {
      const apiMap = {
        BAUSCH: getProductGroupListApi,
        LENSLY: getProductLenslyGroupListApi,
      };
      const listResponse = yield call(apiMap[activeKey]);

      const productGroupList = listResponse?.data?.productGroupDetail;

      if (activeKey === 'BAUSCH') {
        yield put(insertProductGroupListAction({ productBauschGroupList: productGroupList }));
      } else if (activeKey === 'LENSLY') {
        yield put(insertLenslyProductGroupListAction({ productLenslyGroupList: productGroupList }));
      }

      yield put(
        successSnackOpen({
          message: '제품 그룹 등록 완료',
          description: '제품 그룹이 등록되었습니다.',
        }),
      );
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

// 제품 그룹 삭제
function* deleteProductGroupSaga(action) {
  try {
    const { productGroupId } = action.payload.sendObject;

    const { activeKey } = action.payload;

    yield put(startLoading());

    const apiMap = {
      BAUSCH: deleteProductGroupApi,
      LENSLY: deleteLenslyProductGroupApi,
    };

    const response = yield call(apiMap[activeKey], productGroupId);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '제품 그룹 삭제 성공',
          description: '선택한 제품 그룹이 삭제 되었습니다.',
        }),
      );

      // 제품 삭제 성공시 목록을 새로고침
      yield put(getProductGroupListAction({ tabTypes: activeKey }));
    } else {
      yield put(
        errorSnackOpen({
          message: '제품 그룹 삭제 실패',
          description: response.message,
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '제품 그룹 삭제 실패',
          description: `${e?.response?.message}`,
        }),
      );
    }
  }
}

// 제품 그룹 업데이트 수정
function* updateProductGroupSaga(action) {
  try {
    yield put(startLoading());
    const { id, activeKey, sendObject } = action.payload;

    const apiMap = {
      BAUSCH: updateProductGroupApi,
      LENSLY: updateLenslyProductGroupApi,
    };
    const response = yield call(apiMap[activeKey], id, sendObject);

    // const response = yield call(updateProductGroupApi, id, sendObject);

    if (response && response.status === 200) {
      yield put(
        successSnackOpen({
          message: '제품 그룹명 업데이트',
          description: '제품 그룹명 업데이트 성공',
        }),
      );
      // 제품 업데이트 성공시 목록을 새로고침
      yield put(getProductGroupListAction({ tabTypes: activeKey }));
    } else {
      yield put(
        errorSnackOpen({
          message: '제품 그룹명 업데이트 실패',
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
          message: '제품 그룹명 업데이트 실패',
          description: `${e.response.message}`,
        }),
      );
    }
  }
}

export function* productGroupSaga() {
  yield takeEvery(getProductGroupListAction, getProductGroupListSaga);
  yield takeEvery(createProductGroupAction, createProductGroupSaga);
  yield takeEvery(productGroupDeleteAction, deleteProductGroupSaga);
  yield takeEvery(productUpdateAction, updateProductGroupSaga);
}
