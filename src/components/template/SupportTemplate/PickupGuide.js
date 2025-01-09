import { Buttons, ColGrid, DividingLine, Editor, Form, RowGrid } from '@/components/atom';
import { buttonFlexEndRowStyle, marginBottomStyle } from '@/styles/components/atomCommonStyle';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { insetPickupGuideDataAction, updateUsingImageList } from '@/store/reducers/pickupGuideReducer';
import css from 'styled-jsx/css';

const PickupGuide = ({ saveEditorImageID, pickupData, pickupImageList, isDisabled, setIsDisabled, previewGuide }) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    if (pickupData?.id && pickupData?.pickupContent) {
      setValue('pick_guide_content', pickupData.pickupContent);
    }
  }, [pickupData, setValue]);

  const onSubmit = data => handleSendData(data);
  const onError = errors =>
    dispatch(
      errorSnackOpen({
        message: '변경사항 저장 실퍠',
        description: '픽업가이드 내용을 작성해주세요.',
      }),
    );

  // 변경사항 저장
  const handleSendData = data => {
    dispatch(
      snackOpen({
        type: 'success',
        message: '변경사항 저장 성공',
        description: '',
        placement: 'top',
      }),
    );
    setIsDisabled(false);

    // 사용이미지 & 삭제이미지 filter
    const filterUsingImageId = pickupImageList.usingImageList?.filter(id => data.pick_guide_content.includes(id));
    const filterDeletedImageId = pickupImageList.usingImageList?.filter(id => !data.pick_guide_content.includes(id));

    // store 업데이트
    dispatch(
      insetPickupGuideDataAction({
        pickupData: {
          id: pickupData.id,
          pickupContent: data.pick_guide_content,
        },
        imageList: {
          usingImageList: filterUsingImageId,
          deletedImageList: filterDeletedImageId,
        },
      }),
    );
  };

  useEffect(() => {
    const subscription = watch(value => {
      if (value && !isDisabled) {
        setIsDisabled(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isDisabled, setIsDisabled]);

  return (
    <>
      {/*<DividingLine border={false} />*/}

      <RowGrid css={marginBottomStyle(12)}>
        <ColGrid span={16} />
        <ColGrid span={8} css={buttonFlexEndRowStyle}>
          <Buttons type={'default'} name={'미리보기'} htmlType={'button'} disabled={isDisabled} onClick={previewGuide} />
        </ColGrid>
      </RowGrid>

      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name="pick_guide_content"
          control={control}
          render={({ field: { ref, value, onChange, ...rest } }) => (
            <Editor
              value={value || ''}
              onChange={onChange}
              isError={errors?.content}
              forwardRef={editorRef}
              customHeight={'700px'}
              saveEditorImageID={saveEditorImageID}
            />
          )}
          rules={{ required: true }}
        />

        <DividingLine border={false} />

        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={16} />
          <ColGrid span={8} css={buttonFlexEndRowStyle}>
            <Buttons type={'primary'} name={'변경사항 저장'} htmlType={'submit'} disabled={!isDisabled} />
          </ColGrid>
        </RowGrid>
      </Form>
    </>
  );
};

export default PickupGuide;
