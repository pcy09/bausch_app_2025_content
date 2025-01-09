import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, RowGrid, SelectAtom } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Checkbox, Descriptions } from 'antd';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import MultiSelectTabArea from '@/components/atom/MultiSelectTabArea';
import { alignCenter, buttonFlexEndRowStyle } from '@/styles/components/atomCommonStyle';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const CouponDetailProductSettingSection = ({
  control,
  watch,
  options,
  coupon_equal_power,
  giftProductQuantity = 1,
  salesProductQuantity = 1,
  product_list,
  discount_price,
  bauschGiftOption,
  store_point,
  setValue,
  getValues,
  couponType,
  pointProductGroup,
}) => {
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
  const [equalProduct, setEqualProduct] = useState(false);
  const syncSaleGiftStatus = watch('syncSaleGiftStatus');

  useEffect(() => {
    if (syncSaleGiftStatus === 'SYNC_SALE_ON') {
      setEqualProduct(true);
    } else {
      setEqualProduct(false);
    }
  }, [syncSaleGiftStatus]);
  return (
    <>
      <Descriptions title={'제품 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
        <Descriptions.Item span={4} label={'판매 제품 ⭐️'}>
          {couponType === 'GIFT' && (
            <RowGrid>
              <ColGrid span={24} css={buttonFlexEndRowStyle}>
                <Controller
                  name="syncLensPowerStatus"
                  control={control}
                  defaultValue={coupon_equal_power}
                  render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                    <Checkbox
                      onChange={e => {
                        onChange(e.target.checked ? 'SYNC_LENS_POWER_ON' : false);
                      }}
                      checked={value === 'SYNC_LENS_POWER_ON'}
                      {...rest}>
                      판매 & 증정 동일한 도수
                    </Checkbox>
                  )}
                />
              </ColGrid>
            </RowGrid>
          )}
          <DividingLine border={false} />
          <RowGrid gutter={25}>
            <ColGrid span={18}>
              <Controller
                name="couponSalesProductIds"
                control={control}
                render={({ field: { ref, value, label, ...rest }, fieldState }) => {
                  return (
                    <SelectMultiBox
                      defaultValue={product_list}
                      style={{ width: '100%' }}
                      name="couponSalesProductIds"
                      control={control}
                      placeholder={'판매 제품을 선택하세요.'}
                      options={options}
                      value={value}
                      multiple={true}
                      {...rest}
                    />
                  );
                }}
              />
            </ColGrid>
            <ColGrid span={6} css={buttonBox_style}>
              <Buttons
                onClick={() => {
                  handleMinus('salesProductQuantity');
                  salesProductQuantity;
                }}
                icon={<MinusOutlined />}
              />
              <Controller
                name="salesProductQuantity"
                control={control}
                defaultValue={salesProductQuantity}
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="number" placeholder={''} value={value || null} {...rest} />}
              />
              <Buttons
                onClick={() => {
                  handlePlus('salesProductQuantity');
                }}
                icon={<PlusOutlined />}
              />
            </ColGrid>
          </RowGrid>
        </Descriptions.Item>
        {couponType === 'DISCOUNT' && (
          <>
            <Descriptions.Item span={2} label={'할인 금액'}>
              <Controller
                name="discountPrice"
                control={control}
                defaultValue={discount_price}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="number" placeholder={'할인 금액'} value={value || null} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label={'안경원 적립금'}>
              <RowGrid gutter={24}>
                <ColGrid span={12}>
                  <Controller
                    name="pointProductGroupId"
                    control={control}
                    defaultValue={''}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <SelectAtom
                        defaultValue="적립금 선택"
                        control={control}
                        value={value || null}
                        {...rest}
                        options={pointProductGroup}
                        name="pointProductGroupId"
                      />
                    )}
                  />
                </ColGrid>
                <ColGrid span={12} css={buttonFlexEndRowStyle}>
                  <Controller
                    name="discountStorePoint"
                    control={control}
                    defaultValue={store_point}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <Inputs type="number" placeholder={'안경원 적립금'} value={value || null} {...rest} />
                    )}
                  />
                </ColGrid>
              </RowGrid>
            </Descriptions.Item>
          </>
        )}
        {couponType === 'GIFT' && (
          <Descriptions.Item span={4} label={'증정 제품 ⭐️'}>
            {couponType === 'GIFT' && (
              <RowGrid>
                <ColGrid span={24} css={buttonFlexEndRowStyle}>
                  <Controller
                    name="syncSaleGiftStatus"
                    control={control}
                    defaultValue={coupon_equal_power}
                    render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                      <Checkbox
                        onChange={e => {
                          onChange(e.target.checked ? 'SYNC_SALE_ON' : false);
                        }}
                        checked={value === 'SYNC_SALE_ON'}
                        {...rest}>
                        판매제품과 동일한 제품
                      </Checkbox>
                    )}
                  />
                </ColGrid>
              </RowGrid>
            )}
            <DividingLine border={false} />
            <RowGrid gutter={25}>
              <ColGrid span={18}>
                <Controller
                  name="couponGiftProductIds"
                  control={control}
                  disabled={equalProduct}
                  render={({ field: { ref, value, label, ...rest }, fieldState }) => {
                    return (
                      <SelectMultiBox
                        defaultValue={product_list}
                        style={{ width: '100%' }}
                        name="couponGiftProductIds"
                        control={control}
                        placeholder={'증정 제품을 선택하세요.'}
                        options={bauschGiftOption}
                        value={value}
                        multiple={true}
                        {...rest}
                      />
                    );
                  }}
                />
              </ColGrid>
              <ColGrid span={6} css={buttonBox_style}>
                <Buttons
                  onClick={() => {
                    handleMinus('giftProductQuantity');
                  }}
                  icon={<MinusOutlined />}
                />
                <Controller
                  name="giftProductQuantity"
                  control={control}
                  defaultValue={giftProductQuantity}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <Inputs type="number" placeholder={''} value={value || null} {...rest} />
                  )}
                />
                <Buttons
                  onClick={() => {
                    handlePlus('giftProductQuantity');
                  }}
                  icon={<PlusOutlined />}
                />
              </ColGrid>
            </RowGrid>
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
};

export default CouponDetailProductSettingSection;

const buttonBox_style = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
