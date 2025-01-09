import { Descriptions, Radio } from 'antd';
import { CardContainer, Inputs } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';

const ProductSkuUploadSection = ({ productDetailData, control, getValues, setValue, watch }) => {
  const getProductPrice = (value, type) => {
    const productPrice = parseInt(getValues('product_price'));

    if (type === 'user_discount') {
      const userDiscount = parseInt(value);
      if (!userDiscount) {
        setValue('sale_price', productPrice);
      } else {
        const salePrice = productPrice * ((100 - userDiscount) / 100);
        setValue(type, userDiscount);
        setValue('sale_price', salePrice);
      }
      //NOTE: 소비자가에서도 동작할 수 있도록 로직 추가
    } else if (type === 'product_price') {
      const userDiscount = parseInt(getValues('user_discount'));
      const price = parseInt(value);
      if (userDiscount) {
        const salePrice = price * ((100 - userDiscount) / 100);
        setValue(type, price);
        setValue('sale_price', salePrice);
      }
    } else if (type === 'store_discount') {
      const storeDiscount = parseInt(value);
      const salePrice = parseInt(getValues('sale_price'));
      const storePrice = Math.round((salePrice * storeDiscount) / 100 / 1.1 / 10) * 10;
      setValue(type, storeDiscount);
      setValue('store_price', storePrice);
    } else {
      const price = parseInt(value);
      setValue('product_price', price);
      setValue('sale_price', price);
    }
  };

  useEffect(() => {
    if (watch('discount_applicable') === 'N') {
      setValue('sale_price', getValues().product_price);
      setValue('user_discount', 0);
    }
  }, [watch('discount_applicable'), setValue, getValues]);

  // 데이터 있을 때 데이터 주입
  useEffect(() => {
    const { product_price, discount_applicable, user_discount, store_discount, store_price, sale_price } = productDetailData;
    setValue('product_price', product_price);
    setValue('discount_applicable', discount_applicable);
    setValue('user_discount', user_discount);
    setValue('store_discount', store_discount);
    setValue('store_price', store_price);
    setValue('sale_price', sale_price);
  }, [productDetailData, setValue]);

  return (
    <CardContainer size="default" title={'제품 가격'} bordered={false}>
      <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
        <Descriptions.Item span={3} label="권장 소비자가">
          <Controller
            name="product_price"
            control={control}
            defaultValue=""
            render={({ field: { onChange, ref, value, ...rest }, fieldState }) => (
              <Inputs
                type="number"
                onChange={e => getProductPrice(e.target.value, 'product_price')}
                value={value || null}
                placeholder={'권장 소비자가를 입력해주세요.'}
                {...rest}
              />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={1} label="할인 적용">
          <Controller
            name="discount_applicable"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Radio.Group
                options={[
                  { label: 'Yes', value: 'Y' },
                  { label: 'No', value: 'N' },
                ]}
                onChange={target => console.log(target)}
                value={value || 'N'}
                {...rest}
              />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={2} label="회원 할인율">
          <Controller
            name="user_discount"
            control={control}
            defaultValue=""
            disabled={watch('discount_applicable') === 'N' || getValues('discount_applicable') === ''}
            render={({ field: { onChange, ref, value, ...rest }, fieldState }) => (
              <Inputs
                type="number"
                onChange={e => {
                  if (e.target.value === '') {
                    onChange('');
                  } else {
                    getProductPrice(e.target.value, 'user_discount');
                  }
                }}
                value={value || 0}
                placeholder={'회원 할인율을 입력해주세요.'}
                {...rest}
              />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={1} label="안경원 공급단가율">
          <Controller
            name="store_discount"
            control={control}
            defaultValue=""
            render={({ field: { onChange, ref, value, ...rest }, fieldState }) => (
              <Inputs
                type="number"
                disabled={watch('product_price') === ''}
                value={value || 0}
                onChange={e => getProductPrice(e.target.value, 'store_discount')}
                placeholder={'안경원 할인율을 입력해주세요.'}
                {...rest}
              />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={2} label="안경원 공급단가">
          <Controller
            name="store_price"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs ttype="number" disabled value={value || 0} placeholder={'안경원 공급금액을 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={3} label="최종 판매가">
          <Controller
            name="sale_price"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" value={value || 0} disabled {...rest} />}
          />
        </Descriptions.Item>
      </Descriptions>
    </CardContainer>
  );
};

export default ProductSkuUploadSection;
