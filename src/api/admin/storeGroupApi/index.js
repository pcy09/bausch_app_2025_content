import { AXIOS_GET, AXIOS_PATCH } from '@/api/axios/useAxios';

// 스토어 그룹 관리 리스트
export const getStoreGroupListApi = async param => {
  try {
    return await AXIOS_GET('/store/group', param);
  } catch (e) {
    throw e;
  }
};

// 스토어 그룹 상세 리스트
export const getStoreGroupDetailListApi = async (id, param) => {
  try {
    return await AXIOS_GET(`/store/group/detail/${id}`, param);
  } catch (e) {
    throw e;
  }
};

// 스토어 그룹 상세 리스트 주문 이름 상태 변경
export const updateStoreGroupNameDetailApi = async (id, groupName) => {
  try {
    return await AXIOS_PATCH(`/store/group/detail/${id}?groupName=${groupName}`);
  } catch (e) {
    throw e;
  }
};

// 스토어 그룹 상세 리스트 전체 주문 상태 변경
export const updateStoreGroupDetailAutoOrderStatusApi = async (id, params) => {
  try {
    return await AXIOS_PATCH(`/store/group/detail/auto-order/all/${id}?autoOrderStatus=${params}`);
  } catch (e) {
    throw e;
  }
};

// 스토어 그룹 상세 리스트 전체 주문 상태 변경
export const updateStoreGroupDetailOnceAutoApi = async params => {
  try {
    return await AXIOS_PATCH(`/store/group/detail/auto-order/list?${params}`);
  } catch (e) {
    throw e;
  }
};
