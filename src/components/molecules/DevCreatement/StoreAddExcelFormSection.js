import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, Tables } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Descriptions, Modal, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { buttonFlexBetweenRowStyle, marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { useEffect, useState } from 'react';
import { uploadCampaignDetailStoreExcelApi } from '@/api/admin/campaignDetailApi';
import { useDispatch } from 'react-redux';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import * as XLSX from 'xlsx';
import { storeRegistrationSampleFile } from '@/common/sampleExcel';
import { downloadExcel } from '@/common/utiles';
import NoticeLabel from '@/components/atom/Notice';

const StoreAddExcelFormSection = ({ setResult, result, skuFileList, setSkuFileList, getExcelData }) => {
  const columns = [
    { title: '스토어 코드', dataIndex: 'storeCode', align: 'center' },
    { title: '스토어 명', dataIndex: 'storeName', align: 'center' },
    { title: '스토어 그룹', dataIndex: 'storeGroupName', align: 'center' },
    { title: 'ABC S/M', dataIndex: 'abcSm', align: 'center' },
    { title: '자동발주', dataIndex: 'autoOrderStatus', align: 'center' },
    { title: '지역 (시/도)', dataIndex: 'city', align: 'center' },
    { title: '주소(시/군/구)', dataIndex: 'district', align: 'center' },
    { title: '등록일', dataIndex: 'storeRegDate', align: 'center' },
  ];

  const dispatch = useDispatch();

  const handleFileChange = info => {
    const { file, fileList } = info;
    if (file.status === 'removed') {
      // 파일 삭제 시 처리
      setSkuFileList([]);
      setResult([]);
      return;
    }
    setSkuFileList(fileList);
    if (file.status === 'done') {
      getExcelData(fileList[0]);
    }
  };

  return (
    <>
      <CardContainer>
        <Descriptions
          title={'스토어 추가 (excel)'}
          labelStyle={{ width: '250px' }}
          bordered={true}
          extra={
            <Buttons
              type={'danger'}
              icon={<DownloadOutlined />}
              name={'Sample 파일받기'}
              onClick={() => {
                downloadExcel(storeRegistrationSampleFile);
              }}
            />
          }>
          <Descriptions.Item span={3} label="스토어 추가">
            <Upload accept=".xlsx" maxCount={1} onChange={handleFileChange} fileList={skuFileList}>
              <Buttons type={'dashed'} name={'추가 파일 업로드'} icon={<UploadOutlined />} />
            </Upload>
          </Descriptions.Item>
        </Descriptions>
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid css={marginBottomStyle(12)} gutter={12}>
          <ColGrid span={16} css={span_style}>
            <span>
              등록된 스토어 : 총 <strong>{result?.length}</strong>개
            </span>
          </ColGrid>
        </RowGrid>
        <Tables
          rowKey={'storeCode'}
          emptyText="추가된 스토어가 없습니다. 스토어를 추가해주세요."
          scroll={{ y: 240 }}
          listData={result}
          columns={columns}
          detail={false}
        />
      </CardContainer>
      <DividingLine border={false} />
    </>
  );
};

export default StoreAddExcelFormSection;

const span_style = css`
  display: flex;
  align-items: center;
`;
