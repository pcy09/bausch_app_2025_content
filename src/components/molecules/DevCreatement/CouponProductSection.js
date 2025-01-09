import { ColGrid, RowGrid, Inputs, Buttons, DividingLine } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Checkbox, Descriptions } from 'antd';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { alignCenter, buttonFlexEndRowStyle } from '@/styles/components/atomCommonStyle';
import { useState } from 'react';
import { css } from '@emotion/react';

//스토어 그룹 옵션
const options = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Toy Fish',
        value: 'fish',
      },
      {
        label: 'Toy Cards',
        value: 'cards',
      },
      {
        label: 'Toy Bird',
        value: 'bird',
      },
    ],
  },
];

const CouponProductSection = ({
  coupon_sale_product_num = 1,
  coupon_present_product_num = 1,
  discount_price,
  store_point,
  coupon_present_product,
  coupon_sale_product,
  coupon_equal_product,
  coupon_equal_power,
  setValue,
  getValues,
  couponType,
  control,
}) => {
  const [equalProduct, setEqualProduct] = useState(coupon_equal_product);

  const handleProductChange = () => {
    const checked = getValues('coupon_equal_product');
    setValue('coupon_equal_product', !checked);
    setEqualProduct(!equalProduct);
  };

  const handlePowerChange = () => {
    const checked = getValues('coupon_equal_power');
    setValue('coupon_equal_power', !checked);
  };

  const handlePlus = value => {
    const prevValue = parseInt(getValues(value));
    setValue(value, prevValue + 1);
  };
  const handleMinus = value => {
    const prevValue = parseInt(getValues(value));
    if (prevValue > 1) {
      setValue(value, prevValue - 1);
    }
  };
  return (
    <Descriptions title={'제품 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item span={4} label={'판매 제품'}>
        {couponType === 'present' && (
          <RowGrid>
            <ColGrid span={24} css={buttonFlexEndRowStyle}>
              <Controller
                name="coupon_equal_power"
                control={control}
                defaultValue={coupon_equal_power}
                render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                  <Checkbox onChange={handlePowerChange} checked={value} {...rest}>
                    판매 & 증정 동일한 도수
                  </Checkbox>
                )}
              />
            </ColGrid>
          </RowGrid>
        )}
        <DividingLine border={false} />
        <RowGrid gutter={20}>
          <ColGrid span={17} css={alignCenter}>
            <Controller
              name="coupon_sale_product"
              control={control}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <SelectMultiBox
                  defaultValue={coupon_sale_product}
                  style={{ width: '100%' }}
                  control={control}
                  placeholder={''}
                  options={options}
                  {...rest}
                />
              )}
            />
          </ColGrid>
          <ColGrid span={7} css={buttonBox_style}>
            <Buttons
              onClick={() => {
                handleMinus('coupon_sale_product_num');
              }}
              icon={<MinusOutlined />}
            />
            <Controller
              name="coupon_sale_product_num"
              control={control}
              defaultValue={coupon_sale_product_num}
              render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="number" placeholder={''} value={value || null} {...rest} />}
            />
            <Buttons
              onClick={() => {
                handlePlus('coupon_sale_product_num');
              }}
              icon={<PlusOutlined />}
            />
          </ColGrid>
        </RowGrid>
      </Descriptions.Item>
      {couponType === 'discount' && (
        <>
          <Descriptions.Item span={2} label={'할인 금액'}>
            <Controller
              name="discount_price"
              control={control}
              defaultValue={discount_price}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs type="number" placeholder={'할인 금액'} value={value || null} {...rest} />
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label={'안경원 적립금'}>
            <Controller
              name="store_point"
              control={control}
              defaultValue={store_point}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs type="number" placeholder={'안경원 적립금'} value={value || null} {...rest} />
              )}
            />
          </Descriptions.Item>
        </>
      )}
      {couponType === 'present' && (
        <Descriptions.Item span={4} label={'증정 제품'}>
          <RowGrid>
            <ColGrid span={24} css={buttonFlexEndRowStyle}>
              <Controller
                name="coupon_equal_product"
                control={control}
                defaultValue={coupon_equal_product}
                render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                  <Checkbox onChange={handleProductChange} checked={value} {...rest}>
                    판매제품과 동일한 제품
                  </Checkbox>
                )}
              />
            </ColGrid>
          </RowGrid>
          <DividingLine border={false} />
          <RowGrid gutter={20}>
            <ColGrid span={17} css={alignCenter}>
              <Controller
                name="coupon_present_product"
                control={control}
                disabled={equalProduct}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectMultiBox
                    defaultValue={coupon_present_product}
                    style={{ width: '100%' }}
                    control={control}
                    placeholder={''}
                    options={options}
                    {...rest}
                  />
                )}
              />
            </ColGrid>
            <ColGrid span={7} css={buttonBox_style}>
              <Buttons
                disabled={equalProduct}
                onClick={() => {
                  handleMinus('coupon_present_product_num');
                }}
                icon={<MinusOutlined />}
              />
              <Controller
                name="coupon_present_product_num"
                control={control}
                defaultValue={coupon_present_product_num}
                disabled={equalProduct}
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="number" placeholder={''} value={value || null} {...rest} />}
              />
              <Buttons
                disabled={equalProduct}
                onClick={() => {
                  handlePlus('coupon_present_product_num');
                }}
                icon={<PlusOutlined />}
              />
            </ColGrid>
          </RowGrid>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default CouponProductSection;

const buttonBox_style = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
