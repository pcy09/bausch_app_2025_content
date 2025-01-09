import { AXIOS_DELETE, AXIOS_FILE_UPLOAD, AXIOS_POST, AXIOS_GET, AXIOS_MULTI_UPLOAD, AXIOS_PATCH } from '@/api/axios/useAxios';

// 캠페인 리스트
export const getCampaignCouponListApi = async param => {
  try {
    return await AXIOS_GET('/coupon', param);
  } catch (e) {
    throw e;
  }
};

// 쿠폰 삭제
export const deleteCampaignCouponApi = async ids => {
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/coupon?${queryString}`);
  } catch (e) {
    throw e;
  }
};

// 재발급 쿠폰 삭제
export const deleteReissueCampaignCouponApi = async ids => {
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/coupon/reissue?${queryString}`);
  } catch (e) {
    throw e;
  }
};
export const updateReissueCampaignCouponExposedApi = async (id, params) => {
  try {
    return await AXIOS_PATCH(`/coupon/reissue/exposed/${id}?exposedStatus=${params}`);
  } catch (e) {
    throw e;
  }
};

export const updateCampaignCouponExposedApi = async params => {
  try {
    return await AXIOS_PATCH(`/coupon/exposed?${params}`);
  } catch (e) {
    throw e;
  }
};

export const getDetailCouponStoreListApi = async param => {
  try {
    return await AXIOS_GET('/coupon/store-set', param);
  } catch (e) {
    throw e;
  }
};

// 쿠폰 등록 페이지 post
export const postCouponCreateApi = async sendObject => {
  try {
    const { data, files } = sendObject;
    return await AXIOS_MULTI_UPLOAD('/coupon', data, files);
  } catch (e) {
    throw e;
  }
};

// 오프라인 쿠폰 발행 post
export const createOfflineCouponApi = async sendObject => {
  try {
    return await AXIOS_POST('/coupon/offline', sendObject);
  } catch (e) {
    console.log(e, 'eeeeeee');
    throw e;
  }
};

// 캠페인 리스트
export const getOfflineCouponApi = async (id, param) => {
  try {
    return await AXIOS_GET(`/coupon/offline/${id}`, param);
  } catch (e) {
    throw e;
  }
};

// 재발급 멤버 검색 api
export const getReissueMemberCouponApi = async param => {
  try {
    return await AXIOS_GET(`/coupon/reissue/member`, param);
  } catch (e) {
    throw e;
  }
};

// 재발급 쿠폰 검색 api
export const getReissueCouponSelectApi = async param => {
  try {
    return await AXIOS_GET(`/coupon/reissue/coupon`, param);
  } catch (e) {
    throw e;
  }
};

// 재발급 쿠폰 등록 api
export const postReissueCouponApi = async sendObject => {
  try {
    return await AXIOS_POST(`/coupon/reissue/coupon`, sendObject);
  } catch (e) {
    throw e;
  }
};
