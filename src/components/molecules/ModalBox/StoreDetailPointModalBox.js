import { transFormRadioValue } from '@/common/utiles';
import { Buttons, ColGrid, DividingLine, RowGrid, TextAreas, Form } from '@/components/atom';
import useCommonCode from '@/hooks/useCommonCode';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { Input, Descriptions } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { openPops } from '@/store/reducers/popupsReducer';

const StoreDetailPointModalBox = ({ handleUpdate }) => {
  const { handleSubmit, control, setValue, getValues } = useForm({});

  const { pointDetailData } = useSelector(state => state?.store);
  const dispatch = useDispatch();

  const handleSendData = () => {
    const data = getValues();
    const { pointAdminRegistrationId, detail } = data;

    const sendObject = {
      pointAdminRegistrationId: pointAdminRegistrationId,
      detail,
    };
    handleUpdate(sendObject);
  };

  useEffect(() => {
    if (pointDetailData) {
      setValue('detail', pointDetailData.detail);
      setValue('point', pointDetailData.point);
      setValue('pointAdminRegistrationId', pointDetailData.pointAdminRegistrationId);
      setValue('pointProductGroupId', pointDetailData.pointProductGroupName);
      setValue('pointType', pointDetailData.pointType);
    }
  }, [pointDetailData, setValue]);

  const handleCancel = () => {
    dispatch(openPops({ isModalOpen: false }));
  };

  return (
    <Form>
      <Descriptions bordered>
        <Descriptions.Item label="적립금" span={3}>
          {pointDetailData.pointProductGroupName}
        </Descriptions.Item>
        <Descriptions.Item label="구분" span={3}>
          {pointDetailData.pointType === 'USED' ? '사용' : '적립'}
        </Descriptions.Item>
        {pointDetailData.pointType === 'SAVED' && (
          <Descriptions.Item label="적립금 추가" span={3}>
            +{pointDetailData.point}
          </Descriptions.Item>
        )}
        {pointDetailData.pointType === 'USED' && (
          <Descriptions.Item label="적립금 차감" span={3}>
            -{pointDetailData.point}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="상세 내역" span={3}>
          <Controller
            name="detail"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => <TextAreas value={value || null} type="text" {...rest} />}
          />
        </Descriptions.Item>
      </Descriptions>
      <DividingLine border={false} />
      <div css={buttonRowStyle}>
        <Buttons type={'danger'} name={'취소'} htmlType={'button'} onClick={handleCancel} />
        <Buttons type={'primary'} name={'등록하기'} htmlType={'button'} onClick={handleSendData} />
      </div>
    </Form>
  );
};

export default StoreDetailPointModalBox;
const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
