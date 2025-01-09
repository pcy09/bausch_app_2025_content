import { Inputs, Radios, Buttons } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { subLabel } from '@/styles/components/atomCommonStyle';

// 채널 라디오
const channel_radioList = [
  {
    id: 1,
    value: 'point',
    label: 'BAUSCH POINT',
  },
  {
    id: 2,
    value: 'app',
    label: 'BAUSCH APP',
  },
];

// 새창여부 라디오
const target_radioList = [
  {
    id: 1,
    value: 'Y',
    label: 'YES',
  },
  {
    id: 2,
    value: 'N',
    label: 'NO',
  },
];

const BannerBasicSection = ({
  control,
  banner_image,
  setChannel,
  setValue,
  banner_channel,
  banner_title,
  banner_link,
  banner_target,
  setFileList,
}) => {
  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleRadioChange = e => {
    const value = e.target.value;
    setChannel(value);
    setValue('banner_channel', value);
  };

  return (
    <Descriptions title={'기본 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item span={4} label={'채널'}>
        <Controller
          name="banner_channel"
          control={control}
          defaultValue={banner_channel}
          render={({ field: { ref, onChange, value, ...rest }, fieldState }) => {
            return (
              <Radios
                onChange={e => {
                  handleRadioChange(e);
                }}
                options={channel_radioList}
                value={value}
                {...rest}
              />
            );
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
      <Descriptions.Item span={4} label={'제목'}>
        <Controller
          name="banner_title"
          control={control}
          defaultValue={banner_title}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'제목을 입력해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={4} label="이미지 첨부">
        <Controller
          name="banner_image"
          control={control}
          defaultValue={banner_image}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Upload onChange={handleUpload} fileList={banner_image} accept="image/png, image/jpeg" maxCount={1}>
              <Buttons type={'dashed'} name={'Upload'} icon={<UploadOutlined />} />
              <span css={subLabel}>*이미지 크기는 750X520px 입니다.</span>
            </Upload>
          )}
        />
      </Descriptions.Item>
      {banner_channel === 'point' && (
        <>
          <Descriptions.Item span={4} label={'링크'}>
            <Controller
              name="banner_link"
              control={control}
              defaultValue={banner_link}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs type="text" placeholder={'링크를 입력해주세요'} value={value || null} {...rest} />
              )}
            />
          </Descriptions.Item>

          <Descriptions.Item span={4} label={'새창 여부'}>
            <Controller
              name="banner_target"
              control={control}
              defaultValue={banner_target}
              render={({ field: { ref, value, ...rest }, fieldState }) => {
                return <Radios options={target_radioList} value={value} {...rest} />;
              }}
              rules={{ required: true }}
            />
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

export default BannerBasicSection;
