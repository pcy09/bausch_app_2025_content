import { call, delay, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import dayjs from 'dayjs';
import {
  deleteCampaignDetailStoreApi,
  deleteCampaignDetailStoreMergeApi,
  deleteCampainDetailStoreApi,
  deleteCouponClickApi,
  deleteStoreFromExcelApi,
  deleteStoreSetListApi,
  getCampaignCouponDetailStoreListApi,
  getCouponDetailListApi,
  postCampaignDetailStoreMergeApi,
  registerStoreFromExcelApi,
  updateCouponApi,
  uploadCampaignDetailStoreExcelApi,
} from '@/api/admin/campaignDetailApi';
import {
  deleteCampaignDetailStoreMergeAction,
  deleteCampaignStoreAction,
  deleteCouponClickAction,
  deleteStoreFromExcelAction,
  deleteStoreSetListAction,
  getCampaignDetailStoreGroupListAction,
  getCouponDetailListAction,
  getDetailCouponStoreListAction,
  insertCampaignDetailStoreExcelAction,
  insertCampaignDetailStoreGroupDeleteAction,
  insertCampaignDetailStoreGroupListAction,
  insertCouponDetailListAction,
  insertDeleteStoreSetListAction,
  insertDetailCouponStoreListAction,
  postCampaignDetailStoreMergeAction,
  registerStoreFromExcelAction,
  updateCouponAction,
  uploadCampaignDetailStoreExcelAction,
} from '@/store/reducers/admin/campaignDetailReducer';
import { addKeyData } from '@/common/utiles';
import { getDetailCouponStoreListApi } from '@/api/admin/campaign';
import { openPops } from '@/store/reducers/popupsReducer';

// 스토어 설정 리스트 get saga
function* getDetailCouponStoreListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};
    const response = yield call(getDetailCouponStoreListApi, params);

    if (response?.success && response?.status === 200) {
      const data =
        response?.data?.result?.content?.map(cur => ({
          ...cur,
          key: cur.couponStoreSetTempId,
          storeRegDate: dayjs(cur.storeRegDate).format('YYYY-MM-DD'),
        })) || [];
      yield put(
        insertDetailCouponStoreListAction({
          result: data,
          pageable: response.data?.result?.pageable,
          totalElements: response.data?.result?.totalElements,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getDetailCouponStoreListSaga::::', e);
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '스토어 설정 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

//그룹 대상 스토어 리스트 get saga
function* getCampaignDetailStoreGroupListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    const response = yield call(getCampaignCouponDetailStoreListApi, params);

    if (response?.success && response?.status === 200) {
      const data =
        response?.data?.result?.map(cur => ({
          ...cur,
          key: cur.couponStoreSetTempId,
          storeRegDate: dayjs(cur.storeRegDate).format('YYYY-MM-DD'),
        })) || [];
      yield put(
        insertCampaignDetailStoreGroupListAction({
          result: data,
          pageable: response.data.pageable,
          totalElements: response.data.totalElements,
        }),
      );
    } else if (response?.status === 400) {
      yield put(
        errorSnackOpen({
          message: '스토어 설정 리스트 호출 실패',
          description: `${response.message}`,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getCampaignDetailStoreGroupListSaga::::', e);
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '스토어 설정 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* deleteCampaignStoreSaga(action) {
  try {
    const { params = {} } = action.payload || {};

    yield put(startLoading());
    const response = yield call(deleteCampaignDetailStoreApi, params);

    if (response.status === 200) {
      const data =
        response?.data?.result?.map(cur => ({
          ...cur,
          key: cur.couponStoreSetTempId,
          storeRegDate: dayjs(cur.storeRegDate).format('YYYY-MM-DD'),
        })) || [];
      yield put(
        insertCampaignDetailStoreGroupDeleteAction({
          result: data,
        }),
      );
      yield put(
        successSnackOpen({
          message: '스토어 삭제 성공',
          description: '스토어가 성공적으로 삭제되었습니다.',
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
          message: '스토어 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* uploadCampaignDetailStoreExcelSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject } = action.payload;

    const response = yield call(uploadCampaignDetailStoreExcelApi, sendObject);

    if (response?.code === 200) {
      const data = addKeyData(response.data.result);
      yield put(insertCampaignDetailStoreExcelAction({ result: data }));

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
    console.error('uploadCampaignDetailStoreExcelSaga::::', e);
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

function* postCampaignDetailStoreMergeSaga(action) {
  try {
    yield put(startLoading());

    const response = yield call(postCampaignDetailStoreMergeApi, action.payload);

    if (response?.status === 200) {
      yield put(
        successSnackOpen({
          type: 'success',
          message: '등록 성공',
          description: response.message,
          placement: 'top',
        }),
      );
      yield put(getDetailCouponStoreListAction({ params: { page: 0, size: 10 } }));
      // 이부분이 수정 필요
      yield put(openPops({ width: null, isModalOpen: false, content: null, title: 'My Custom Title' }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('Saga error:', e);

    const errorMessage = e.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: '스토어 설정 결합 등록 실패',
        description: errorMessage,
      }),
    );
  }
}

function* registerStoreFromExcelSaga(action) {
  const { sendObject } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(registerStoreFromExcelApi, sendObject);

    if (response?.status === 200) {
      yield put(getDetailCouponStoreListAction({ params: { page: 0, size: 10 } }));
      yield put(
        successSnackOpen({
          message: '스토어 추가 성공',
        }),
      );
      yield put(openPops({ width: null, isModalOpen: false, content: null, title: 'My Custom Title' }));
    } else {
      yield put(
        errorSnackOpen({
          message: '스토어 추가 실패',
          description: `${response.message}`,
        }),
      );
    }
    yield put(endLoading());
  } catch (error) {
    console.error(error);
    yield put(
      errorSnackOpen({
        message: '스토어 추가 실패',
      }),
    );
  }
}

function* deleteStoreFromExcelSaga(action) {
  const { sendObject } = action.payload;
  try {
    yield put(startLoading());
    const response = yield call(deleteStoreFromExcelApi, sendObject);

    if (response?.status === 200) {
      yield put(getDetailCouponStoreListAction({ params: { page: 0, size: 10 } }));
      yield put(
        successSnackOpen({
          message: '스토어 제외 성공',
        }),
      );
      yield put(openPops({ width: null, isModalOpen: false, content: null, title: 'My Custom Title' }));
    } else {
      yield put(
        errorSnackOpen({
          message: '스토어 제외 실패',
          description: `${response.message}`,
        }),
      );
    }
    yield put(endLoading());
  } catch (error) {
    console.error(error);
    yield put(
      errorSnackOpen({
        message: '스토어 제외 실패',
      }),
    );
  }
}

function* deleteCampaignDetailStoreMergeSaga(action) {
  try {
    yield put(startLoading());
    const storeIds = action.payload;
    const response = yield call(deleteCampaignDetailStoreMergeApi, storeIds);
    // console.log('response:', response);
    if (response?.status === 200) {
      yield put(
        successSnackOpen({
          type: 'success',
          message: '적립금 등록 성공',
          description: response.message,
          placement: 'top',
        }),
      );
      yield put(getDetailCouponStoreListAction({ params: { page: 0, size: 20 } }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('Saga error:', e);

    const errorMessage = e.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: '적립금 등록 실패',
        description: errorMessage,
      }),
    );
  }
}

function* deleteCouponClickSaga(action) {
  try {
    yield put(startLoading());
    const response = yield call(deleteCouponClickApi);

    if (response.status === 200) {
      yield delay(1000); // 1초 대기
      yield put(getDetailCouponStoreListAction({ params: { page: 0, size: 10 } }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '쿠폰 등록 버튼용 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
    console.error('deleteEventSaga::::', e);
  }
}

function* deleteStoreSetListSaga(action) {
  try {
    const { ids } = action.payload.sendObject;
    yield put(startLoading());
    const response = yield call(deleteStoreSetListApi, ids);
    if (response.status === 200) {
      const data =
        response?.data?.result?.map(cur => ({
          ...cur,
          key: cur.couponStoreSetTempId,
          storeRegDate: dayjs(cur.storeRegDate).format('YYYY-MM-DD'),
        })) || [];
      yield put(
        insertDeleteStoreSetListAction({
          result: data,
        }),
      );
      yield put(
        successSnackOpen({
          message: '대상 스토어 삭제 성공',
          description: '대상 스토어가 성공적으로 삭제되었습니다.',
        }),
      );
      yield put(getDetailCouponStoreListAction({ params: { page: 0, size: 20 } }));
    }
    yield put(endLoading());
  } catch (e) {
    console.error('deleteStoreSetListSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '쿠폰 등록 버튼용 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* getCouponDetailListSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.payload;
    const response = yield call(getCouponDetailListApi, id);

    if (response) {
      yield put(
        insertCouponDetailListAction({
          resultDetail: response.data.result,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    yield put(
      errorSnackOpen({
        message: '쿠폰 관리 상세 리스트 호출 실패',
      }),
    );
  }
}

// 쿠폰 등록 saga
function* updateCouponSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(updateCouponApi, sendObject);

    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '쿠폰 수정 성공',
          description: '',
          placement: 'top',
        }),
      );
      callback.push('/admin/campaign/coupon');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    yield put(
      errorSnackOpen({
        message: '쿠폰 수정 실패',
        description: `${e.response.data.message}`,
      }),
    );
  }
}

export function* campaignDetailSaga() {
  yield takeEvery(getCampaignDetailStoreGroupListAction, getCampaignDetailStoreGroupListSaga);
  yield takeEvery(deleteCampaignStoreAction, deleteCampaignStoreSaga);
  yield takeEvery(uploadCampaignDetailStoreExcelAction, uploadCampaignDetailStoreExcelSaga);
  yield takeEvery(getDetailCouponStoreListAction, getDetailCouponStoreListSaga);
  yield takeEvery(postCampaignDetailStoreMergeAction, postCampaignDetailStoreMergeSaga);
  yield takeEvery(registerStoreFromExcelAction, registerStoreFromExcelSaga);
  yield takeEvery(deleteStoreFromExcelAction, deleteStoreFromExcelSaga);
  yield takeEvery(deleteStoreSetListAction, deleteStoreSetListSaga);
  yield takeEvery(deleteCampaignDetailStoreMergeAction, deleteCampaignDetailStoreMergeSaga);
  yield takeEvery(deleteCouponClickAction, deleteCouponClickSaga);
  yield takeEvery(getCouponDetailListAction, getCouponDetailListSaga);
  yield takeEvery(updateCouponAction, updateCouponSaga);
}
