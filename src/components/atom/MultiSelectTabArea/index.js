import { css } from '@emotion/react';
import { Cascader } from 'antd';
import Label from '../Label';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';
import { Controller } from 'react-hook-form';

const MultiSelectTabArea = ({ title = '', name = '', control = '', defaultValue = '', multiple = true, options, placeholder, ...rest }) => {
  const displayRender = labels => labels.join(' / ');

  return (
    <div css={searchAtomContainer}>
      {title && <Label title={title} />}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, value, onChange, ...props }, fieldState }) => {
          const handleChange = selectedValue => {
            if (selectedValue) {
              const [groupValue, productId] = selectedValue;
              const selectedGroup = options.find(group => {
                return group.value === groupValue;
              });

              onChange({ group: selectedGroup });
            } else {
              onChange({ group: null });
            }
          };
          return (
            <Cascader
              css={styles}
              showSearch
              name={name}
              size={'middle'}
              placeholder={placeholder}
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={options}
              onChange={handleChange}
              multiple={multiple}
              value={value?.group ? [value.group.value, value.group.children?.[0]?.value] : []}
              displayRender={displayRender}
              {...props}
            />
          );
        }}
      />
    </div>
  );
};

export default MultiSelectTabArea;

const styles = css`
  display: block;
  width: 100%;
`;
