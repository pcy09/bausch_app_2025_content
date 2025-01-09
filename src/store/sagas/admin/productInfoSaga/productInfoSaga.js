import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';

import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  deleteProductInfoApi,
  getProductInfoLenslyListApi,
  getProductInfoListApi,
  updateProductInfoExposedApi,
} from '../../../../api/admin/productInfoApi';
import {
  changeInfoSearchData,
  createProductInfoAction,
  createProductLenslyInfoAction,
  deleteEditorImageAction,
  getProductInfoListAction,
  insertProductInfoListAction,
  productInfoDeleteBauschAction,
  updateProductInfoAction,
  updateProductInfoExposedAction,
  updateProductLenslyInfoAction,
} from '@/store/reducers/admin/productBauschInfoReducer';
import {
  createProductInfoApi,
  createProductLenslyInfoApi,
  deleteEditorImageApi,
  deleteEditorLenslyImageApi,
  getProductInfoDetailApi,
  getProductLenslyInfoDetailApi,
  updateProductInfoApi,
  updateProductLenslyInfoApi,
} from '@/api/admin/productApi';
import { getProductInfoLenslyListAction, insertProductInfoLenslyListAction } from '@/store/reducers/admin/productLenslyReducer';
import {
  getProductDetailAction,
  getProductInfoDetailAction,
  getProductInfoLenslyDetailAction,
  insertProductDetailAction,
  insertProductInfoDetailAction,
  insertProductInfoLenslyDetailAction,
} from '@/store/reducers/admin/productReducer';

// 상품 정보 리스트(bausch)
function* getProductInfoListSaga(action) {
  try {
    yield put(startLoading());
    const { params, getValueObject, tabStatus } = action.payload;

    yield put(
      changeInfoSearchData({
        searchCode: params.salesStatus,
        searchText: params.searchProductName,
      }),
    );
    const response = yield call(getProductInfoListApi, params);

    if (response.status === 200) {
      const data = response?.data.content.reduce((acc, cur, index) => {
        return acc.concat({
          ...cur,
          key: cur.productInfoId,
        });
      }, []);

      yield put(insertProductInfoListAction({ content: data, pageable: response.data.pageable, totalElements: response.data.totalElements }));
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

    if (e) {
      yield put(
        errorSnackOpen({
          message: '제품 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}
// 상품 정보 리스트 (Lensly)
function* getProductInfoLenslyListSaga(action) {
  try {
    yield put(startLoading());
    const { params, getValueObject, tabStatus } = action.payload;

    yield put(
      changeInfoSearchData({
        searchCode: params.salesStatus,
        searchText: params.searchProductName,
      }),
    );
    const response = yield call(getProductInfoLenslyListApi, params);

    if (response.status === 200) {
      const data = response?.data.content.reduce((acc, cur, index) => {
        return acc.concat({
          ...cur,
          key: cur.productInfoId,
        });
      }, []);

      yield put(insertProductInfoLenslyListAction({ content: data, pageable: response.data.pageable, totalElements: response.data.totalElements }));
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

    if (e) {
      yield put(
        errorSnackOpen({
          message: '제품 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 제품 정보 삭제
function* deleteProductInfoSaga(action) {
  try {
    const { ids, tabStatus } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(deleteProductInfoApi, action.payload.sendObject);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '제품 정보 삭제 완료',
          description: '선택한 제품 정보가 삭제 되었습니다.',
        }),
      );

      // 페이지 새로고침
      window.location.reload();
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '제품 정보 삭제 실패',
          description: `제품 정보 삭제에 실패하였습니다`,
        }),
      );
    }
  }
}

function* updateProductInfoExposedSaga(action) {
  try {
    yield put(startLoading());
    const { tabStatus, params } = action.payload;
    const response = yield call(updateProductInfoExposedApi, { params, tabStatus });

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: response.message || '업데이트가 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );

      // 페이지 새로고침
      window.location.reload();
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '업데이트 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error('updateStoreDeailsSaga Error:', e);
  }
}

// 상품 등록 (상품 정보 관리 등록 - 바슈롬)
function* createProductInfoSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;
    const response = yield call(createProductInfoApi, sendObject);
    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: 'BAUSCH-APP 상품 등록 성공',
          description: response.message || 'BAUSCH-APP 상품등록이 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/product/page-manage');
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '상품등록 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error('createProductInfoSaga Error:', e);
  }
}
// 상품 등록 (상품 정보 관리 등록 - 렌즐리)
function* createProductLenslyInfoSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;
    const response = yield call(createProductLenslyInfoApi, sendObject);
    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: 'LENSLY 상품 등록 성공',
          description: response.message || 'LENSLY 상품등록이 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/product/page-manage');
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '상품등록 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error('createProductInfoSaga Error:', e);
  }
}

// 상품 수정 (상품 정보 관리 수정 - 바슈롬)
function* updateProductInfoSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback, id } = action.payload;
    const response = yield call(updateProductInfoApi, sendObject, id);
    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: 'BAUSCH-APP 상품 수정 성공',
          description: response.message || 'BAUSCH-APP 상품수정이 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/product/page-manage');
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '상품수정 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error('updateProductInfoSaga Error:', e);
  }
}
// 상품 수정 (상품 정보 관리 수정 - 렌즐리)
function* updateProductLenslyInfoSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback, id } = action.payload;
    const response = yield call(updateProductLenslyInfoApi, sendObject, id);
    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: 'LENSLY 상품 수정 성공',
          description: response.message || 'LENSLY 상품수정이 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/product/page-manage');
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.message || '알 수 없는 오류가 발생했습니다.');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    const errorMessage = e.response?.data?.message || '상품수정 중 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: errorMessage,
      }),
    );
    console.error('updateProductLenslyInfoSaga Error:', e);
  }
}

// 제품 상세 saga
function* getProductInfoDetailSaga(action) {
  try {
    yield put(startLoading());

    const response = yield call(getProductInfoDetailApi, action.payload.id);

    if (response.status === 200) {
      const productInfoDetail = response?.data.result;
      yield put(insertProductInfoDetailAction({ productInfoDetail: productInfoDetail }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());

    if (e.response) {
      yield put(
        errorSnackOpen({
          message: '제품 상세 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 제품 상세 (lensly)saga
function* getProductInfLenslyoDetailSaga(action) {
  try {
    yield put(startLoading());

    const response = yield call(getProductLenslyInfoDetailApi, action.payload.id);

    if (response.status === 200) {
      const productInfoDetail = response?.data.result;
      yield put(insertProductInfoLenslyDetailAction({ productInfoDetail: productInfoDetail }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());

    if (e.response) {
      yield put(
        errorSnackOpen({
          message: '제품 상세 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 이미지 삭제 saga
function* deleteEditorImageSaga(action) {
  const { params, tabStatus } = action.payload;
  try {
    yield put(startLoading());
    if (tabStatus === 'bausch') {
      yield call(deleteEditorImageApi, params);
    } else {
      yield call(deleteEditorLenslyImageApi, params);
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.log(e.response.data.message);
  }
}

export function* productInfoSaga() {
  yield takeEvery(getProductInfoListAction, getProductInfoListSaga);
  yield takeEvery(getProductInfoLenslyListAction, getProductInfoLenslyListSaga);
  yield takeEvery(productInfoDeleteBauschAction, deleteProductInfoSaga);
  yield takeEvery(updateProductInfoExposedAction, updateProductInfoExposedSaga);
  yield takeEvery(createProductInfoAction, createProductInfoSaga);
  yield takeEvery(createProductLenslyInfoAction, createProductLenslyInfoSaga);
  yield takeEvery(updateProductInfoAction, updateProductInfoSaga);
  yield takeEvery(updateProductLenslyInfoAction, updateProductLenslyInfoSaga);
  yield takeEvery(deleteEditorImageAction, deleteEditorImageSaga);
  yield takeEvery(getProductInfoDetailAction, getProductInfoDetailSaga);
  yield takeEvery(getProductInfoLenslyDetailAction, getProductInfLenslyoDetailSaga);
}
