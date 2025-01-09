import { Buttons, ColGrid, Form, InputSearchAtom, Inputs, RowGrid, SelectAtom, SelectBox } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { alignCenter, buttonFlexEndRowStyle, gap, mainColor, marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { useEffect, useState } from 'react';
const ListHeaderAddSection = ({ control, handleAddData, placeholder }) => {
  return (
    <div css={marginBottomStyle(12)}>
      <ColGrid span={8}>
        <div css={[buttonFlexEndRowStyle, gap(6)]}></div>
      </ColGrid>
    </div>
  );
};

export default ListHeaderAddSection;
