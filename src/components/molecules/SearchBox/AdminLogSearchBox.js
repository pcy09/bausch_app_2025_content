import { Buttons, CardContainer, ColGrid, DateSearchAtom, DividingLine, FilterBox, RowGrid } from '@/components/atom';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const AdminLogSearchBox = ({ onHandleSearchData }) => {
  const search = useSelector(state => state.optician.search);
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
    };

    onHandleSearchData(searchData);
    console.log(searchData, 'SEARCH DATA');
  };

  const handleResetSearch = () => {
    const searchData = {
      startDate: null,
      endDate: null,
    };

    setValue('date', null);

    onHandleSearchData(searchData);
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'접속일'} control={control} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default AdminLogSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
