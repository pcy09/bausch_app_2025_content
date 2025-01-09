import { Buttons, CardContainer, ColGrid, DividingLine, Editor, Inputs, RowGrid, SelectBox, TextAreas } from '@/components/atom';
import { Descriptions, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { buttonFlexEndRowStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useCommonCode from '@/hooks/useCommonCode';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { registerTermsAction } from '@/store/reducers/termsReducer';

const SupportTermCreateTemplate = () => {
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

  const handleError = errors => {
    // 타입 누락 에러
    if (errors?.terms_type) {
      dispatch(
        errorSnackOpen({
          message: '약관 등록 실패',
          description: '약관 타입을 입력 해 주세요',
        }),
      );
    }
    // 타이틀 누락 에러
    if (errors?.terms_title) {
      dispatch(
        errorSnackOpen({
          message: '약관 등록 실패',
          description: '약관 제목을 입력 해 주세요.',
        }),
      );
    }
    // 내용 누락 에러
    if (errors?.terms_content) {
      dispatch(
        errorSnackOpen({
          message: '약관 등록 실패',
          description: '약관 내용을 입력 해 주세요.',
        }),
      );
    }
    // 버전 등록 누락 에러
    if (errors?.terms_version) {
      dispatch(
        errorSnackOpen({
          message: '약관 등록 실패',
          description: '버전을 입력해 주세요.',
        }),
      );
    }
    // 필수 동의 누락 에러
    if (errors?.terms_essential_status) {
      dispatch(
        errorSnackOpen({
          message: '약관 등록 실패',
          description: '필수동의 여부를 입력 해 주세요.',
        }),
      );
    }
    // 노출 여부 누락 에러
    if (errors?.terms_shot_type) {
      dispatch(
        errorSnackOpen({
          message: '약관 등록 실패',
          description: '노출 여부를 입력 해 주세요.',
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
  }, [router, termCrateType, termsTypeCode, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <CardContainer>
        <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
          <Descriptions.Item span={3} label="약관타입">
            <Controller
              name="terms_type"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => {
                return <SelectBox value={value || ''} options={termsTypeCode} placeholder={'선택해주세요'} {...rest} />;
              }}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={3} label="제목">
            <Controller
              name="terms_title"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'입력해주세요.'} {...rest} />}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={3} label="내용">
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

          <Descriptions.Item span={3} label="버전">
            <Controller
              name="terms_version"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'입력해주세요.'} {...rest} />}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={1} label="필수동의여부">
            {watch('terms_type') === 'P' ? '필수동의' : watch('terms_type') === 'U' ? '필수동의' : '선택동의'}
            <Controller
              name="terms_essential_status"
              control={control}
              defaultValue={typeStatus}
              render={({ field: { ref, value, ...rest }, fieldState }) => {
                // return <Inputs label='hello' value={typeStatus}></Inputs>
              }}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={2} label="노출여부">
            <Controller
              name="terms_shot_type"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <SelectBox options={termsShowStatusCode} placeholder={'선택해주세요'} {...rest} />
              )}
              rules={{ required: true }}
            />
          </Descriptions.Item>
        </Descriptions>
      </CardContainer>

      <DividingLine border={false} />

      <RowGrid>
        <ColGrid span={24} css={buttonFlexEndRowStyle}>
          <Buttons type={'default'} name={'목록으로'} htmlType={'button'} css={marginRightStyle(5)} onClick={() => router.push('/support/terms')} />
          <Buttons
            type={'primary'}
            name={'등록하기'}
            htmlType={'submit'}
            css={marginLeftStyle(5)} /*onClick={() => router.push('/support/terms')}*/
          />
        </ColGrid>
      </RowGrid>
    </Form>
  );
};

export default SupportTermCreateTemplate;
