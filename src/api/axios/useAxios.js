import { Cookies } from 'react-cookie';
import AXIOS from './axios';

const searchParam = key => {
  return new URLSearchParams(location.search).get(key);
};

export const getAuthHeader = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const header = {
    Authorization: token ? `Bearer ${token}` : null,
    // 'Access-Control-Allow-Credentials': false,
  };

  return header;
};

// 일반 GET 요청
export const AXIOS_GET = async (url, params = {}) => {
  const headers = getAuthHeader();

  try {
    const { data } = await AXIOS.get(url, { params, headers });
    return data;
  } catch (e) {
    throw e;
  }
};

// READ POST 요청 ( 단순 DATA Fetching )
export const AXIOS_POST = async (url, sendObject) => {
  const headers = getAuthHeader();

  try {
    const { data } = await AXIOS.post(url, sendObject, { headers });
    return data;
  } catch (e) {
    throw e;
  }
};

// FORM DATA(제품)
export const AXIOS_SKU = async (url, formData) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token');

    // console.log(token, '토큰----------------------------------------');
    const headers = {
      Authorization: token ? `Bearer ${token}` : null,
    };

    const { data } = await AXIOS.post(url, formData, { headers });
    return data;
  } catch (e) {
    throw e;
  }
};

// FORM DATA
export const AXIOS_FILE_UPLOAD = async (url, sendObject) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token');

    const headers = {
      Authorization: token ? `Bearer ${token}` : null,
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    };

    const { data } = await AXIOS.post(url, sendObject, { headers });
    return data;
  } catch (e) {
    throw e;
  }
};

// FORM DATA
export const AXIOS_FILE_UPDATE = async (url, sendObject) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token');

    const headers = {
      Authorization: token ? `Bearer ${token}` : null,
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    };

    const { data } = await AXIOS.patch(url, sendObject, { headers });
    return data;
  } catch (e) {
    throw e;
  }
};

// FORM DATA
export const AXIOS_MULTI_UPLOAD = async (url, data, files) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token');

    // JSON 데이터를 Blob으로 변환
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('data', blob);
    // console.log('formData', formData);
    // console.log('data', blob);
    // 파일들을 FormData에 추가
    for (let i = 0; i < files.length; i++) {
      formData.append('multipartFile', files[i]);
    }

    const headers = {
      Authorization: token ? `Bearer ${token}` : null,
      'Access-Control-Allow-Origin': '*',
    };

    // 파일과 JSON 데이터를 함께 전송
    const { data: responseData } = await AXIOS.post(url, formData, { headers });
    return responseData;
  } catch (e) {
    throw e;
  }
};

// FORM DATA ( 상품등록 )
export const AXIOS_PRODUCT_UPLOAD = async (url, data, files) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token');

    // JSON 데이터를 Blob으로 변환
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('data', blob);

    formData.append('thumbFile', files[0]);
    formData.append('headFile', files[1]);

    const headers = {
      Authorization: token ? `Bearer ${token}` : null,
      'Access-Control-Allow-Origin': '*',
    };

    // 파일과 JSON 데이터를 함께 전송
    const { data: responseData } = await AXIOS.post(url, formData, { headers });
    return responseData;
  } catch (e) {
    throw e;
  }
};

// FORM DATA ( 상품수정 )
export const AXIOS_PRODUCT_PATCH = async (url, data, files) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token');

    // JSON 데이터를 Blob으로 변환
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('data', blob);

    const thumbFile = files.thumbFile;
    const headFile = files.headFile;

    // 파일들을 FormData에 추가
    if (thumbFile.length > 0) {
      for (let i = 0; i < thumbFile.length; i++) {
        formData.append('thumbFile', thumbFile[i]);
      }
    } else {
      // 빈 파일 객체 생성 (썸네일x)
      formData.append('thumbFile', new Blob(), 'emptyFile');
    }

    // 파일들을 FormData에 추가
    if (headFile.length > 0) {
      for (let i = 0; i < headFile.length; i++) {
        formData.append('headFile', headFile[i]);
      }
    } else {
      // 빈 파일 객체 생성 (썸네일x)
      formData.append('headFile', new Blob(), 'emptyFile');
    }

    const headers = {
      Authorization: token ? `Bearer ${token}` : null,
      'Access-Control-Allow-Origin': '*',
    };

    // 파일과 JSON 데이터를 함께 전송
    const { data: responseData } = await AXIOS.patch(url, formData, { headers });
    return responseData;
  } catch (e) {
    throw e;
  }
};

// FORM DATA
export const AXIOS_MULTI_PATCH = async (url, data, files) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get('token');

    // JSON 데이터를 Blob으로 변환
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('data', blob);

    // 파일들을 FormData에 추가
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('multipartFile', files[i]);
      }
    } else {
      // 빈 파일 객체 생성 (썸네일x)
      formData.append('multipartFile', new Blob(), 'emptyFile');
    }

    const headers = {
      Authorization: token ? `Bearer ${token}` : null,
      'Access-Control-Allow-Origin': '*',
    };

    // 파일과 JSON 데이터를 함께 전송

    const { data: responseData } = await AXIOS.patch(url, formData, { headers });
    return responseData;
  } catch (e) {
    throw e;
  }
};

// CREATE, UPDATE, DELETE POST 요청 ( DATA 수정 요청 )

// PUT
export const AXIOS_PUT = async (url, sendObject) => {
  const headers = getAuthHeader();
  const { data } = await AXIOS.put(url, sendObject, { headers });
  return data;
};

// PATCH
export const AXIOS_PATCH = async (url, sendObject) => {
  const headers = getAuthHeader();
  try {
    const { data } = await AXIOS.patch(url, sendObject, { headers });
    return data;
  } catch (e) {
    throw e;
  }
};

// DELETE
export const AXIOS_DELETE = async (url, sendObject) => {
  const headers = getAuthHeader();
  // console.log('AXIOS_DELETE', url, headers, sendObject);
  const { data } = await AXIOS.delete(url, sendObject, { headers, validateStatus: status => status < 500 });
  return data;
};
export const AXIOS_BODY_DELETE = async (url, sendObject) => {
  const headers = getAuthHeader();
  const config = {
    data: sendObject,
    headers,
    validateStatus: status => status < 500,
  };
  const { data } = await AXIOS.delete(url, config);
  return data;
};
