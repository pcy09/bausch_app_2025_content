import { CardContainer, Inputs, DatePickers, Radios, TextAreas, Buttons } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { flexCenterStyle, subLabel } from '@/styles/components/atomCommonStyle';
import { useState } from 'react';
import { css } from '@emotion/react';

const AppNoticeDetailBasicSection = ({ control, pro_channel, pro_title }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <Descriptions title={'팝업 정보'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item span={4} label={'팝업 제목'}>
        <Controller
          name="pro_title"
          control={control}
          defaultValue={pro_title}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'제목을 입력해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={4} label="팝업 이미지 등록">
        <Controller
          name="pro_channel"
          control={control}
          defaultValue={pro_channel}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Upload onChange={handleUpload} fileList={fileList} accept="image/png, image/jpeg" maxCount={1}>
              <div css={flexCenterStyle}>
                <Buttons type={'dashed'} name={'Upload'} icon={<UploadOutlined />} />
                <span css={marginLeftStyle}>*이미지 크기는 750X520px 입니다.</span>
              </div>
            </Upload>
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default AppNoticeDetailBasicSection;

const marginLeftStyle = css`
  margin-left: 10px;
  font-size: 12px;
  color: #888;
`;
