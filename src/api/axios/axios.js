import axios from 'axios';
import { Cookies } from 'react-cookie';
import { reduxWrapper, store } from '@/store/store';
import { setAccessToken } from '@/store/reducers/authReducer';
import { fetchTokenRenewalApi } from '../authApi';
import { Router, useRouter } from 'next/router';
import qs from 'qs';

const URL = process.env.NEXT_PUBLIC_API;
const cookies = new Cookies();

// Axios 인스턴스 생성
const AXIOS = axios.create({
  baseURL: URL,
  withCredentials: false,
  timeout: 30000,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

// 요청 인터셉터 설정 (헤더 설정)
AXIOS.interceptors.request.use(
  config => {
    const token = cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
AXIOS.interceptors.response.use(
  async response => {
    // 토큰이 만료된 경우
    if (response?.data?.status === 412 || response?.status === 412) {
      // refresh토큰을 사용하여 토큰 갱신 및 기존 요청 재시도
      const originalRequest = response.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = cookies.get('refreshToken');
          // refresh토큰 없는 경우 로그아웃
          if (!refreshToken) {
            reduxWrapper.withRedux(store => {
              store.dispatch(logoutAction());
            });
            return Promise.reject(response);
          }
          // 새로 토큰만 갱신
          const tokenResponse = await fetchTokenRenewalApi({ accessToken: cookies.get('token') }, refreshToken);
          // refresh토큰 사용 가능한 경우
          if (tokenResponse?.data?.status === 200) {
            const newToken = tokenResponse?.data?.data?.newAccessToken;
            // const today = new Date(Date.now());
            // console.log('토큰 갱신 시간 : ', today);
            // console.log(newToken, 'newToken');
            // alert('새로 토큰 갱신 받았어!');
            cookies.remove('token', { path: '/' });
            cookies.remove('refreshToken', { path: '/' });

            cookies.set('token', newToken, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }); // 새로운 액세스 토큰 설정 (30일 만료)
            cookies.set('refreshToken', refreshToken, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }); // 리프레시 토큰 재설정 (30일 만료)

            // reduxWrapper.withRedux(store => {
            //   store.dispatch(setAccessToken(newToken));
            // });

            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return AXIOS(originalRequest);
          }
          // refresh토큰 사용 불가능한 경우 (리프레시 만료 또는 유예시간 만료 )
          else if (tokenResponse?.data?.status === 401) {
            // const today = new Date(Date.now());
            // console.log('토큰 만료 시간 : ', today);
            // alert('리프레시 만료거나 유예시간 만료거나!');
            cookies.remove('token', { path: '/' });
            cookies.remove('refreshToken', { path: '/' });
            window.location.href = '/admin/login';
          }
        } catch (e) {
          // 에러발생
          console.error('Token renewal failed:', e);
          cookies.remove('token', { path: '/' });
          cookies.remove('refreshToken', { path: '/' });
          window.location.href = '/admin/login';
        }
      }
      return Promise.reject(response);
    }
    // 무조건 로그아웃 시켜야하는 경우
    else if (response?.data?.status === 401 || response?.status === 401) {
      cookies.remove('token', { path: '/' });
      cookies.remove('refreshToken', { path: '/' });
      window.location.href = '/admin/login';
    }
    return response;
  },
  // 오류 처리
  error => {
    console.error('Response error:', error);
    return Promise.reject(error);
  },
);

export default AXIOS;
