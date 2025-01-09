import {
  AXIOS_DELETE,
  AXIOS_FILE_UPDATE,
  AXIOS_FILE_UPLOAD,
  AXIOS_GET,
  AXIOS_PATCH,
  AXIOS_POST,
  AXIOS_MULTI_PATCH,
  AXIOS_BODY_DELETE,
} from '@/api/axios/useAxios';

//캠페인 쿠폰 관리 상세 대상 스토어 그룹 조회
export const getCampaignCouponDetailStoreListApi = async params => {
  try {
    const { storeCode, storeIds, storeGroupIds } = params;
    const storeIdQueryString = storeIds.map(id => `storeIds=${id}`).join('&');
    // storeGroupIds도 동일한 방식으로 처리합니다.
    const storeGroupIdQueryString = storeGroupIds ? storeGroupIds.map(id => `storeGroupIds=${id}`).join('&') : '';
    const queryString = `storeCode=${storeCode}&${storeIdQueryString}&${storeGroupIdQueryString}`;
    return await AXIOS_GET(`/coupon/target-store/group?${queryString}`);
  } catch (e) {
    throw e;
  }
};

//캠페인 쿠폰 관리 상세 대상 스토어 그룹 삭제
export const deleteCampaignDetailStoreApi = async params => {
  try {
    const { storeId, storeIds } = params;

    // storeId가 있을 경우 이를 storeIds에 추가합니다.
    const allStoreIds = storeIds ? [...storeIds, storeId] : [storeId];

    // allStoreIds를 사용하여 쿼리 스트링을 생성합니다.
    const storeIdQueryString = allStoreIds.map(id => `storeIds=${id}`).join('&');
    const queryString = `storeId=${storeId}&${storeIdQueryString}`;
    return await AXIOS_DELETE(`/coupon/target-store/group?${queryString}`);
  } catch (e) {
    throw e;
  }
};

//캠페인 쿠폰 관리 대상스토어 엑셀 데이터 미리보기
export const uploadCampaignDetailStoreExcelApi = async sendObject => {
  try {
    return await AXIOS_FILE_UPLOAD('/coupon/target-store/excel/list', sendObject);
  } catch (e) {
    throw e;
  }
};

//캠페인 쿠폰 관리 대상스토어 엑셀 데이터 등록하기
export const registerStoreFromExcelApi = async sendObject => {
  try {
    return await AXIOS_POST('/coupon/target-store/excel/merge', sendObject);
  } catch (e) {
    throw e;
  }
};
//캠페인 쿠폰 관리 대상스토어 엑셀 데이터 제외하기
export const deleteStoreFromExcelApi = async sendObject => {
  try {
    return await AXIOS_BODY_DELETE('/coupon/target-store/store-set/remove', sendObject);
  } catch (e) {
    throw e;
  }
};

//쿠폰 캠패인 상세에서 스토어 그룹 리스트 등록
export const postCampaignDetailStoreMergeApi = async payload => {
  const { storeIds, storeGroupIds } = payload;
  try {
    return await AXIOS_POST(`/coupon/target-store/store-set/merge`, payload);
  } catch (e) {
    throw e;
  }
};

//캠페인 쿠폰 관리 상세 대상 스토어 그룹 삭제
export const deleteCampaignDetailStoreMergeApi = async storeIds => {
  try {
    const queryParams = storeIds.map(id => `storeIds=${id}`).join('&');
    return await AXIOS_DELETE(`/coupon/target-store/store-set/remove?${queryParams}`);
  } catch (e) {
    throw e;
  }
};

//쿠폰 등록 버튼용
export const deleteCouponClickApi = async () => {
  try {
    return await AXIOS_DELETE(`/coupon/store-set/remove-all`);
  } catch (e) {
    throw e;
  }
};

//대상 스토어 개별 삭제 api
export const deleteStoreSetListApi = async ids => {
  try {
    const idsQueryString = ids.map(ids => `ids=${ids}`).join('&');
    return await AXIOS_DELETE(`/coupon/store-set/remove-list?${idsQueryString}`);
  } catch (e) {
    throw e;
  }
};

//쿠폰 관리 상세 리스트
export const getCouponDetailListApi = async id => {
  try {
    return await AXIOS_GET(`/coupon/detail/${id}`);
  } catch (e) {
    throw e;
  }
};

// 쿠폰 수정
export const updateCouponApi = async sendObject => {
  try {
    const { data, files } = sendObject;
    return await AXIOS_MULTI_PATCH('/coupon/detail', data, files);
  } catch (e) {
    throw e;
  }
};
