import { AXIOS_DELETE, AXIOS_FILE_UPLOAD, AXIOS_GET, AXIOS_PATCH, AXIOS_POST, AXIOS_PUT, AXIOS_SKU } from '@/api/axios/useAxios';

// 상품 정보 리스트 호출 api(bausch)
export const getProductInfoListApi = async params => {
  const { tabStatus } = params;

  try {
    return await AXIOS_GET(`/product-${tabStatus ? tabStatus : 'bausch'}/info`, params);
  } catch (e) {
    throw e;
  }
};

// 상품 정보 리스트 호출 api(lensly)
export const getProductInfoLenslyListApi = async params => {
  const { tabStatus } = params;

  try {
    return await AXIOS_GET(`/product-${tabStatus ? tabStatus : 'lensly'}/info`, params);
  } catch (e) {
    throw e;
  }
};

// 상품 정보 삭제
export const deleteProductInfoApi = async obj => {
  const { ids, tabStatus } = obj;
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/product-${tabStatus}/info?${queryString}`);
  } catch (e) {
    throw e;
  }
};

// 상품 정보 노출/비노춣
export const updateProductInfoExposedApi = async p => {
  const { params, tabStatus } = p;
  try {
    return await AXIOS_PATCH(`/product-${tabStatus}/info/exposed?${params}`);
  } catch (e) {
    throw e;
  }
};
