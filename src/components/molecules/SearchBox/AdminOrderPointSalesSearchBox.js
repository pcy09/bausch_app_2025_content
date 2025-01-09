import { Col } from 'antd';
import { css } from '@emotion/react';
import {
  Buttons,
  CardContainer,
  CheckboxSearchAtom,
  ColGrid,
  DateSearchAtom,
  DividingLine,
  FilterBox,
  Label,
  RowGrid,
  SelectAtom,
  SelectSearchAtom,
} from '@/components/atom';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle, marginTopStyle } from '@/styles/components/atomCommonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getPointOrderListAction, PointOrderReset } from '@/store/reducers/admin/orderPointListReducer';

const AdminOrderPointSalesSearchBox = ({ tradeOptions, pointOptions, onHandleSearchData, setResetState }) => {
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
  const dispatch = useDispatch();
  const handleSearch = data => {
    const { date, pointOptions, tradeOptions } = data;

    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      pointProductGroup: pointOptions === 'all' ? null : pointOptions,
      transactionStatus: tradeOptions === 'all' ? null : tradeOptions,
    };
    dispatch(PointOrderReset());

    onHandleSearchData({ page: 0, size: 10 }, searchData); // 검색시 초기화
  };

  const handleResetSearch = () => {
    const searchData = {
      startDate: null,
      endDate: null,
      pointProductGroup: null,
      transactionStatus: null,
    };

    setValue('date', null);
    setValue('pointProductGroup', null);
    setValue('transactionStatus', null);
    dispatch(PointOrderReset());
    setResetState(true); //테이블 헤더쪽도 초기화시킬 수 있도록
    onHandleSearchData({ page: 0, size: 10 }, searchData);
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'주문일자'} control={control} />

          <SelectAtom name="pointOptions" defaultValue="all" control={control} title={'적립금'} options={pointOptions} />

          <SelectAtom name="tradeOptions" defaultValue="all" control={control} title={'거래상태'} options={tradeOptions} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default AdminOrderPointSalesSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const checkboxRowStyle = css`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
