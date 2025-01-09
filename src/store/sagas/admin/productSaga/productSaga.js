import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import {
  createProductApi,
  createProductLenslyApi,
  deleteLenslyProductApi,
  deleteProductApi,
  deleteProductImagesApi,
  getProductDetailApi,
  getProductLenslyDetailApi,
  getProductLesnlyListApi,
  getProductListApi,
  publishProductApi,
  sendNextStepApi,
  skuLenslyUploadApi,
  skuUploadApi,
  updateLenslyProductApi,
  updateProductApi,
  uploadSkuApi,
  upsertProductBasicInfoApi,
  upsertProductDetailInfoApi,
  upsertProductImagesInfoApi,
  upsertProductPriceInfoApi,
} from '@/api/admin/productApi';
import {
  changeSearchData,
  deleteProductImagesAction,
  getProductDetailAction,
  
  createProductAction,
  getProductListAction,
  insertProductListAction,
  insertSkuInfoAction,
  productDeleteAction,
  publishProductAction,
  sendNextStepAction,
  updateLensImageListAction,
  updateThumbnailImageListAction,
  updateUsingImageAction,
  uploadSkuAction,
  upsertProductBasicInfoAction,
  upsertProductDetailAction,
  upsertProductDetailInfoAction,
  upsertProductImagesInfoAction,
  upsertProductPriceInfoAction,
  insertProductDetailAction,
  updateSkuAction,
  updateInsertSkuAction,
  updateProductDetailAction,
} from '@/store/reducers/admin/productReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { addKeyData } from '@/common/utiles';
import { closeDrawer, openDrawer } from '@/store/reducers/modalReducer';
import {
  changeLenslySearchData,
  createProductLenslyAction,
  getProductLenslyDetailAction,
  getProductLenslyListAction,
  insertProductLenslyDetailAction,
  insertProductLenslyListAction,
  productDeleteLenslyAction,
  updateInsertLenslySkuAction,
  updateLenslySkuAction,
  updateProductLenslyDetailAction,
} from '@/store/reducers/admin/productLenslyReducer';

// 제품 리스트
function* getProductListSaga(action) {
  try {
    yield put(startLoading());
    const { params, getValueObject } = action.payload;
    yield put(
      changeSearchData({
        salesStatus: params.salesStatus,
        searchProductName: params.searchProductName,
        startDate: params.startDate,
        endDate: params.endDate,
        productGroupName: params.productGroupName,
      }),
    );
    const response = yield call(getProductListApi, params);

    if (response.status === 200) {
      const data = response?.data.content.reduce((acc, cur, index) => {
        return acc.concat({
          ...cur,
          key: cur.productId,
          sight_code: getValueObject?.findSightTypeCode[cur.sight_code],
          cycle_code: getValueObject?.findLensCycleCode[cur.cycle_code],
          show_status: getValueObject?.findShowStatusCode[cur.show_status],
        });
      }, []);

      yield put(insertProductListAction({ content: data, pageable: response.data.pageable, totalElements: response.data.totalElements }));
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

// 제품 리스트(lensly)
function* getProductLenslyListSaga(action) {
  try {
    yield put(startLoading());
    const { params, getValueObject } = action.payload;
    yield put(
      changeLenslySearchData({
        salesStatus: params.salesStatus,
        searchProductName: params.searchProductName,
        startDate: params.startDate,
        endDate: params.endDate,
        productGroupName: params.productGroupName,
      }),
    );
    const response = yield call(getProductLesnlyListApi, params);

    if (response.status === 200) {
      const data = response?.data.content.reduce((acc, cur, index) => {
        return acc.concat({
          ...cur,
          key: cur.productId,
          sight_code: getValueObject?.findSightTypeCode[cur.sight_code],
          cycle_code: getValueObject?.findLensCycleCode[cur.cycle_code],
          show_status: getValueObject?.findShowStatusCode[cur.show_status],
        });
      }, []);

      yield put(insertProductLenslyListAction({ content: data, pageable: response.data.pageable, totalElements: response.data.totalElements }));
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

// 제품 등록 saga
function* createProductDetailSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(createProductApi, sendObject);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '제품 등록 성공',
          description: '바슈롬 제품이 등록되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/product/manage?tab=B');
      // yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      // yield put(
      //   successSnackOpen({
      //     message: response.message,
      //     description: '',
      //   }),
      // );
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
    console.error('createProductDetailSaga::::');

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

// 제품 등록 saga(Lensly)
function* createLenslyProductDetailSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(createProductLenslyApi, sendObject);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '제품 등록 성공',
          description: '렌즐리 제품이 등록되었습니다.',
          placement: 'top',
        }),
      );
      callback.push('/admin/product/manage?tab=L');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('createProductDetailSaga::::');

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

// 제품 상세 saga
function* getProductDetailSaga(action) {
  try {
    yield put(startLoading());

    const response = yield call(getProductDetailApi, action.payload.id);

    if (response.status === 200) {
      const productDetail = response?.data.productDetail;
      yield put(insertProductDetailAction({ productDetail: productDetail }));
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
function* getProductLenslyDetailSaga(action) {
  try {
    yield put(startLoading());

    const response = yield call(getProductLenslyDetailApi, action.payload.id);

    if (response.status === 200) {
      const productDetail = response?.data.productDetail;
      yield put(insertProductLenslyDetailAction({ productDetail: productDetail }));
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
// 제품 sku 업로드 saga
function* uploadProductSkuSaga(action) {
  try {
    yield put(startLoading());
    const { formData, id } = action.payload;

    const response = yield call(skuUploadApi, formData);

    if (response.status === 200) {
      yield put(updateInsertSkuAction({ skuInfoModels: response.data.skuInfoModels }));

      yield put(
        successSnackOpen({
          message: 'sku 업데이트 성공',
          description: 'sku 업데이트에 성공하였습니다.',
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response) {
      yield put(
        errorSnackOpen({
          message: 'SKU 업로드 실패',
          description: `이미 존재하는 SKU 파일입니다.`,
        }),
      );
    }
  }
}

// 제품 sku 업로드(lensly) saga
function* uploadProductLenslySkuSaga(action) {
  try {
    yield put(startLoading());
    const { formData, id } = action.payload;

    const response = yield call(skuLenslyUploadApi, formData);

    if (response.status === 200) {
      yield put(updateInsertLenslySkuAction({ skuInfoModels: response.data.skuInfoModels }));

      yield put(
        successSnackOpen({
          message: 'sku 업데이트 성공',
          description: 'sku 업데이트에 성공하였습니다.',
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response) {
      yield put(
        errorSnackOpen({
          message: 'SKU 업로드 실패',
          description: `이미 존재하는 SKU 파일입니다.`,
        }),
      );
    }
  }
}

// 제품 상세 업데이트 saga
function* productUpdateSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject, callback } = action.payload;

    const response = yield call(updateProductApi, id, sendObject);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '제품 상세 업데이트 성공',
          description: '',
        }),
      );
      callback.push('/admin/product/manage?tab=B');
    }

    if (response.status === 400) {
      yield put(
        errorSnackOpen({
          message: `제품 상세 업데이트 실패`,
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
          message: `제품 상세 업데이트 실패`,
          description: `제품 상세 업데이트에 실패하였습니다.`,
        }),
      );
    }
  }
}

// 제품 상세 업데이트 saga(lensly)
function* productLenslyUpdateSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject, callback } = action.payload;

    const response = yield call(updateLenslyProductApi, id, sendObject);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '제품 상세 업데이트 성공',
          description: '',
        }),
      );
      callback.push('/admin/product/manage?tab=L');
    }
    if (response.status === 400) {
      yield put(
        errorSnackOpen({
          message: `제품 상세 업데이트 실패`,
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
          message: `제품 상세 업데이트 실패`,
          description: `제품 상세 업데이트에 실패하였습니다.`,
        }),
      );
    }
  }
}

// 제품등록 단계이동
function* sendNextStepSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject } = action.payload;
    const response = yield call(sendNextStepApi, id, sendObject);

    if (response.code === 200) {
      yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      yield put(
        successSnackOpen({
          message: response.message,
          description: '',
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('sendNextStepSaga::::', e);
    if (e.response.data) {
      yield put(
        //snackReducer에서 해당 액션 생성자를 임포트하고, 사가에서 발생하는 오류를 처리하기 위해 이 액션을 디스패치해야 합니다.
        errorSnackOpen({
          message: `${e.response.data.message}`,
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// SKU 업로드 saga ( 제품 임시 생성 )
function* uploadSkuSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(uploadSkuApi, sendObject);

    if (response?.code === 200) {
      const data = addKeyData(response.data.skuInfo);
      yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      yield put(insertSkuInfoAction({ skuInfo: data }));

      yield put(
        successSnackOpen({
          message: response.message,
          description: '',
        }),
      );

      callback.push(`/products/${response.data.productDetail.id}`);
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('uploadSkuSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: 'SKU 업로드 실패',
          description: `이미 존재하는 SKU 파일입니다.`,
        }),
      );
    }
  }
}

// Step 2 : 제품 기본 정보 등록 saga
function* upsertProductBasicInfoSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject } = action.payload;
    const response = yield call(upsertProductBasicInfoApi, id, sendObject);
    if (response.code === 200) {
      yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      // yield put(updateUsingImageAction({ usingImagex: response.data.usingImage }));
      yield put(
        successSnackOpen({
          message: response.message,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('upsertProductBasicInfoSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '기본 정보 등록 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// Step 3 : 제품 상세 정보 등록 saga
function* upsertProductDetailInfoSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject } = action.payload;
    const response = yield call(upsertProductDetailInfoApi, id, sendObject);
    if (response.code === 200) {
      yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      yield put(
        successSnackOpen({
          message: response.message,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('upsertProductDetailInfoSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '상세 정보 등록 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// Step 4 : 제품 이미지 등록 saga
function* upsertProductImagesInfoSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject, type } = action.payload;
    const response = yield call(upsertProductImagesInfoApi, id, sendObject);
    if (response.code === 200) {
      if (type === 'thumbnail') {
        yield put(updateThumbnailImageListAction({ thumbnailImageList: response.data.thumbnailImageList }));
      }
      if (type === 'lens') {
        yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
        yield put(updateLensImageListAction({ lensImageList: [response.data.lensImageList] }));
      }
      yield put(
        successSnackOpen({
          message: response.message,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('upsertProductImagesInfoSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이미지 등록 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// Step 4 : 제품 이미지 삭제 saga
function* deleteProductImagesSaga(action) {
  try {
    yield put(startLoading());
    const { id, params } = action.payload;
    const response = yield call(deleteProductImagesApi, id, params);
    if (response.code === 200) {
      if (params.type === 'lens') {
        yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      }
      yield put(
        successSnackOpen({
          message: response.message,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('deleteProductImagesSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이미지 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}
// Step 5 : 제품 가격 등록 saga
function* upsertProductPriceInfoSaga(action) {
  try {
    yield put(startLoading());

    const { id, sendObject } = action.payload;

    const response = yield call(upsertProductPriceInfoApi, id, sendObject);
    if (response.code === 200) {
      yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      const updateData = {
        show: true,
        type: 'drawer-root',
        name: 'registerProduct',
        items: [],
      };
      yield put(openDrawer(updateData));
      yield put(
        successSnackOpen({
          message: response.message,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('upsertProductPriceInfoSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: `제품 등록 에러`,
          description: `권장 소비자가는 10 자리가 넘을 수 없습니다.`,
        }),
      );
    }
  }
}

// 최종 상품 등록
function* publishProductSaga(action) {
  try {
    yield put(startLoading());

    const { id, sendObject, callback } = action.payload;
    const response = yield call(publishProductApi, id, sendObject);

    if (response.code === 200) {
      // yield put(upsertProductDetailAction({ productDetail: response.data.productDetail }));
      // yield put(productReset());
      yield put(closeDrawer());
      callback.push('/products');
      yield put(
        successSnackOpen({
          message: response.message,
        }),
      );
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('publishProductSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: `${e.response.data.message}`,
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 제품 삭제
function* deleteProductSaga(action) {
  try {
    const { ids } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(deleteProductApi, ids);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '제품 삭제 완료',
          description: '선택한 제품이 삭제가 되었습니다.',
        }),
      );

      // Redux 스토어에서 필요한 상태를 가져옵니다.
      const search = yield select(state => state.product.search);

      const params = {
        page: 0,
        size: 10,
        ...search,
      };

      // 제품 삭제 성공시 목록을 새로고침
      yield put(getProductListAction({ params }));
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '제품 삭제 실패',
          description: `제품 삭제에 실패하였습니다`,
        }),
      );
    }
  }
}

// 제품 삭제(렌즐리)
function* deleteLenslyProductSaga(action) {
  try {
    const { ids } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(deleteLenslyProductApi, ids);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '제품 삭제 완료',
          description: '선택한 제품이 삭제가 되었습니다.',
        }),
      );

      // Redux 스토어에서 필요한 상태를 가져옵니다.
      const search = yield select(state => state.product.search);

      const params = {
        page: 0,
        size: 10,
        ...search,
      };

      // 제품 삭제 성공시 목록을 새로고침
      yield put(getProductLenslyListAction({ params }));
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '제품 삭제 실패',
          description: `제품 삭제에 실패하였습니다`,
        }),
      );
    }
  }
}

export function* productSaga() {
  yield takeEvery(uploadSkuAction, uploadSkuSaga);
  yield takeEvery(getProductListAction, getProductListSaga);
  yield takeEvery(createProductAction, createProductDetailSaga);
  yield takeEvery(getProductDetailAction, getProductDetailSaga);
  yield takeEvery(sendNextStepAction, sendNextStepSaga);
  yield takeEvery(upsertProductBasicInfoAction, upsertProductBasicInfoSaga);
  yield takeEvery(upsertProductDetailInfoAction, upsertProductDetailInfoSaga);
  yield takeEvery(upsertProductImagesInfoAction, upsertProductImagesInfoSaga);
  yield takeEvery(deleteProductImagesAction, deleteProductImagesSaga);
  yield takeEvery(upsertProductPriceInfoAction, upsertProductPriceInfoSaga);
  yield takeEvery(publishProductAction, publishProductSaga);
  yield takeEvery(productDeleteAction, deleteProductSaga);
  yield takeEvery(updateSkuAction, uploadProductSkuSaga);
  yield takeEvery(updateProductDetailAction, productUpdateSaga);
  // lensly
  yield takeEvery(getProductLenslyListAction, getProductLenslyListSaga);
  yield takeEvery(productDeleteLenslyAction, deleteLenslyProductSaga);
  yield takeEvery(getProductLenslyDetailAction, getProductLenslyDetailSaga);
  yield takeEvery(updateProductLenslyDetailAction, productLenslyUpdateSaga);
  yield takeEvery(updateLenslySkuAction, uploadProductLenslySkuSaga);
  yield takeEvery(createProductLenslyAction, createLenslyProductDetailSaga);
}
