import { AXIOS_DELETE, AXIOS_FILE_UPLOAD, AXIOS_GET, AXIOS_POST } from '@/api/axios/useAxios';

// 제품 리스트 호출 api
export const getProductListApi = async params => {
  try {
    return await AXIOS_GET('/product', params);
  } catch (e) {
    throw e;
  }
};

// 제품 상세 호출 api
export const getProductDetailApi = async id => {
  try {
    return await AXIOS_GET(`/product/${id}`);
  } catch (e) {
    throw e;
  }
};
// 제품 등록 단계이동
export const sendNextStepApi = async (id, sendObject) => {
  try {
    return await AXIOS_POST(`/product/${id}/next`, sendObject);
  } catch (e) {
    throw e;
  }
};

// STEP 1 : 제품 SKU 엑셀 업로드 api
export const uploadSkuApi = async sendObject => {
  try {
    return await AXIOS_FILE_UPLOAD('/product/sku', sendObject);
  } catch (e) {
    throw e;
  }
};

// STEP 2 : 제품 기본정보 등록 api
export const upsertProductBasicInfoApi = async (id, sendObject) => {
  try {
    return await AXIOS_POST(`/product/${id}/basic`, sendObject);
  } catch (e) {
    throw e;
  }
};

// STEP 3 : 제품 상세 정보 등록 api
export const upsertProductDetailInfoApi = async (id, sendObject) => {
  try {
    return await AXIOS_POST(`/product/${id}/detail`, sendObject);
  } catch (e) {
    throw e;
  }
};

// STEP 4 : 제품 이미지 등록 api
export const upsertProductImagesInfoApi = async (id, sendObject) => {
  try {
    return await AXIOS_FILE_UPLOAD(`/product/${id}/images`, sendObject);
  } catch (e) {
    throw e;
  }
};
// STEP 4 : 제품 이미지 삭제 api
export const deleteProductImagesApi = async (id, params) => {
  try {
    return await AXIOS_DELETE(`/product/${id}/images?type=${params?.type}&imageId=${params?.imageId}`);
  } catch (e) {
    throw e;
  }
};

// STEP 5 : 제품 가격 정보 등록 api
export const upsertProductPriceInfoApi = async (id, sendObject) => {
  try {
    return await AXIOS_POST(`/product/${id}/price`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 최종 제품 등록
export const publishProductApi = async (id, sendObject) => {
  try {
    return await AXIOS_POST(`/product/${id}/publish`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 제품 삭제
export const deleteProductApi = async sendObject => {
  try {
    return await AXIOS_POST(`/product/list/delete`, sendObject);
  } catch (e) {
    throw e;
  }
};
