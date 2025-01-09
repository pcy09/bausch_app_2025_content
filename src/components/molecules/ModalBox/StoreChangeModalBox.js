import { getStoreCodeInquiryApi } from '@/api/admin/memberApi';
import { updateStoreDetailPointApi } from '@/api/admin/storeApi';
import { Buttons, DividingLine, Inputs } from '@/components/atom';
import { memberStoreHistoryAction } from '@/store/reducers/admin/memberReducer';
import { openPops } from '@/store/reducers/popupsReducer';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { buttonFlexStartRowStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { Form, Descriptions } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const StoreChangeModalBox = ({ handleUpdate }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const dispatch = useDispatch();

  const onSubmit = data => onFinish(data);
  const onError = errors => console.log(errors);

  const onFinish = () => {
    const data = getValues();
    if (data.store_title !== '') {
      reset();
      dispatch(openPops({ isModalOpen: false }));
      handleUpdate(data);
    } else {
      alert('스토어 코드를 확인해주세요');
    }
  };

  const codeStatusHandler = async storeCode => {
    if (storeCode !== '') {
      try {
        const response = await getStoreCodeInquiryApi(storeCode);
        if (response.status === 200) {
          const storeData = response.data.result;
          setValue('store_title', storeData?.storeName);
          setValue('store_phone', storeData?.storePhone);
          setValue('store_address', `${storeData?.basicAddress} ${storeData?.detailAddress}`);
        } else if (response.status === 400) {
          dispatch(
            errorSnackOpen({
              message: '스토어 코드 조회 에러',
              description: `앱스토어 매장이 아닙니다. 코드를 확인해주세요.`,
            }),
            reset(),
          );
        } else if (response.status === 204) {
          dispatch(
            errorSnackOpen({
              message: '스토어 코드 조회 에러',
              description: `존재하지 않는 코드입니다. 코드를 확인해주세요.`,
            }),
            reset(),
          );
        }

        // API 호출 성공 시 각 필드에 데이터 설정
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('스토어 코드를 입력해주세요');
    }
  };

  const handleCancel = () => {
    dispatch(openPops({ isModalOpen: false }));
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} layout="vertical">
      <Descriptions bordered>
        <Descriptions.Item label="스토어 코드" span={3}>
          <Controller
            name="store_code"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <div css={buttonFlexStartRowStyle}>
                <Inputs type="text" value={value || ''} disabled={true} placeholder={'코드를 입력해주세요'} {...rest} />
                <Buttons css={marginLeft} type="primary" onClick={() => codeStatusHandler(value)} name={'코드확인'} />
              </div>
            )}
          />
          {errors.storeName && <span>This field is required</span>}
        </Descriptions.Item>
        <Descriptions.Item label="스토어명" span={3}>
          <Controller
            name="store_title"
            control={control}
            defaultValue=""
            disabled
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <div css={buttonFlexStartRowStyle}>
                <Inputs type="text" value={value || ''} {...rest} />
              </div>
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item label="전화번호" span={3}>
          <Controller
            name="store_phone"
            control={control}
            defaultValue=""
            disabled
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <div css={buttonFlexStartRowStyle}>
                <Inputs type="text" value={value || ''} {...rest} />
              </div>
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item label="주소" span={3}>
          <Controller
            name="store_address"
            control={control}
            defaultValue=""
            disabled
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <div css={buttonFlexStartRowStyle}>
                <Inputs type="text" value={value || ''} {...rest} />
              </div>
            )}
          />
        </Descriptions.Item>
      </Descriptions>
      <DividingLine border={false} />
      <div css={buttonRowStyle}>
        <Buttons type={'danger'} name={'취소'} htmlType={'button'} onClick={handleCancel} />
        <Buttons type={'primary'} name={'변경하기'} htmlType={'button'} onClick={onFinish} />
      </div>
    </Form>
  );
};

export default StoreChangeModalBox;

const marginLeft = css`
  margin-left: 10px;
`;
const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
