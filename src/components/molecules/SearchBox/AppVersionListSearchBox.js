import { css } from '@emotion/react';
import { Buttons, CardContainer, ColGrid, DateSearchAtom, DividingLine, FilterBox, RowGrid, SelectAtom, SelectSearchAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useSelector } from 'react-redux';

// icon
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';

const AppVersionListSearchBox = ({ selectOptions, onHandleSearchData }) => {
  const search = useSelector(state => state.optician.search);
  const {
    handleSubmit,
    control,
    setValue,
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
          <DateSearchAtom title={'업데이트 등록일'} control={control} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default AppVersionListSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
