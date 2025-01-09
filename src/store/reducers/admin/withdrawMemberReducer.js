import { withdrawMember } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

const initialState = withdrawMember;

export const withdrawMemberSlice = createSlice({
  name: 'withdrawMember',
  initialState,

  reducers: {
    getWithdrawMemberListAction: (state, action) => {
      return state;
    },
    insertWithdrawMemberListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    changeWithdrawMemberSearchDataAction: (state, action) => {
      state.search = action.payload;
    },
    recoveryWithdrawnMemberAction: (state, action) => {
      return state;
    },
    withdrawnMemberDeletionAction: (state, action) => {
      return state;
    },
    withdrawnMemberAction: (state, action) => {
      return state;
    },
    withdrawMemberResetAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getWithdrawMemberListAction,
  insertWithdrawMemberListAction,
  changeWithdrawMemberSearchDataAction,
  withdrawMemberResetAction,
  recoveryWithdrawnMemberAction,
  withdrawnMemberDeletionAction,
  withdrawnMemberAction,
} = withdrawMemberSlice.actions;

export default withdrawMemberSlice.reducer;
