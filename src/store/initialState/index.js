export const modalInit = {
  modalInfo: {
    show: false,
    title: '',
    description: '',
    selectedOption: null,
    okText: '',
    cancelText: '',
    okFunction: '',
    sendData: null,
  },
  type: '',
  name: '',
  show: false,
  items: null,
};

// 팝업창
export const popupInit = {
  show: false,
  type: 'delete',
};

export const popups = {
  isModalOpen: false,
  title: 'Default Title',
  content: null,
  buttonsConfig: [],
};

export const managerInit = {
  managerList: [],
  managerDetail: {},
  paging: {
    total: 0,
    current: 1,
    pageSize: 2,
  },
};

// 고객 state
export const userInit = {
  userList: [],
  userDetail: {},
  reservationDetails: null,
  storesInterest: null,
  search: {
    searchType: '',
    searchText: '',
  },
  tab: 'L',
  paging: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
};

// 이벤트 state
export const eventInit = {
  eventList: [],
  eventDetail: {},
  usingImage: [],
  eventSelectList: [],
  eventSelectDetailList: [],
  deleteImage: [],
  search: {
    startDate: null,
    endDate: null,
    status: null,
    showStatus: null,
    searchText: null,
  },
  paging: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
};

// 배너 state
export const bannerInit = {
  bannerList: [],
};

// 공통코드 state
export const commonCodeInit = {
  commonCodeList: {},
  lensCycle: [],
  storeSearchCord: [],
  storeType: [],
  lensPowerType: [],
  storeLocation: [],
  autoOrderStatus: [],
  channelType: [],
  salesStatus: [],
};

// 공통으로 사용되는 state
export const commonInit = {
  usedImage: [],
  deletedImage: [],
};

// 이용 가이드(이용안내)
export const useInfoInit = {
  useInfoList: [],
};

// 자주 묻는 질문 (FAQ)
export const faqInit = {
  faqList: [],
};

// 이용 약관
export const termsInit = {
  list: [],
  termsDetail: {
    id: null,
    list: '',
    terms_title: '',
    terms_content: '',
    terms_show_status: '',
    terms_version: '',
    terms_type: '',
    terms_essential_status: '',
    terms_register_date: '',
    terms_modify_date: '',
  },
  paging: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  tab: 'U',
};

// 제품 Init state
export const ProductInit = {
  content: [],
  productDetail: {
    skuInfoModels: [],
  },
  productInfoDetail: {
    // basicInfo: {},
    // imageInfo: {},
    // tagInfo: {},
  },
  skuInfoModels: [],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  search: {
    salesStatus: null,
    searchProductName: null,
    startDate: null,
    endDate: null,
    productGroupName: null,
  },
  totalElements: 0,
};

// 제품 그룹 Init state
export const ProductGroupInit = {
  productBauschGroupList: [],
  productLenslyGroupList: [],
};

// 증정 제품 Init state
export const ProductGiftInit = {
  productBauschGiftList: [],
  productGiftLenslyList: [],
};

// 적립금 Init state
export const SavingPoint = {
  pointProductGroup: [],
  pointProductDetail: [],
};

// 안경원 Init state
export const OpticianInit = {
  opticianList: [],
  opticianDetail: [],
  search: {
    searchType: null,
    searchText: null,
    searchInputText: null,
    startDate: null,
    endDate: null,
    showStatus: null,
  },
  paging: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
};

//회원 initState
export const memberInit = {
  content: [],
  memberDetail: {
    additionalInfo: {
      memberStoreDto: {},
    },
  },
  search: {
    memberType: null,
    searchCond: null,
    startDate: null,
    endDate: null,
    searchValue: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 20,
  },
  totalElements: 0,
};
// 탈퇴회원 initState
export const withdrawMember = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
  },
  totalElements: 0,
};

export const StoreInit = {
  content: [],
  storeDetailData: [],
  appStoreHistories: [],
  storeOpticianList: [],
  pointDetailData: {},
  pointList: [],
  pointGroups: [],
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
    pointProductGroupId: null,
    storeType: null,
    storeGroup: null,
    lenslyStatus: null,
    autoOrderStatus: null,
    storeLocation: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

//SettingMemberInit
export const SettingMemberInit = {
  content: [],
  level: [],
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

export const OrderPointInit = {
  pointOrderDetail: {},
  content: [],
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
    transactionPointListSearchCode: null,
    pointProductGroup: null,
    transactionStatus: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

//SettingMemberDetailInit
export const SettingMemberDetailInit = {
  content: [],
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

//StoreGroupInit
export const StoreGroupInit = {
  content: [],
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

//CampaignInit
export const CampaignInit = {
  content: [],
  result: [],
  reissueCouponSelectData: [],
  reissueMemberListData: [],
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
    couponType: null,
    exposedStatus: null,
    channelType: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

// 예약 Init state
export const ReservationInit = {
  reservationList: [],
  tab: 'R',
  paging: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  searchData: {
    startDate: null,
    endDate: null,
  },
};

// 주문관리 initState
export const OrderInit = {
  content: [],
  appStoreHistories: [],
  storeOpticianList: [],

  search: {
    searchText: null,
    startDate: null,
    endDate: null,
    productType: null,
    couponType: null,
    pointGroupName: null,
    transactionPendingSearchCond: null,
    pendingSearchValue: null,
    transactionCompletedCond: null,
    completedSearchValue: null,
  },
  totalElements: 0,
  transactionListData: [],
};

export const CampaignDetailInit = {
  content: [],
  result: [],
  resultDetail: {},
  storeAddSearchResult: [],
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

export const WebOrderInit = {
  orderHeaderFile: null,
  orderDetailFile: null,
  returnData: null,
  successData: null,
  failData: null,
  mappingData: null,
};

// 적립금 제품 주문 initState
export const pointProductOrderInit = {
  content: [],
  pointStoreData: [],
  sellingStoreList: [],
  pointProductList: [], //적립금 제품 리스트
  search: {
    searchText: null,
    startDate: null,
    endDate: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
};

// 판매등록 ( 회원리스트 )
export const orderUserListInit = {
  orderUserListData: [],
  orderReserveData: [],
  dropData: [],
  couponSalesListData: {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 10,
    },
    totalElements: 0,
  },
  couponSalesDetailData: [],
};

// 제품문의
export const productInquiryInit = {
  productInquiryData: {},
  productInquiryKey: [],
  productInquiryDetailData: {},
};

// 대상스토어설정
export const storeSettingInit = {
  show: false,
};

// 네비게이션 메뉴 관리
export const navigationInit = {
  selectedKeys: ['1'],
  openKeys: [],
};

// 모달
export const modalsInit = {
  show: false,
  id: null,
  type: null,
};

// 오프라인 쿠펀번호
export const offlineCouponInit = {
  content: [],
  search: {
    startDate: null,
    endDate: null,
  },
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalElements: 0,
  couponId: null,
};

// 쿠폰 > 제품변경 모달
export const productChangeModalBoxInit = {
  show: false,
  data: {},
  productDropData: [],
  giftDropData: [],
};

// 상품정보 initstate (BAUSCH APP)
export const ProductBauschInfoInit = {
  content: [],
  productInfoDetail: {
    productInfoId: [],
  },
  pageable: {
    pageNumber: 0,
    pageSize: 20,
  },
  search: {
    salesStatus: null,
    productInfoName: null,
    startDate: null,
    endDate: null,
  },
  totalElements: 0,
};

// 상품정보 initstate (lensly)
export const productLenslyInit = {
  content: [],
  productDetail: {
    skuInfoModels: [],
  },
  productInfoDetail: {
    basicInfo: {},
    imageInfo: {},
    tagInfo: {},
  },
  skuInfoModels: [],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
  },
  search: {
    salesStatus: null,
    searchProductName: null,
    startDate: null,
    endDate: null,
    productGroupName: null,
  },
  totalElements: 0,
};

// 모달
export const pointProductChangeModalInit = {
  show: false,
  data: {},
  productDropData: [],
  myopiaData: {},
};

// 적립금 현황 Init state
export const pointLogInit = {
  content: [],
  search: {
    salesStatus: null,
    searchProductName: null,
    startDate: null,
    endDate: null,
    productGroupName: null,
  },

  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
  },

  totalElements: 0,
};
