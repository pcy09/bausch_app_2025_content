import { transFormRadioValue } from '@/common/utiles';
import { Checkboxes, Inputs, Radios } from '@/components/atom';
import useCommonCode from '@/hooks/useCommonCode';
import { Checkbox, Descriptions, Input, InputNumber, Radio, Select, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';

const ProductLenslySection = ({ control }) => {
  // Watch 상태값
  const { watch, setValue, getValues } = useFormContext(); // useFormContext로 부모의 context를 가져옴

  const productPrice = watch('recommendPrice'); // 권장 소비자가
  const memberDiscountRate = watch('memberDiscountRate'); // 회원 할인율
  const opticianSupplyRate = watch('opticianSupplyRate'); // 안경원 공급 단가율

  // 최종 판매가와 안경원 공급단가 계산
  useEffect(() => {
    const parsedProductPrice = parseFloat(productPrice) || 0; // 권장 소비자가
    const parsedMemberDiscountRate = parseFloat(memberDiscountRate) || 0; // 회원 할인율
    const parsedOpticianSupplyRate = parseFloat(opticianSupplyRate) || 0; // 안경원 공급 단가율

    // 최종 판매가 계산
    const finalPrice = parsedProductPrice - (parsedProductPrice * parsedMemberDiscountRate) / 100;
    setValue('customer_price', Math.round(finalPrice)); // 최종 판매가를 설정

    // 안경원 공급단가 계산
    let storePrice;
    if (parsedOpticianSupplyRate === 0) {
      storePrice = finalPrice; // 안경원 공급단가율이 0이면 최종 판매가와 동일
    } else {
      storePrice = (finalPrice * parsedOpticianSupplyRate) / 100; // 안경원 공급단가율이 0이 아닐 때 계산
    }
    setValue('store_price', Math.round(storePrice)); // 안경원 공급단가를 설정
  }, [productPrice, memberDiscountRate, opticianSupplyRate, setValue]); // 모든 의존성 추가

  const handleOpticianPriceChange = e => {
    const discountRate = parseFloat(e.target.value) || 0;
    setValue('memberDiscountRate', discountRate);
  };

  const handleDiscountApplyChange = e => {
    const supplyRate = parseFloat(e.target.value) || 0;
    setValue('opticianSupplyRate', supplyRate);
  };

  return (
    <Descriptions title="가격 정보" bordered={true} column={4}>
      <Descriptions.Item span={4} label="권장소비자가 ⭐️">
        <Controller
          name="recommendPrice"
          control={control}
          defaultValue={''}
          render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
            <>
              <InputNumber
                formatter={value => value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // 천 단위 쉼표 추가
                parser={value => value?.replace(/\$\s?|(,*)/g, '')} // 쉼표 제거하여 숫자로 변환
                style={{ width: '34%' }}
                value={value}
                placeholder={'권장 소비자가를 입력해주세요.'}
                onChange={e => {
                  onChange(e);
                }}
                {...rest}
              />
              <span style={{ marginLeft: '10px' }}> 권장 소비자가 입력 후 할인율과 단가율을 적용해 최종 판매가와 안경원 공급단가가 결정됩니다.</span>
            </>
          )}
          rules={{ required: true }}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label="회원 할인율">
        <Controller
          name="memberDiscountRate"
          control={control}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <>
              <InputNumber style={{ width: '80%' }} value={value || null} max={99} min={0} placeholder={'회원 할인율을 입력해주세요.'} {...rest} />
              <span> %</span>
            </>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label="최종 판매가">
        <Controller
          name="customer_price"
          control={control}
          render={({ field: { value, ...rest } }) => (
            <InputNumber
              formatter={value => value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // 천 단위 쉼표 추가
              parser={value => value?.replace(/\$\s?|(,*)/g, '')} // 쉼표 제거하여 숫자로 변환
              style={{ width: '100%' }}
              value={value !== undefined ? value : ''} // 입력 값 설정
              placeholder={'회원 할인율에 따라 자동입력됩니다.'}
              {...rest}
              disabled={true} // 입력 불가
            />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label="안경원 공급단가율">
        <Controller
          name="opticianSupplyRate"
          control={control}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <>
              <InputNumber
                style={{ width: '80%' }}
                value={value || null}
                max={99}
                min={0}
                placeholder={'안경원 공급단가율을 입력해주세요.'}
                {...rest}
              />
              <span> %</span>
            </>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label="안경원 공급단가">
        <Controller
          name="store_price"
          control={control}
          render={({ field: { value, ...rest } }) => (
            <InputNumber
              formatter={value => value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // 천 단위 쉼표 추가
              parser={value => value?.replace(/\$\s?|(,*)/g, '')} // 쉼표 제거하여 숫자로 변환
              style={{ width: '100%' }}
              value={value !== undefined ? value : ''} // 입력 값 설정
              placeholder={'안경원 공급단가율에 따라 자동입력됩니다.'}
              {...rest}
              disabled={true} // 입력 불가
            />
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ProductLenslySection;
