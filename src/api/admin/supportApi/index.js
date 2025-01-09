import { AXIOS_GET, AXIOS_POST, AXIOS_PATCH, AXIOS_DELETE } from '@/api/axios/useAxios';

// 픽업가이드 내용가져오기
export const getPickupGuideContentApi = async () => {
  try {
    return await AXIOS_GET('/pickup?type=admin');
  } catch (e) {
    throw e;
  }
};

// 픽업가이드 등록 및 수정
export const registerPickupGuideApi = async sendObject => {
  try {
    return await AXIOS_POST('/pickup', sendObject);
  } catch (e) {
    throw e;
  }
};

// 이용가이드 리스트 가져오기
export const getUseInfoApi = async () => {
  try {
    return await AXIOS_GET('/use-info?type=admin');
  } catch (e) {
    throw e;
  }
};

// 이용가이드 등록/수정/삭제
export const updateUseInfoApi = async sendObject => {
  try {
    return await AXIOS_POST('/use-info', sendObject);
  } catch (e) {
    throw e;
  }
};

// faq(자주 묻는 질문) 리스트 가져오기
export const getFaqApi = async () => {
  try {
    return await AXIOS_GET('/faq?type=admin');
  } catch (e) {
    throw e;
  }
};

// faq(자주 묻는 질문) 등록/수정/삭제
export const updateFaqApi = async sendObject => {
  try {
    return await AXIOS_POST('/faq', sendObject);
  } catch (e) {
    throw e;
  }
};

// 이용약관 리스트
export const getTermsListApi = async params => {
  try {
    return await AXIOS_GET('/terms', params);
  } catch (e) {
    throw e;
  }
};

// 이용약관 상세
export const getTermsDetailApi = async id => {
  try {
    return await AXIOS_GET(`/terms/${id}`);
  } catch (e) {
    throw e;
  }
};

// 이용약관 등록
export const registerTermsApi = async sendObject => {
  try {
    return await AXIOS_POST('/terms', sendObject);
  } catch (e) {
    throw e;
  }
};

// 이용약관 업데이트
export const updateTermsApi = async (id, sendObject) => {
  try {
    return await AXIOS_PATCH(`/terms/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 이용약관 삭제
export const deleteTermsApi = async id => {
  try {
    return await AXIOS_DELETE(`/terms/${id}`);
  } catch (e) {
    throw e;
  }
};
