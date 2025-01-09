import { CardContainer } from '@/components/atom';
import { Descriptions, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { subLabel } from '@/styles/components/atomCommonStyle';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const PromotionImageSection = ({ channel, pro_thumb, pro_detail }) => {
  const [thumbList, setThumbList] = useState(pro_thumb);
  const [detailList, setDetailList] = useState(pro_detail);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleThumbChange = ({ fileList: newFileList }) => setThumbList(newFileList);
  const handleDetailChange = ({ fileList: newFileList }) => setDetailList(newFileList);
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

  const handleCancel = () => setPreviewOpen(false);

  return (
    <Descriptions title={'프로모션 이미지'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item
        span={4}
        label={
          <div>
            썸네일 이미지 ⭐️
            {channel === 'point' ? <span css={subLabel}>이미지사이즈 291x126</span> : <span css={subLabel}>이미지사이즈 800x320</span>}
          </div>
        }>
        <Upload listType="picture-card" fileList={thumbList} onPreview={handlePreview} onChange={handleThumbChange}>
          {thumbList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        label={
          <div>
            상세 이미지 ⭐️
            {channel === 'point' ? <span css={subLabel}>이미지사이즈 670x950</span> : <span css={subLabel}>이미지사이즈 800xfree</span>}
          </div>
        }>
        <Upload listType="picture-card" fileList={detailList} onPreview={handlePreview} onChange={handleDetailChange}>
          {detailList.length >= 8 ? null : uploadButton}
        </Upload>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PromotionImageSection;
