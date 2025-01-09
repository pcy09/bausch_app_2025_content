import { css } from '@emotion/react';
import { Label, SelectBox } from '@/components/atom';
import { Controller } from 'react-hook-form';

const SelectAtom = ({
  title,
  control,
  name = 'selectOption',
  placeholder = '선택해주세요',
  defaultValue = '',
  rules = '{{ required: false }}',
  options,
  ...props
}) => {
  return (
    <div css={selectAtomStyle}>
      {title && <Label title={title} />}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { ref, value, ...rest }, fieldState }) => {
          return <SelectBox options={options} value={value || null} placeholder={placeholder} {...rest} {...props} />;
        }}
      />
    </div>
  );
};

export default SelectAtom;

export const selectAtomStyle = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 13px;
`;
