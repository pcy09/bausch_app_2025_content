import { AXIOS_GET, AXIOS_POST, AXIOS_DELETE, AXIOS_PATCH } from '@/api/axios/useAxios';

// 적립금 리스트
export const getSavingPointListApi = async () => {
  try {
    return await AXIOS_GET('/point');
  } catch (e) {
    throw e;
  }
};

// 적립금 등록
export const createSavingPointApi = async sendObject => {
  try {
    return await AXIOS_POST('/point', sendObject);
  } catch (e) {
    throw e;
  }
};

// 적립금 삭제
export const deleteSavingPointApi = async ids => {
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/point?${queryString}`);
  } catch (e) {
    throw e;
  }
};

// 적립금 상세
export const getSavingPointDetailApi = async id => {
  try {
    return await AXIOS_GET(`/point/detail/${id}`);
  } catch (e) {
    throw e;
  }
};

// 적립금 수정
export const updateSavingPointDetailApi = async (id, sendObject) => {
  console.log(id, sendObject, 'api');
  try {
    return await AXIOS_PATCH(`/point/detail/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};
