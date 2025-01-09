import { AXIOS_GET, AXIOS_POST } from '@/api/axios/useAxios';

export const getCommonCodeListApi = async () => {
  try {
    return await AXIOS_GET('/enums/common-code');
  } catch (e) {
    throw e;
  }
};

// export const getBrandInfoApi = async () => {
//   try {
//     return await AXIOS_GET('/common-code/brand');
//   } catch (e) {
//     throw e;
//   }
// };
