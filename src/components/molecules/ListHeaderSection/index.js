import { Buttons, ColGrid, Form, InputSearchAtom, RowGrid, SelectAtom, SelectBox } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { alignCenter, buttonFlexEndRowStyle, gap, mainColor, marginBottomStyle, onReset } from '@/styles/components/atomCommonStyle';
import { useEffect } from 'react';

const ListHeaderSection = ({
  tabStatus,
  handleSearch,
  selectOptions,
  total = 0,
  select = 0,
  searchPlaceholder = '검색어 입력',
  defaultValue = '',
  resetState,
  setResetState,
}) => {
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => console.log(data);
  const onError = errors => console.log('fail', errors);

  const onSearch = () => {
    const data = getValues();

    handleSearch(data);
  };

  useEffect(() => {
    reset();
  }, [tabStatus, reset]);

  // 필터검색에서 초기화 누르면 같이 초기화 진행
  useEffect(() => {
    if (resetState) {
      reset();
      setResetState(false);
    }
  }, [resetState, reset, setResetState]);

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
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div css={[buttonFlexEndRowStyle, gap(6)]}>
            {selectOptions ? <SelectAtom defaultValue={defaultValue} control={control} options={selectOptions} name="selectOptions" /> : null}
            <InputSearchAtom placeholder={searchPlaceholder} control={control} onSearch={onSearch} />
          </div>
        </Form>
      </ColGrid>
    </RowGrid>
  );
};

export default ListHeaderSection;
const selectStyle = css`
  width: 38%;
`;
const separatorStyle = css`
  padding: 0 4px;
`;
