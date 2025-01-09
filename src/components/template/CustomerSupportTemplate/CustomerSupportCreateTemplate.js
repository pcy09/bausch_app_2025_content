// components
import { Buttons, CardContainer, ColGrid, DividingLine, Editor, Form, Inputs, Radios, RowGrid, SelectBox } from '@/components/atom';
import { PageTitle } from '@/components/molecules';
// antd
import { Descriptions, Input, Checkbox, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// commoncode
import useCommonCode from '@/hooks/useCommonCode';
import { buttonFlexBetweenRowStyle, buttonFlexEndRowStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
// reducer
import { errorSnackOpen } from '@/store/reducers/snackReducer';
// router
import { useRouter } from 'next/router';
// rf
import { useEffect, useRef, useState } from 'react';
// lib
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const channelRadioList = [
  {
    id: 1,
    value: 'P',
    label: 'Point',
  },
  {
    id: 2,
    value: 'A',
    label: 'App',
  },
];

// 발행 여부
const publishRadioList = [
  {
    id: 1,
    value: 'N',
    label: '미발행',
  },
  {
    id: 2,
    value: 'Y',
    label: '발행',
  },
];

// 채널 정보
const plainOptionss = [
  {
    id: 1,
    value: 'P',
    label: 'Point',
  },
  {
    id: 2,
    value: 'A',
    label: 'App',
  },
];

const CheckboxGroup = Checkbox.Group;

const CustomerSupportCreateTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [termsTypeCode, findTermsTypeCode] = useCommonCode('termsTypeCode');
  const [termsShowStatusCode, findTermsShowStatusCode] = useCommonCode('termsShowStatusCode');
  const [termsEssentialStatusCode, findTermsEssentialStatusCode] = useCommonCode('termsEssentialStatusCode');

  const [typeStatus, setTypeStatus] = useState('');

  // 상세 useState
  const [termCrateType, setTermCrateType] = useState([]);
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => handleError(errors);

  const handleSendData = data => {
    const { terms_type, terms_title, terms_content, terms_version, terms_essential_status, terms_shot_type } = data;

    const sendObject = {
      terms_type: terms_type,
      terms_title: terms_title,
      terms_content: terms_content,
      terms_version: terms_version,
      terms_essential_status: terms_essential_status,
      terms_show_status: terms_shot_type,
    };
    dispatch(registerTermsAction({ sendObject, callback: router }));
  };

  // toast error
  const handleError = errors => {
    // 타입 누락 에러
    if (errors?.terms_type) {
      dispatch(
        errorSnackOpen({
          message: '뉴스 등록 실패',
          description: '필수 정보가 기입되지 않았습니다.',
        }),
      );
    }
  };

  useEffect(() => {
    if (router.query.termsType === 'U') {
      setValue('terms_type', 'U');
    } else if (router.query.termsType === 'P') {
      setValue('terms_type', 'P');
    } else if (router.query.termsType === 'L') {
      setValue('terms_type', 'L');
    } else if (router.query.termsType === 'M') {
      setValue('terms_type', 'M');
    }
    setTypeStatus(
      watch('terms_type') === 'P'
        ? setValue('terms_essential_status', 'Y')
        : watch('terms_type') === 'U'
        ? setValue('terms_essential_status', 'Y')
        : setValue('terms_essential_status', 'N'),
    );
  }, [router, termCrateType, termsTypeCode]);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <CardContainer>
        <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
          <Descriptions.Item span={3} label="채널*">
            <Controller
              name="terms_type"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <CheckboxGroup options={plainOptionss} checked={value} onChange={target => console.log(value)} {...rest}></CheckboxGroup>
              )}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={3} label="발행여부*">
            <Controller
              name="terms_title"
              control={control}
              defaultValue="N"
              render={({ field: { ref, value, ...rest }, fieldState }) => {
                return <Radios options={publishRadioList} value={value} defaultValue={'N'} style={{ width: '100%' }} {...rest} />;
              }}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={3} label="뉴스제목*">
            <Controller
              name="terms_title"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'뉴스 제목을 입력해주세요.'} {...rest} />}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={3} label="뉴스 내용*">
            <Controller
              name="terms_content"
              control={control}
              render={({ field: { ref, value, onChange, ...rest } }) => (
                <Editor
                  border={false}
                  value={value || ''}
                  onChange={onChange}
                  isError={errors?.content}
                  forwardRef={editorRef}
                  customHeight={'700px'}
                  addFiles={false}
                  placeholder={'약관 내용을 입력해주세요.'}
                />
              )}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={3} label="파일 첨부">
            <Upload listType="text" fileList={[]} onPreview={''} onChange={''} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
              {/* {TODO : 파일 목록 리스트 나올곳} */}
            </Upload>
          </Descriptions.Item>
        </Descriptions>
      </CardContainer>

      <DividingLine border={false} />

      <RowGrid>
        <ColGrid span={24} css={buttonFlexBetweenRowStyle}>
          <Buttons type={'default'} name={'취소'} htmlType={'button'} css={marginRightStyle(5)} onClick={() => router.push('/support/terms')} />
          <Buttons type={'primary'} name={'등록'} htmlType={'submit'} css={marginLeftStyle(5)} /*onClick={() => router.push('/support/terms')}*/ />
        </ColGrid>
      </RowGrid>
    </Form>
  );
};

export default CustomerSupportCreateTemplate;
