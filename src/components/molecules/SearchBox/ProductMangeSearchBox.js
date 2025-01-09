import { css } from '@emotion/react';
import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';

import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListAction } from '@/store/reducers/admin/productReducer';
import { getProductLenslyListAction } from '@/store/reducers/admin/productLenslyReducer';
import { useEffect } from 'react';

const ProductMangeSearchBox = ({ selectGroupOption, salesStatusOption, onHandleSearchData, tabStatus, setResetState }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  // 검색
  const handleSearch = data => {
    const { date, productGroupId, salesStatus } = data;

    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      productGroupId: productGroupId === 'all' ? null : productGroupId,
      salesStatus: salesStatus === 'all' ? null : salesStatus,
    };

    onHandleSearchData({ page: 0, size: 20 }, searchData);
  };

  // 초기화
  const handleResetSearch = () => {
    const searchData = {
      startDate: null,
      endDate: null,
      productGroupId: null, //제품 그룹
      salesStatus: null, //단종
    };

    setValue('date', null);
    setValue('productGroupId', 'all');
    setValue('salesStatus', 'all');
    setResetState(true);
    onHandleSearchData({ page: 0, size: 20 }, searchData);
  };

  useEffect(() => {
    reset();
  }, [tabStatus, reset]);

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'제품 등록일'} control={control} />
          <SelectAtom defaultValue="all" name="productGroupId" control={control} title={'제품 그룹'} options={selectGroupOption} />
          <SelectAtom defaultValue="all" name="salesStatus" control={control} title={'단종'} options={salesStatusOption} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default ProductMangeSearchBox;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
