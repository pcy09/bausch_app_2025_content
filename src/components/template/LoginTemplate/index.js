import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
// import LoginLogo from '@public/assets/png/admin_login_logo.png';
import LoginLogo from '@public/assets/png/bauschLogin.png';
import LoginBackground from '@public/assets/png/background_pattern.png';
import { Controller, useForm } from 'react-hook-form';
import { Buttons, CardContainer, Checkboxes, Form, Inputs } from '@/components/atom';
import Image from 'next/image';
import { marginTopStyle } from '@/styles/components/atomCommonStyle';
import { emailRex, passwordLengthRex } from '@/common/regex';
import { useDispatch } from 'react-redux';
import { snackOpen } from '@/store/reducers/snackReducer';
import { loginAction } from '@/store/reducers/authReducer';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //NOTE: 이메일 저장을 위한 쿠키설정
  const [cookies, setCookie, removeCookie] = useCookies(['user-email']);
  const [isChecked, setIsChecked] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    getValues,
    reset,
  } = useForm({ mode: 'onChange' });
  const onSubmit = data => {
    handleLogin(data);
  };
  const onError = errors => handleError(errors);

  const handleLogin = data => {
    const { manager_email } = data;
    if (isChecked) {
      setCookie('user-email', manager_email, { path: '/' });
    } else {
      removeCookie('user-email', { path: '/' });
    }
    dispatch(loginAction({ data, callback: router }));
  };

  const handleEmailCheck = event => {
    setIsChecked(event);
  };

  const handleError = errors => {
    if (errors?.manager_email) {
      dispatch(
        snackOpen({
          type: 'error',
          message: '로그인 실패',
          description: '이메일 형식에 맞지 않습니다.',
          placement: 'top',
        }),
      );
    }
    if (errors?.manager_password) {
      dispatch(
        snackOpen({
          type: 'error',
          message: '로그인 실패',
          description: '비밀번호가 형식에 맞지 않습니다.',
          placement: 'top',
        }),
      );
    }
  };

  useEffect(() => {
    if (cookies['user-email']) {
      setIsChecked(true);
      if (emailRex.test(cookies['user-email'])) {
        reset({
          manager_email: cookies['user-email'],
          manager_password: '',
        });
      }
    } else {
      setIsChecked(false);
      reset({
        manager_email: '',
        manager_password: '',
      });
    }
  }, [cookies]);

  useEffect(() => {
    // 웹 페이지의 로그인 처리 후
    const token = 'your_generated_token'; // 로그인 후 받은 토큰
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(token);
    } else {
      console.log('Not in React Native WebView environment');
      // 필요시 다른 처리
    }
    alert('뭐지?');
  }, []);

  return (
    <div css={mainContainerStyle}>
      <CardContainer css={cardStyle}>
        <Image width="300" src={LoginLogo} alt="LoginLogo" />
        <p css={adminFont}>ADMIN Site Login?????????????????????????????</p>
        <Form method="POST" css={marginTopStyle(12)} onSubmit={handleSubmit(onSubmit, onError)}>
          <div>
            <Controller
              name="manager_email"
              control={control}
              defaultValue={''}
              rules={{ required: true }}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs
                  title={'아이디'}
                  placeholder={'아이디를 입력해주세요.'}
                  css={inputStyle}
                  value={value}
                  prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                  padding
                  {...rest}
                />
              )}
            />
            <div css={checkboxContainerStyle}>
              <Checkboxes checked={isChecked} onChange={event => handleEmailCheck(event)} />
              <span>아이디 저장</span>
            </div>
          </div>

          <div css={marginTopStyle(12)}>
            <Controller
              name="manager_password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs
                  prefix={<LockOutlined style={{ color: '#04848c' }} />}
                  type={'password'}
                  title={'비밀번호'}
                  placeholder={'비밀번호를 입력해주세요.'}
                  css={inputStyle}
                  padding
                  {...rest}
                />
              )}
            />
          </div>

          <div css={marginTopStyle(12)}>
            <Buttons
              // disabled={!isValid}
              htmlType={'submit'}
              type={'primary'}
              name={'로그인'}
              css={buttonStyle}
            />
          </div>
        </Form>
      </CardContainer>
    </div>
  );
};

export default LoginTemplate;

const mainContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/assets/png/background_pattern.png');
  background-size: cover;
`;

const checkboxContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const cardStyle = css`
  background: #fff;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const inputStyle = css`
  width: 100%;
  margin-bottom: 1rem;
`;

const buttonStyle = css`
  width: 100%;
  margin-top: 20px;
  height: 50px;

  &:disabled {
    border-color: #dcdcdc !important;
    background-color: #dcdcdc !important;
  }
`;

const adminFont = css`
  font-family: AppleSDGothicNeo;
  font-size: 14px;
  line-height: 1.57;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
`;

const imageSideStyle = css`
  width: 50vw;
  height: 100vh;
  // TODO: 로고 이미지는 나오는대로 변경
  background: url(${LoginBackground});
  /* background-image: url('https://images.unsplash.com/photo-1534239697798-120952b76f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80'); */
  /* background: url(LoginBackground); */
  background-size: cover;
  background-position: center;
`;
