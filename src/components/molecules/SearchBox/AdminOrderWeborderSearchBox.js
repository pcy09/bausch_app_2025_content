import { Checkbox, Col } from 'antd';
import { css } from '@emotion/react';
import { Buttons, CardContainer, CheckboxSearchAtom, ColGrid, DateSearchAtom, DividingLine, Label, RowGrid, SelectAtom } from '@/components/atom';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle, marginLeftStyle, marginRightStyle, marginTopStyle } from '@/styles/components/atomCommonStyle';
import { useSelector } from 'react-redux';
import FilterBox from '@/components/atom/FilterBox';
const options = [
  {
    label: '판매 제품',
    value: 'SALES_PRODUCT',
  },
  {
    label: '증정 제품',
    value: 'GIFT_PRODUCT',
  },
  {
    label: '적립금 주문 제품',
    value: 'SAVE_PRODUCT',
  },
];

const AdminOrderWeborderSearchBox = ({ couponOptions, pointOptions, onHandleSearchData, setResetState }) => {
  const [checked, setChecked] = useState(['SALES_PRODUCT', 'GIFT_PRODUCT', 'SAVE_PRODUCT']);

  const {
    handleSubmit,
    control,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, coupon, point, productTypes } = data;

    const searchData = {
      startDate: date ? dayjs(data?.date[0]).format('YYYY-MM-DDT00:00:00') : null, //시작일
      endDate: date ? dayjs(data?.date[1]).format('YYYY-MM-DDT23:59:59') : null, //종료일
      couponType: coupon === 'all' ? null : coupon, //쿠폰
      pointProductGroup: point === 'all' ? null : point, //적립금
      productTypes: productTypes ?? null, //제품 종류
    };

    onHandleSearchData(searchData);
  };

  // 초기화 함수
  const handleResetSearch = () => {
    const searchData = {
      startDate: null,
      endDate: null,
      couponType: null,
      pointProductGroup: null,
      productTypes: ['SALES_PRODUCT', 'GIFT_PRODUCT', 'SAVE_PRODUCT'],
    };

    setValue('date', null);
    setValue('coupon', 'all');
    setValue('searchText', null);
    setValue('point', 'all');
    setValue('productTypes', ['SALES_PRODUCT', 'GIFT_PRODUCT', 'SAVE_PRODUCT']);

    setResetState(true); //테이블 헤더쪽도 초기화시킬 수 있도록
    onHandleSearchData(searchData);
    setChecked(['SALES_PRODUCT', 'GIFT_PRODUCT', 'SAVE_PRODUCT']);
  };
  const handleChange = e => {
    setValue('productTypes', e);
    setChecked(e);
  };

  const renderCoupon = () => {
    if (checked.indexOf('SALES_PRODUCT') !== -1 || checked.indexOf('GIFT_PRODUCT') !== -1) {
      return <SelectAtom defaultValue="all" control={control} title={'쿠폰'} name={'coupon'} options={couponOptions} />;
    }
  };
  const renderPoint = () => {
    if (checked.indexOf('SAVE_PRODUCT') !== -1) {
      return <SelectAtom defaultValue="all" control={control} title={'적립금'} name={'point'} options={pointOptions} />;
    }
  };

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          {/* 일자 */}
          <DateSearchAtom title={'주문일자'} control={control} />
          {/* 체크박스 */}
          <div css={checkBoxWrap}>
            <Label title={'제품 종류'} />
            <div css={checkBoxRowStyle}>
              <Controller
                name={'productTypes'}
                control={control}
                defaultValue={['SALES_PRODUCT', 'GIFT_PRODUCT', 'SAVE_PRODUCT']}
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Checkbox.Group options={options} onChange={handleChange} value={value || null} {...rest} />
                )}
              />
            </div>
          </div>
          {renderCoupon()}
          {renderPoint()}
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default AdminOrderWeborderSearchBox;

const checkBoxWrap = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 13px;
`;
const checkBoxRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
