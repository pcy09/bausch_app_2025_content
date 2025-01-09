import { CardContainer, ColGrid, Form, RowGrid, Inputs, DatePickers, Buttons, Radios, TextAreas, DividingLine, Label } from '@/components/atom';
import { useForm, Controller } from 'react-hook-form';
import { css } from '@emotion/react';
import NoticeLabel from '@/components/atom/Notice';
import { Col, Descriptions, Image, Modal, Row, Space, Upload, message } from 'antd';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import { PlusOutlined, SettingFilled, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fileuploadLabel, subLabel } from '@/styles/components/atomCommonStyle';
import { DetailPageTitle } from '@/components/molecules';

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

// 노출여부 라디오
const show_radioList = [
  {
    id: 1,
    value: 'Y',
    label: 'ios',
  },
  {
    id: 2,
    value: 'N',
    label: 'Android',
  },
];

const update_radioList = [
  {
    id: 1,
    value: 'Y',
    label: '필수',
  },
  {
    id: 2,
    value: 'N',
    label: '선택',
  },
];

const AppVersionDetailTemplate = () => {
  const [fileList, setFileList] = useState([]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({});

  const onSubmit = data => {
    handleAddData(data);
    router.push('/admin/support/news');
  };
  const onError = errors => handleError(errors);

  const handleAddData = data => {
    console.log(data);
  };
  const handleError = errors => {
    console.log(errors);
  };

  // 용량 제한에 관련된 함수 로직
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // 20MB 제한 함수
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('파일 업로드 실패:용량 초과');
    }
    return isLt2M;
  };

  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);

  const channelSelection = watch('channel', 'point');

  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬 소비자 앱 버전을 수정할 수 있는 페이지입니다. '} />

      <DividingLine border={false} />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer size={'default'} bordered={false}>
          <Descriptions title={'기본 정보'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
            <Descriptions.Item span={4} label={'OS'}>
              <Controller
                name="publish"
                control={control}
                defaultValue="Y"
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Radios options={show_radioList} value={value} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label={'업데이트 방식'}>
              <Controller
                name="publish"
                control={control}
                defaultValue="Y"
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Radios options={update_radioList} value={value} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label={'Version'}>
              <Controller
                name="title"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs
                    type="text"
                    placeholder={'버전을 입력해주세요(*반드시 앱스토어/구글 플레이의 버전과 일치해야 합니다) '}
                    value={value || null}
                    {...rest}
                  />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label={'관리용 비고'}>
              <Controller
                name="title"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={'비고사항을 입력해주세요'} value={value || null} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
        </CardContainer>
        <DividingLine border={false} />

        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'취소'} htmlType={'button'} onClick={() => router.push('/app/version/manage')} />
            <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default AppVersionDetailTemplate;
const col_style = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
