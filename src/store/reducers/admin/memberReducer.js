import { memberInit } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { ...memberInit, totalElements: 0 };

export const memberSlice = createSlice({
  name: 'member',
  initialState,

  reducers: {
    getMemberListAction: (state, action) => {
      return state;
    },
    insertMemberListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    changeSearchDataAction: (state, action) => {
      state.search = action.payload;
    },

    getMemberDetailAction: (state, action) => {
      return state;
    },
    insertMemberDetailAction: (state, action) => {
      state.memberDetail = action.payload.memberDetail;
    },
    updateMemberAction: (state, action) => {
      return state;
    },
    deleteMemberAction: (state, action) => {
      return state;
    },
    memberStoreHistoryAction: state => {
      return state;
    },
    insertMemberStoreHistoryAction: state => {
      state.memberDetail.additionalInfo = action.payload.additionalInfo;
    },
    memberResetAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getMemberListAction,
  insertMemberListAction,
  getMemberDetailAction,
  insertMemberDetailAction,
  memberStoreHistoryAction,
  updateMemberAction,
  memberResetAction,
  insertMemberStoreHistoryAction,
} = memberSlice.actions;

export default memberSlice.reducer;
