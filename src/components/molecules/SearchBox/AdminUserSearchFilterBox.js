import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';

const AdminUserSearchFilterBox = ({ selectOptions, onHandleSearchData, setResetState }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, memberType } = data;

    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      memberType: memberType === 'all' ? null : memberType,
    };

    onHandleSearchData({ page: 0, size: 10 }, searchData);
  };

  const handleResetSearch = () => {
    reset();
    setResetState(true);
    onHandleSearchData({ page: 0, size: 10 });
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'회원 가입일'} control={control} />
          <SelectAtom defaultValue="all" name="memberType" control={control} title={'회원 구분'} options={selectOptions} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default AdminUserSearchFilterBox;
