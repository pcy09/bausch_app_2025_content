import { createSlice } from '@reduxjs/toolkit';
import { eventInit } from '@/store/initialState';

const initialState = eventInit;

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEventListAction: (state, action) => {
      return state;
    },
    insertEventListAction: (state, action) => {
      state.eventList = action.payload.eventList;
      state.paging = action.payload.paging;
    },
    registerEventAction: state => {
      return state;
    },
    getEventDetailAction: state => {
      return state;
    },
    updateEventDetailAction: state => {
      return state;
    },
    insertEventDetailAction: (state, action) => {
      state.eventDetail = action.payload.eventDetail;
    },
    // 텍스트 에디터 이미지 추가 시 store 저장 action
    updateUsingImageListAction: (state, action) => {
      state.usingImage = [...state.usingImage, action.payload.usingImageId];
    },
    // 텍스트 에디터에서 사용하는 이미지 id 모두 한번에 store 저장
    updateAllUsingImageListAction: (state, action) => {
      state.usingImage = action.payload.usingImageList;
    },
    updateDeletedImageListAction: (state, action) => {
      state.deleteImage = action.payload.deletedImageList;
    },
    // 검색조건들 store 저장 Action
    updateSearchParams: (state, action) => {
      state.search = action.payload.search;
    },
    deleteEventAction: (state, action) => {
      return state;
    },
    eventReset: state => {
      Object.assign(state, initialState);
    },
    //이벤트 관심 상품 리스트
    eventInterestProductAction: state => {
      return state;
    },
    eventInsertAction: (state, action) => {
      state.eventSelectList = action.payload.eventSelectList;
    },

    //이벤트 상세 디테일 리스트
    evenDetailtSelectListAction: (state, action) => {
      state.eventSelectDetailList = action.payload.eventSelectDetailList;
    },
  },
});

export const {
  getEventListAction,
  insertEventListAction,
  registerEventAction,
  getEventDetailAction,
  updateEventDetailAction,
  insertEventDetailAction,
  updateUsingImageListAction,
  updateAllUsingImageListAction,
  updateDeletedImageListAction,
  updateSearchParams,
  deleteEventAction,
  eventReset,
  eventInterestProductAction,
  eventInsertAction,
  evenDetailtSelectListAction,
} = eventSlice.actions;

export default eventSlice.reducer;
