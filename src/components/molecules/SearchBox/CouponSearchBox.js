import { css } from '@emotion/react';
import { Buttons, CardContainer, ColGrid, DateSearchAtom, DividingLine, FilterBox, RowGrid, SelectAtom, SelectSearchAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOfflineCouponAction } from '@/store/reducers/admin/offlineCouponReducer';

const CouponSearchBox = ({ onHandleSearchData, id }) => {
  const { isModalOpen } = useSelector(state => state.popups);

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
    const searchData = {
      startDate: data.date ? dayjs(data.date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: data.date ? dayjs(data.date[1]).format('YYYY-MM-DDT23:59:59') : null,
    };
    onHandleSearchData({ page: 0, size: 5 }, searchData);
  };

  const handleResetSearch = () => {
    reset();
    onHandleSearchData({ page: 0, size: 5 });
  };

  useEffect(() => {
    !isModalOpen && reset();
  }, [isModalOpen, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FilterBox handleReset={handleResetSearch}>
        <DateSearchAtom title={'등록일'} control={control} />
      </FilterBox>
    </Form>
  );
};

export default CouponSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
