import { AXIOS_DELETE, AXIOS_GET, AXIOS_PATCH, AXIOS_PUT } from '@/api/axios/useAxios';

//어드민 회원 상세
export const getSettingAdminMemberDetailApi = async id => {
  try {
    return await AXIOS_GET(`/admin/${id}`);
  } catch (e) {
    throw e;
  }
};

// 어드민 회원 상세 수정
export const updateSettingAdminMemberDetailApi = async (id, sendObject) => {
  try {
    return await AXIOS_PATCH(`/admin/${id}`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 어드민 회원 비밀번호 초기화
export const updateSettingAdminMemberPwResetApi = async id => {
  try {
    return await AXIOS_PATCH(`/admin/${id}/reset-pw`);
  } catch (e) {
    throw e;
  }
};

//어드민 권한 설정
export const getSettingAdminPermissionApi = async () => {
  try {
    return await AXIOS_GET(`/admin/permission`);
  } catch (e) {
    throw e;
  }
};

//어드민 권한 설정 수정
export const updateSettingAdminPermissionApi = async sendObject => {
  try {
    console.log('updateSettingAdminPermissionApi sendObject:', sendObject);
    const updateAdminLevelDto = sendObject;
    return await AXIOS_PATCH(`/admin/permission`, updateAdminLevelDto);
  } catch (e) {
    throw e;
  }
};

//어드민 권한 설정
export const getSettingAdminChangePwApi = async sendObject => {
  try {
    return await AXIOS_PUT(`/admin/change-pw`, sendObject);
  } catch (e) {
    throw e;
  }
};
