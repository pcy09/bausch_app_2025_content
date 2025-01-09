import { Checkbox } from 'antd';
import { css } from '@emotion/react';
import { Label } from '@/components/atom';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';

import { Controller } from 'react-hook-form';

const CheckboxSearchAtom = ({ control, label, name = 'searchCheckbox', ...props }) => {
  return (
    <div css={searchAtomContainer}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { ref, value, onChange, onBlur }, fieldState }) => (
          <Checkbox checked={value} onChange={onChange} onBlur={onBlur} {...props}>
            {label}
          </Checkbox>
        )}
      />
    </div>
  );
};

export default CheckboxSearchAtom;
