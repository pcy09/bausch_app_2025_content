import { Buttons, CardContainer, DividingLine, Editor, Form, Inputs, RowGrid, TextAreas } from '@/components/atom';
import { Descriptions, Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { contentsContainerStyle, descStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getOpticianDetailAction, getOpticianListAction, opticianReset, updateOpticianAction } from '@/store/reducers/admin/opticianReducer';

import { DetailPageTitle } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';

const AdminSupportInquiryDetailTemplate = () => {
  const dispatch = useDispatch();
  const { opticianDetail } = useSelector(state => state?.optician);

  const [editorImageId, setEditorImageId] = useState(null);

  const editorRef = useRef(null);

  const storeGroupOptions = opticianDetail?.fsSaleItem?.split(',') || [];
  const defaultStoreGroup = storeGroupOptions.shift();

  const { opticianList, paging } = useSelector(state => state.optician);

  const { query, back, push } = useRouter();

  // 예시를 위한 주소
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

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
  }, [editorImageId, dispatch]);

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);

  const handleSendData = data => {
    dispatch(updateOpticianAction({ id: router.query.id, sendObject: data }));
  };

  useEffect(() => {
    if (!opticianList.length) {
      dispatch(getOpticianListAction());
    }
  }, [dispatch, opticianList.length]);

  // 상세 데이터 호출
  useEffect(() => {
    if (router.query.id) {
      dispatch(getOpticianDetailAction({ id: router.query.id, callback: router }));
    }
    return () => {
      dispatch(opticianReset());
    };
  }, [router, dispatch]);

  useEffect(() => {
    if (opticianDetail) {
      setValue('store_show_status', opticianDetail?.store_show_status);
      setValue('store_name', opticianDetail?.fsStoreName);
      setValue('abc_segment', opticianDetail?.fsStoreABC);
      setValue('store_phone', opticianDetail?.fsStorePhone);
      setValue('reg_num', opticianDetail?.fsStoreRegNum);

      setValue('store_group', defaultStoreGroup);
    }
  }, [opticianDetail, defaultStoreGroup, setValue]);

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 App 채널의 1:1 문의 상세 페이지입니다. 답변을 등록할 수 있습니다. '} />
      </div>
      <DividingLine border={false} />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          <Descriptions title="문의 회원 정보" bordered={true}>
            <Descriptions.Item span={1} label="이름">
              {opticianDetail?.fsStoreOwnerName}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="아이디">
              {opticianDetail?.fsSaleEmpCode}
            </Descriptions.Item>
            <Descriptions.Item span={1} label="연락처">
              {opticianDetail?.fsStorePhone}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="이메일">
              {opticianDetail?.fsStoreName}
            </Descriptions.Item>
          </Descriptions>

          <Divider border={true} dashed={true} />

          <Descriptions title="문의 정보" labelStyle={{ width: '200px' }} bordered={true}>
            <Descriptions.Item span={4} label="처리상태">
              <Controller
                name={`status`}
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={''} css={descWidth} value={value || null} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label="문의 등록일">
              <Controller
                name={`q_date`}
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={''} css={descWidth} value={value || null} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label="카테고리">
              <Controller
                name={`category_name`}
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={''} css={descWidth} value={value || null} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label="문의 제목">
              <Controller
                name={`q_title`}
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={''} css={descWidth} value={value || null} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label="문의 내용">
              <Controller
                name={`pro_memo`}
                control={control}
                defaultValue={''}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <TextAreas height={100} value={value || null} placeholder={'프로모션에 대한 설명을 작성해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label="문의 답변 ⭐️">
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
                  />
                )}
              />
            </Descriptions.Item>
          </Descriptions>

          <DividingLine border={false} />
        </CardContainer>

        <DividingLine border={false} />

        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'취소'} htmlType={'button'} onClick={() => router.push('/admin/support/inquiry-one')} />
            <Buttons type={'primary'} name={'답변 등록'} htmlType={'submit'} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default AdminSupportInquiryDetailTemplate;

const descWidth = css`
  width: 60%;
`;
