import { createSlice } from '@reduxjs/toolkit';
import { SettingMemberInit } from '@/store/initialState';

const initialState = {
  ...SettingMemberInit,
  totalElements: 0,
};

export const settingMemberSlice = createSlice({
  name: 'settingMember',
  initialState,
  reducers: {
    getSettingAdminMemberListAction: (state, action) => {
      return state;
    },
    insertSettingAdminMemberListAction: (state, action) => {
      state.content = action.payload.content;
    },
    getSettingAdminMemberLevelDropsAction: (state, action) => {
      return state;
    },
    insertSettingAdminMemberLevelDropsAction: (state, action) => {
      state.level = action.payload.level;
    },
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
    settingAdminMemberReset: state => {
      Object.assign(state, initialState);
    },
    deleteSettingAdminMemberListAction: state => {
      return state;
    },
    deleteSettingIPListAction: state => {
      return state;
    },
    settingAdminIpListAction: (state, action) => {
      return state;
    },
    createIpAction: (state, action) => {
      return state;
    },
    insertSettingAdminIpListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
  },
});
export const {
  insertSettingAdminMemberListAction,
  insertSettingAdminIpListAction,
  settingAdminMemberReset,
  deleteSettingIPListAction,
  createIpAction,
  deleteSettingAdminMemberListAction,
  getSettingAdminMemberListAction,
  insertSettingAdminMemberLevelDropsAction,
  getSettingAdminMemberLevelDropsAction,
  settingAdminIpListAction,
  changeSearchData,
} = settingMemberSlice.actions;

export default settingMemberSlice.reducer;
