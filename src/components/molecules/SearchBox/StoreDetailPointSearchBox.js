import { Col } from 'antd';
import { css } from '@emotion/react';
import {
  Buttons,
  CardContainer,
  ColGrid,
  DateSearchAtom,
  DividingLine,
  FilterBox,
  InputSearchAtom,
  Radios,
  RowGrid,
  SelectAtom,
  SelectInputSearchAtom,
  SelectSearchAtom,
} from '@/components/atom';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreDetailPointAction } from '@/store/reducers/admin/storeReducer';
import { useRouter } from 'next/router';

const StoreDetailPointSearchBox = ({ selectOptions1, onHandleSearchData, storeId, setResetState }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data); // id 추가
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, pointProductGroup } = data;
    const params = {
      storeId,
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      pointProductGroupId: pointProductGroup === 'all' ? null : Number(pointProductGroup),
    };
    onHandleSearchData({ page: 0, size: 10 }, params); // 검색시 초기화
  };

  const handleResetSearch = () => {
    const params = {
      storeId,
    };
    setValue('date', null);
    setValue('pointProductGroup', 'all');
    setResetState(true);

    onHandleSearchData({ page: 0, size: 10 }, params);
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch} handleSubmit={handleSubmit(onSubmit, onError)}>
          <DateSearchAtom title={'스토어 등록기간'} control={control} />
          <SelectAtom defaultValue="all" control={control} title={'적립금'} options={selectOptions1} name="pointProductGroup" />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default StoreDetailPointSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
