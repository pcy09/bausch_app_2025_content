import { Input, Tag } from 'antd';
import { css } from '@emotion/react';
import { PlusOutlined } from '@ant-design/icons';
const Tags = ({ size = 'small', tag = [], padding, children, ...props }) => {
  return (
    <Tag key={tag} size={size} autoComplete="off" css={tagPlusStyle(padding)} {...props}>
      {children}
    </Tag>
  );
};

export default Tags;

const tagPlusStyle = padding => css`
  .ant-tag {
    height: 22px; // 'px' 단위 추가
    border-style: dashed; // 문자열 값 수정
    ${padding && `padding: 10px;`}
  }
  .site-tag-plus {
    background: #fff;
    border-style: dashed;
  }

  .tag-input {
    width: 78px;
    margin-right: 8px;
    vertical-align: top;
  }
`;
