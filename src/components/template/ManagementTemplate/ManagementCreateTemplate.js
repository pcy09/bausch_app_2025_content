import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, Radios, RowGrid } from '@/components/atom';
import { Descriptions } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { buttonFlexEndRowStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useDispatch } from 'react-redux';
import { signUpAction } from '@/store/reducers/authReducer';
import { useRouter } from 'next/router';
import { emailRex, nameLengthRex, passwordLengthRex, phoneNumRex } from '@/common/regex';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';
import { useEffect, useState } from 'react';

const ManagementCreateTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [emailToSend, setEmailToSend] = useState('');
  const [messageToSend, setMessageToSend] = useState('');

  const [verificationCode, setVerificationCode] = useState(''); // 사용자가 입력한 인증번호 상태
  const [receivedCode, setReceivedCode] = useState(''); // 이메일을 통해 받은 실제 인증번호 상태
  const [verificationStatus, setVerificationStatus] = useState(''); // 인증 상태 메시지

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => handleError(errors);

  const handleEmailSend = async () => {
    // API 호출로 이메일 발송
    try {
      const response = await fetch('/api/sendEmailApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailToSend, // 받는 사람의 이메일 주소
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Email sent:', data); // 성공 메시지 출력
        console.log('Email sent message:', data.message); // 성공 메시지 출력
        setReceivedCode(data.message); // 인증 코드 상태 업데이트

        // 이메일 발송 성공 후 처리 로직 (예: 입력 필드 초기화)
        setEmailToSend('');
        setMessageToSend('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email send error:', error);
    }
  };

  // 인증번호를 비교하는 부분
  const verifyCode = () => {
    if (verificationCode === receivedCode) {
      setVerificationStatus('인증 완료');
    } else {
      setVerificationStatus('인증 번호가 일치하지 않습니다.');
    }
  };

  const handleSendData = data => {
    const { manager_name, manager_email, manager_phone, manager_group, manager_password, confirmPassword } = data;
    const sendObject = {
      manager_name,
      manager_email,
      manager_phone,
      manager_group,
      manager_password,
    };

    if (manager_password !== confirmPassword) {
      dispatch(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: '비밀번호가 일치하지 않습니다.',
        }),
      );
    } else {
      dispatch(signUpAction({ sendObject, callback: router }));
    }
  };

  const handleError = errors => {
    if (errors?.manager_password) {
      dispatch(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: '비밀번호가 형식에 맞지 않습니다.',
        }),
      );
    }
    if (errors?.manager_group) {
      dispatch(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: '관리자 소속을 입력해주세요.',
        }),
      );
    }
    if (errors?.manager_email) {
      dispatch(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: '이메일 형식에 맞지 않습니다.',
        }),
      );
    }
    if (errors?.manager_phone) {
      dispatch(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: '전화번호 형식에 맞지 않습니다.',
        }),
      );
    }
    if (errors?.manager_name) {
      dispatch(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: '관리자 이름은 입력해주세요',
        }),
      );
    }
  };

  return (
    <>
      <Form method={'POST'} onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          <Descriptions title="관리자 계정 정보" labelStyle={{ width: '250px' }} bordered={true}>
            <Descriptions.Item span={2} label="관리자명">
              <Controller
                name="manager_name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'관리자명을 입력해주세요.'} {...rest} />}
              />
            </Descriptions.Item>

            <Descriptions.Item span={1} label="휴대전화번호">
              <Controller
                name="manager_phone"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: phoneNumRex }}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={'휴대전화번호를 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="이메일">
              <Controller
                name="manager_email"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: emailRex }}
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'관리자명을 입력해주세요.'} {...rest} />}
              />
            </Descriptions.Item>

            <Descriptions.Item span={1} label="소속">
              <Controller
                name="manager_group"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'관리자명을 입력해주세요.'} {...rest} />}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="비밀번호">
              <Controller
                name="manager_password"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: passwordLengthRex }}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type={'password'} placeholder={'비밀번호를 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={1} label="비밀번호 확인">
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: passwordLengthRex }}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type={'password'} placeholder={'비밀번호를 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="받는 사람의 이메일">
              <Inputs
                type="email"
                value={emailToSend}
                onChange={e => setEmailToSend(e.target.value)}
                placeholder="받는 사람의 이메일 주소를 입력해주세요."
              />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="인증번호 확인">
              <Inputs value={verificationCode} onChange={e => setVerificationCode(e.target.value)} placeholder="인증번호를 입력해주세요." />
              <Buttons type="primary" onClick={verifyCode} name="인증하기" />
              {verificationStatus && <p>{verificationStatus}</p>}
            </Descriptions.Item>
            <ColGrid span={24} css={buttonFlexEndRowStyle}>
              <Buttons type="primary" onClick={handleEmailSend} name="이메일 발송하기" />
            </ColGrid>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />

        {/*<CardContainer>*/}
        <RowGrid>
          <ColGrid span={24} css={buttonFlexEndRowStyle}>
            <Buttons type={'default'} name={'목록으로'} htmlType={'button'} css={marginRightStyle(5)} />
            <Buttons type={'primary'} name={'등록하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </ColGrid>
        </RowGrid>
        {/*</CardContainer>*/}
      </Form>
    </>
  );
};

export default ManagementCreateTemplate;
