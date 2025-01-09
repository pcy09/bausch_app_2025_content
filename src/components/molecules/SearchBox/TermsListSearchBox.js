import { css } from '@emotion/react';
import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';

const TermsListSearchBox = ({ showStatusOption }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    console.log(data);
  };

  const handleResetSearch = () => {
    setValue('date', null);
    setValue('searchType', null);
    setValue('searchText', null);
    setValue('searchInputText', null);
    setValue('selectOption', null);
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'배너 노출 기간'} control={control} />
          <SelectAtom defaultValue="all" name="show_status" control={control} title={'카테고리'} options={showStatusOption} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default TermsListSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
