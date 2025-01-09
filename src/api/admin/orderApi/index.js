import { AXIOS_DELETE, AXIOS_GET, AXIOS_POST, AXIOS_PUT } from '@/api/axios/useAxios';

export const getOrderListApi = async params => {
  try {
    if (Object.keys(params).length === 1) {
      return await AXIOS_GET(`/transaction`, params);
    } else {
      const { channelType, ...rest } = params;
      const newObject = rest;

      params = newObject;
      return await AXIOS_GET(`/transaction`, params);
    }
  } catch (e) {
    throw e;
  }
};
// 웹오더 신청
// export const webOrderApplicationApi = async sendObject => {
//   try {
//     return await AXIOS_POST(`/transaction/order-complete`, sendObject);
//   } catch (e) {
//     throw e;
//   }
// };
// 스토어 선택 & 적립금 현황
export const getSelectStorePointApi = async id => {
  try {
    return await AXIOS_GET(`/transaction/point/store/${id}`);
  } catch (e) {
    throw e;
  }
};

// 판매스토어 리스트
export const getSellingStoreListApi = async param => {
  try {
    return await AXIOS_GET(`/transaction/point/store`, param);
  } catch (e) {
    throw e;
  }
};

// 적립 가능 제품 리스트
export const getPointProductListApi = async param => {
  try {
    return await AXIOS_GET(`/transaction/point/point-drop`, param);
  } catch (e) {
    throw e;
  }
};

// 판매 회원 리스트
export const getCouponOrderDetailApi = async param => {
  try {
    return await AXIOS_GET(`/transaction/coupon/member`, param);
  } catch (e) {
    throw e;
  }
};

// 판매
export const getMemberCouponApi = async id => {
  try {
    return await AXIOS_GET(`/transaction/coupon/member-coupon/${id}`);
  } catch (e) {
    throw e;
  }
};

// 주문 등록 api
export const createOrderApi = async sendObject => {
  try {
    return await AXIOS_POST(`/transaction/point/order`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 적립금 제품 주문내역 리스트 api
export const getPointOrderListApi = async params => {
  try {
    return await AXIOS_GET(`/transaction/point/list`, params);
  } catch (e) {
    throw e;
  }
};

// 적립금 제품 주문내역 상세 리스트 api
export const getPointOrderDetailApi = async (id, params) => {
  try {
    return await AXIOS_GET(`/transaction/point/detail/${id}`, params);
  } catch (e) {
    throw e;
  }
};

// 판매,증정 제품 드롭 가져오기
export const getCouponOrderDropApi = async param => {
  try {
    const productDropResponse = await AXIOS_GET(`/transaction/coupon/product-drop`, param);
    const productDropData = productDropResponse.data.result;
    const giftDropResponse = await AXIOS_GET(`/transaction/coupon/gift-drop`, param);
    const giftDropData = giftDropResponse.data.result;
    const data = {
      productDropData,
      giftDropData,
    };
    return data;
  } catch (e) {
    throw e;
  }
};

// 제품별 도수정보 가져오기
export const getDiopterApi = async param => {
  try {
    return await AXIOS_GET(`/transaction/coupon/product/diopter/select`, param);
  } catch (e) {
    throw e;
  }
};

// 판매 등록 api
export const createSalesApi = async sendObject => {
  try {
    return await AXIOS_POST(`/transaction/coupon/order`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 쿠폰 거래내역 리스트
export const getCouponSalesListApi = async param => {
  try {
    return await AXIOS_GET(`/transaction/coupon/list`, param);
  } catch (e) {
    throw e;
  }
};

// // 적립 구매가 설정
// export const getPurchasePriceApi = async param => {
//   try {
//     return await AXIOS_GET(`/transaction/point/price`, param);
//   } catch (e) {
//     throw e;
//   }
// };

// 거래내역 상세 가져오기
export const getCouponSalesDetailApi = async id => {
  try {
    return await AXIOS_GET(`/transaction/coupon/detail/${id}`);
  } catch (e) {
    throw e;
  }
};

// 거래내역 거래취소
export const deleteCouponSalesDetailApi = async id => {
  try {
    return await AXIOS_DELETE(`/transaction/remove/${id}`);
  } catch (e) {
    throw e;
  }
};

// 판매,증정 제품 드롭 가져오기
export const getPointDropDataApi = async param => {
  try {
    const productDropResponse = await AXIOS_GET(`/transaction/point/point-drop`, param);
    const productDropData = productDropResponse.data.result;
    const data = {
      productDropData,
    };
    return data;
  } catch (e) {
    throw e;
  }
};

// 판매,증정 제품 드롭 가져오기
export const getPointMyopiaApi = async param => {
  try {
    return await AXIOS_GET(`/transaction/point/product/diopter/myopia`, param);
  } catch (e) {
    throw e;
  }
};

// 제품 변경
export const updatePointProductApi = async sendObject => {
  try {
    return await AXIOS_PUT(`/transaction/point/detail`, sendObject);
  } catch (e) {
    throw e;
  }
};

// 웹 오더 신청
export const webOrderRequestApi = async sendObject => {
  try {
    return await AXIOS_POST(`/transaction/web-order`, sendObject);
  } catch (e) {
    throw e;
  }
};
