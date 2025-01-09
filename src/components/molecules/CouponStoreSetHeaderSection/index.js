import { Buttons, ColGrid, InputSearchAtom, RowGrid, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { alignCenter, buttonFlexEndRowStyle, gap, mainColor, marginBottomStyle } from '@/styles/components/atomCommonStyle';

const CouponStoreSetHeaderSection = ({ handleSearch, selectOptions, defaultValue, total = 0, select = 0, searchPlaceholder = '검색어 입력' }) => {
  const {
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({});

  const onSearchClick = () => {
    const data = getValues();
    handleSearch(data);
  };

  return (
    <RowGrid css={marginBottomStyle(12)}>
      <ColGrid css={alignCenter} span={16}>
        {total > 0 && <strong>전체 : {total}개</strong>}
        {select > 0 && (
          <>
            <strong css={separatorStyle}>/</strong>
            <strong css={mainColor}>선택 : {select}개</strong>
          </>
        )}
      </ColGrid>

      <ColGrid span={8}>
        <div css={[buttonFlexEndRowStyle, gap(6)]}>
          {selectOptions ? <SelectAtom defaultValue={defaultValue} control={control} options={selectOptions} name="selectOptions" /> : null}
          <InputSearchAtom placeholder={searchPlaceholder} control={control} onSearch={onSearchClick} />
        </div>
      </ColGrid>
    </RowGrid>
  );
};

export default CouponStoreSetHeaderSection;

const selectStyle = css`
  width: 38%;
`;

const separatorStyle = css`
  padding: 0 4px;
`;
