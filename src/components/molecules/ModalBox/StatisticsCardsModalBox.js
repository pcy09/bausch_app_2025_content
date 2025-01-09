import { transFormRadioValue } from '@/common/utiles';
import { Buttons, DividingLine, Radios, SelectBox, TextAreas } from '@/components/atom';
import useCommonCode from '@/hooks/useCommonCode';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { Form, Input, Descriptions, InputNumber } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { openPops } from '@/store/reducers/popupsReducer';

const StatisticsCardsModalBox = ({ handleUpdate, pointGroupName }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();

  const [pointType] = useCommonCode('pointType');
  const [pointProductGroup] = useCommonCode('pointProductGroup');
  const [storePointType, setstorePointTypeStatus] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (pointType && pointType.length > 0) {
      setstorePointTypeStatus(transFormRadioValue(pointType));
    }
  }, [pointType]);

  useEffect(() => {
    if (pointGroupName) {
      setValue(`selectedProductGroup`, pointGroupName);
    }
  }, [pointGroupName, setValue]);

  const handleSendData = () => {
    const data = getValues();
    const { selectedProductGroup, pointType, pointAdd, pointDeduct, detail } = data;

    const productGroupIdOption = pointProductGroup.find(option => option.value === selectedProductGroup); // 선택된 옵션의 값을 추출
    const productGroupIdOptionsKey = productGroupIdOption ? productGroupIdOption.key : null; // 키값을 추출
    // pointAdd 또는 pointDeduct 값 중 하나를 point로 설정
    const point = pointAdd || pointDeduct || null;

    if (!point || point === 0) {
      dispatch(
        errorSnackOpen({
          message: '금액을 입력해주세요',
        }),
      );
      return;
    }
    const sendObject = {
      pointProductGroupId: Number(productGroupIdOptionsKey) || null,
      pointType,
      point,
      detail,
    };

    console.log('sendObject:', sendObject); // 콘솔 로그 추가
    handleUpdate(sendObject);
  };

  const handlePointTypeChange = value => {
    setIsSaving(value === 'SAVED');
  };

  const handleCancel = () => {
    dispatch(openPops({ isModalOpen: false }));
  };

  return (
    <Form>
      <Descriptions bordered>
        <Descriptions.Item label="적립금명" span={3}>
          <Controller
            name="selectedProductGroup"
            control={control}
            defaultValue=""
            disabled
            rules={{ required: true }}
            render={({ field: { ref, value, ...rest }, fieldState }) => {
              return <Input type="text" value={value} {...rest} />;
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="구분" span={3}>
          <Controller
            name="pointType"
            control={control}
            defaultValue={'USED'}
            rules={{ required: true }}
            render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
              return (
                <Radios
                  options={storePointType}
                  value={value}
                  onChange={e => {
                    setValue('pointAdd', null);
                    setValue('pointDeduct', null);
                    onChange(e);
                    handlePointTypeChange(e.target.value);
                  }}
                  {...rest}
                />
              );
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="적립금 추가" span={3}>
          <Controller
            name="pointAdd"
            control={control}
            rules={{ required: isSaving === true }}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <InputNumber min={0} step={100} style={{ width: '100%' }} value={value} {...rest} disabled={isSaving !== true} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item label="적립금 차감" span={3}>
          <Controller
            name="pointDeduct"
            control={control}
            rules={{ required: isSaving === false }}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <InputNumber min={0} step={100} style={{ width: '100%' }} value={value} {...rest} disabled={isSaving !== false} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item label="상세 내역" span={3}>
          <Controller
            name="detail"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { ref, value, ...rest }, fieldState }) => <TextAreas value={value} type="text" {...rest} />}
          />
        </Descriptions.Item>
      </Descriptions>
      <DividingLine border={false} />
      <div css={buttonRowStyle}>
        <Buttons type={'danger'} name={'취소'} htmlType={'button'} onClick={handleCancel} />
        <Buttons type={'primary'} name={'수정하기'} htmlType={'button'} onClick={handleSendData} />
      </div>
    </Form>
  );
};
export default StatisticsCardsModalBox;
const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
