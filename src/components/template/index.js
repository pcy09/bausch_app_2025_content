// 회원 관리
import UserListTemplate from '@/components/template/UsersTemplate/UserListTemplate';
import UserDetailTemplate from '@/components/template/UsersTemplate/UserDetailTemplate';

// 통합 어드민 회원 관리
import AdminUserListTemplate from '@/components/template/AdminUserTemplate/AdminUserListTemplate';

// 안경원 관리
import StoreManageListTemplate from '@/components/template/StoreTemplate/StoreManageListTemplate';
import StoreManageDetailTemplate from '@/components/template/StoreTemplate/StoreManageDetailTemplate';
import StoreGroupList from '@/components/template/StoreTemplate/StoreGroupList';
import StoreGroupDetail from '@/components/template/StoreTemplate/StoreGroupDetail';
import OpticianListTemplate from '@/components/template/StoreTemplate/OpticianListTemplate';
import OpticianCreateTemplate from '@/components/template/StoreTemplate/OpticianCreateTemplate';
import OpticianDetailTemplate from '@/components/template/StoreTemplate/OpticianDetailTemplate';
import StorePointList from '@/components/template/StoreTemplate/StorePointList';
import StoreDetailPointListTemplate from '@/components/template/StoreTemplate/StoreDetailPointListTemplate';
import StoreGroupDetailGroupNameTemplate from '@/components/template/StoreTemplate/StoreGroupDetailGroupNameTemplate';
// 제품 관리s
import ProductListTemplate from '@/components/template/ProductsTemplate/ProductListTemplate';
import ProductDetailTemplate from '@/components/template/ProductsTemplate/ProductDetailTemplate';
import ProductCreateTemplate from '@/components/template/ProductsTemplate/ProductCreateTemplate';
import ProductSkuListTemplate from '@/components/template/ProductsTemplate/ProductSkuListTemplate';
import ProductInquiryListTemplate from '@/components/template/ProductsTemplate/ProductInquiryListTemplate';
import ProductsInfoListTemplate from '@/components/template/ProductsInfoTemplate/ProductsInfoListTemplate';
import ProductsInfoDetailTemplate from '@/components/template/ProductsInfoTemplate/ProductsInfoDetailTemplate';

// 예약 관리
import ReservationListTemplate from '@/components/template/ReservationTemplate/ReservationListTemplate';

// 이벤트 관리
import EventListTemplate from '@/components/template/EventTemplate/EventListTemplate';

// 고객지원 관리
import SupportTermListTemplate from '@/components/template/SupportTemplate/SupportTermListTemplate';
import SupportTermCreateTemplate from '@/components/template/SupportTemplate/SupportTermCreateTemplate';
import SupportTermDetailTemplate from '@/components/template/SupportTemplate/SupportTermDetailTemplate';
import SupportGuideTemplate from '@/components/template/SupportTemplate/SupportGuideTemplate';
import PickupGuide from '@/components/template/SupportTemplate/PickupGuide';
import UsageGuide from '@/components/template/SupportTemplate/UsageGuide';
import BannerDetailTemplate from '@/components/template/SupportTemplate/BannerDetailTemplate';
import BannerSubTemplate from '@/components/template/SupportTemplate/BannerSubTemplate';
import FaqCategoryTemplate from '@/components/template/SupportTemplate/FaqCategoryTemplate';
import InquiryOneCategoryTemplate from '@/components/template/SupportTemplate/InquiryOneCategoryTemplate';

// 계정 관리
import ManagementListTemplate from '@/components/template/ManagementTemplate/ManagementListTemplate';
import ManagementCreateTemplate from '@/components/template/ManagementTemplate/ManagementCreateTemplate';
import ManagementDetailTemplate from '@/components/template/ManagementTemplate/ManagementDetailTemplate';

// 로그인
import LoginTemplate from '@/components/template/LoginTemplate';

// dev 작업용
import GroupManagementTemplate from '@/components/template/DevCreatementTemplate/GroupManagementTemplate';

// 설정
import AdminManageTemplate from '@/components/template/DevCreatementTemplate/AdminManageTemplate';
import AdminIpLogTemplate from '@/components/template/DevCreatementTemplate/AdminIpLogTemplate';
import AdminLogTemplate from '@/components/template/SettingsTemplate/AdminLogTemplate';
import AdminManageDetailTemplate from '@/components/template/SettingsTemplate/AdminManageDetailTemplate';
import SetAuthorityTemplate from '@/components/template/SettingsTemplate/SetAuthorityTemplate';
import PwManageTemplate from '@/components/template/SettingsTemplate/PwManageTemplate';

// 적립금
import PointManageTemplate from '@/components/template/PointManageTemplate';
import PointAddTemplate from '@/components/template/DevCreatementTemplate/PointAddTemplate';
import PointDetailTemplate from '@/components/template/DevCreatementTemplate/PointDetailTemplate';
import PointLogTemplate from '@/components/template/PointLogTemplate';

//캠페인
// 프로모션
import PromotionTemplate from '@/components/template/CampaignTemplate/PromotionTemplate';
import PromotionAddTemplate from '@/components/template/CampaignTemplate/PromotionAddTemplate';
import PromotionDetailTemplate from '@/components/template/CampaignTemplate/PromotionDetailTemplate';
import CouponAddTemplate from '@/components/template/CampaignTemplate/CouponAddTemplate';
import CouponDetailTemplate from '@/components/template/CampaignTemplate/CouponDetailTemplate';
import CouponDetailStoreTemplate from '@/components/template/CampaignTemplate/CouponDetailStoreTemplate';
//주문
import OrderManageListTemplate from '@/components/template/OrderTemplate/OrderManageListTemplate';
import OrderCouponSaleListTemplate from '@/components/template/OrderTemplate/OrderCouponSaleListTemplate';
import OrderCouponSaleDetailTemplate from '@/components/template/OrderTemplate/OrderCouponSaleDetailTemplate';
import OrderPointSalesListTemplate from '@/components/template/OrderTemplate/OrderPointSalesListTemplate';
import OrderPointSalesDetailTemplate from '@/components/template/OrderTemplate/OrderPointSalesDetailTemplate';

//테스트용 리스트 템플릿
import TestTemplate from '@/components/template/StoreTemplate/TestTemplate';

//lensly 가이드 템플릿
import LenslyGuideTemplate from '@/components/template/LenslyGuideTemplate';

//app 탬플릿
import AppNoticeListTemplate from '@/components/template/AppNoticeTemplate/AppNoticeListTemplate';
import AppNoticeDetailTemplate from '@/components/template/AppNoticeTemplate/AppNoticeDetailTemplate';
import AppNoticeSubTemplate from '@/components/template/AppNoticeTemplate/AppNoticeSubTemplate';
import AppAdvertiseListTemplate from '@/components/template/AppAdvertiseTemplate/AppAdvertiseListTemplate';
import AppAdvertiseSubTemplate from '@/components/template/AppAdvertiseTemplate/AppAdvertiseSubTemplate';
import AppAdvertiseDetailTemplate from '@/components/template/AppAdvertiseTemplate/AppAdvertiseDetailTemplate';
import AppVersionListTemplate from '@/components/template/AppVersionTemplate/AppVersionListTemplate';
import AppVersionSubTemplate from '@/components/template/AppVersionTemplate/AppVersionSubTemplate';
import AppVersionDetailTemplate from '@/components/template/AppVersionTemplate/AppVersionDetailTemplate';
import TermsListTemplate from './SupportTemplate/TermsListTemplate';
import ProductsInfoLenslyDetailTemplate from './ProductsInfoTemplate/ProductsInfoLenslyDetailTemplate';

export {
  //앱 공지사항
  AppAdvertiseDetailTemplate,
  AppNoticeListTemplate,
  AppNoticeDetailTemplate,
  AppNoticeSubTemplate,
  AppAdvertiseListTemplate,
  AppAdvertiseSubTemplate,
  AppVersionListTemplate,
  AppVersionSubTemplate,
  AppVersionDetailTemplate,
  //렌슬리 가이드
  LenslyGuideTemplate,
  //테스트
  TestTemplate,
  // 회원
  UserListTemplate,
  UserDetailTemplate,
  // 통합어드민 회원
  AdminUserListTemplate,
  // 안경원
  StoreManageListTemplate,
  StoreManageDetailTemplate,
  StoreGroupList,
  StoreGroupDetail,
  OpticianListTemplate,
  OpticianCreateTemplate,
  OpticianDetailTemplate,
  StorePointList,
  StoreDetailPointListTemplate,
  StoreGroupDetailGroupNameTemplate,
  // 제품
  ProductListTemplate,
  ProductDetailTemplate,
  ProductCreateTemplate,
  ProductSkuListTemplate,
  ProductInquiryListTemplate,
  ProductsInfoListTemplate,
  ProductsInfoDetailTemplate,
  //주문
  OrderManageListTemplate,
  OrderCouponSaleListTemplate,
  OrderCouponSaleDetailTemplate,
  OrderPointSalesListTemplate,
  OrderPointSalesDetailTemplate,
  //예약
  ReservationListTemplate,
  // 이벤트
  EventListTemplate,
  // 고객지원
  SupportTermListTemplate,
  SupportTermCreateTemplate,
  SupportTermDetailTemplate,
  SupportGuideTemplate,
  PickupGuide,
  UsageGuide,
  BannerDetailTemplate,
  BannerSubTemplate,
  FaqCategoryTemplate,
  InquiryOneCategoryTemplate,
  TermsListTemplate,
  // FaqTemplate,
  // 계정 관리
  ManagementListTemplate,
  ManagementCreateTemplate,
  ManagementDetailTemplate,
  // 로그인
  LoginTemplate,
  // dev 작업용
  GroupManagementTemplate,

  // 설정
  AdminLogTemplate,
  AdminManageTemplate,
  AdminIpLogTemplate,
  SetAuthorityTemplate,
  AdminManageDetailTemplate,
  PwManageTemplate,

  // 적립금
  PointManageTemplate,
  PointAddTemplate,
  PointDetailTemplate,
  PointLogTemplate,

  // 캠페인
  // 프로모션
  PromotionTemplate,
  PromotionAddTemplate,
  PromotionDetailTemplate,
  CouponAddTemplate,
  CouponDetailTemplate,
  CouponDetailStoreTemplate,

  // 상품등록 렌즐리 디테일
  ProductsInfoLenslyDetailTemplate,
};
