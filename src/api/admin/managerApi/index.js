import { AXIOS_DELETE, AXIOS_GET, AXIOS_PATCH } from '@/api/axios/useAxios';

// 관리자 리스트
export const fetchMangerAllList = async params => {
  try {
    return await AXIOS_GET('/manager', params);
  } catch (e) {
    throw e;
  }
};

// 관리자 상세
export const fetchManagerDetailApi = async id => {
  try {
    return await AXIOS_GET(`/manager/${id}`);
  } catch (e) {
    throw e;
  }
};

// 관리자 업데이트
export const updateManagerApi = async (id, sendObject) => {
  try {
    return await AXIOS_PATCH(`/manager/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 관리자 삭제
export const deleteManagerApi = async id => {
  try {
    return await AXIOS_DELETE(`/manager/${id}`);
  } catch (e) {
    throw e;
  }
};
