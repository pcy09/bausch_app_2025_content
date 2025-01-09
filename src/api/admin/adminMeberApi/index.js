import { AXIOS_DELETE, AXIOS_GET, AXIOS_PATCH, AXIOS_POST, AXIOS_PUT } from '@/api/axios/useAxios';

// 회원 리스트
export const getSettingAdminMemberApi = async params => {
  try {
    return await AXIOS_GET('/admin', params);
  } catch (e) {
    throw e;
  }
};

// 회원 상세
export const getSettingAdminMemberIpApi = async params => {
  try {
    return await AXIOS_GET(`/admin/ip`, params);
  } catch (e) {
    throw e;
  }
};

// 설정 어드민 회원 삭제
export const deleteSettingAdminMemberApi = async ids => {
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/admin?${queryString}`);
  } catch (e) {
    throw e;
  }
};

// 회원 상세
export const getSettingAdminLevelDropApi = async () => {
  try {
    return await AXIOS_GET(`/admin/drop-level`);
  } catch (e) {
    throw e;
  }
};

// 어드민 아이피 리스트
export const getSettingAdminIpListApi = async params => {
  try {
    return await AXIOS_GET('/admin/ip', params);
  } catch (e) {
    throw e;
  }
};

// 설정 IP 관리 삭제
export const deleteSettingIpListApi = async ids => {
  try {
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return await AXIOS_DELETE(`/admin/ip?${queryString}`);
  } catch (e) {
    throw e;
  }
};

// 설정 IP 등록
export const postSettingIpApi = async sendObject => {
  try {
    return await AXIOS_POST(`/admin/ip`, sendObject);
  } catch (e) {
    throw e;
  }
};
