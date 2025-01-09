import { Buttons, ColGrid, Form, InputSearchAtom, RowGrid, SelectAtom, SelectBox } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { alignCenter, buttonFlexEndRowStyle, gap, mainColor, marginBottomStyle, onReset } from '@/styles/components/atomCommonStyle';
import { useEffect } from 'react';

const TableFilterSection = ({ control, defaultValue, optionName, handleHeaderSearch, headerOptions, total = 0 }) => {
  return (
    <RowGrid css={marginBottomStyle(12)}>
      <ColGrid css={alignCenter} span={16}>
        {total > 0 && <strong>전체 : {total}개</strong>}
      </ColGrid>

      <ColGrid span={8}>
        <div css={[buttonFlexEndRowStyle, gap(6)]}>
          <SelectAtom defaultValue={defaultValue} control={control} options={headerOptions} name={optionName} />
          <InputSearchAtom placeholder={'검색어 입력'} control={control} onSearch={handleHeaderSearch} />
        </div>
      </ColGrid>
    </RowGrid>
  );
};

export default TableFilterSection;
const selectStyle = css`
  width: 38%;
`;
const separatorStyle = css`
  padding: 0 4px;
`;
