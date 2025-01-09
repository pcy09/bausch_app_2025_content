import { css } from '@emotion/react';
import { Cascader } from 'antd';
import Label from '../Label';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';
import { Controller } from 'react-hook-form';

const MultiSelectBoxes = ({ title = '', name = '', control, defaultValue = '', multiple = true, options, placeholder, ...rest }) => {
  return (
    <div css={searchAtomContainer}>
      {title && <Label title={title} />}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const handleChange = selectedValue => {
            field.onChange(selectedValue);
          };
          return (
            <Cascader
              css={styles}
              showSearch
              size={'middle'}
              placeholder={placeholder}
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={options}
              multiple={multiple}
              value={field.value || []}
              onChange={handleChange}
              {...rest}
            />
          );
        }}
      />
    </div>
  );
};

export default MultiSelectBoxes;

const styles = css`
  display: block;
  width: 100%;
`;
