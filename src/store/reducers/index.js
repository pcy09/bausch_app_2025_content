import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import auth from './authReducer';
import manager from './admin/managerReducer';
import user from './userReducer';
import modal from './modalReducer';
import snack from './snackReducer';
import commonCode from './commonCodeReducer';
import loading from './loadingReducer';
import pickup from './pickupGuideReducer';
import event from './eventReducer';
import useInfo from './useInfoReducer';
import faq from './admin/faqReducer';
import terms from './termsReducer';
import banner from './bannerReducer';
import product from './admin/productReducer';
import optician from './admin/opticianReducer';
import reservation from './lensly/reservationReducer';
import webOrder from './lensly/webOrderReducer';
import productInquiry from './app/productInquiryReducer';
import popup from './popupReducer';
import popups from './popupsReducer';
import storeSetting from './admin/storeSettingReducer';
import navigation from './navigationReducer';
import modals from './modals';
import store from './admin/storeReducer';
import productGroup from './admin/productGroupReducer';
import productGift from './admin/productGiftReducer';
import storeGroup from './admin/storeGroupReducer';
import campaign from './admin/campaignReducer';
import campaignDetail from './admin/campaignDetailReducer';
import productLensly from './admin/productLenslyReducer';
import savingPoint from './admin/savingPointReducer';
import order from './admin/orderReducer';
import pointProductOrder from './admin/pointProductOrderReducer';
import couponOrder from './admin/couponOrderReducer';
import offlineCoupon from './admin/offlineCouponReducer';
import member from './admin/memberReducer';
import withdrawMember from './admin/withdrawMemberReducer';
import modalBox from './admin/modalBoxReducer';
import settingMember from './admin/settingMemberReducer';
import settingMemberDetail from './admin/settingMemberDetailReducer';
import orderPointList from './admin/orderPointListReducer';
import productBauschInfo from './admin/productBauschInfoReducer';
import pointProductChangeModal from './admin/pointProductChangeReducer';
import pointLog from './admin/pointLogReducer';

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    settingMemberDetail,
    campaignDetail,
    settingMember,
    campaign,
    storeGroup,
    store,
    modals,
    auth,
    manager,
    user,
    modal,
    snack,
    commonCode,
    loading,
    pickup,
    event,
    popups,
    useInfo,
    faq,
    terms,
    banner,
    product,
    optician,
    reservation,
    webOrder,
    productInquiry,
    popup,
    storeSetting,
    navigation,
    productGroup,
    productGift,
    productLensly,
    savingPoint,
    order,
    pointProductOrder,
    couponOrder,
    offlineCoupon,
    member,
    withdrawMember,
    modalBox,
    orderPointList,
    productBauschInfo,
    pointProductChangeModal,
    pointLog,
  })(state, action);
};

export default rootReducer;
