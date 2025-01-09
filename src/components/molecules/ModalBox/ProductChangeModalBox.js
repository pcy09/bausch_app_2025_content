import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../atom/Label';
import { Controller, useForm } from 'react-hook-form';
import { LensSelect } from '@/components/molecules';
import { Cascader, Form, InputNumber, Modal } from 'antd';
import Buttons from '../../atom/Buttons';
import Portal from '../../atom/Portal';
import Inputs from '../../atom/Inputs';
import { closeModals } from '@/store/reducers/modals';
import { closeModalBox, updateCouponProductAction } from '@/store/reducers/admin/modalBoxReducer';
import { useEffect, useState } from 'react';
import { AXIOS_GET } from '@/api/axios/useAxios';
import { useRouter } from 'next/router';

const ProductChangeModalBox = () => {
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const router = useRouter();

  const show = useSelector(state => state?.modalBox?.show);
  const productData = useSelector(state => state?.modalBox?.data);
  const productDropData = useSelector(state => state?.modalBox?.productDropData);
  const giftDropData = useSelector(state => state?.modalBox?.giftDropData);
  const [productOptions, setProductOptions] = useState([]);
  const [giftOptions, setGiftOptions] = useState([]);
  const [productType, setProductType] = useState();
  const [optionData, setOptionData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const productDropOptions = transformData(productDropData);
    const giftDropOptions = transformData(giftDropData);
    setProductOptions(productDropOptions);
    setGiftOptions(giftDropOptions);
  }, [productDropData, giftDropData]);

  const onSubmit = data => handleChange(data);
  const onError = errors => console.log('fail', errors);

  // 드랍 옵션 정제
  const transformData = data => {
    const transformedData = data.map(group => ({
      label: group.productGroupName,
      value: group.productGroupId,
      children: group.dropProductInfoList.map(product => ({
        label: product.productName,
        value: product.productId,
      })),
    }));
    return transformedData;
  };

  const transformDiopter = data => {
    if (data) {
      const transformedDiopter = data.map(item => ({
        label: item,
        value: item,
      }));
      return transformedDiopter;
    } else {
      return null;
    }
  };

  // 제품변경
  const handleChange = data => {
    const transactionProductId = productData?.transactionProductId;
    const { product, updateAdd, updateAsti, updateAxis, updateMyopia } = getValues();

    const updateProductBauschId = product?.length ? product[product?.length - 1] : null;

    const sendObject = {
      transactionProductId, // 거래제품 고유 넘버
      updateProductBauschId, // 바뀐 제품id
      updateMyopia, // 근시
      updateAsti, // 난시
      updateAxis, // 축
      updateAdd, // add
    };
    for (let key in sendObject) {
      if (sendObject[key] === '') {
        sendObject[key] = null;
      }
    }

    dispatch(updateCouponProductAction({ sendObject, callback: router, id: productData.transactionInfoId }));

    reset();
    dispatch(closeModalBox());
  };

  // 취소
  const handleCancel = () => {
    reset();
    dispatch(closeModalBox());
  };

  // 제품 선택
  const handleChangeProduct = async (couponId, memberId, productId) => {
    const params = {
      couponId,
      productId,
      memberId,
    };
    try {
      const response = await AXIOS_GET('/transaction/coupon/product/diopter/select', params);
      const { status, data } = response;
      if (status === 200) {
        const optionData = data?.result;
        for (let key in optionData) {
          if (Array.isArray(optionData[key]) && optionData[key].length === 1 && optionData[key][0] === null) {
            optionData[key] = null;
          }
        }

        const { myopia, asti, axis, add } = optionData;

        if (!myopia) {
          setValue(`updateMyopia`, '');
        }
        if (!asti) {
          setValue(`updateAsti`, '');
        }
        if (!axis) {
          setValue(`updateAxis`, '');
        }
        if (!add) {
          setValue(`updateAdd`, '');
        }

        const filteredOptionData = {
          myopia: transformDiopter(myopia),
          asti: transformDiopter(asti),
          axis: transformDiopter(axis),
          add: transformDiopter(add),
        };

        setOptionData(filteredOptionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 제품 선택 초기화
  const handleResetProduct = () => {
    setOptionData({});
  };

  useEffect(() => {
    if (productData?.productType) {
      setValue(`product`, [productData?.productGroupId, productData?.productId]);
      setProductType(productData?.productType);
      setValue('updateMyopia', productData?.myopia);
      setValue('updateAsti', productData?.asti);
      setValue('updateAxis', productData?.axis);
      setValue('updateAdd', productData?.add);

      handleChangeProduct(productData?.couponId, productData?.memberId, productData?.productId);
    }
  }, [productData]);

  useEffect(() => {
    const values = getValues();
    const hasNullValue = Object.values(values).some(val => val === null);
    setIsDisabled(hasNullValue);
  }, [watch(['product', 'updateMyopia', 'updateAsti', 'updateAxis', 'updateAdd']), getValues]);
  return (
    <>
      <Portal selector={'modal-root'}>
        <Modal
          open={show}
          centered
          title={`제품 변경 (${productData?.productType}제품)`}
          onCancel={handleCancel}
          width={800}
          footer={[
            <Buttons key={'cancel'} name={'취소'} onClick={handleCancel} />,
            <Buttons disabled={isDisabled} key={'submit'} name={'변경하기'} onClick={handleChange} type="primary" htmlType="submit" />,
          ]}>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div css={formBoxStyle}>
              <div>
                <Label title={'제품명'} />
                <Controller
                  name={'product'}
                  control={control}
                  render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                    <Cascader
                      value={value}
                      options={productType === '판매' ? productOptions : giftOptions}
                      placeholder="선택"
                      onChange={value => {
                        onChange(value); // 추출한 값만 폼 상태로 전달
                        setValue(`updateMyopia`, null);
                        setValue(`updateAsti`, null);
                        setValue(`updateAxis`, null);
                        setValue(`updateAdd`, null);
                        if (value) {
                          const childrenValue = value[value?.length - 1]; // children value만 추출
                          handleChangeProduct(productData?.couponId, productData?.memberId, childrenValue);
                        } else {
                          handleResetProduct();
                        }
                      }}
                    />
                  )}
                />
              </div>
              <div css={lensBoxStyle}>
                <LensSelect
                  disabled={!optionData?.myopia}
                  label={'근시'}
                  name={'updateMyopia'}
                  options={optionData?.myopia || []}
                  control={control}
                />
                <LensSelect disabled={!optionData?.asti} label={'난시'} name={'updateAsti'} options={optionData?.asti || []} control={control} />
                <LensSelect disabled={!optionData?.axis} label={'축'} name={'updateAxis'} options={optionData?.axis || []} control={control} />
                <LensSelect disabled={!optionData?.add} label={'ADD'} name={'updateAdd'} options={optionData?.add || []} control={control} />
              </div>
            </div>
          </Form>
        </Modal>
      </Portal>
    </>
  );
};
export default ProductChangeModalBox;
const formBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
`;
const lensBoxStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;
