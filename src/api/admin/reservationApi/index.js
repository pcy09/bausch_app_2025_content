import { AXIOS_GET, AXIOS_POST, AXIOS_PATCH, AXIOS_DELETE } from '@/api/axios/useAxios';

// 예약완료 리스트
export const getReservationListApi = async params => {
  try {
    return await AXIOS_GET('/reservation', params);
  } catch (e) {
    throw e;
  }
};

// 예약 상태 변경
export const changeReservationStatusApi = async sendObject => {
  try {
    return await AXIOS_POST('reservation/status', sendObject);
  } catch (e) {
    throw e;
  }
};
