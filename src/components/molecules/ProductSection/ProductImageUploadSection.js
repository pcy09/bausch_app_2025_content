import { Descriptions, Modal, Upload } from 'antd';
import { Buttons, CardContainer, Editor, Inputs, SelectBox, TextAreas } from '@/components/atom';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { cardTitle } from '@/common/utiles';
import { Controller } from 'react-hook-form';
import { brandArray } from '@/common/dummyArrary';
import { useRef, useState } from 'react';
import Image from 'next/image';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
const ProductImageUploadSection = ({
  thumbnailPreviewOpen,
  thumbnailPreviewImage,
  thumbnailPreviewTitle,
  thumbnailFileList,
  lensPreviewOpen,
  lensPreviewImage,
  lensPreviewTitle,
  lensFileList,
  handleClosePreview,
  handleRemove,
  handlePreview,
  handleUpload,
}) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );

  return (
    <CardContainer size="default" title={cardTitle('제품 이미지')} bordered={false}>
      <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
        <Descriptions.Item span={3} label="썸네일 이미지">
          <>
            <Upload
              listType="picture-card"
              // multiple={true}
              fileList={thumbnailFileList}
              onPreview={file => handlePreview(file, 'thumbnail')}
              onChange={fileList => handleUpload(fileList, 'thumbnail')}
              beforeUpload={() => false}
              maxCount={5}
              onRemove={file => handleRemove(file, 'thumbnail')}>
              {thumbnailFileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal
              width={800}
              centered={true}
              open={thumbnailPreviewOpen}
              title={thumbnailPreviewTitle}
              footer={null}
              onCancel={() => handleClosePreview('thumbnail')}
              style={{ position: 'relative' }}>
              <Image
                src={thumbnailPreviewImage}
                width={1000}
                height={500}
                style={{ width: '100%', height: 'auto' }}
                alt={'previewImage'}
                layout="responsive"
              />
            </Modal>
          </>
        </Descriptions.Item>
        <Descriptions.Item span={3} label="렌즈 이미지">
          <>
            <Upload
              listType="picture-card"
              fileList={lensFileList}
              onPreview={file => handlePreview(file, 'lens')}
              onChange={fileList => handleUpload(fileList, 'lens')}
              beforeUpload={() => false}
              maxCount={1}
              onRemove={file => handleRemove(file, 'lens')}>
              {lensFileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              width={800}
              centered={true}
              open={lensPreviewOpen}
              title={lensPreviewTitle}
              footer={null}
              onCancel={() => handleClosePreview('lens')}
              style={{ position: 'relative' }}>
              <Image
                src={lensPreviewImage}
                width={1000}
                height={500}
                style={{ width: '100%', height: 'auto' }}
                alt={'previewImage'}
                layout="responsive"
              />
            </Modal>
          </>
        </Descriptions.Item>
      </Descriptions>
    </CardContainer>
  );
};

export default ProductImageUploadSection;
