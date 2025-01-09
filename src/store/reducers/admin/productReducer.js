import { createSlice } from '@reduxjs/toolkit';
import { ProductInit } from '@/store/initialState';

const initialState = {
  ...ProductInit,
  totalElements: 0,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // 제품 리스트
    getProductListAction: (state, action) => {
      return state;
    },
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
    // 제품 상세 호출
    getProductDetailAction: (state, action) => {
      return state;
    },
    insertProductDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },
    // 상품등록 상세 호출 (바슈롬)
    getProductInfoDetailAction: (state, action) => {
      return state;
    },
    insertProductInfoDetailAction: (state, action) => {
      state.productInfoDetail = action.payload.productInfoDetail;
    },
    // 상품등록 상세 호출(렌즐리)
    getProductInfoLenslyDetailAction: (state, action) => {
      return state;
    },
    insertProductInfoLenslyDetailAction: (state, action) => {
      state.productInfoDetail = action.payload.productInfoDetail;
    },
    updateSkuAction: state => {
      return state;
    },

    // 제품 상세 데이터 update
    updateProductDetailAction: state => {
      return state;
    },
    // 제품 상세 데이터 update 주입
    upsertProductDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },

    // 제품 sku 업로드
    updateInsertSkuAction: (state, action) => {
      state.productDetail.skuInfoModels = action.payload.skuInfoModels;
    },

    // 제품 리스트 store 업데이트
    insertProductListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    // 제품 등록
    createProductAction: (state, action) => {
      return state;
    },
    // 제품 상세 데이터 store update
    upsertProductDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },
    // 텍스트에디터 사용 이미지 배열 store update
    insertUsingImage: (state, action) => {
      state.usingImage = [...state.usingImage, action.payload.usingImage];
    },
    // 텍스트 에디터에서 사용하는 이미지 id 모두 한번에 store 저장
    updateUsingImageAction: (state, action) => {
      state.usingImage = action.payload.usingImage;
    },
    // SKU 데이터 store update
    insertSkuInfoAction: (state, action) => {
      state.skuInfo = action.payload.skuInfo;
    },
    // 제품 썸네일 이미지 store update
    updateThumbnailImageListAction: (state, action) => {
      state.thumbnailImageList = action.payload.thumbnailImageList;
    },
    // 제품 렌즈 이미지 store update
    updateLensImageListAction: (state, action) => {
      state.lensImageList = action.payload.lensImageList;
    },
    sendNextStepAction: (state, action) => {
      return state;
    },
    // Step 1 :sku 업로드 ( 제품 임시 생성 )
    uploadSkuAction: (state, action) => {
      return state;
    },
    // Step 2 : 제품 기본 정보 등록
    upsertProductBasicInfoAction: (state, action) => {
      return state;
    },
    // Step 3 : 제품 상세 정보 등록
    upsertProductDetailInfoAction: (state, action) => {
      return state;
    },
    // Step4 : 제품 이미지 등록
    upsertProductImagesInfoAction: (state, action) => {
      return state;
    },
    // Step4 : 제품 이미지 삭제
    deleteProductImagesAction: (state, action) => {
      return state;
    },
    // Step5 : 제품 가격 등록
    upsertProductPriceInfoAction: (state, action) => {
      return state;
    },
    // 최종 제품 등록
    publishProductAction: (state, action) => {
      return state;
    },
    // 정보 초기화하기
    productReset: state => {
      Object.assign(state, initialState);
    },
    // 제품 삭제
    productDeleteAction: state => {
      return state;
    },
  },
});

export const {
  // 제품 리스트
  getProductListAction,
  // 검색 옵션
  changeSearchData,
  // 제품 리스트 업데이트
  insertProductListAction,
  // 제품 상세(바슈롬)
  getProductDetailAction,
  insertProductDetailAction,
  // 제품 상세(렌즐리)
  getProductInfoLenslyDetailAction,
  insertProductInfoLenslyDetailAction,
  // 제품 상세 업데이트
  updateProductDetailAction,
  // 제품 등록
  createProductAction,
  // 제품 상세 Upsert
  upsertProductDetailAction,
  //sku 업로드
  updateSkuAction,
  updateInsertSkuAction,
  // 상품 등록 상세
  getProductInfoDetailAction,
  insertProductInfoDetailAction,
  // 텍스트 에디터 사용 이미지 하나씩 추가
  insertUsingImage,
  // 텍스트 에디터 사용 전체 이미지 배열로 업데이트
  updateUsingImageAction,
  // 제품 ID에 등록된 SKU 데이터 업데이트
  insertSkuInfoAction,
  // 제품 썸네일 이미지 데이터 업데이트
  updateThumbnailImageListAction,
  // 제품 렌즈 이미지 데이터 업데이트
  updateLensImageListAction,
  // 제품 등록 단계 이동
  sendNextStepAction,
  // Step 1 : SKU 업로드
  uploadSkuAction,
  // Step 2 : 제품 기본 정보 등록
  upsertProductBasicInfoAction,
  // Step 3 : 제품 상세 정보 등록
  upsertProductDetailInfoAction,
  // Step 4 : 제품 이미지 등록
  upsertProductImagesInfoAction,
  // Step 4 : 제품 이미지 삭제
  deleteProductImagesAction,
  // Step 5 : 제품 가격 등록
  upsertProductPriceInfoAction,
  // 최종 상품 등록
  publishProductAction,
  // 초기화하기
  productReset,
  //제품 삭제
  productDeleteAction,
} = productSlice.actions;

export default productSlice.reducer;
