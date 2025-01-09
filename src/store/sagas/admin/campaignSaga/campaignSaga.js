import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, snackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import dayjs from 'dayjs';
import {
  changeSearchData,
  deleteCouponAction,
  deleteReissueCouponAction,
  getCampaignCouponListAction,
  getReissueCouponSelectAction,
  getReissueMemberCouponAction,
  insertCampaignCouponListAction,
  insertReissueCouponSelectAction,
  insertReissueMemberAction,
  postCreateCouponAction,
  postReissueCouponAction,
  updateCampaignCouponExposedAction,
  updateReissueCampaignCouponExposedAction,
} from '@/store/reducers/admin/campaignReducer';
import {
  createOfflineCouponApi,
  deleteCampaignCouponApi,
  deleteReissueCampaignCouponApi,
  getCampaignCouponListApi,
  getOfflineCouponApi,
  getReissueCouponSelectApi,
  getReissueMemberCouponApi,
  postCouponCreateApi,
  postReissueCouponApi,
  updateCampaignCouponExposedApi,
  updateReissueCampaignCouponExposedApi,
} from '@/api/admin/campaign';
import { createOfflineCouponAction, getOfflineCouponAction, insertOfflineCouponAction } from '@/store/reducers/admin/offlineCouponReducer';

// 스토어 리스트 saga
function* getCampaignCouponListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action?.payload || {};

    if (params.couponTab) {
      const response = yield call(getCampaignCouponListApi, params);
      if (response?.success && response?.status === 200) {
        const data =
          response?.data?.result?.content?.map(cur => ({
            ...cur,
            key: cur.couponReissueId ? cur.couponReissueId : cur.couponId, // couponReissueId가 있으면 사용, 없으면 id 사용
            storeRegDate: dayjs(cur.storeRegDate).format('YYYY-MM-DD'),
          })) || [];
        yield put(
          insertCampaignCouponListAction({
            content: data,
            pageable: response?.data?.result?.pageable,
            totalElements: response?.data?.result?.totalElements,
          }),
        );
      }
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

// 제품 삭제
function* deleteCouponSaga(action) {
  try {
    const { initialParams, ids } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(deleteCampaignCouponApi, ids);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '쿠폰 삭제 완료',
          description: '선택한 쿠폰이 삭제되었습니다.',
        }),
      );
      // 제품 삭제 성공시 목록을 새로고침
      yield put(getCampaignCouponListAction({ params: initialParams }));
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '쿠폰 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 제품 삭제
function* deleteReissueCouponSaga(action) {
  try {
    const { initialParams, ids } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(deleteReissueCampaignCouponApi, ids);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '쿠폰 삭제 완료',
          description: '선택한 쿠폰이 삭제되었습니다.',
        }),
      );
      // 제품 삭제 성공시 목록을 새로고침
      yield put(getCampaignCouponListAction({ params: initialParams }));
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '쿠폰 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* updateCampaignCouponExposedSaga(action) {
  try {
    yield put(startLoading());
    const { initialParams, params } = action.payload;
    const response = yield call(updateCampaignCouponExposedApi, params);

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
      yield put(getCampaignCouponListAction({ params: initialParams }));
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

// 쿠폰 등록 saga
function* postCreateCouponSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;

    const response = yield call(postCouponCreateApi, sendObject);
    if (response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '쿠폰 등록 성공',
          description: '',
          placement: 'top',
        }),
      );
      callback.push('/admin/campaign/coupon');
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '이벤트 등록 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 오프라인 쿠폰 발행
function* createOfflineCouponSaga(action) {
  const { sendObject } = action.payload;
  try {
    yield put(startLoading());

    const response = yield call(createOfflineCouponApi, sendObject);
    if (response?.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '오프라인 쿠폰 발행 성공',
          description: '',
          placement: 'top',
        }),
      );

      const { couponId } = sendObject;
      const params = {
        page: 0,
        size: 10,
      };
      yield put(getOfflineCouponAction({ id: couponId, params }));
    }

    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response.data) {
      yield put(
        errorSnackOpen({
          message: '오프라인 쿠폰 발행 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 오프라인 쿠폰 조회
function* getOfflineCouponSaga(action) {
  const { id, params } = action?.payload;
  try {
    yield put(startLoading());
    const response = yield call(getOfflineCouponApi, id, params);
    if (response?.status === 200) {
      const { content, pageable, totalElements } = response.data.result;
      const uniqContent =
        content.map(cur => ({
          ...cur,
          key: cur.couponIssueId,
        })) || [];
      yield put(insertOfflineCouponAction({ content: uniqContent, pageable, totalElements }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* updateReissueCampaignCouponExposedSaga(action) {
  try {
    yield put(startLoading());
    const { id, initialParams, params } = action.payload;
    const response = yield call(updateReissueCampaignCouponExposedApi, id, params);

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        snackOpen({
          type: 'success',
          message: '업데이트 성공',
          description: response.message || '재발급 업데이트가 성공적으로 완료되었습니다.',
          placement: 'top',
        }),
      );
      yield put(getCampaignCouponListAction({ params: initialParams }));
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

//회원 쿠폰 재발급 회원정보 선택
function* getReissueMemberCouponSaga(action) {
  try {
    const { params } = action.payload;
    yield put(startLoading());
    const response = yield call(getReissueMemberCouponApi, params);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '회원 검색에 성공하였습니다.',
          description: '회원 검색에 성공하였습니다.',
        }),
      );
      const updatedData = response.data.result.map((item, index) => ({ ...item, key: index }));
      yield put(insertReissueMemberAction({ reissueMemberListData: updatedData }));
    } else {
      yield put(
        errorSnackOpen({
          message: response.message,
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
          message: '회원 검색에 실패하였습니다.',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

//회원 쿠폰 재발급 쿠폰 선택
function* getReissueCouponSelectSaga(action) {
  try {
    const { params } = action.payload;
    yield put(startLoading());
    const response = yield call(getReissueCouponSelectApi, params);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '쿠폰 검색에 성공하였습니다.',
          description: '쿠폰 검색에 성공하였습니다.',
        }),
      );
      yield put(insertReissueCouponSelectAction({ reissueCouponSelectData: response.data.result }));
    }
    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '쿠폰 검색에 실패하였습니다.',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

//재발급 쿠폰 등록
function* postReissueCouponSaga(action) {
  try {
    yield put(startLoading());
    const { sendObject, callback } = action.payload;
    const response = yield call(postReissueCouponApi, sendObject);
    if (response?.status === 200) {
      yield put(
        successSnackOpen({
          type: 'success',
          message: '재발급 쿠폰 등록 성공',
          description: response.message,
          placement: 'top',
        }),
      );
      callback.push(`/admin/campaign/coupon`);
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('Saga error:', e);
    const errorMessage = e.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
    yield put(
      errorSnackOpen({
        message: '재발급 쿠폰 등록 실패',
        description: errorMessage,
      }),
    );
  }
}

export function* campaignSaga() {
  yield takeEvery(getCampaignCouponListAction, getCampaignCouponListSaga);
  yield takeEvery(deleteCouponAction, deleteCouponSaga);
  yield takeEvery(deleteReissueCouponAction, deleteReissueCouponSaga);
  yield takeEvery(postCreateCouponAction, postCreateCouponSaga);
  yield takeEvery(postReissueCouponAction, postReissueCouponSaga);
  yield takeEvery(getReissueMemberCouponAction, getReissueMemberCouponSaga);
  yield takeEvery(getReissueCouponSelectAction, getReissueCouponSelectSaga);
  yield takeEvery(updateCampaignCouponExposedAction, updateCampaignCouponExposedSaga);
  yield takeEvery(updateReissueCampaignCouponExposedAction, updateReissueCampaignCouponExposedSaga);
  yield takeEvery(createOfflineCouponAction, createOfflineCouponSaga);
  yield takeEvery(getOfflineCouponAction, getOfflineCouponSaga);
}
