import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  getMemberDetailAction,
  getMemberListAction,
  insertMemberDetailAction,
  insertMemberListAction,
  insertMemberStoreHistoryAction,
  memberStoreHistory,
  memberStoreHistoryAction,
  updateMemberAction,
} from '@/store/reducers/admin/memberReducer';
import { changeSearchDataAction } from '@/store/reducers/lensly/reservationReducer';
import { fetchMemberAllListApi, fetchMemberDetailApi, updateMemberApi, updateStoreHistoryApi } from '@/api/admin/memberApi';

// 회원 리스트 saga
function* getMemberListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    yield put(
      changeSearchDataAction({
        searchValue: params.searchValue,
        startDate: params.startDate,
        endDate: params.endDate,
        memberType: params.memberType,
        searchCond: params.searchCond,
      }),
    );

    const response = yield call(fetchMemberAllListApi, params);

    if (response?.success && response?.status === 200) {
      const data =
        response?.data?.content?.map(cur => ({
          key: cur.memberId,
          ...cur,
        })) || [];

      yield put(
        insertMemberListAction({
          content: data,
          pageable: response.data.pageable,
          totalElements: response.data.totalElements,
        }),
      );
    } else if (response?.status === 204) {
      yield put(
        errorSnackOpen({
          message: '회원 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getStoreListSaga::::', e);
    if (e.response?.data) {
      yield put(
        errorSnackOpen({
          message: '회원 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 회원 상세
function* getMemberDetailSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.payload;
    const response = yield call(fetchMemberDetailApi, id);

    if (response.status === 200) {
      yield put(insertMemberDetailAction({ memberDetail: response.data.memberDetail }));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getOpticianDetailSaga::::', e);
    yield put(
      errorSnackOpen({
        message: '회원 상세 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
    action.payload.callback.push('/admin/member');
  }
}

// 스토어 변경
function* memberStoreHistorySaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject } = action.payload;
    const response = yield call(updateStoreHistoryApi, id, sendObject);

    if (response.status === 200) {
      yield put(insertMemberStoreHistoryAction({ additionalInfo: response.data.tempStoreChange }));
    }
    yield put(getMemberDetailAction(id));
    yield put(endLoading());
  } catch (e) {
    yield put(endLoading());
    console.error('getOpticianDetailSaga::::', e);
    yield put(
      errorSnackOpen({
        message: '회원 상세 리스트 호출 실패',
        description: `${e.response.data.message}`,
      }),
    );
    action.payload.callback.push('/admin/member');
  }
}

// 회원상세 업데이트 saga
function* updateMemberSaga(action) {
  try {
    yield put(startLoading());
    const { id, sendObject, callback } = action.payload;

    const response = yield call(updateMemberApi, id, sendObject);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '회원 상세 업데이트 성공',
          description: `${response.message}`,
        }),
      );
      callback.push('/admin/member');
    }

    if (response.status === 204) {
      yield put(
        errorSnackOpen({
          message: `회원 상세 업데이트 실패`,
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
          message: `회원 상세 업데이트 실패`,
          description: `회원 상세 업데이트에 실패하였습니다.`,
        }),
      );
    }
  }
}

export function* memberSaga() {
  yield takeEvery(getMemberListAction, getMemberListSaga);
  yield takeEvery(getMemberDetailAction, getMemberDetailSaga);
  yield takeEvery(memberStoreHistoryAction, memberStoreHistorySaga);
  yield takeEvery(updateMemberAction, updateMemberSaga);
}
