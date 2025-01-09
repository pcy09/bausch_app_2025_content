import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { useSelector } from 'react-redux';

const OpticianSearchBox = ({ selectOptions, onHandleSearchData }) => {
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
    const { date, searchType, searchText, searchInputText, selectOption } = data;
    const searchData = {
      startDate: date ? dayjs(data?.date[0]).format('YYYY-MM-DD') : null,
      endDate: date ? dayjs(data?.date[1]).format('YYYY-MM-DD') : null,
      searchType: searchType ?? null,
      searchText: searchText ?? null,
      searchInputText: searchInputText ?? null,
      showStatus: selectOption ?? null,
    };

    onHandleSearchData({ offset: 1, pageSize: 20 }, searchData);
    console.log(searchData, 'SEARCH DATA');
  };

  const handleResetSearch = () => {
    const searchData = {
      startDate: null,
      endDate: null,
      searchType: null,
      searchText: null,
      searchInputText: null,
      showStatus: null,
    };

    setValue('date', null);
    setValue('searchType', null);
    setValue('searchText', null);
    setValue('searchInputText', null);
    setValue('selectOption', null);

    onHandleSearchData({ offset: 1, pageSize: 20 }, searchData);
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'기간'} control={control} />
          <SelectAtom defaultValue="all" name="optician_status" control={control} title={'안경사 상태'} options={selectOptions} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default OpticianSearchBox;
