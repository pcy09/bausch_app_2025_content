import { Input } from 'antd';
import { css } from '@emotion/react';
import React from 'react';

const Inputs = React.forwardRef(({ type = 'text', prefix = null, placeholder, icon = false, padding, ...props }, ref) => {
  return <Input ref={ref} prefix={prefix} autoComplete="off" css={customInputStyle(padding)} type={type} placeholder={placeholder} {...props} />;
});

// displayName 추가
Inputs.displayName = 'Inputs';

export default Inputs;

// 스타일 함수 수정
const customInputStyle = padding => css`
  ${padding ? `padding: ${padding};` : ''}
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;

  &:hover {
    border-color: #40a9ff;
  }

  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;
