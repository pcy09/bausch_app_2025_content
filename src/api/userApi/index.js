import { AXIOS_GET, AXIOS_PATCH } from '@/api/axios/useAxios';
// 회원 리스트
export const fetchUserListApi = async params => {
  try {
    return await AXIOS_GET('/user', params);
  } catch (e) {
    throw e;
  }
};

// 회원 상세
export const fetchUserDetailApi = async id => {
  try {
    return await AXIOS_GET(`/user/${id}`);
  } catch (e) {
    throw e;
  }
};

// 회원 상태 수정
export const updateUserStatusApi = async (id, sendObject) => {
  try {
    return await AXIOS_PATCH(`/user/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};
// 다수 회원 상태 수정
export const updateManyUserStatusApi = async sendObject => {
  try {
    return await AXIOS_PATCH(`/user`, sendObject);
  } catch (e) {
    throw e;
  }
};
