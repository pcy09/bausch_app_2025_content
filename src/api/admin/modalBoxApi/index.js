import { AXIOS_DELETE, AXIOS_GET, AXIOS_POST, AXIOS_PUT } from '@/api/axios/useAxios';

// 제품 변경
export const updateCouponProductApi = async sendObject => {
  try {
    return await AXIOS_PUT(`/transaction/coupon/detail`, sendObject);
  } catch (e) {
    throw e;
  }
};
