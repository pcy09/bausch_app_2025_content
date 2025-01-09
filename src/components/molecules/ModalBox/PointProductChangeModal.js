import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../atom/Label';
import { Controller, useForm } from 'react-hook-form';
import { LensSelect, PointLensSelect } from '@/components/molecules';
import { Cascader, Form, InputNumber, Modal, Select } from 'antd';
import Buttons from '../../atom/Buttons';
import Portal from '../../atom/Portal';
import Inputs from '../../atom/Inputs';
import { closeModals } from '@/store/reducers/modals';
import { closeModalBox, updateCouponProductAction } from '@/store/reducers/admin/modalBoxReducer';
import { useEffect, useState } from 'react';
import { AXIOS_GET } from '@/api/axios/useAxios';
import { useRouter } from 'next/router';
import { getPointMyopiaAction, pointProductChangeModalReset, updatePointProductAction } from '@/store/reducers/admin/pointProductChangeReducer';

const PointProductChangeModal = () => {
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: '',
      number: 1,
      totalPrice: '',
    },
  });
  const dispatch = useDispatch();

  const show = useSelector(state => state?.pointProductChangeModal?.show);
  const productData = useSelector(state => state?.pointProductChangeModal?.data);
  const productDropData = useSelector(state => state?.pointProductChangeModal?.productDropData);
  const myopiaData = useSelector(state => state?.pointProductChangeModal?.myopiaData);

  const [productOptions, setProductOptions] = useState([]);
  const [optionData, setOptionData] = useState({});
  const [myopiaOptions, setMyopiaOptions] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [numberIsDisabled, setNumberIsDisabled] = useState(true);

  const onSubmit = data => handleChange();
  const onError = errors => console.log('fail', errors);

  // 제품 드랍 옵션 정제
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

  useEffect(() => {
    const productDropOptions = transformData(productDropData);
    setProductOptions(productDropOptions);
  }, [productDropData]);

  // 취소
  const handleCancel = () => {
    dispatch(pointProductChangeModalReset());
    reset();

    setIsDisabled(true);
    setIsSelected(false);
    setNumberIsDisabled(true);
    setMyopiaOptions();
  };

  //난시,축,ADD 드랍 옵션 정제
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
  //근시 드랍 옵션 정제
  const transformMyopia = data => {
    if (data) {
      const transformMyopia = data.map(item => ({
        label: `${item.myopia} / 재고 : ${item.mstock}개`,
        value: item.myopia,
      }));
      return transformMyopia;
    } else {
      return null;
    }
  };

  // 제품변경
  const handleChange = () => {
    const { product, updateAdd, updateAsti, updateAxis, updateMyopia, number } = getValues();
    const pointProductGroupId = productData.pointProductGroupId; //id
    const transactionProductId = productData.transactionProductId; //기존 제품 id
    const updateProductBauschId = product?.length ? product[product?.length - 1] : null;
    const price = myopiaData.result.pointPrice;
    const totalPrice = number * price;

    // updateMyopia와 일치하는 항목의 mstock 값을 찾습니다
    const selectedMyopiaData = myopiaData.result.transactionMyopiaStockModels.find(item => item.myopia === updateMyopia);
    const mstock = selectedMyopiaData ? selectedMyopiaData.mstock : null;

    if (mstock < number) {
      alert('재고가 부족합니다.');
      return;
    }

    const sendObject = {
      pointProductGroupId, //id
      transactionProductId, //기존 제품 id
      updateProductBauschId, // 바뀐 제품id
      updateMyopia, // 근시
      updateAsti, // 난시
      updateAxis, // 축
      updateAdd, // add
      totalQuantity: number, // 총 수량
      totalPrice, // 총 가격
    };

    for (let key in sendObject) {
      if (sendObject[key] === '') {
        sendObject[key] = null;
      }
    }

    dispatch(updatePointProductAction({ sendObject }));

    reset();
    resetState();
    dispatch(pointProductChangeModalReset());
  };

  const resetState = () => {
    setProductOptions([]);
    setOptionData({});
    setMyopiaOptions();
    setIsDisabled(true);
    setIsSelected(false);
    setNumberIsDisabled(true);
  };

  // 제품 선택
  const handleChangeProduct = async productId => {
    try {
      const response = await AXIOS_GET(`/transaction/point/product/diopter/${productId}`);
      const { status, data } = response;
      if (status === 200) {
        const optionData = data?.result;
        for (let key in optionData) {
          if (Array.isArray(optionData[key]) && optionData[key].length === 1 && optionData[key][0] === null) {
            optionData[key] = null;
          }
        }

        const { asti, axis, add } = optionData;

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

  // 근시 정보 가져오기
  const handleSelect = () => {
    const values = getValues();
    const { product, updateAdd, updateAsti, updateAxis } = values;
    const productId = product[product?.length - 1]; // children value만 추출
    const params = {
      productId, // 제품ID
      asti: updateAsti, // 난시
      axis: updateAxis, // 축
      add: updateAdd, // add
    };
    for (let key in params) {
      if (params[key] === '') {
        params[key] = null;
      }
    }
    dispatch(getPointMyopiaAction({ params }));
  };

  useEffect(() => {
    if (myopiaData?.result?.transactionMyopiaStockModels?.length > 0) {
      const transactionMyopiaStockModels = myopiaData?.result?.transactionMyopiaStockModels;
      setMyopiaOptions(transformMyopia(transactionMyopiaStockModels));

      const price = myopiaData?.result?.pointPrice.toLocaleString() + '원';
      setValue('price', price);
    }
    if (myopiaData?.result?.transactionMyopiaStockModels?.length === 0) {
      alert('정보없음');
    }
  }, [myopiaData, setValue]);

  // 제품 선택 초기화
  const handleResetProduct = () => {
    setOptionData({});
    setMyopiaOptions();
  };

  useEffect(() => {
    if (productData?.productType) {
      setValue(`product`, [productData?.productGroupId, productData?.productId]);
      setValue('updateMyopia', null);
      setValue('updateAsti', productData?.asti);
      setValue('updateAxis', productData?.axis);
      setValue('updateAdd', productData?.add);

      handleChangeProduct(productData?.productId);
    }
  }, [productData, setValue]);

  useEffect(() => {
    const values = getValues();
    const { updateMyopia, ...rest } = values;
    const hasNullValue = Object.values(values).some(val => val === null);
    setIsDisabled(hasNullValue);
    const restHasNullValue = Object.values(rest).some(val => val === null);
    setIsSelected(!restHasNullValue);
  }, [watch(['product', 'updateAsti', 'updateAxis', 'updateAdd']), getValues]);

  useEffect(() => {
    if (!numberIsDisabled) {
      const number = getValues('number');
      const price = myopiaData?.result?.pointPrice;
      if (price) {
        const totalPrice = (number * price).toLocaleString() + '원';
        setValue('totalPrice', totalPrice);
      }
    } else {
      setValue('totalPrice', '');
    }
  }, [watch(['number']), getValues, myopiaData?.result?.pointPrice, numberIsDisabled, setValue]);

  useEffect(() => {
    const updateMyopia = getValues('updateMyopia');
    if (updateMyopia) {
      setNumberIsDisabled(false);
    } else {
      setNumberIsDisabled(true);
    }
  }, [watch(['updateMyopia']), getValues]);

  const resetMyopia = () => {
    setMyopiaOptions();
    setIsDisabled(true);
    setValue('updateMyopia', null);
    setValue('number', 1);
    setValue('totalPrice', '');
  };

  return (
    <>
      <Portal selector={'popup-root'}>
        <Modal
          open={show}
          centered
          title={`제품 변경`}
          onCancel={handleCancel}
          width={800}
          footer={[
            <Buttons key={'cancel'} name={'취소'} onClick={handleCancel} />,
            <Buttons disabled={isDisabled} key={'submit'} name={'변경하기'} type="primary" onClick={handleChange} />,
          ]}>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div css={formWrapperStyle}>
              <div css={formBoxStyle}>
                <div>
                  <Label title={'구매제품'} />
                  <Controller
                    name={'product'}
                    control={control}
                    render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                      <Cascader
                        value={value}
                        options={productOptions}
                        placeholder="제품선택"
                        onChange={value => {
                          onChange(value); // 추출한 값만 폼 상태로 전달
                          setValue(`updateMyopia`, null);
                          setValue(`updateAsti`, null);
                          setValue(`updateAxis`, null);
                          setValue(`updateAdd`, null);
                          setMyopiaOptions();
                          if (value) {
                            const productId = value[value?.length - 1]; // children value만 추출
                            handleChangeProduct(productId);
                          } else {
                            handleResetProduct();
                          }
                        }}
                      />
                    )}
                  />
                </div>
                <div css={lensBoxStyle}>
                  <PointLensSelect
                    disabled={!optionData?.asti}
                    label={'난시'}
                    name={'updateAsti'}
                    options={optionData?.asti || []}
                    control={control}
                    resetMyopia={resetMyopia}
                  />
                  <PointLensSelect
                    disabled={!optionData?.axis}
                    label={'축'}
                    name={'updateAxis'}
                    options={optionData?.axis || []}
                    control={control}
                    resetMyopia={resetMyopia}
                  />
                  <PointLensSelect
                    disabled={!optionData?.add}
                    label={'ADD'}
                    name={'updateAdd'}
                    options={optionData?.add || []}
                    control={control}
                    resetMyopia={resetMyopia}
                  />
                  <div>
                    <Label title={'제품선택'} />
                    <Buttons disabled={!isSelected} key={'submit'} name={'제품선택'} onClick={handleSelect} />
                  </div>
                </div>
              </div>
              {myopiaOptions && (
                <div css={formBoxStyle}>
                  <LensSelect
                    width={184}
                    disabled={!myopiaOptions}
                    label={'근시'}
                    name={'updateMyopia'}
                    options={myopiaOptions || []}
                    control={control}
                  />
                  <div css={lensBoxStyle}>
                    <div>
                      <Label title={'적립 구매가'} />
                      <Controller
                        name={'price'}
                        control={control}
                        render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs disabled value={value} />}
                      />
                    </div>
                    <p css={spanStyle}>x</p>
                    <div>
                      <Label title={'수량'} />
                      <Controller
                        name={'number'}
                        control={control}
                        render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                          <InputNumber disabled={numberIsDisabled} min={1} value={value} onChange={onChange} />
                        )}
                      />
                    </div>
                    <p css={spanStyle}>=</p>
                    <div>
                      <Label title={'총 사용 적립금'} />
                      <Controller
                        name={'totalPrice'}
                        control={control}
                        render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs disabled value={value} />}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Form>
        </Modal>
      </Portal>
    </>
  );
};
export default PointProductChangeModal;
const formBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
`;
const formWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const lensBoxStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const spanStyle = css`
  font-size: 20px;
  margin: 0;
  padding: 0;
  margin-top: 18px;
`;
