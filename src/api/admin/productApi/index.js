import {
  AXIOS_DELETE,
  AXIOS_FILE_UPLOAD,
  AXIOS_GET,
  AXIOS_MULTI_UPLOAD,
  AXIOS_PATCH,
  AXIOS_POST,
  AXIOS_PRODUCT_PATCH,
  AXIOS_PRODUCT_UPLOAD,
  AXIOS_PUT,
  AXIOS_SKU,
} from '@/api/axios/useAxios';

// 제품 리스트 호출 api
export const getProductListApi = async params => {
  try {
    return await AXIOS_GET('/product-bausch', params);
  } catch (e) {
    throw e;
  }
};

// 제품 리스트 호출 api (lensly)
export const getProductLesnlyListApi = async params => {
  try {
    return await AXIOS_GET('/product-lensly', params);
  } catch (e) {
    throw e;
  }
};

// 제품 등록 api
export const createProductApi = async sendObject => {
  try {
    return await AXIOS_POST(`/product-bausch`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 제품 등록(lenlsy) api
export const createProductLenslyApi = async sendObject => {
  try {
    return await AXIOS_POST(`/product-lensly`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 제품 상세 호출 api
export const getProductDetailApi = async id => {
  try {
    return await AXIOS_GET(`/product-bausch/detail/${id}`);
  } catch (e) {
    throw e;
  }
};
// 제품 상세 호출 api(lnesly)
export const getProductLenslyDetailApi = async id => {
  try {
    return await AXIOS_GET(`/product-lensly/detail/${id}`);
  } catch (e) {
    throw e;
  }
};

// 상품정보관리 > 상세 호출 API
export const getProductInfoDetailApi = async id => {
  try {
    return await AXIOS_GET(`/product-bausch/info/${id}`);
  } catch (e) {
    throw e;
  }
};

// 상품정보관리 > 상세 호출 API (Lensly)
export const getProductLenslyInfoDetailApi = async id => {
  try {
    return await AXIOS_GET(`/product-lensly/info/${id}`);
  } catch (e) {
    throw e;
  }
};
// 제품 수정 api
export const updateProductApi = async (id, productBauschReqDto) => {
  try {
    return await AXIOS_PATCH(`/product-bausch/detail/${id}`, productBauschReqDto);
  } catch (e) {
    throw e;
  }
};
// 제품 수정 api(lensly)
export const updateLenslyProductApi = async (id, productLenslyReqDto) => {
  try {
    return await AXIOS_PATCH(`/product-lensly/detail/${id}`, productLenslyReqDto);
  } catch (e) {
    throw e;
  }
};

// 제품 sku 업로드
export const skuUploadApi = async formData => {
  try {
    return await AXIOS_FILE_UPLOAD('/product-bausch/upload-sku', formData);
  } catch (e) {
    throw e;
  }
};

// 제품 sku 업로드(lensly)
export const skuLenslyUploadApi = async formData => {
  try {
    return await AXIOS_FILE_UPLOAD('/product-lensly/upload-sku', formData);
  } catch (e) {
    throw e;
  }
};

// 제품 그룹 리스트 api
export const getProductGroupListApi = async () => {
  try {
    return await AXIOS_GET('/product-bausch/group');
  } catch (e) {
    throw e;
  }
};
// 제품 그룹 리스트(lensly) api
export const getProductLenslyGroupListApi = async () => {
  try {
    return await AXIOS_GET('/product-lensly/group');
  } catch (e) {
    throw e;
  }
};

// 제품 삭제
export const deleteProductApi = async ids => {
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/product-bausch?${queryString}`);
  } catch (e) {
    throw e;
  }
};

// 제품 삭제(lensly)
export const deleteLenslyProductApi = async ids => {
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/product-lensly?${queryString}`);
  } catch (e) {
    throw e;
  }
};

// 제품 그룹 등록
export const createProductGroupApi = async sendObject => {
  try {
    return await AXIOS_POST('/product-bausch/group', sendObject);
  } catch (e) {
    throw e;
  }
};

// 제품 그룹 등록(렌즐리)
export const createLenslyProductGroupApi = async sendObject => {
  try {
    return await AXIOS_POST('/product-lensly/group', sendObject);
  } catch (e) {
    throw e;
  }
};

// 제품 그룹 삭제
export const deleteProductGroupApi = async id => {
  try {
    return await AXIOS_DELETE(`/product-bausch/group/${id}`);
  } catch (e) {
    throw e;
  }
};

// 제품 그룹 삭제(lensly)
export const deleteLenslyProductGroupApi = async id => {
  try {
    return await AXIOS_DELETE(`/product-lensly/group/${id}`);
  } catch (e) {
    throw e;
  }
};

// 제품 그룹 수정
export const updateProductGroupApi = async (id, sendObject) => {
  try {
    return await AXIOS_PUT(`/product-bausch/group/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};
// 제품 그룹 수정(lensly)
export const updateLenslyProductGroupApi = async (id, sendObject) => {
  try {
    return await AXIOS_PUT(`/product-lensly/group/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 증정 제품 리스트
export const giftProductListApi = async () => {
  try {
    return await AXIOS_GET(`/product-bausch/gift`);
  } catch (e) {
    throw e;
  }
};

// 증정 제품 리스트(lensly)
export const giftLenslyProductListApi = async () => {
  try {
    return await AXIOS_GET(`/product-lensly/gift`);
  } catch (e) {
    throw e;
  }
};

// 증정 제품 등록
export const giftProductCreateApi = async sendObject => {
  try {
    return await AXIOS_POST(`/product-bausch/gift`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 증정 제품 등록(lensly)
export const giftLenslyProductCreateApi = async sendObject => {
  try {
    return await AXIOS_POST(`/product-lensly/gift`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 증정 제품 삭제
export const giftProductDeleteApi = async id => {
  try {
    return await AXIOS_DELETE(`/product-bausch/gift?id=${id}`);
  } catch (e) {
    throw e;
  }
};

// 증정 제품 삭제(lensly)
export const giftLenslyProductDeleteApi = async id => {
  try {
    return await AXIOS_DELETE(`/product-lensly/gift?id=${id}`);
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

// 상품등록 ( 바슈롬 )
export const createProductInfoApi = async sendObject => {
  try {
    const { data, files } = sendObject;
    return await AXIOS_PRODUCT_UPLOAD(`/product-bausch/info`, data, files);
  } catch (e) {
    throw e;
  }
};

// 상품등록 ( 렌즐리 )
export const createProductLenslyInfoApi = async sendObject => {
  try {
    const { data, files } = sendObject;
    return await AXIOS_PRODUCT_UPLOAD(`/product-lensly/info`, data, files);
  } catch (e) {
    throw e;
  }
};
// 상품수정 ( 바슈롬 )
export const updateProductInfoApi = async (sendObject, id) => {
  try {
    const { data, files } = sendObject;
    return await AXIOS_PRODUCT_PATCH(`/product-bausch/info/${id}`, data, files);
  } catch (e) {
    throw e;
  }
};

// 상품수정 ( 렌즐리 )
export const updateProductLenslyInfoApi = async (sendObject, id) => {
  try {
    const { data, files } = sendObject;
    return await AXIOS_PRODUCT_PATCH(`/product-lensly/info/${id}`, data, files);
  } catch (e) {
    throw e;
  }
};

// 이미지 삭제 (바슈롬)
export const deleteEditorImageApi = async params => {
  try {
    return await AXIOS_DELETE(`/product-bausch/info/image${params}`);
  } catch (e) {
    throw e;
  }
};
// 이미지 삭제 (렌즐리)
export const deleteEditorLenslyImageApi = async params => {
  try {
    return await AXIOS_DELETE(`/product-lensly/info/image${params}`);
  } catch (e) {
    throw e;
  }
};
