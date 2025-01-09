import { css } from '@emotion/react';
import { Label, SelectBox } from '@/components/atom';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';
import { Controller } from 'react-hook-form';

const SelectSearchAtom = ({ title, control, name = 'selectOption', placeholder = '선택해주세요', defaultValue = '', options, ...props }) => {
  return (
    <div css={searchAtomContainer}>
      <Label title={title} />
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, value, ...rest }, fieldState }) => {
          return <SelectBox showSearch options={options} value={value || null} placeholder={placeholder} {...rest} />;
        }}
      />
    </div>
  );
};

export default SelectSearchAtom;
