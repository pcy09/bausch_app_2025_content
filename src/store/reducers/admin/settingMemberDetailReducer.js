import { createSlice } from '@reduxjs/toolkit';
import { SettingMemberDetailInit } from '@/store/initialState';

const initialState = {
  ...SettingMemberDetailInit,
  totalElements: 0,
};

export const settingMemberDetailSlice = createSlice({
  name: 'settingMemberDetail',
  initialState,
  reducers: {
    getSettingAdminMemberDetailAction: (state, action) => {
      return state;
    },
    insertSettingAdminMemberDetailListAction: (state, action) => {
      state.content = action.payload.content;
    },
    settingAdminMemberDetailReset: state => {
      Object.assign(state, initialState);
    },
    updateSettingMemberDetailAction: (state, action) => {
      return state;
    },
    updateSettingMemberPwResetAction: (state, action) => {
      return state;
    },
    getSettingAdminPermissionAction: (state, action) => {
      return state;
    },
    insertSettingAdminPermissionAction: (state, action) => {
      state.content = action.payload.content;
    },
    updateSettingPermissionAction: (state, action) => {
      return state;
    },
    updateSettingChangePwAction: (state, action) => {
      return state;
    },
  },
});
export const {
  getSettingAdminMemberDetailAction,
  updateSettingMemberDetailAction,
  insertSettingAdminPermissionAction,
  getSettingAdminPermissionAction,
  updateSettingPermissionAction,
  updateSettingChangePwAction,
  updateSettingMemberPwResetAction,
  insertSettingAdminMemberDetailListAction,
  settingAdminMemberDetailReset,
} = settingMemberDetailSlice.actions;

export default settingMemberDetailSlice.reducer;
