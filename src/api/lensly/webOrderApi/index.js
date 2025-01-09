import { AXIOS_GET, AXIOS_POST, AXIOS_PATCH, AXIOS_DELETE } from '@/api/axios/useAxios';

// 웹오더 데이터 준비
export const getWebOrderDataApi = async sendObject => {
  try {
    return await AXIOS_POST('/web-order', sendObject);
  } catch (e) {
    throw e;
  }
};

export const asyncWebOrderDataApi = async sendObject => {
  try {
    return await AXIOS_POST('/web-order/async', sendObject);
  } catch (e) {
    throw e;
  }
};

export const getReturnOrderDataApi = async sendObject => {
  try {
    return await AXIOS_POST('/web-order/return', sendObject);
  } catch (e) {
    throw e;
  }
};

export const asyncReturnOrderApi = async sendObject => {
  try {
    return await AXIOS_POST('/web-order/return/async', sendObject);
  } catch (e) {
    throw e;
  }
};
