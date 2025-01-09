import { AXIOS_DELETE, AXIOS_FILE_UPLOAD, AXIOS_GET, AXIOS_PATCH, AXIOS_POST, AXIOS_PUT, AXIOS_SKU } from '@/api/axios/useAxios';

// 제품 리스트 호출 api
export const getPointLogListApi = async params => {
  try {
    return await AXIOS_GET('/point/history', params);
  } catch (e) {
    throw e;
  }
};
