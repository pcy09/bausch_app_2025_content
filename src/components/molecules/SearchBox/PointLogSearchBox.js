import { css } from '@emotion/react';
import { Buttons, CardContainer, ColGrid, DateSearchAtom, DividingLine, FilterBox, RowGrid, SelectAtom, SelectSearchAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PointLogSearchBox = ({ selectOptions, onHandleSearchData, setResetState }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, pointLog } = data;
    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      pointProductGroupId: pointLog === 'all' ? null : pointLog,
    };
    onHandleSearchData({ page: 0, size: 10 }, searchData);
  };

  const handleResetSearch = () => {
    setValue('date', null);
    setValue('pointLog', 'all');
    setResetState(true);

    onHandleSearchData({ page: 0, size: 10 });
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'기간'} control={control} />
          <SelectAtom name="pointLog" defaultValue="all" control={control} title={'적립금'} options={selectOptions} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default PointLogSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
