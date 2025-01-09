import { css } from '@emotion/react';

const ListBannerNoticeLabel = ({ title, icon }) => {
  return (
    <div css={noticeBoxStyle}>
      {icon}&nbsp;
      <label css={labelStyle}>{title}</label>
    </div>
  );
};

export default ListBannerNoticeLabel;

const noticeBoxStyle = css`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-bottom: 10px;
`;

const labelStyle = css`
  display: inline-block;
  font-size: 15px;
  color: #2e3d4a;
  font-weight: bold;
`;
