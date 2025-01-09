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
  FilterSearchBox,
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
import { useSelector } from 'react-redux';

const AdminOrderCouponSaleSearchBox = ({ handleFilterSearch, handleResetSearch, control, couponOptions, tradeOptions }) => {
  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <FilterSearchBox handleReset={handleResetSearch} handleSubmit={handleFilterSearch}>
        <DateSearchAtom title={'판매일자'} control={control} />
        <SelectAtom defaultValue={'all'} name="couponType" control={control} title={'쿠폰'} options={couponOptions} />
        <SelectAtom defaultValue={'all'} name="transactionStatus" control={control} title={'거래상태'} options={tradeOptions} />
      </FilterSearchBox>
    </CardContainer>
  );
};

export default AdminOrderCouponSaleSearchBox;

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
