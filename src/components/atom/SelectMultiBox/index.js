import { css } from '@emotion/react';
import { Cascader } from 'antd';
import Label from '../Label';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';

const SelectMultiBox = ({ title = '', multiple = true, options, disabled = false, placeholder, value, ...props }) => {
  const handleChange = value => {
    props.onChange(value);
  };
  return (
    <div css={searchAtomContainer}>
      {title && <Label title={title} />}
      <Cascader
        css={styles}
        // showSearch
        size={'middle'}
        placeholder={placeholder}
        // optionFilterProp="children"
        // filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        options={options}
        multiple={multiple}
        value={value} // 값이 올바르게 전달되는지 확인
        onChange={handleChange} // 변경 이벤트 처리
        maxTagCount="responsive"
        disabled={disabled} // 이 부분을 추가
        {...props}
      />
    </div>
  );
};

export default SelectMultiBox;

// const layouts = css`
//   display: flex;
// `;

const styles = css`
  display: block;
`;
