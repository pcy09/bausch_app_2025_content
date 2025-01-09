import { css } from '@emotion/react';

const NoticeLabel = ({ title }) => {
  return (
    <div css={noticeBoxStyle}>
      <label css={labelStyle}>{title}</label>
    </div>
  );
};

export default NoticeLabel;

const noticeBoxStyle = css`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const labelStyle = css`
  display: inline-block;
  font-size: 14px;
  color: #8997a3;
`;
