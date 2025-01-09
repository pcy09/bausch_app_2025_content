import { Buttons, CardContainer, ColGrid, DividingLine, Editor, Inputs, RowGrid, SelectBox } from '@/components/atom';
import { Descriptions } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { buttonFlexEndRowStyle, buttonFlexStartRowStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTermsDetailAction, deleteTermsAction, updateTermsAction, termsReset } from '@/store/reducers/termsReducer';
import { useRouter } from 'next/router';
import useCommonCode from '@/hooks/useCommonCode';

const SupportTermDetailTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const termsList = useSelector(state => state.terms.termsDetail);

  const [termsTypeCode, findTermsTypeCode] = useCommonCode('termsTypeCode');
  const [termsShowStatusCode, findTermsShowStatusCode] = useCommonCode('termsShowStatusCode');
  const [termsEssentialStatusCode, findTermsEssentialStatusCode] = useCommonCode('termsEssentialStatusCode');

  // 상세 useState
  const [termDetailData, setTermDetailData] = useState([]);

  const editorRef = useRef();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);

  // 수정
  const handleSendData = data => {
    const { terms_title, terms_content, terms_essential_status, terms_shot_type } = data;
    console.log(data);
    const sendObject = {
      terms_title: terms_title,
      terms_content: terms_content,
      terms_essential_status: terms_essential_status,
      terms_show_status: terms_shot_type,
    };
    // console.log('id',router?.query?.id);
    dispatch(updateTermsAction({ id: router?.query?.id, sendObject, callback: router }));
  };

  // 삭제
  const handleRemoveDetail = () => {
    dispatch(deleteTermsAction({ id: router?.query?.id, callback: router }));
  };

  // 초기 데이터 및 reset
  useEffect(() => {
    return () => {
      dispatch(termsReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getTermsDetailAction({ id: router?.query?.id }));
    }
  }, [router, dispatch]);

  useEffect(() => {
    setValue('terms_type', termDetailData.terms_type);
    setValue('terms_title', termDetailData.terms_title);
    setValue('terms_content', termDetailData.terms_content);
    setValue('terms_essential_status', termDetailData.terms_essential_status);
    setValue('terms_shot_type', termDetailData.terms_show_status);
  }, [termDetailData, setValue]);

  useEffect(() => {
    setTermDetailData(termsList);
  }, [termsList]);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <CardContainer>
        <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
          <Descriptions.Item span={3} label="약관타입">
            {termDetailData?.terms_type === 'U'
              ? '이용약관'
              : termDetailData?.terms_type === 'P'
              ? '개인정보처리방침'
              : termDetailData?.terms_type === 'L'
              ? '위치정보 이용약관'
              : '마케팅 수신 동의'}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="제목">
            <Controller
              name="terms_title"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
              )}
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
                  customHeight="700px"
                  addFiles={false}
                  // style={{ height: '1000px' }}
                />
              )}
              rules={{ required: true }}
            />
          </Descriptions.Item>

          <Descriptions.Item span={2} label="필수동의여부">
            {termDetailData?.terms_essential_status === 'Y' ? '필수동의' : '선택동의'}
            {/* <Controller
              name="terms_essential_status"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => <SelectBox value={value || ''} options={termsEssentialStatusCode} placeholder={'선택해주세요'} {...rest} />}
            /> */}
          </Descriptions.Item>

          <Descriptions.Item span={1} label="노출여부">
            <Controller
              name="terms_shot_type"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <SelectBox value={value || ''} options={termsShowStatusCode} placeholder={'선택해주세요'} {...rest} />
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      </CardContainer>

      <DividingLine border={false} />
      <RowGrid>
        <ColGrid span={1} css={buttonFlexStartRowStyle}>
          <Buttons onClick={handleRemoveDetail} type={'danger'} name={'삭제'} htmlType={'button'} css={marginRightStyle(5)} />
        </ColGrid>
        <ColGrid span={23} css={buttonFlexEndRowStyle}>
          <Buttons type={'default'} name={'목록으로'} htmlType={'button'} css={marginRightStyle(5)} onClick={() => router.push('/support/terms')} />
          <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} onClick={() => router.push('/support/terms')} />
        </ColGrid>
      </RowGrid>
    </Form>
  );
};

export default SupportTermDetailTemplate;
