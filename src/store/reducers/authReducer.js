import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  adminId: '',
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.adminId = action.payload.data?.manager_email;
      return state;
    },
    setAccessToken: (state, action) => {},
    signUpAction: (state, action) => {
      return state;
    },
    logoutAction: (state, action) => {
      return state;
    },
    tokenRenewalAction: (state, action) => {
      // 토큰 갱신을 사가에서 처리하므로 상태 변경 로직은 필요 없음
      return state;
    },
  },
});

export const { loginAction, tokenRenewalAction, setAccessToken, signUpAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
