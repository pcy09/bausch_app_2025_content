import { css } from '@emotion/react';

const Form = ({ width = '100%', children, onSubmit, method = 'GET', ...props }) => {
  return (
    <form method={method} css={formStyle(width)} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

export default Form;
const formStyle = width => css`
  width: ${width};
`;
