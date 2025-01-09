import { AXIOS_GET, AXIOS_POST, AXIOS_PATCH, AXIOS_DELETE } from '@/api/axios/useAxios';

// 제품문의 리스트 가져오기
export const getProductInquiryApi = async params => {
  try {
    return await AXIOS_GET('/admin-qa/list', params);
  } catch (e) {
    throw e;
  }
};

// 제품문의 답변 등록/수정/삭제
export const updateProductInquiryApi = async sendObject => {
  try {
    return await AXIOS_PATCH('/admin-qa/answer', sendObject);
  } catch (e) {
    throw e;
  }
};

// 제품문의 상세 가져오기
export const getProductInquiryDetailApi = async id => {
  try {
    return await AXIOS_GET(`/admin-qa/detail/${id}`);
  } catch (e) {
    throw e;
  }
};
