import React from 'react';
import { Button } from 'antd';
import { css } from '@emotion/react';
import { useRouter } from 'next/router'; // Next.js 라우터 훅 import

const Buttons = ({ disabled = false, type = 'default', htmlType = 'button', icon, name, ...props }) => {
  const router = useRouter(); // useRouter 훅 사용
  const { pathname } = router; // 현재 경로명

  // 경로에 따른 버튼 색상 결정
  // 경로에 따른 버튼 색상 결정, startsWith 메서드 사용
  const buttonColor = '#04848c';

  const buttonStyle = css`
    border-radius: var(--borderRadius);

    // ${htmlType === 'submit' ? `background-color: ${buttonColor} !important;` : null}
    // ${htmlType === 'submit' ? `border: ${buttonColor} !important;` : null}
    // ${htmlType === 'submit' ? `color: #fff !important;` : null}
  `;

  return (
    <Button disabled={disabled} css={buttonStyle} type={type} htmlType={htmlType} {...props}>
      {icon ? icon : null}
      {name}
    </Button>
  );
};

export default Buttons;
