import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, RowGrid, SelectAtom } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Checkbox, Descriptions } from 'antd';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import MultiSelectTabArea from '@/components/atom/MultiSelectTabArea';
import { alignCenter, buttonFlexEndRowStyle } from '@/styles/components/atomCommonStyle';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const CouponProductSettingSection = ({
  control,
  options,
  getValues,
  setValue,
  bauschGiftOption,
  pointProductGroupOptions,
  couponType,
  equalProduct,
  setEqualProduct,
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

  // 판매제품과 동일한 제품 체크박스 (체크하면 제품 비우기)
  const handleSameProductCheck = e => {
    const isChecked = e.target.checked;
    setEqualProduct(isChecked);
    setValue(`couponGiftProductIds`, []);
  };

  return (
    <>
      <Descriptions title={'제품 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
        <Descriptions.Item span={4} label={'판매 제품 ⭐️'}>
          {/* 판매&증정 동일한 도수 */}
          {couponType === 'GIFT' && (
            <RowGrid>
              <ColGrid span={24} css={buttonFlexEndRowStyle}>
                <Controller
                  name="syncLensPowerStatus"
                  control={control}
                  defaultValue={'SYNC_LENS_POWER_OFF'}
                  render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                    <Checkbox
                      onChange={e => {
                        onChange(e.target.checked ? 'SYNC_LENS_POWER_ON' : 'SYNC_LENS_POWER_OFF');
                      }}
                      checked={value === 'SYNC_LENS_POWER_ON'}
                      value={value}
                      {...rest}>
                      판매 & 증정 동일한 도수
                    </Checkbox>
                  )}
                />
              </ColGrid>
            </RowGrid>
          )}
          <DividingLine border={false} />

          {/* 판매제품 */}
          <RowGrid gutter={25}>
            <ColGrid span={18}>
              <Controller
                name="couponSalesProductIds"
                control={control}
                render={({ field: { ref, value, label, ...rest }, fieldState }) => {
                  return (
                    <SelectMultiBox
                      style={{ width: '100%' }}
                      control={control}
                      placeholder={'판매 제품을 선택하세요.'}
                      options={options}
                      value={value}
                      multiple={true}
                      showCheckedStrategy="SHOW_CHILD"
                      {...rest}
                    />
                  );
                }}
                rules={{ required: true }}
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
                defaultValue={1}
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="number" placeholder={''} value={value} {...rest} />}
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
        {/* 증정제품 */}
        {couponType === 'GIFT' && (
          <Descriptions.Item span={4} label={'증정 제품 ⭐️'}>
            <RowGrid>
              <ColGrid span={24} css={buttonFlexEndRowStyle}>
                <Controller
                  name="syncSaleGiftStatus"
                  control={control}
                  defaultValue={'SYNC_SALE_OFF'}
                  render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                    <Checkbox
                      onChange={e => {
                        handleSameProductCheck(e); // 상태 업데이트
                        onChange(e.target.checked ? 'SYNC_SALE_ON' : 'SYNC_SALE_OFF');
                      }}
                      checked={value === 'SYNC_SALE_ON'}
                      {...rest}>
                      판매제품과 동일한 제품
                    </Checkbox>
                  )}
                />
              </ColGrid>
            </RowGrid>
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
                        style={{ width: '100%' }}
                        placeholder={equalProduct ? '판매제품과 동일한 제품이 등록됩니다' : '증정 제품을 선택하세요.'}
                        options={bauschGiftOption}
                        value={value}
                        multiple={true}
                        showCheckedStrategy="SHOW_CHILD"
                        {...rest}
                      />
                    );
                  }}
                  rules={{ required: !equalProduct }}
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
                  defaultValue={1}
                  render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="number" placeholder={''} value={value} {...rest} />}
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
        {/* 할인금액 / 안경원 적립금 */}
        {couponType === 'DISCOUNT' && (
          <>
            <Descriptions.Item span={2} label={'할인 금액'}>
              <Controller
                name="discountPrice"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="number" placeholder={'할인 금액'} value={value} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label={'안경원 적립금'}>
              <RowGrid gutter={24}>
                <ColGrid span={12}>
                  <SelectAtom control={control} options={pointProductGroupOptions} name="pointProductGroupId" />

                  {/* <Controller
                    name="pointProductGroupId"
                    control={control}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <SelectAtom control={control} value={value} {...rest} options={pointProductGroupOptions} name="pointProductGroupId" />
                    )}
                    rules={{ required: true }}
                  /> */}
                </ColGrid>
                <ColGrid span={12} css={buttonFlexEndRowStyle}>
                  <Controller
                    name="discountStorePoint"
                    control={control}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <Inputs type="number" placeholder={'안경원 적립금'} value={value} {...rest} />
                    )}
                    rules={{ required: true }}
                  />
                </ColGrid>
              </RowGrid>
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </>
  );
};

export default CouponProductSettingSection;

const buttonBox_style = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
