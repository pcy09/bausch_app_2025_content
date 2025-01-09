import { AXIOS_GET, AXIOS_PATCH, AXIOS_PUT } from '@/api/axios/useAxios';

// 회원 리스트
export const fetchMemberAllListApi = async params => {
  try {
    return await AXIOS_GET('/member', params);
  } catch (e) {
    throw e;
  }
};

// 회원 상세
export const fetchMemberDetailApi = async id => {
  try {
    return await AXIOS_GET(`/member/${id}`);
  } catch (e) {
    throw e;
  }
};

// 회원 업데이트
export const updateMemberApi = async (id, sendObject) => {
  try {
    return await AXIOS_PATCH(`/member/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 회원 삭제
export const deleteMemberApi = async id => {
  try {
    return await AXIOS_DELETE(`/member/${id}`);
  } catch (e) {
    throw e;
  }
};

// 스토어 코드 조회
export const getStoreCodeInquiryApi = async storeCode => {
  try {
    const response = await AXIOS_GET(`/member/store?storeCode=${storeCode} `);
    return response;
  } catch (e) {
    throw e;
  }
};

//스토어 변경
export const updateStoreHistoryApi = async (id, sendObject) => {
  try {
    return await AXIOS_PUT(`/member/${id}/store`, sendObject);
  } catch (e) {
    throw e;
  }
};
