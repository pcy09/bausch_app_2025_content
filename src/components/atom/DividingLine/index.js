import { Divider } from 'antd';
import { css } from '@emotion/react';

const DividingLine = ({ orientation = 'left', text = '', border = true, ...props }) => {
  return (
    <Divider orientation={orientation} css={!border ? borderNoneStyle : borderStyle} {...props}>
      {text}
    </Divider>
  );
};

export default DividingLine;

const borderStyle = css`
  border-top: 1px solid #999999;
`;
const borderNoneStyle = css`
  border: none;
  margin: 12px 0;
`;
