import { css } from '@emotion/react';
import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductInfoSearchBox = ({ tabStatus, selectOptions, onHandleSearchData }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, exposedStatus } = data;

    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      exposedStatus: exposedStatus === 'all' ? null : exposedStatus,
    };

    onHandleSearchData({ offset: 1, pageSize: 20 }, searchData);
  };

  const handleResetSearch = () => {
    const searchData = {
      startDate: null,
      endDate: null,
      exposedStatus: null,
    };

    setValue('date', null);
    setValue('exposedStatus', null);

    reset();
    onHandleSearchData({ offset: 1, pageSize: 20 }, searchData);
  };

  useEffect(() => {
    handleResetSearch();
  }, [tabStatus]);

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'제품 등록일'} control={control} />
          <SelectAtom defaultValue="all" name="exposedStatus" control={control} title={'노출 여부'} options={selectOptions} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default ProductInfoSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
