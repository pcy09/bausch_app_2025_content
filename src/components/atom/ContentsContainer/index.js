import { css } from '@emotion/react';

const ContentsContainer = ({ children }) => {
  return <div css={contentsContainerStyle}>{children}</div>;
};

export default ContentsContainer;

const contentsContainerStyle = css`
  padding: 24px;
  //margin-top: 24px;
  height: calc(100vh - 209.28px);
  //height: calc(100vh - 257.28px);
  overflow: scroll;
  position: relative;
  //box-shadow: 12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 100px 100px 80px rgba(0, 0, 0, 0.07);
  //background: white;
`;
