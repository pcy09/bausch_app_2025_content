import dayjs from 'dayjs';
import { cardTitleStyle } from '@/styles/components/atomCommonStyle';

// excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// 날짜 데이터 변경
export const transDate = (date, format) => {
  return dayjs(date).subtract(9, 'hours').format(format);
};

// 카드 타이틀 component
export const cardTitle = title => {
  return <span css={cardTitleStyle}>{title}</span>;
};

// 리스트관련 데이터 key 추가 method
export const addKeyData = data => {
  return data.reduce(
    (acc, cur, index) =>
      acc.concat({
        key: cur.id,
        ...cur,
      }),
    [],
  );
};

// radio 정제 함수
export const transFormRadioValue = data => {
  return data?.map(item => ({ label: item.value, value: item.key }));
};

// 안경원 스토어 맵핑 함수
export const storeMaping = (data = '') => {
  switch (data) {
    case '000':
      return '일반 안경원';
    case '010':
      return '다비치';
    case '020':
      return '글라스스토리';
    case '030':
      return '다이안';
    case '040':
      return '시호비전';
    case '050':
      return '렌즈타운';
    case '060':
      return '오렌즈';
    case '070':
      return '대리점';
    case '080':
      return '글라스바바';
    case '090':
      return '마케팅샘플';
    case '100':
      return '으뜸50';
    case '110':
      return '안경만들기';
    case '120':
      return '룩옵티컬';
    case '130':
      return '렌즈미';
    case '140':
      return '으뜸플러스';
    case '150':
      return '안경매니저';
    case '160':
      return '지니스';
    case '170':
      return '스페셜';
    default:
      return '채널 미지정';
  }
};

// 샘플파일 다운로드
export const handleDownload = () => {
  const fileUrl = `/example.xlsx`;
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = 'example.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 엑셀 다운로드 함수
export const downloadExcel = (data, fileName = '리스트') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 배열 버퍼를 생성
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // 파일 저장
  saveAs(blob, `${fileName}.xlsx`);
};

// 원화 가격
export function formatToWon(price) {
  return price.toLocaleString('ko-KR');
}

// 셀렉트박스 ('전체' 미포함)
export function transSelectBox(options) {
  const newOptions = options.map(item => ({
    value: item.key,
    label: item.value,
  }));
  return newOptions;
}

// 필터용 셀렉트박스 ('전체' 포함)
export function transFilterSelectBox(options) {
  const newOptions = [{ label: '전체', value: 'all' }].concat(
    options.map(item => ({
      value: item.key,
      label: item.value,
    })),
  );
  return newOptions;
}

// 제품 셀렉트박스
export function transProductOption(productGroup) {
  const productOption = productGroup.map(group => ({
    key: 'product',
    label: group.productGroupName,
    value: group.productGroupId,
    children: group.dropProductInfoList.map(product => ({
      label: product.productName,
      value: product.productId,
    })),
  }));

  return productOption;
}
