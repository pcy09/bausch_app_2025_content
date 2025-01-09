import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { Buttons, CardContainer, ColGrid, DateSearchAtom, DividingLine, InputSearchAtom, RowGrid } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { changeSearchDataAction } from '@/store/reducers/lensly/reservationReducer';

const ReservationSearchBox = getSearchData => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = useCallback(
    data => {
      const searchData = {
        startDate: data?.date && dayjs(data?.date[0]).format('YYYY-MM-DD'),
        endDate: data?.date && dayjs(data?.date[1]).format('YYYY-MM-DD'),
      };
      dispatch(changeSearchDataAction({ searchData }));
      // getSearchData({}, searchData);
    },
    [dispatch],
  );

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={7}>
            <DateSearchAtom title={'예약 날짜'} control={control} />
          </ColGrid>
        </RowGrid>

        <DividingLine border={false} />

        <RowGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'primary'} name={'검색'} htmlType={'submit'} css={marginRightStyle(5)} />
            <Buttons type={'default'} name={'초기화'} htmlType={'button'} css={marginLeftStyle(5)} />
          </ColGrid>
          <ColGrid span={8} />
        </RowGrid>
      </Form>
    </CardContainer>
  );
};

export default ReservationSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
