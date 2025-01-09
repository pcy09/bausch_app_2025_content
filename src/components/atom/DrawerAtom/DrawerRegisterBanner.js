import { PlusOutlined } from '@ant-design/icons';
import { Drawer, Modal, Switch, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '@/store/reducers/modalReducer';
import Image from 'next/image';
import { Buttons, ColGrid, DividingLine, Form, Inputs, RowGrid } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import Card from '@/components/atom/Card';
import { css } from '@emotion/react';
import { alignCenter, buttonFlexEndRowStyle, marginRightStyle, paddingBottomStyle } from '@/styles/components/atomCommonStyle';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { registerBannerAction } from '@/store/reducers/bannerReducer';
import Meta from 'antd/lib/card/Meta';

const DrawerRegisterBanner = ({ open }) => {
  const dispatch = useDispatch();
  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => handleError(errors);

  const handleError = errors => {
    dispatch(
      errorSnackOpen({
        message: '배너 관리 이름을 등록해주세요',
      }),
    );
  };

  const handleSendData = data => {
    const file = fileList[0]?.originFileObj;

    const isNewTab = data.banner_open_new_page === '' ? 'N' : 'Y';

    if (!file) {
      dispatch(
        errorSnackOpen({
          message: '배너 이미지를 등록해주세요',
        }),
      );
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('banner_title', data.banner_title);
    formData.append('banner_page_link', !data.banner_page_link ? null : data.banner_page_link);
    formData.append('banner_open_new_page', isNewTab);
    formData.append('banner_order', data.banner_order ? data.banner_order : 1);
    // dispatch로 api 호출 부분
    dispatch(registerBannerAction({ sendObject: formData }));
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  // 썸네일 이미지 미리보기
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // 썸네일 이미지 등록
  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);
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

  const onClose = () => {
    dispatch(closeDrawer());
  };
  return (
    <Drawer
      title="배너 등록"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}>
      <Form layout="vertical" onSubmit={handleSubmit(onSubmit, onError)}>
        <Card title={'배너 관리 이름'} bordered={false} size="default" hoverable css={cardBodyStyle}>
          <Meta description="업로드 권장 사이즈는 1024(너비) × 576(높이)px입니다." style={{ paddingBottom: '10px' }} />
          <Controller
            name="banner_title"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" placeholder={'배너 관리 목적의 이름을 입력해주세요.'} {...rest} />
            )}
          />
        </Card>

        <DividingLine border={false} />

        <Card title={'배너 이미지'} bordered={false} size="default" hoverable css={cardBodyStyle}>
          <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleUpload} beforeUpload={() => false}>
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            width={800}
            centered={true}
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
            style={{ position: 'relative' }}>
            <Image src={previewImage} width={1000} height={500} style={{ width: '100%', height: 'auto' }} alt={'previewImage'} layout="responsive" />
          </Modal>
        </Card>

        <DividingLine border={false} />

        <Card title={'연결 링크'} bordered={false} size="default" hoverable css={cardBodyStyle}>
          <Controller
            name="banner_page_link"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'https://'} {...rest} />}
          />

          <DividingLine border={false} />

          <div css={alignCenter}>
            <span css={marginRightStyle(10)}>새창 적용</span>
            <Controller
              name="banner_open_new_page"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => <Switch {...rest} />}
            />
          </div>
        </Card>

        <DividingLine border={false} />

        <Card title={'배너 노출 순서'} bordered={false} size="default" hoverable css={cardBodyStyle}>
          <Controller
            name="banner_order"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="number" value={value || 1} placeholder={'1 ~ 10'} {...rest} />}
          />
        </Card>

        <DividingLine border={false} />

        <RowGrid>
          <ColGrid span={24} css={buttonFlexEndRowStyle}>
            <Buttons type={'primary'} name={'등록하기'} htmlType={'submit'} />
          </ColGrid>
        </RowGrid>
      </Form>
    </Drawer>
  );
};
export default DrawerRegisterBanner;

const cardBodyStyle = css`
  .ant-card-head {
    border-bottom: 0;
  }
  .ant-card-body {
    padding: 0 24px 24px;
  }
`;
