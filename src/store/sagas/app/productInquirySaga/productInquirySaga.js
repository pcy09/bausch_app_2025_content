import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import {
  getProductInquiryAction,
  getProductInquiryDetailAction,
  insertProductInquiryAction,
  insertProductInquiryDetailAction,
  insertProductInquiryKeyAction,
  updateProductInquiryAction,
} from '@/store/reducers/app/productInquiryReducer';
import { getProductInquiryApi, getProductInquiryDetailApi, updateProductInquiryApi } from '@/api/app/productInquiryApi';
import { addKeyData } from '@/common/utiles';

// 제품 문의 리스트 가져오기 saga
function* getProductInquirySaga(action) {
  const { params } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(getProductInquiryApi, params);
    if (response?.code === 200) {
      const data = addKeyData(response.data.productQaList);
      yield put(insertProductInquiryAction({ productInquiryData: response.data }));
      yield put(insertProductInquiryKeyAction({ productInquiryKey: data }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getManagerListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '제품문의 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 제품문의 답변 등록/수정/삭제 saga
function* updateProductInquirySaga(action) {
  const { sendObject, callback } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(updateProductInquiryApi, sendObject);

    if (response?.code === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '답변 업데이트 성공',
          description: '',
          placement: 'top',
        }),
      );
      callback.push(`/products/inquiry`);
      // yield put(insertProductInquiryAction({ productInquiryData: data.faqList }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '답변 업데이트 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 제품 문의 상세 가져오기 saga
function* getProductInquiryDetailSaga(action) {
  const { id } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(getProductInquiryDetailApi, id);
    if (response?.code === 200) {
      yield put(insertProductInquiryDetailAction({ productInquiryDetailData: response.data.qaDetail }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getManagerListSaga::::', e);
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '제품문의 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}
export function* productInquirySaga() {
  yield takeEvery(getProductInquiryAction, getProductInquirySaga);
  yield takeEvery(updateProductInquiryAction, updateProductInquirySaga);
  yield takeEvery(getProductInquiryDetailAction, getProductInquiryDetailSaga);
}
