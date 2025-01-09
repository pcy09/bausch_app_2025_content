import { css } from '@emotion/react';
import { Select } from 'antd';
import { useEffect } from 'react';

/**
 * @description: mutiple이 있을 경우 'multiple'을 넘겨줘야함
 */

const SelectBox = ({ options, placeholder, mode = '', isDisabled = false, ...props }) => {
  const { filterOption, optionFilterProp, ...restProps } = props;

  return (
    <>
      <Select
        {...restProps}
        mode={mode}
        css={selectStyle}
        size={'middle'}
        placeholder={placeholder}
        // optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        options={options}
        disabled={isDisabled}
      />
    </>
  );
};

export default SelectBox;

const selectStyle = css`
  width: 100%;
  //margin-left: 8px;
  min-width: 110px;
`;
