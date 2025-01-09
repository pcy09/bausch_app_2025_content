import { css } from '@emotion/react';

const DetailNoticeLabel = ({ title }) => {
  return (
    <div css={noticeBoxStyle}>
      <label css={labelStyle}>{title}</label>
    </div>
  );
};

export default DetailNoticeLabel;

const noticeBoxStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const labelStyle = css`
  display: inline-block;
  font-size: 14px;
  color: #ececec;
`;
