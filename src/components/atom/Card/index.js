import { Card } from 'antd';
import { css } from '@emotion/react';

const CardContainer = ({ children, extra, shadow = true, hoverable, ...props }) => {
  return (
    <Card hoverable={!!hoverable} css={searchBoxContainer(shadow)} extra={extra} bordered {...props}>
      {children}
    </Card>
  );
};

export default CardContainer;

const searchBoxContainer = shadow => css`
  // box-shadow: ${shadow && '0 4px 35px rgba(0, 0, 0, 0.1)'};
`;
