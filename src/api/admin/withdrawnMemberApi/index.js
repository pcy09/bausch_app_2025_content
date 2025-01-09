import { AXIOS_DELETE, AXIOS_GET, AXIOS_POST } from '@/api/axios/useAxios';

// 탈퇴 회원 리스트
export const fetchWithDrawnMemberListApi = async params => {
  try {
    return await AXIOS_GET('/member/withdrawn-members', params);
  } catch (e) {
    throw e;
  }
};

// 탈퇴 회원 복구
export const recoveryWithdrawnMemberApi = async (id, groupName) => {
  try {
    return await AXIOS_POST(`/member/withdrawn-members/${id}/reactivate`);
  } catch (e) {
    throw e;
  }
};

// 탈퇴 회원 삭제
export const withdrawnMemberDeletionApi = async (id, groupName) => {
  try {
    return await AXIOS_DELETE(`/member/withdrawn-members/${id}`);
  } catch (e) {
    throw e;
  }
};

// 회원 탈퇴
export const withdrawnMemberApi = async (id, groupName) => {
  try {
    return await AXIOS_POST(`/member/withdrawn-members/${id}/withdraw`);
  } catch (e) {
    throw e;
  }
};
