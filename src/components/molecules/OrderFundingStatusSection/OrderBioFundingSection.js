import { Card, Row, Col, Select, InputNumber, Typography, Button, Descriptions, Space, Input, Cascader, Form } from 'antd';
import Icon, { CloseSquareFilled, MinusOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, Label, RowGrid, SelectBox } from '@/components/atom';
import { useDispatch } from 'react-redux';
import { use, useCallback, useEffect, useState } from 'react';
import { AXIOS_GET } from '@/api/axios/useAxios';
import { useRouter } from 'next/router';
import { createOrderAction } from '@/store/reducers/admin/pointProductOrderReducer';

import PointLensSelect from '../PointLensSelect/PointLensSelect';
import { LensSelect } from '..';
import { transProductOption } from '@/common/utiles';

const { Text } = Typography;

const OrderBioFundingSection = ({ storeId, pointProductList, handleRemovePoint }) => {
  const { dropProductInfoList, balance, key, pointId, pointName, pointProductGroupId } = pointProductList[0];
  const productDropData = transProductOption(dropProductInfoList); //제품 옵션
  const basicRowData = {
    no: 0,
    selected: true,
    productDropData,
    balance,
    key,
    pointId,
    pointName,
    pointProductGroupId,
    optionData: {
      asti: null,
      axis: null,
      add: null,
    }, //난시,축,ADD
    isDisableProductSelection: true, //제품선택 disable 여부
    myopiaOptions: null, //근시
    isDisableNumber: true, //수량 disable 여부
    pstock: 0, // 근시 재고 수량
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const { control, getValues, setValue, handleSubmit, watch, reset } = useFormContext();
  const onSubmit = data => handleSendData(data);
  const onError = errors => handleError(errors);
  const [productRows, setProductRows] = useState([basicRowData]); //구매제품 행
  const [totalQuantity, setTotalQuantity] = useState(0); // 총수량
  const [totalPrice, setTotalPrice] = useState(0); // 총금액

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
        label: `${item.myopia} / 재고 : ${item.pstock}개`,
        value: item.productSkuId,
      }));
      return transformMyopia;
    } else {
      return null;
    }
  };

  //추가하기
  const handleAddItem = () => {
    const newData = { ...basicRowData, no: productRows.length };
    setProductRows(prev => [...prev, newData]);
  };

  // 삭제하기
  const handleRemoveItem = index => {
    const updatedData = productRows.map(item => (item.no === index ? { ...item, selected: false } : item));
    // 업데이트된 데이터 설정
    setProductRows(updatedData);
  };

  // 다 삭제된경우 적립금 선택 해제
  useEffect(() => {
    const allSelectedFalse = productRows.every(item => !item.selected);
    if (allSelectedFalse) {
      handleRemovePoint();
    }
  }, [productRows]);

  // 적립금 바꿀때마다 value 초기화하기
  useEffect(() => {
    setValue(`transactionPointModels`, []);
    setValue(`transactionPointModels[0]`, {
      asti: null,
      axis: null,
      add: null,
    });
  }, [pointProductList, setValue]);

  // 도수를 선택할때마다 근시 초기화
  const resetMyopia = index => {
    const { transactionPointModels } = getValues();
    const { product, myopia, add, asti, axis, price, number, totalPrice } = transactionPointModels[index];
    // 선택안된 값이 있는지 체크, 있으면 true 반환
    const restHasNullValue = Object.values({ add, asti, axis }).some(val => val === null);

    // 제품선택 disable 변환
    setProductRows(prevRows =>
      prevRows.map(
        row =>
          row.no === index
            ? {
                ...row,
                isDisableProductSelection: restHasNullValue,
                isDisableNumber: true,
                myopiaOptions: null,
              }
            : row, // 나머지는 그대로 유지
      ),
    );
    setValue(`transactionPointModels[${index}].myopia`, null);
    setValue(`transactionPointModels[${index}].price`, '');
    setValue(`transactionPointModels[${index}].number`, 1);
    setValue(`transactionPointModels[${index}].totalPrice`, '');
  };

  //  구매제품 선택
  const handleChangeProduct = async (productId, index) => {
    try {
      const response = await AXIOS_GET(`/transaction/point/product/diopter/${productId}`);
      const { status, data } = response;
      if (status === 200) {
        const diopterData = data?.result;

        // [null]을 null로 변환
        for (let key in diopterData) {
          if (Array.isArray(diopterData[key]) && diopterData[key].length === 1 && diopterData[key][0] === null) {
            diopterData[key] = null;
          }
        }
        const { asti, axis, add } = diopterData;

        // 값이 없는 옵션은 비우기
        if (!asti) {
          setValue(`transactionPointModels[${index}].asti`, ''); //난시
        }
        if (!axis) {
          setValue(`transactionPointModels[${index}].axis`, ''); //축
        }
        if (!add) {
          setValue(`transactionPointModels[${index}].add`, ''); //ADD
        }

        const filteredOptionData = {
          asti: transformDiopter(asti),
          axis: transformDiopter(axis),
          add: transformDiopter(add),
        };

        handleUpdateRowProperty(index, 'optionData', filteredOptionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 구매제품 선택 초기화
  const handleResetProduct = index => {
    setProductRows(prevRows =>
      prevRows.map(
        row =>
          row.no === index
            ? {
                ...row,
                optionData: {
                  asti: null,
                  axis: null,
                  add: null,
                },
                isDisableProductSelection: true,
                myopiaOptions: null,
                isDisableNumber: true,
              }
            : row, // 나머지는 그대로 유지
      ),
    );
  };

  // 제품선택 버튼
  const handleSelect = async index => {
    const { transactionPointModels } = getValues();
    const { product, asti, axis, add } = transactionPointModels[index];
    // 제품 children ID만 가져오기
    const productId = product[product?.length - 1];

    const params = {
      productId,
      asti,
      axis,
      add,
    };
    try {
      const response = await AXIOS_GET('/transaction/point/product/diopter/myopia', params);
      const { status, data } = response;
      if (status === 200) {
        const { pointPrice, transactionMyopiaStockModels } = data.result;
        setValue(`transactionPointModels[${index}].price`, pointPrice.toLocaleString());
        setValue(`transactionPointModels[${index}].totalPrice`, pointPrice.toLocaleString());

        const myopiaOptions = transformMyopia(transactionMyopiaStockModels);
        handleUpdateRowProperty(index, 'myopiaOptions', myopiaOptions);
        setValue(`transactionPointModels[${index}].transactionMyopiaStockModels`, transactionMyopiaStockModels);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  // 속성값 바꾸기 함수
  const handleUpdateRowProperty = (index, key, value) => {
    setProductRows(prevRows =>
      prevRows.map(
        row =>
          row.no === index
            ? {
                ...row,
                [key]: value,
              }
            : row, // 나머지는 그대로 유지
      ),
    );
  };

  // 총수량,합계 구하기
  const getTotalSum = () => {
    const { transactionPointModels } = getValues();

    const selectedNos = productRows.filter(item => item.selected).map(item => item.no);
    const selectedProducts = transactionPointModels.filter((_, index) => selectedNos.includes(index));

    const totalNumber = selectedProducts.reduce((sum, item) => {
      return item.number ? sum + item.number : sum; // number가 있는 경우에만 더하기
    }, 0);

    const totalPrice = selectedProducts.reduce((sum, item) => {
      //콤마 제거
      const plainNumberString = item?.totalPrice?.replace(/,/g, '');
      const totalPrice = Number(plainNumberString);
      return totalPrice ? sum + totalPrice : sum; // number가 있는 경우에만 totalPrice 더하기
    }, 0);
    setTotalQuantity(totalNumber);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    getTotalSum();
  }, [watch([`transactionPointModels`]), getTotalSum]);

  // 등록하기
  const handleSendData = () => {
    const { transactionPointModels } = getValues();
    const selectedNos = productRows.filter(item => item.selected).map(item => item.no);
    const selectedProducts = transactionPointModels.filter((_, index) => selectedNos.includes(index));

    let isStockExceeded = false;
    let isNotCompleted = false;

    // 재고 초과여부 체크하기
    const checkStock = data => {
      data.forEach((item, index) => {
        const selectedProductSkuId = item.myopia; // 선택한 productSkuId
        const number = item.number; // 구매 수량

        // transactionMyopiaStockModels에서 productSkuId 값이 일치하는 객체 찾기
        const matchingStock = item.transactionMyopiaStockModels?.find(stock => stock.productSkuId === selectedProductSkuId);

        if (matchingStock) {
          const { pstock } = matchingStock;

          // number가 pstock을 초과하면 alert
          if (number > pstock) {
            isStockExceeded = true;
          }
        }
      });
    };
    checkStock(selectedProducts);

    // 근시값 입력여부 체크하기
    const checkData = data => {
      data.forEach(item => {
        const productSkuId = item.myopia;
        if (!productSkuId) {
          isNotCompleted = true;
        }
      });
    };

    checkData(selectedProducts);

    // 재고수량 초과한경우
    if (isStockExceeded) {
      alert('주문 수량이 재고수량을 초과하였습니다');
    }
    //정보입력을 다하지 않은경우
    else if (isNotCompleted) {
      alert('입력하지 않은 항목이 있습니다. 확인 후 다시 시도해주세요.');
    } else {
      const transactionPointMedelInfos = selectedProducts.map(item => {
        //콤마 제거
        const plainNumberString = item?.totalPrice?.replace(/,/g, '');
        const totalPrice = Number(plainNumberString);
        return {
          productSkuId: item.myopia,
          productTotalPrice: totalPrice,
          productTotalQuantity: item.number,
        };
      });

      const filteredTransactionPointModels = [
        {
          pointId,
          orderTotalQuantity: totalQuantity, // 총 수량
          orderTotalPrice: totalPrice, //총 금액
          transactionPointMedelInfos,
        },
      ];
      const sendObject = {
        storeId,
        transactionPointModels: filteredTransactionPointModels,
      };

      console.log(sendObject, 'sendObject');
      // 결과 출력
      dispatch(createOrderAction({ sendObject, callback: router }));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <CardContainer css={containerStyle}>
        <Descriptions title="제품 선택"></Descriptions>
        {pointProductList?.map(item => (
          <div key={item.pointId}>
            <Card bordered={false} title={item.pointName + ' ' + '적립금'}>
              <Row gutter={[24, 24]}>
                {productRows?.map((row, index) => {
                  return (
                    row?.selected && (
                      <Col span={24} key={index}>
                        <Row gutter={22} align="middle">
                          {/* 구매제품 */}
                          <Col span={3}>
                            <Label title={`구매제품`} />
                            <Controller
                              name={`transactionPointModels[${index}].product`}
                              control={control}
                              render={({ field: { ref, value, label, onChange, ...rest } }) => (
                                <Cascader
                                  style={{ width: '100%' }}
                                  options={row?.productDropData}
                                  onChange={value => {
                                    onChange(value); // 선택된 값을 폼 상태로 전달
                                    handleResetProduct(index); //초기화
                                    const { product } = getValues(`transactionPointModels[${index}]`);
                                    setValue(`transactionPointModels[${index}]`, {
                                      product,
                                      asti: null,
                                      axis: null,
                                      add: null,
                                      myopia: null,
                                      price: null,
                                      number: null,
                                      totalPrice: null,
                                    });
                                    if (value) {
                                      const productId = value[value?.length - 1]; // children value만 추출
                                      handleChangeProduct(productId, index);
                                    } else {
                                    }
                                  }}
                                  placeholder="제품선택"
                                  multiple={false}
                                  {...rest}
                                />
                              )}
                            />
                          </Col>
                          {/* 난시 */}
                          <Col>
                            <PointLensSelect
                              label={'난시'}
                              name={`transactionPointModels[${index}].asti`}
                              width={85}
                              disabled={!productRows[index]?.optionData?.asti}
                              options={productRows[index]?.optionData?.asti || []}
                              control={control}
                              resetMyopia={() => {
                                resetMyopia(index);
                              }} //옵션 바꾸면 근시 초기화
                            />
                          </Col>
                          {/* 축 */}
                          <Col>
                            <PointLensSelect
                              label={'축'}
                              name={`transactionPointModels[${index}].axis`}
                              width={85}
                              disabled={!productRows[index]?.optionData?.axis}
                              options={productRows[index]?.optionData?.axis || []}
                              control={control}
                              resetMyopia={() => {
                                resetMyopia(index);
                              }}
                            />
                          </Col>
                          {/* ADD */}
                          <Col>
                            <PointLensSelect
                              label={'ADD'}
                              name={`transactionPointModels[${index}].add`}
                              width={85}
                              disabled={!productRows[index]?.optionData?.add}
                              options={productRows[index]?.optionData?.add || []}
                              control={control}
                              resetMyopia={() => {
                                resetMyopia(index);
                              }}
                            />
                          </Col>
                          {/* 제품선택 */}
                          <Col>
                            <Label title={'제품선택'} />
                            <Buttons disabled={row.isDisableProductSelection} key={'submit'} name={'제품선택'} onClick={() => handleSelect(index)} />
                          </Col>
                          {productRows[index]?.myopiaOptions && (
                            <>
                              {/* 근시 */}
                              <Col>
                                <LensSelect
                                  width={180}
                                  label={'근시'}
                                  name={`transactionPointModels[${index}].myopia`}
                                  disabled={!productRows[index]?.myopiaOptions}
                                  options={productRows[index]?.myopiaOptions || []}
                                  control={control}
                                  onChange={value => {
                                    setValue(`transactionPointModels[${index}].myopia`, value);
                                    if (value) {
                                      handleUpdateRowProperty(index, 'isDisableNumber', false);
                                    }
                                  }}
                                />
                              </Col>
                              {/* 근시 재고 파악용 */}
                              <Controller
                                name={`transactionPointModels[${index}].transactionMyopiaStockModels`}
                                control={control}
                                render={({ field: { ref, value, ...rest }, fieldState }) => <></>}
                              />

                              {/* 적립 구매가 */}
                              <Col>
                                <div style={{ width: '90px' }}>
                                  <Label title={'적립 구매가'} />
                                  <Controller
                                    name={`transactionPointModels[${index}].price`}
                                    control={control}
                                    render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs disabled value={value} />}
                                  />
                                </div>
                              </Col>
                              <p css={spanStyle}>x</p>
                              <Col>
                                <div style={{ width: '80px' }}>
                                  <Label title={'수량'} />
                                  <Controller
                                    name={`transactionPointModels[${index}].number`}
                                    control={control}
                                    render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                                      <InputNumber
                                        style={{ width: '100%' }}
                                        disabled={productRows[index]?.isDisableNumber}
                                        defaultValue={1}
                                        min={1}
                                        value={value}
                                        onChange={value => {
                                          onChange(value);
                                          const { transactionPointModels } = getValues();
                                          const { price } = transactionPointModels[index];
                                          //콤마 제거
                                          const plainNumberString = price.replace(/,/g, '');
                                          const totalPrice = Number(plainNumberString) * value;
                                          setValue(`transactionPointModels[${index}].totalPrice`, totalPrice.toLocaleString());
                                          getTotalSum();
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                              </Col>
                              <p css={spanStyle}>=</p>
                              <Col>
                                <div style={{ width: '120px' }}>
                                  <Label title={'총 사용 적립금'} />
                                  <Controller
                                    name={`transactionPointModels[${index}].totalPrice`}
                                    control={control}
                                    render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs disabled value={value} defaultValue="뭔데" />}
                                  />
                                </div>
                              </Col>
                            </>
                          )}

                          {/* 삭제 버튼 */}
                          <Col>
                            <Label title={'삭제'} />
                            <Buttons type="danger" name={'삭제'} onClick={() => handleRemoveItem(index)} />
                          </Col>
                        </Row>
                      </Col>
                    )
                  );
                })}

                <Col span={24} css={addButtonBoxStyle}>
                  <PlusSquareOutlined style={{ fontSize: '30px', color: '#848484', fontWeight: 800, cursor: 'pointer' }} onClick={handleAddItem} />
                </Col>
                <Col span={24} css={summaryStyle}>
                  <Text>총수량: {totalQuantity.toLocaleString()} 개</Text>
                  <Text>합계: {totalPrice.toLocaleString()} 원</Text>
                </Col>
              </Row>
            </Card>
            <DividingLine border={false} />
          </div>
        ))}

        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => router.push('/admin/order/point-sales')} />
            <Buttons type={'primary'} name={'주문 등록'} onClick={handleSendData} />
          </RowGrid>
        </CardContainer>
      </CardContainer>
    </Form>
  );
};

export default OrderBioFundingSection;

const summaryStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  margin-top: 16px;
  border-top: 1px solid #848484;
  padding: 10px;
`;

const containerStyle = css`
  background: #f0f2f5;
`;

const buttonBox_style = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const addButtonBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const iconStyle = css`
  font-size: 30px;
`;

/* 모든 브라우저에서 스핀 박스 숨기기 */
const numberInput = css`
  -moz-appearance: textfield; /* Firefox */
  -webkit-appearance: none; /* Chrome, Safari, Opera */
  appearance: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const spanStyle = css`
  font-size: 20px;
  margin: 0;
  padding: 0;
  margin-top: 18px;
`;
