import { Collapse, Descriptions, Upload } from 'antd';
import { Buttons, CardContainer, DividingLine } from '@/components/atom';
import { UploadOutlined } from '@ant-design/icons';
import { cardTitle } from '@/common/utiles';
import { ProductSkuListTemplate } from '@/components/template';
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { marginRightStyle } from '@/styles/components/atomCommonStyle';
import Tables from '../../atom/Tables';

const ProductSkuUploadSection = ({ pageId, skuFileList, setSkuFileList, skuInfo }) => {
  const uploadProps = {
    onRemove: file => {
      const index = skuFileList.indexOf(file);
      const newFileList = skuFileList.slice();
      newFileList.splice(index, 1);
      setSkuFileList(newFileList);
    },
    beforeUpload: file => {
      return false;
    },
    onChange: file => {
      setSkuFileList([file]);
    },
    skuFileList,
  };

  return (
    <>
      {pageId !== 'create' && (
        <CardContainer
          size="default"
          shadow={false}
          title={cardTitle('SKU 정보')}
          bodyStyle={{ background: '#f0f2f5', padding: '0 24px 24px 0' }}
          headStyle={{ background: '#f0f2f5', padding: '0' }}
          bordered={false}></CardContainer>
      )}

      <CardContainer size="default" title={cardTitle('제품 SKU 업로드')} bordered={false}>
        <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
          <Descriptions.Item span={3} label="SKU">
            {pageId !== 'create' && (
              <span css={[marginRightStyle(10), fontSizeStyle]}>
                현재 등록된 SKU는 <span css={skuCountStyle}>{skuInfo?.length}개</span> 입니다.
              </span>
            )}

            <Upload accept=".xls,.xlsx" maxCount={1} {...uploadProps}>
              <Buttons type={'dashed'} icon={<UploadOutlined />} name={pageId === 'create' ? 'SKU 파일 업로드' : 'SKU 파일 변경하기'} />
            </Upload>
          </Descriptions.Item>
        </Descriptions>

        <DividingLine border={false} />
        <Collapse>
          <Collapse.Panel header={'SKU 보기'} key={'sku'}>
            {skuInfo?.length !== 0 && <ProductSkuListTemplate skuList={skuInfo} />}
          </Collapse.Panel>
        </Collapse>
      </CardContainer>

      {/*<CardContainer>*/}

      {/*</CardContainer>*/}
    </>
  );
};

export default ProductSkuUploadSection;

const glassesContainer = css`
  .ant-descriptions-extra {
    position: absolute;
    left: 100px;
  }
`;

const fontSizeStyle = css`
  font-size: 20px;
`;
const skuCountStyle = css`
  color: #14bd7e;
`;
