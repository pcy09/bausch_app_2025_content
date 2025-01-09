import { AXIOS_DELETE, AXIOS_FILE_UPLOAD, AXIOS_GET, AXIOS_PATCH, AXIOS_POST } from '@/api/axios/useAxios';

// 안경원 리스트
export const getOpticianListApi = async param => {
  try {
    return await AXIOS_GET('/optician', param);
  } catch (e) {
    throw e;
  }
};

// 안경사 상세
export const getOpticianDetailApi = async (id, params) => {
  try {
    return await AXIOS_GET(`/optician/detail/${id}`, params);
  } catch (e) {
    throw e;
  }
};

// 안경원 노출 수정
export const updateOpticianApi = async (id, sendObject) => {
  try {
    return await AXIOS_PATCH(`/optician/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};
