import { Input } from 'antd';
import { css } from '@emotion/react';
const { TextArea } = Input;
const TextAreas = ({ height = 120, maxLength = 1000, placeholder = '입력해주세요.', ...props }) => {
  return (
    <TextArea
      showCount
      maxLength={maxLength}
      css={textAreaStyle((props.height = height), (props.width = 100))}
      placeholder={placeholder}
      // value={props.value}
      {...props}
    />
  );
};

export default TextAreas;

const textAreaStyle = (height, width) => css`
  //resize: none;
  height: ${height}px;
  width: ${width}%;
  margin-bottom: 24px;
`;
