import { Buttons, CardContainer, DividingLine, Form, RowGrid } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import NoticeLabel from '@/components/atom/Notice';
import { useRouter } from 'next/router';
import { PwResetFormSection } from '@/components/molecules';
import { useDispatch } from 'react-redux';
import { updateSettingChangePwAction } from '@/store/reducers/admin/settingMemberDetailReducer';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { message } from 'antd';

const PwManageTemplate = () => {
  const dispatch = useDispatch();
  // 계정 등록 버튼 눌렀을 때
  const updateSubmit = data => {
    const { pw, pw_confirm } = data;
    if (pw && pw_confirm) {
      const sendObject = {
        newPassword: pw,
        confirmPassword: pw_confirm,
      };
      dispatch(updateSettingChangePwAction({ sendObject: sendObject }));
    } else {
      alert('값들을 입력해주세요');
    }
  };
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => updateSubmit(data);
  const onError = errors => {
    if (errors.pw) {
      dispatch(
        errorSnackOpen({
          message: errors.pw.message,
        }),
      );
    }
    if (errors.pw_confirm) {
      dispatch(
        errorSnackOpen({
          message: errors.pw_confirm.message,
        }),
      );
    }
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 로그인한 계정의 비밀번호를 변경할 수 있습니다.'} />
      <DividingLine border={false} />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 비밀번호 변경 폼 */}
        <PwResetFormSection control={control} watch={watch} />
        <DividingLine border={false} />

        <CardContainer>
          <RowGrid css={buttonRowStyle}>
            <Buttons type={'primary'} htmlType={'submit'} name={'변경하기'} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default PwManageTemplate;
const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
