import { css } from '@emotion/react';
import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';

const BannerManageSearchBox = ({ showStatusOption }) => {
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
          <SelectAtom defaultValue="all" name="show_status" control={control} title={'노출 여부'} options={showStatusOption} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default BannerManageSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
