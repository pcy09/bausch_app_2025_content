import { AXIOS_DELETE, AXIOS_FILE_UPLOAD, AXIOS_GET, AXIOS_POST } from '@/api/axios/useAxios';

// 이벤트 리스트
export const getEventListApi = async param => {
  try {
    return await AXIOS_GET('/event', param);
  } catch (e) {
    throw e;
  }
};

// 이벤트 등록
export const registerEventApi = async sendObject => {
  try {
    return await AXIOS_FILE_UPLOAD('/event', sendObject);
  } catch (e) {
    throw e;
  }
};

// 이벤트 수정
export const updateEventApi = async (sendObject, id) => {
  try {
    console.log(sendObject, id);
    return await AXIOS_FILE_UPLOAD(`/event/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 이벤트 상세
export const getEventDetailApi = async id => {
  try {
    return await AXIOS_GET(`/event/${id}?type=admin`);
  } catch (e) {
    throw e;
  }
};

// 이벤트 삭제
export const deleteEventApi = async id => {
  try {
    return await AXIOS_DELETE(`/event/${id}`);
  } catch (e) {
    throw e;
  }
};

// 이벤트 관심 상품 리스트
export const interestEventProductApi = async () => {
  try {
    return await AXIOS_GET(`/event-interest/select-list`);
  } catch (e) {
    throw e;
  }
};
