import { buttonFlexEndRowStyle, contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { Buttons, CardContainer, ColGrid, DividingLine, RowGrid } from '@/components/atom';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { PickupGuide, UsageGuide } from '@/components/template';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPickupGuideAction, pickupGuideReset, registerPickupGuideAction, updateUsingImageList } from '@/store/reducers/pickupGuideReducer';
import PickupGuidePreview from '@/components/template/SupportTemplate/PickupGuidePreview';
import { updateUseInfoAction } from '@/store/reducers/useInfoReducer';

const SupportGuideTemplate = () => {
  const dispatch = useDispatch();
  const pickupData = useSelector(state => state.pickup.pickupData);
  const pickupImageList = useSelector(state => state.pickup.imageList);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({});

  // 이용가이드
  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: 'usageInfo',
    keyName: 'use_info_front_id',
  });

  // active Tab Menu
  const [tabMenu, setTabMenu] = useState('pickup');

  // 픽업가이드에 사용된 이미지 ID
  const [editorImageId, setEditorImageId] = useState(null);

  // 버튼 디스에이블 관련 state
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeTabMenu = (key, e) => {
    setTabMenu(key);
  };

  const getUsageData = () => {
    fields.forEach((item, index) => {
      if (item.id === null) {
        setValue(`usageInfo[${index}].use_info_front_id`, item.use_info_front_id);
      }
    });
    const listItem = getValues().usageInfo;
    const data = {
      data: listItem.map(item => {
        return {
          id: item.id,
          use_info_title: item.use_info_title,
          use_info_content: item.use_info_content,
          use_info_front_id: item.use_info_front_id,
        };
      }),
    };
    dispatch(updateUseInfoAction({ sendObject: data }));
  };

  // 픽업가이드 저장
  const handleSubmitGuide = () => {
    const sendObject = {
      id: pickupData.id,
      pick_guide_content: pickupData.pickupContent,
      usingImage: pickupImageList.usingImageList,
      deleteImage: pickupImageList.deletedImageList,
    };

    dispatch(registerPickupGuideAction({ sendObject }));
    setIsDisabled(true);
  };

  // 텍스트 에디터에 추가된 이미지 update
  const saveEditorImageID = id => {
    setEditorImageId(id);
  };
  useEffect(() => {
    if (editorImageId) {
      dispatch(updateUsingImageList({ usingImageId: editorImageId }));
      setEditorImageId(null);
    }
    return () => setEditorImageId(null);
  }, [dispatch, editorImageId]);

  // 초기 데이터 및 reset
  useEffect(() => {
    dispatch(getPickupGuideAction());

    return () => {
      dispatch(pickupGuideReset());
    };
  }, [dispatch]);

  const [isPreview, setIsPreview] = useState(false);
  // 미리보기
  const previewGuide = (status = true) => {
    setIsPreview(status);
  };

  const tabMenuList = () => {
    return [
      {
        label: '픽업 가이드',
        key: 'pickup',
        children: (
          <PickupGuide
            saveEditorImageID={saveEditorImageID}
            pickupData={pickupData}
            pickupImageList={pickupImageList}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            previewGuide={previewGuide}
          />
        ),
      },
      {
        label: '이용 가이드',
        key: 'usage',
        children: (
          <UsageGuide
            control={control}
            handleSubmit={handleSubmit}
            register={register}
            fields={fields}
            append={append}
            insert={insert}
            remove={remove}
            setValue={setValue}
          />
        ),
      },
    ];
  };

  return (
    <>
      {isPreview && <PickupGuidePreview previewGuide={previewGuide} />}
      <>
        <CardContainer>
          <Tabs
            onTabClick={(key, e) => handleChangeTabMenu(key, e)}
            defaultActiveKey={tabMenu}
            type="card"
            centered
            size={'smail'}
            items={tabMenuList()}
          />
        </CardContainer>
        <DividingLine border={false} />
        <RowGrid>
          <ColGrid span={24} css={buttonFlexEndRowStyle}>
            {tabMenu === 'pickup' && <Buttons type={'primary'} name={'저장'} htmlType={'button'} onClick={handleSubmitGuide} disabled={isDisabled} />}
            {tabMenu === 'usage' && <Buttons type={'primary'} name={'저장'} htmlType={'button'} onClick={getUsageData} />}
          </ColGrid>
        </RowGrid>
      </>
    </>
  );
};

export default SupportGuideTemplate;
