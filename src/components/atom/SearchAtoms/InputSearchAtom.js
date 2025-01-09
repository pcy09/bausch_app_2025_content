import { Input } from 'antd';
import { css } from '@emotion/react';
import { Label } from '@/components/atom';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';
import Inputs from '@/components/atom/Inputs';
import { Controller } from 'react-hook-form';
const InputSearchAtom = ({ onSearch, control, title, type = 'text', name = 'searchText', placeholder, ...props }) => {
  const { Search } = Input;

  return (
    <div css={searchAtomContainer}>
      {title && <Label title={title} />}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { ref, value, ...rest }, fieldState }) => (
          <Search type="text" onSearch={onSearch} enterButton placeholder={placeholder} value={value || null} {...props} {...rest} />
        )}
      />
    </div>
  );
};

export default InputSearchAtom;

const inputStyle = title => css`
  ${title && `margin-left: 8px;`}
`;
