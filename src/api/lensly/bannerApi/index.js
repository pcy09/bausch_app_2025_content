import { AXIOS_DELETE, AXIOS_FILE_UPLOAD, AXIOS_GET, AXIOS_PATCH, AXIOS_POST } from '@/api/axios/useAxios';

// 배너 리스트
export const getBannerListApi = async () => {
  try {
    return await AXIOS_GET('/banner');
  } catch (e) {
    throw e;
  }
};

// 배너 등록
export const registerBannerApi = async sendObject => {
  try {
    return await AXIOS_FILE_UPLOAD('/banner', sendObject);
  } catch (e) {
    throw e;
  }
};

// 배너 삭제
export const deleteBannerApi = async sendObject => {
  try {
    return await AXIOS_POST(`/banner/delete`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 배너 정보 수정 (이미지 제외)
export const updateBannerApi = async sendObject => {
  try {
    return await AXIOS_PATCH(`/banner`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 배너 이미지 수정
export const updateThumbnailApi = async sendObject => {
  try {
    return await AXIOS_FILE_UPLOAD('/banner/update/image', sendObject);
  } catch (e) {
    throw e;
  }
};
