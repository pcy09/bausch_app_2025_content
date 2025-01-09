import {
  CardContainer,
  ColGrid,
  Form,
  RowGrid,
  Inputs,
  DatePickers,
  Buttons,
  Radios,
  TextAreas,
  DividingLine,
  Label,
  Editor,
} from '@/components/atom';
import { useForm, Controller } from 'react-hook-form';
import { css } from '@emotion/react';
import NoticeLabel from '@/components/atom/Notice';
import { Col, Descriptions, Image, Modal, Row, Space, Upload, Select, message } from 'antd';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import { PlusOutlined, SettingFilled, UploadOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { fileuploadLabel, subLabel } from '@/styles/components/atomCommonStyle';
import { DetailPageTitle } from '@/components/molecules';
import { useDispatch, useSelector } from 'react-redux';

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
  {
    id: 3,
    value: 'lensly',
    label: 'LENSLY',
  },
];

// 노출여부 라디오
const show_radioList = [
  {
    id: 1,
    value: 'Y',
    label: '발행',
  },
  {
    id: 2,
    value: 'N',
    label: '미발행',
  },
];

const AdminSupportFaqDetailTemplate = () => {
  const [fileList, setFileList] = useState([]);
  const interestSelectData = useSelector(state => state.event.eventSelectList);

  const [editorImageId, setEditorImageId] = useState(null);

  const editorRef = useRef(null);

  // 셀렉트
  const selectOption = interestSelectData?.reduce(
    (acc, cur) =>
      acc.concat({
        label: cur.sku_product_name,
        id: cur.product_info_id,
        value: cur.product_info_id,
      }),
    [],
  );

  // 텍스트 에디터에 추가된 이미지 update
  const saveEditorImageID = id => {
    setEditorImageId(id);
  };

  useEffect(() => {
    if (editorImageId) {
      dispatch(updateUsingImageListAction({ usingImageId: editorImageId }));
      setEditorImageId(null);
    }

    return () => setEditorImageId(null);
  }, [editorImageId]);

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

  const channelSelection = watch('pro_channel', 'point');

  return (
    <>
      <NoticeLabel title={'👉🏼POINT site, LESLY site, App 채널의 FAQ를 등록하는 페이지입니다.'} />

      <DividingLine border={false} />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer size={'default'} bordered={false}>
          <Descriptions labelStyle={{ width: '250px' }} bordered={true} column={4}>
            <Descriptions.Item span={4} label={'채널 ⭐️'}>
              <Controller
                name="pro_channel"
                control={control}
                defaultValue="point"
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Radios options={channel_radioList} value={value} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label={'카테고리 ⭐️'}>
              <Controller
                name="pro_title"
                control={control}
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Select
                    options={selectOption}
                    mode="multiple"
                    style={{ width: '30%' }}
                    value={value || []}
                    onChange={onChange}
                    placeholder="카테고리를 선택해주세요."
                    {...rest}
                  />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={4} label={'질문 ⭐️'}>
              <Controller
                name={`pro_memo`}
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={''} value={value || null} {...rest} />}
              />
            </Descriptions.Item>

            <Descriptions.Item span={4} label={'내용 ⭐️'}>
              <Controller
                name="pro_subTitle"
                control={control}
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Editor
                    border={false}
                    value={value || ''}
                    onChange={onChange}
                    isError={errors?.content}
                    forwardRef={editorRef}
                    saveEditorImageID={saveEditorImageID}
                    // customHeight={'auto'}
                  />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label={'노출 여부 ⭐️'}>
              <Controller
                name="pro_subTitle"
                control={control}
                defaultValue="Y"
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Radios options={show_radioList} value={value} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>
        <DividingLine border={false} />
        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'취소'} htmlType={'button'} onClick={() => router.push('/admin/campaign/promotion')} />
            <Buttons type={'primary'} name={'등록'} htmlType={'submit'} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default AdminSupportFaqDetailTemplate;
const col_style = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
