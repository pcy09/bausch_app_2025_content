// 리스트 셀렉트 박스 옵션
export const LIST_OPTIONS = [
  { label: '스토어 코드', value: 'storeCode' },
  { label: '스토어명', value: 'storeName' },
  { label: '스토어 그룹', value: 'storeGroup' },
  { label: '주소(시/군/구)', value: 'address' },
];

// 쿠폰 옵션
export const COUPON_OPTIONS = [
  {
    value: '',
    label: '전체',
  },
  {
    value: 'GIFT',
    label: '증정',
  },
  {
    value: 'DISCOUNT',
    label: '할인',
  },
];

// 적립금 옵션
export const POINT_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'point_01',
    label: '적립금_01',
  },
  {
    value: 'point_02',
    label: '적립금_02',
  },
];

// 카테고리 옵션
export const CATEGORY_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'category_01',
    label: '카테고리_01',
  },
  {
    value: 'category_02',
    label: '카테고리_02',
  },
];

// 거래 상태
export const TRADE_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'ing',
    label: '거래 중',
  },
  {
    value: 'cancel',
    label: '거래 취소',
  },
  {
    value: 'complete',
    label: '거래 완료',
  },
];

// 제품 그룹
export const PRODUCT_GROUP_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'sales',
    label: '판매제품',
  },
  {
    value: 'free',
    label: '증정제품',
  },
];

// 단종
export const RETIRED_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'Y',
    label: 'YES',
  },
  {
    value: 'N',
    label: 'NO',
  },
];

// 노출 여부
export const SHOW_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'Y',
    label: '노출',
  },
  {
    value: 'N',
    label: '비노출',
  },
];

// 자동발주
export const AUTO_ORDER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'Y', label: 'YES' },
  { value: 'N', label: 'NO' },
];

export const LENSLY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'I', label: '온라인' },
  { value: 'F', label: '오프라인' },
  { value: 'K', label: '미입점' },
];

// 스토어 지역
export const STORE_LOCATION_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'A',
    label: '강원도',
  },
  {
    value: 'B',
    label: '경기도',
  },
  {
    value: 'C',
    label: '강원도',
  },
];

// 안경사 상태
export const OPTICIAN_STATUS_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'work',
    label: '재직',
  },
  {
    value: 'retire',
    label: '퇴직',
  },
];

// 안경사 상태
export const MEMBER_TYPE_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'user_name',
    label: '통합 회원',
  },
  {
    value: 'user_email',
    label: '앱 회원',
  },
  {
    value: 'user_phone',
    label: '렌즐리 회원',
  },
];

// 발행 여부
export const PUBLISH_OPTIONS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'Y',
    label: '발행',
  },
  {
    value: 'N',
    label: '미발행',
  },
];

// 발행 여부
export const AUTHORITY_SETTING = [
  {
    label: '관리자',
    value: 'level_01',
  },
  {
    label: '중간 관리자',
    value: 'level_02',
  },
  {
    label: '책임자',
    value: 'level_03',
  },
  {
    label: '일반 관리자',
    value: 'level_04',
  },
  {
    label: '이용자',
    value: 'level_05',
  },
];

// 회원 구분

export const MEMBER_DIVIDE = [
  { label: '통합회원', value: 'INTEGRATION_MEMBER' },
  { label: '렌즐리회원', value: 'LENSLY_MEMBER' },
  { label: '앱 회원', value: 'APP_MEMBER' },
];

export const MEMBER_STATUS = [
  { label: '정상', value: 'ACTIVE' },
  { label: '휴면 회원', value: 'INACTIVE' },
  { label: '삭제대기 회원', value: 'PENDING_DELETE' },
];
