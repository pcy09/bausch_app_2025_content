import { call, put, takeEvery } from '@redux-saga/core/effects';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';

import {
  changeWithdrawMemberSearchDataAction,
  getWithdrawMemberListAction,
  insertWithdrawMemberListAction,
  recoveryWithdrawnMemberAction,
  withdrawnMemberAction,
  withdrawnMemberDeletionAction,
} from '@/store/reducers/admin/withdrawMemberReducer';
import {
  fetchWithDrawnMemberListApi,
  recoveryWithdrawnMemberApi,
  withdrawnMemberApi,
  withdrawnMemberDeletionApi,
} from '@/api/admin/withdrawnMemberApi';

function* withdrawMemberListSaga(action) {
  try {
    yield put(startLoading());
    const { params = {} } = action.payload || {};

    const response = yield call(fetchWithDrawnMemberListApi, params);

    // 204 상태에 대한 별도 처리
    if (response?.status === 204) {
      yield put(
        errorSnackOpen({
          message: '탈퇴 회원 리스트 호출 실패',
          description: '해당 조건에 맞는 회원이 없습니다.',
        }),
      );
    } else if (response?.success && response?.status === 200) {
      const data =
        response?.data?.content?.map(cur => ({
          ...cur,
        })) || [];

      yield put(
        insertWithdrawMemberListAction({
          content: data,
          pageable: response.data.pageable,
          totalElements: response.data.totalElements,
        }),
      );
    } else {
      // 성공이 아닌 다른 경우들에 대한 처리 (예: 500 에러 등)
      yield put(
        errorSnackOpen({
          message: '탈퇴 회원 리스트 호출 실패',
          description: response?.message || '알 수 없는 에러가 발생했습니다.',
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
          message: '탈퇴 회원 리스트 호출 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

// 회원 삭제
function* deleteWithdrawMember(action) {
  try {
    const { id } = action.payload.sendObject;

    yield put(startLoading());
    const response = yield call(withdrawnMemberDeletionApi, id);

    if (response.status === 200) {
      yield put(
        successSnackOpen({
          message: '회원 삭제 완료',
          description: '회원 삭제가 성공적으로 처리되었습니다',
        }),
      );

      // 회원 삭제 성공시 목록을 새로고침
      yield put(getWithdrawMemberListAction());
    }

    yield put(endLoading());
  } catch (e) {
    console.error('deleteEventSaga::::', e);
    yield put(endLoading());
    if (e.response && e.response.data) {
      yield put(
        errorSnackOpen({
          message: '회원 삭제 실패',
          description: `${e.response.data.message}`,
        }),
      );
    }
  }
}

function* recoveryWithdrawnMemberSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.payload.sendObject;
    const response = yield call(recoveryWithdrawnMemberApi, id);

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        successSnackOpen({
          type: 'success',
          message: '탈퇴회원 복구 성공',
          description: response.message || '성공적으로 복구 되었습니다.',
          placement: 'top',
        }),
      );
      // 회원 삭제 성공시 목록을 새로고침
      yield put(getWithdrawMemberListAction());
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

// 회원 탈퇴
function* withdrawnMemberActionSaga(action) {
  try {
    yield put(startLoading());
    const { id, callback } = action.payload.sendObject;
    const response = yield call(withdrawnMemberApi, id);

    // 응답 객체가 정의되었는지 확인
    if (response && response.status === 200) {
      yield put(
        successSnackOpen({
          type: 'success',
          message: '회원 탈퇴',
          description: response?.data?.message || '회원 탈퇴가 완료 되었습니다.',
          placement: 'top',
        }),
      );
      // 회원 삭제 성공시 목록을 새로고침
      yield put(getWithdrawMemberListAction());
      callback.push('/admin/member');
    } else {
      // 응답이 정의되지 않았거나, 성공 상태가 아닌 경우 에러 처리
      throw new Error(response?.data?.message || '알 수 없는 오류가 발생했습니다.');
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

export function* withdrawMember() {
  yield takeEvery(getWithdrawMemberListAction, withdrawMemberListSaga);
  yield takeEvery(recoveryWithdrawnMemberAction, recoveryWithdrawnMemberSaga);
  yield takeEvery(withdrawnMemberDeletionAction, deleteWithdrawMember);
  yield takeEvery(withdrawnMemberAction, withdrawnMemberActionSaga);
}
