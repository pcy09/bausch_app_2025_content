import { Inputs } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions, Modal, Upload } from 'antd';
import { subLabel } from '@/styles/components/atomCommonStyle';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const CouponInfoSection = ({ coupon_thumb, coupon_event_title, coupon_present, coupon_benefit, coupon_product, control, couponType }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [thumbList, setThumbList] = useState(coupon_thumb);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleThumbChange = ({ fileList: newFileList }) => setThumbList(newFileList);
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
    <Descriptions title={'노출 정보'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item span={4} label={'혜택'}>
        <Controller
          name="coupon_benefit"
          control={control}
          defaultValue={coupon_benefit}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'소비자 APP에 노출될 쿠폰 혜택을 작성해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>

      <Descriptions.Item span={4} label={'제품'}>
        <Controller
          name="coupon_product"
          control={control}
          defaultValue={coupon_product}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'소비자 APP에 노출될 쿠폰 제품을 작성해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>
      {couponType === 'present' && (
        <Descriptions.Item span={4} label={'증정품'}>
          <Controller
            name="coupon_present"
            control={control}
            defaultValue={coupon_present}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" placeholder={'소비자 APP에 노출될 쿠폰 증정품을 작성해주세요'} value={value || null} {...rest} />
            )}
          />
        </Descriptions.Item>
      )}
      <Descriptions.Item span={4} label={'매장 찾기 행사명'}>
        <Controller
          name="coupon_event_title"
          control={control}
          defaultValue={coupon_event_title}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'소비자 APP에서 매장 찾기시 노출될 쿠폰 행사명을 입력해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        label={
          <div>
            썸네일 이미지 ⭐️<div css={subLabel}>이미지사이즈 267x268</div>
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
    </Descriptions>
  );
};

export default CouponInfoSection;
