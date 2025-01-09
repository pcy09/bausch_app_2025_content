import { css } from '@emotion/react';

const Label = ({ title }) => {
  return <div css={labelBoxStyle}>{title && <label css={labelStyle}>{title}</label>}</div>;
};

export default Label;

const labelBoxStyle = css`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const labelStyle = css`
  display: inline-block;
  font-size: 12px;
  color: #999999;
  //margin-bottom: 4px;
`;
