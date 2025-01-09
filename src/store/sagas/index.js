import { all } from 'redux-saga/effects';
import { authSaga } from '@/store/sagas/authSaga';
import { managerSaga } from '@/store/sagas/admin/managerSaga/managerSaga';
import { snackSaga, commonCodeSaga } from '@/store/sagas/commonSaga';
import { userSaga } from '@/store/sagas/userSaga/userSaga';
import { eventSaga } from '@/store/sagas/eventSaga/eventSaga';
import { faqSaga, pickupGuideSaga, termsSaga, usingInfoSaga } from '../sagas/admin/supportSaga';
import { bannerSaga } from '@/store/sagas/lensly/bannerSaga/bannerSaga';
import { productSaga } from '@/store/sagas/admin/productSaga/productSaga';
import { opticianSaga } from '@/store/sagas/admin/opticianSaga/opticianSaga';
import { reservationSaga } from '@/store/sagas/lensly/reservationSaga/reservationSaga';
import { webOrderSaga } from '@/store/sagas/lensly/webOrderSaga/webOrderSaga';
import { productInquirySaga } from './app/productInquirySaga/productInquirySaga';
import { adminStoreSaga } from '@/store/sagas/admin/adminStoreSaga/adminStoreSaga';
import { productGroupSaga } from '@/store/sagas/admin/productGroupSaga/productGroupSaga';
import { productGiftSaga } from './admin/productGiftSaga/productGiftSaga';
import { adminStoreGroupSaga } from './admin/adminStoreGroupSaga/adminStoreGroupSaga';
import { campaignSaga } from './admin/campaignSaga/campaignSaga';
import { campaignDetailSaga } from './admin/campainDetailSaga/campainDetailSaga';
import { savingPointSaga } from './admin/savingPointSaga/savingPointSaga';
import { adminOrderSaga } from './admin/orderSaga/orderSaga';
import { pointProductOrderSaga } from './admin/pointProductOrderSaga/pointProductOrderSaga';
import { couponOrderSaga } from '@/store/sagas/admin/couponOrderSaga/couponOrderSaga';
import { memberSaga } from './admin/memberSaga/memberSaga';
import { withdrawMember } from './admin/withdrawMemberSaga/withdrawMemberSaga';
import { modalBoxSaga } from '@/store/sagas/admin/modalBoxSaga/modalBoxSaga';
import { settingMemberSaga } from './admin/settingMemberSaga/settingMemberSaga';
import { settingMemberDetailSaga } from './admin/settingMemberDetailSaga/settingMemberDetailSaga';
import { orderPointListSaga } from './admin/orderPointListSaga/orderPointListSaga';
import { productInfoSaga } from './admin/productInfoSaga/productInfoSaga';
import { pointProductChangeSaga } from './admin/pointProductChangeSaga/pointProductChangeSaga';
import { pointLogSaga } from './admin/pointLogSaga/pointLogSaga';

export function* rootSaga() {
  yield all([
    settingMemberDetailSaga(),
    orderPointListSaga(),
    campaignDetailSaga(),
    campaignSaga(),
    adminStoreGroupSaga(),
    adminStoreSaga(),
    authSaga(),
    managerSaga(),
    userSaga(),
    settingMemberSaga(),
    snackSaga(),
    commonCodeSaga(),
    pickupGuideSaga(),
    eventSaga(),
    usingInfoSaga(),
    termsSaga(),
    faqSaga(),
    productSaga(),
    bannerSaga(),
    opticianSaga(),
    reservationSaga(),
    webOrderSaga(),
    productInquirySaga(),
    productGroupSaga(),
    productGiftSaga(),
    savingPointSaga(),
    adminOrderSaga(),
    couponOrderSaga(),
    memberSaga(),
    withdrawMember(),
    modalBoxSaga(),
    pointProductOrderSaga(),
    productInfoSaga(),
    pointProductChangeSaga(),
    pointLogSaga(),
  ]); // all 은 배열 안의 여러 사가를 동시에 실행 시켜줌
}
