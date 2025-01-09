import { Input } from 'antd';
import { css } from '@emotion/react';
import { Label } from '@/components/atom';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';

import { Controller } from 'react-hook-form';
const InputSearchAtom = ({ control, title, type = 'text', name = 'searchText', placeholder, ...props }) => {
  return (
    <div css={searchAtomContainer}>
      <Label title={title} />
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { ref, value, ...rest }, fieldState }) => <Input type="text" placeholder={placeholder} value={value || null} {...rest} />}
      />
    </div>
  );
};

export default InputSearchAtom;
