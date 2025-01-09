import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, Label, RowGrid, SelectAtom } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { signUpAction } from '@/store/reducers/authReducer';

const AdminManageFormSection = ({ authorityOptions }) => {
  // 폼 데이터
  const form_data = [
    {
      label: '이름',
      input_name: 'name',
      input_type: 'text',
      defaultValue: '',
      placeholder: '이름을 입력하세요',
    },
    {
      label: '휴대폰 번호',
      input_name: 'phone',
      input_type: 'tel',
      defaultValue: '',
      placeholder: '휴대폰 번호를 입력하세요',
    },
    {
      label: '어드민 ID',
      input_name: 'admin_id',
      input_type: 'text',
      defaultValue: '',
      placeholder: '아이디를 입력하세요',
    },

    {
      label: '이메일',
      input_name: 'email',
      input_type: 'email',
      defaultValue: '',
      placeholder: '이메일을 입력하세요',
    },
    {
      label: '담당부서',
      input_name: 'part',
      input_type: 'text',
      defaultValue: '',
      placeholder: '담당부서를 입력하세요',
    },
    {
      label: '권한 설정',
      input_name: 'authority',
      input_type: 'select',
      defaultValue: ``,
      placeholder: '',
    },
  ];

  const dispatch = useDispatch();
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleRegister(data);
  const onError = errors => {
    const { name, phone, admin_id, email, part, authority } = errors;
    if (name) {
      dispatch(
        errorSnackOpen({
          message: '이름을 입력하세요',
        }),
      );
    }
    if (phone) {
      dispatch(
        errorSnackOpen({
          message: '휴대폰 번호를 입력하세요',
        }),
      );
    }
    if (admin_id) {
      dispatch(
        errorSnackOpen({
          message: '아이디를 입력하세요',
        }),
      );
    }
    if (email) {
      dispatch(
        errorSnackOpen({
          message: '이메일을 입력하세요',
        }),
      );
    }
    if (part) {
      dispatch(
        errorSnackOpen({
          message: '담당부서를 입력하세요',
        }),
      );
    }
    if (authority) {
      dispatch(
        errorSnackOpen({
          message: '권한설정을 선택해주세요',
        }),
      );
    }
  };

  // 관리자 등록
  const handleRegister = data => {
    const { name, admin_id, phone, email, part, authority } = data;
    if (name && admin_id && phone && email && part && authority) {
      const sendObject = {
        loginId: admin_id,
        pw: 1111,
        name,
        phone,
        email,
        unit: part,
        level: authority,
      };
      dispatch(signUpAction({ sendObject }));
      reset();
    } else {
      alert('값들을 입력해주세요');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <CardContainer>
        <Descriptions title={'관리자 등록'} labelStyle={{ width: '150px' }} bordered={true} column={6}>
          {form_data?.map((item, index) => {
            const type = item.input_type;
            if (type === 'text' || type === 'tel' || type === 'email') {
              return (
                <Descriptions.Item span={3} label={item.label} key={index}>
                  <Controller
                    name={item.input_name}
                    control={control}
                    defaultValue={item.defaultValue}
                    rules={{ required: true }}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <Inputs type={item.input_type} placeholder={item.placeholder} value={value || null} {...rest} />
                    )}
                  />
                </Descriptions.Item>
              );
            } else if (type === 'select') {
              return (
                <Descriptions.Item span={3} label={item.label} key={index}>
                  <SelectAtom
                    name={item.input_name}
                    placeholder="선택해주세요"
                    control={control}
                    rules={{ required: true }}
                    options={authorityOptions?.map(l => ({
                      value: l.level,
                      label: l.levelName,
                    }))}
                  />
                </Descriptions.Item>
              );
            }
          })}
        </Descriptions>
        <DividingLine border={false} />
        <RowGrid css={buttonRowStyle}>
          <Buttons type={'primary'} htmlType={'submit'} name={'관리자 등록'} />
        </RowGrid>
      </CardContainer>
    </Form>
  );
};

export default AdminManageFormSection;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
