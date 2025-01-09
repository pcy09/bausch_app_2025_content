import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// 대상스토어 설정 샘플 엑셀 파일
const storeRegistrationSampleData = [
  {
    storeCode: 'storeCode',
  },
  {
    storeCode: '777777',
  },
  {
    storeCode: '111111',
  },
  {
    storeCode: '555555',
  },
  {
    storeCode: '666666',
  },
  {
    storeCode: '888888',
  },
  {
    storeCode: '444444',
  },
];
export const storeRegistrationSampleFile = storeRegistrationSampleData?.map(item => {
  const { storeCode } = item;

  return {
    스토어코드: storeCode,
  };
});
