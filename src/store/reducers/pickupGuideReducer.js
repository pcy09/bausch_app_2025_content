import { createSlice } from '@reduxjs/toolkit';
import { userInit } from '@/store/initialState';

const initialState = {
  pickupData: {
    id: null,
    pickupGuideContent: '',
  },
  imageList: {
    usingImageList: [],
    deletedImageList: [],
  },
};

export const pickupGuideSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    getPickupGuideAction: state => {
      return state;
    },
    insetPickupGuideDataAction: (state, action) => {
      state.pickupData = action.payload.pickupData;
      state.imageList = action.payload.imageList;
    },
    registerPickupGuideAction: (state, action) => {
      return state;
    },
    updateUsingImageList: (state, action) => {
      state.imageList.usingImageList = [...state.imageList.usingImageList, action.payload.usingImageId];
    },
    updateDeletedImageList: (state, action) => {
      state.imageList.deletedImageList = action.payload.imageList.deletedImageList;
    },
    pickupGuideReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getPickupGuideAction,
  insetPickupGuideDataAction,
  registerPickupGuideAction,
  updateUsingImageList,
  updateDeletedImageList,
  pickupGuideReset,
} = pickupGuideSlice.actions;

export default pickupGuideSlice.reducer;
