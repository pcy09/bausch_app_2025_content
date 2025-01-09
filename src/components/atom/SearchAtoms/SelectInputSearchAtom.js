import { Input, Select } from 'antd';
import { css } from '@emotion/react';
import { Inputs, InputSearchAtom, Label, SelectBox } from '@/components/atom';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';
import { Controller, useForm } from 'react-hook-form';

const SelectInputSearchAtom = ({ title, control, defaultValue = '', ...props }) => {
  return (
    <div css={searchAtomContainer}>
      {title && <Label title={title} />}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Controller
          name="searchType"
          control={control}
          defaultValue={defaultValue}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <SelectBox options={props.options} placeholder={'선택해주세요'} value={value || null} css={selectStyle} {...rest} />
          )}
        />

        <Controller
          name="searchText"
          control={control}
          defaultValue=""
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" css={inputStyle} placeholder="검색어를 입력하세요" value={value || null} {...rest} />
          )}
        />
      </div>
    </div>
  );
};

export default SelectInputSearchAtom;

const inputStyle = css`
  width: 59%;
`;
const selectStyle = css`
  width: 39%;
`;
