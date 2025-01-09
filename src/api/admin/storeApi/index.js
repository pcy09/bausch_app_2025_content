import { AXIOS_GET, AXIOS_PATCH, AXIOS_POST } from '@/api/axios/useAxios';

// 스토어 관리 리스트
export const getStoreListApi = async param => {
  try {
    return await AXIOS_GET('/store', param);
  } catch (e) {
    throw e;
  }
};

// 스토어 상세
export const getStoreDetailApi = async id => {
  try {
    return await AXIOS_GET(`/store/detail/${id}`);
  } catch (e) {
    throw e;
  }
};

// 스토어 상세 안경원
export const getStoreDetailOpticianApi = async id => {
  try {
    return await AXIOS_GET(`/store/detail/${id}/optician`);
  } catch (e) {
    throw e;
  }
};

// 스토어 상세 적립금 현황
export const getStoreDetailPointApi = async param => {
  try {
    const response = await AXIOS_GET(`/store/detail/point`, param);
    return response.data;
  } catch (e) {
    throw e;
  }
};

//스토어 상세에서 적립금 등록
export const postStoreDetailPointCreateApi = async (id, sendObject) => {
  try {
    return await AXIOS_POST(`/store/point/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 스토어 상세 업데이트
export const updateStoreDetailApi = async (id, sendObject) => {
  try {
    return await AXIOS_PATCH(`/store/detail/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 스토어 상세 적립금 현황
export const getStorePointDetailApi = async (id, param) => {
  try {
    const response = await AXIOS_GET(`/store/detail/point?storeId=${id}`, param);
    return response.data;
  } catch (e) {
    throw e;
  }
};

// 스토어 상세 적립금 현황
export const getStoreDetailPointModalApi = async id => {
  try {
    const response = await AXIOS_GET(`/store/point/detail/${id} `);
    return response.data;
  } catch (e) {
    throw e;
  }
};

// 스토어 상세 적립금 현황 업데이트
export const updateStoreDetailPointApi = async sendObject => {
  try {
    return await AXIOS_PATCH(`/store/point/detail`, sendObject);
  } catch (e) {
    throw e;
  }
};
