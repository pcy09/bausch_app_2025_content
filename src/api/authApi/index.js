import { AXIOS_GET, AXIOS_POST, getAuthHeader } from '@/api/axios/useAxios';
import axios from 'axios';

// 토큰 유효성 검사 api
export const validationToken = async () => {
  try {
    return await AXIOS_GET('/auth/authenticate');
  } catch (e) {
    throw e;
  }
};

// 관리자 회원가입 api
export const fetchSignupApi = async sendObject => {
  const headers = getAuthHeader(); // 헤더 추가
  try {
    return await AXIOS_POST('auth/sign-up', sendObject, { headers });
  } catch (e) {
    console.log('responseresponseresponse:::', e.response);
    throw e;
  }
};

// 관리자 로그인 Api
export const fetchLoginApi = async sendObject => {
  try {
    return await AXIOS_POST('/auth/sign-in', sendObject);
  } catch (e) {
    throw e;
  }
};

// 인증 만료시 토큰 재발급 api
export const fetchTokenRenewalApi = async (sendObject, refreshToken) => {
  try {
    return await axios.post('https://bausch-point-dev.hellodigital.site/api/sitemanager/auth/token-renewal', sendObject, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  } catch (e) {
    throw e;
  }
};
// 카카오 테스트 api
export const kakaoLoginTestApi = async params => {
  try {
    return await AXIOS_GET(`/auth/user/kakao`, params);
  } catch (e) {
    throw e;
  }
};
// 네이버 테스트 api
export const naverLoginTestApi = async params => {
  try {
    return await AXIOS_GET(`/auth/user/naver`, params);
  } catch (e) {
    throw e;
  }
};
// 인증번호 요청 api
export const requestNumApi = async sendObject => {
  try {
    return await AXIOS_POST('http://localhost:7070/v1/user/phone', sendObject);
  } catch (e) {
    throw e;
  }
};
export const checkNumApi = async sendObject => {
  try {
    return await AXIOS_POST('http://localhost:7070/v1/user/check/phone', sendObject);
  } catch (e) {
    throw e;
  }
};
