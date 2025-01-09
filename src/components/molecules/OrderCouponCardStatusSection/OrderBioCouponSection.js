import { Card, Row, Col, Select, InputNumber, Typography, Button, Descriptions, Space, Input, Cascader, Badge, Tag } from 'antd';
import Icon, { CloseSquareFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, Radios, SelectAtom, SelectBox } from '@/components/atom';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import { useEffect, useState } from 'react';
import { getCouponOrderDropAction } from '@/store/reducers/admin/couponOrderReducer';
import { useDispatch } from 'react-redux';
import { AXIOS_GET } from '@/api/axios/useAxios';

const { Text } = Typography;

const OrderBioCouponSection = ({ couponCardList, couponDropData, userData, setSelectedCards, selectedCards, optionData, setOptionData }) => {
  const dispatch = useDispatch();
  const { control, getValues, setValue, reset, watch } = useFormContext();
  const [filteredData, setFilteredData] = useState([]);
  const { myopiaLeft, astiLeft, axisLeft, lensAddLeft, myopiaRight, astiRight, axisRight, lensAddRight, memberId } = userData;

  useEffect(() => {
    if (couponDropData.length > 0) {
      const transformedData = couponDropData.map(item => ({
        ...item, // 기존 데이터 복사
        productDropData: item.productDropData.map(group => ({
          label: group.productGroupName, // 그룹 이름을 label로
          value: group.productGroupId, // 그룹 ID를 value로
          children: group.dropProductInfoList.map(product => ({
            label: product.productName, // 제품 이름을 label로
            value: product.productId, // 제품 ID를 value로
          })),
        })),
        giftDropData: item.giftDropData.map(group => ({
          label: group.productGroupName, // 그룹 이름을 label로
          value: group.productGroupId, // 그룹 ID를 value로
          children: group.dropProductInfoList.map(product => ({
            label: product.productName, // 제품 이름을 label로
            value: product.productId, // 제품 ID를 value로
          })),
        })),
      }));

      // 쿠폰 리스트 순서를 기준으로 재정렬 하기
      const reorderedArray = reorderArray(couponCardList, transformedData);

      setFilteredData(reorderedArray);
    }
  }, [couponDropData, couponCardList]);

  // 재정렬 함수
  const reorderArray = (reference, data) => {
    // 기준 배열의 couponId를 순서대로 추출
    const referenceIds = reference.map(item => item.couponId);

    // 대상 배열을 couponId를 키로 하는 Map 객체로 변환
    const dataMap = new Map(data.map(item => [item.couponId, item]));

    // 기준 배열의 순서에 맞게 대상 배열을 재정렬
    return referenceIds.map(id => dataMap.get(id)).filter(item => item !== undefined);
  };

  // 좌/우 선택
  const handleChangeEyeSide = (index, i, syncData) => {
    const memberDiopterModel = getValues(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel`);
    const { isSyncLens, length, salesProductQuantity } = syncData;

    const { eyeSide, memberMyopia, memberAsti, memberAxis, memberAdd } = memberDiopterModel;

    let myOpia = myopiaLeft;
    let myAsti = astiLeft;
    let myAxis = axisLeft;
    let myAdd = lensAddLeft;

    if (eyeSide === 'right') {
      myOpia = myopiaRight;
      myAsti = astiRight;
      myAxis = axisRight;
      myAdd = lensAddRight;
    }
    if (memberMyopia) {
      setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberMyopia`, myOpia);
    }
    if (memberAsti) {
      setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAsti`, myAsti);
    }
    if (memberAxis) {
      setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAxis`, myAxis);
    }
    if (memberAdd) {
      setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAdd`, myAdd);
    }

    // 동일도수인 경우
    if (isSyncLens) {
      setGiftDiopter(index, salesProductQuantity, length);
    }
  };

  // 쿠폰 선택 해제
  const handleRemoveCard = (couponId, couponIssueId) => {
    setSelectedCards(prevSelected => {
      if (prevSelected.includes(couponId)) {
        // 이미 선택된 카드면 제거
        return prevSelected.filter(id => id !== couponId);
      } else {
        // 선택되지 않은 카드면 추가
        return [...prevSelected, couponId];
      }
    });

    const params = {
      couponId,
      couponIssueId,
    };
    dispatch(getCouponOrderDropAction({ params }));
  };

  // 제품 선택
  const handleChangeProduct = async (couponId, memberId, productId, i, syncData) => {
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

        // null값 처리 작업
        for (let key in optionData) {
          if (Array.isArray(optionData[key]) && optionData[key].length === 1 && optionData[key][0] === null) {
            optionData[key] = null;
          }
        }

        const { myopia, asti, axis, add } = optionData; //해당 제품 도수 정보
        const index = couponCardList.findIndex(item => item.couponId === couponId); //쿠폰 순서

        // 좌/우 선택에 따른 도수정보 알려주기
        const eyeSide = getValues(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.eyeSide`);

        let myOpia = myopiaLeft;
        let myAsti = astiLeft;
        let myAxis = axisLeft;
        let myAdd = lensAddLeft;

        if (eyeSide === 'right') {
          myOpia = myopiaRight;
          myAsti = astiRight;
          myAxis = axisRight;
          myAdd = lensAddRight;
        }

        const { isSyncLens, isSyncProduct, length, salesProductQuantity } = syncData;

        // *******************************회원도수정보 미리 넣어주기
        const handleMemberDiopter = (diopterOption, diopter, memberDiopter) => {
          // 도수정보 없는 경우 + i가 판매제품인 경우 (null값 처리)
          if (!diopterOption && i < salesProductQuantity) {
            setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.${diopter}`, '');
          }
          // 도수정보 있는 경우 + 동일도수인경우 + 동일제품 아닌경우 + i가 판매제품인 경우 (판매제품만 정보 넣기)
          else if (diopterOption && isSyncLens && !isSyncProduct && i < salesProductQuantity) {
            setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.${diopter}`, memberDiopter);
          }
          // 도수정보 있는 경우 + 동일도수인경우 + 동일제품인 경우 + i가 판매제품인 경우 (판매제품만 정보 넣기)
          else if (diopterOption && isSyncLens && isSyncProduct && i < salesProductQuantity) {
            for (let j = 0; j < salesProductQuantity; j++) {
              setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.${diopter}`, memberDiopter);
            }
          }
          // 도수정보 있는 경우 + 동일도수 x + 동일제품 o
          else if (diopterOption && !isSyncLens && isSyncProduct) {
            for (let j = 0; j < length; j++) {
              setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.${diopter}`, memberDiopter);
            }
          }
          // 도수정보 있는 경우 + 동일도수 아닌 경우 (모든제품에 정보 넣기)
          else if (diopterOption && !isSyncLens) {
            setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.${diopter}`, memberDiopter);
          } else {
            //console.log('etc');
          }
        };

        handleMemberDiopter(myopia, 'memberMyopia', myOpia); //근시
        handleMemberDiopter(asti, 'memberAsti', myAsti); //난시
        handleMemberDiopter(axis, 'memberAxis', myAxis); //축
        handleMemberDiopter(add, 'memberAdd', myAdd); //ADD

        // *****************************************제품별 도수 옵션 목록 넣기
        setOptionData(prevArray => {
          // 기존 배열을 복사하여 새로운 배열을 생성
          const updatedArray = [...prevArray];

          // index 배열 요소가 존재하는지 확인하고, 없으면 초기값 설정
          if (!updatedArray[index]) {
            updatedArray[index] = [];
          }

          //index 배열의 i배열값이 좋재하는지 확인하고, 없으면 초기값 설정
          if (!updatedArray[index][i]) {
            updatedArray[index][i] = { options: null };
          }

          // 동일도수인 경우 + 동일제품이 아닌 경우 + 판매제품인 경우
          if (isSyncLens && !isSyncProduct && i < salesProductQuantity) {
            // 지정된 인덱스에 새 값을 설정
            updatedArray[index][i].options = {
              myopia: transformArray(myopia),
              asti: transformArray(asti),
              axis: transformArray(axis),
              add: transformArray(add),
            };
          }

          // 동일도수인 경우 + 동일제품인 경우 + 판매제품인 경우
          if (isSyncLens && isSyncProduct && i < salesProductQuantity) {
            for (let j = 0; j < salesProductQuantity; j++) {
              //index 배열의 i배열값이 좋재하는지 확인하고, 없으면 초기값 설정
              if (!updatedArray[index][j]) {
                updatedArray[index][j] = { options: null };
              }
              // 지정된 인덱스에 새 값을 설정
              updatedArray[index][j].options = {
                myopia: transformArray(myopia),
                asti: transformArray(asti),
                axis: transformArray(axis),
                add: transformArray(add),
              };
            }
          }
          // 동일도수 x + 동일제품 o
          if (!isSyncLens && isSyncProduct) {
            for (let j = 0; j < length; j++) {
              //index 배열의 i배열값이 좋재하는지 확인하고, 없으면 초기값 설정
              if (!updatedArray[index][j]) {
                updatedArray[index][j] = { options: null };
              }
              // 지정된 인덱스에 새 값을 설정
              updatedArray[index][j].options = {
                myopia: transformArray(myopia),
                asti: transformArray(asti),
                axis: transformArray(axis),
                add: transformArray(add),
              };
            }
          }

          // 동일도수 아닌 경우
          else {
            // 지정된 인덱스에 새 값을 설정
            updatedArray[index][i].options = {
              myopia: transformArray(myopia),
              asti: transformArray(asti),
              axis: transformArray(axis),
              add: transformArray(add),
            };
          }
          return updatedArray;
        });

        // 동일도수인 경우
        if (isSyncLens) {
          setGiftDiopter(index, salesProductQuantity, length);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 변환 함수
  const transformArray = array => {
    if (array) {
      return array.map(item => ({
        value: item,
        label: item,
      }));
    } else {
      return null;
    }
  };

  // 제품 선택 초기화
  const handleResetProduct = (couponId, i, syncData) => {
    const index = couponCardList.findIndex(item => item.couponId === couponId);
    const { isSyncLens, isSyncProduct, length, salesProductQuantity } = syncData;

    setOptionData(prevArray => {
      // 기존 배열을 복사하여 새로운 배열을 생성
      const updatedArray = [...prevArray];

      // 동일제품 아닌경우
      if (!isSyncProduct) {
        // 지정된 인덱스에 새 값을 설정
        updatedArray[index][i].options = {
          myopia: null,
          asti: null,
          axis: null,
          add: null,
        };
        setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberMyopia`, '');
        setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAsti`, '');
        setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAxis`, '');
        setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAdd`, '');
        return updatedArray;
      }
      // 동일도수 x 동일제품 o
      else if (!isSyncLens && isSyncProduct) {
        for (let j = 0; j < length; j++) {
          // 지정된 인덱스에 새 값을 설정
          updatedArray[index][j].options = {
            myopia: null,
            asti: null,
            axis: null,
            add: null,
          };
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberMyopia`, '');
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAsti`, '');
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAxis`, '');
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAdd`, '');
        }
        return updatedArray;
      }
      // 동일제품인 경우
      else {
        for (let j = 0; j < salesProductQuantity; j++) {
          // 지정된 인덱스에 새 값을 설정
          updatedArray[index][j].options = {
            myopia: null,
            asti: null,
            axis: null,
            add: null,
          };
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberMyopia`, '');
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAsti`, '');
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAxis`, '');
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAdd`, '');
        }
        return updatedArray;
      }
    });

    // 동일도수인 경우
    if (isSyncLens) {
      setGiftDiopter(index, salesProductQuantity, length);
    }
  };

  // 증정제품 도수정보 설정하기
  const setGiftDiopter = (index, salesProductQuantity, length) => {
    setOptionData(prevArray => {
      const updatedArray = [...prevArray];
      // index 배열 요소가 존재하는지 확인하고, 없으면 초기값 설정
      if (!updatedArray[index]) {
        updatedArray[index] = [];
      }

      // 판매제품에서 선택한 값들 배열로 만들기
      let myopiaValues = []; //근시
      let astiValues = []; //난시
      let axisValues = []; //축
      let addValues = []; //ADD

      for (let j = 0; j < salesProductQuantity; j++) {
        const myopiaValue = getValues(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberMyopia`);
        const astiValue = getValues(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAsti`);
        const axisValue = getValues(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAxis`);
        const addValue = getValues(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAdd`);

        if (myopiaValue && !myopiaValues.includes(myopiaValue)) {
          myopiaValues = myopiaValues.concat(myopiaValue);
        }
        if (astiValue && !astiValues.includes(astiValue)) {
          astiValues = astiValues.concat(astiValue);
        }
        if (axisValue && !axisValues.includes(axisValue)) {
          axisValues = axisValues.concat(axisValue);
        }
        if (addValue && !addValues.includes(addValue)) {
          addValues = addValues.concat(addValue);
        }
      }

      // 해당 근시값 배열을 증정제품들 근시값 목록에 넣기
      for (let j = salesProductQuantity; j < length; j++) {
        //index 배열의 j배열값이 좋재하는지 확인하고, 없으면 초기값 설정
        if (!updatedArray[index][j]) {
          updatedArray[index][j] = { options: null };
        }

        updatedArray[index][j].options = {
          myopia: transformArray(myopiaValues),
          asti: transformArray(astiValues),
          axis: transformArray(axisValues),
          add: transformArray(addValues),
        };

        if (myopiaValues.length === 0) {
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberMyopia`, '');
        }
        if (astiValues.length === 0) {
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAsti`, '');
        }
        if (axisValues.length === 0) {
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAxis`, '');
        }
        if (addValues.length === 0) {
          setValue(`couponRegisterModels[${index}].couponRegisterInfoModels[${j}].memberDiopterModel.memberAdd`, '');
        }
      }

      return updatedArray;
    });
  };

  const handleChangeDiopter = (index, syncData) => {
    const { isSyncLens, length, salesProductQuantity } = syncData;

    // 동일도수인 경우
    if (isSyncLens) {
      setGiftDiopter(index, salesProductQuantity, length);
    }
  };

  return (
    <CardContainer css={containerStyle}>
      <Descriptions title="제품 선택"></Descriptions>
      {filteredData?.map((item, filterIndex) => {
        const index = couponCardList.findIndex(item2 => item2.couponId === item.couponId);
        const isSyncLens = item.syncLensPowerStatus === 'SYNC_LENS_POWER_ON'; //동일 도수
        const isSyncProduct = item.syncSaleGiftStatus === 'SYNC_SALE_ON'; //동일 제품

        const isLensRequire = !isSyncLens && isSyncProduct; // 동일제품o, 동일도수x
        const isLensDisable = isSyncLens && !isSyncProduct; // 동일제품x, 동일도수o

        const syncData = {
          isSyncLens,
          isSyncProduct,
          isLensRequire,
          isLensDisable,
          salesProductQuantity: item.salesProductQuantity,
          length: item.salesProductQuantity + item.giftProductQuantity,
        };

        return (
          <div key={item.couponId}>
            <Card
              extra={
                <CloseSquareFilled
                  onClick={() => {
                    handleRemoveCard(item.couponId, item.couponIssueId);
                  }}
                  css={iconStyle}
                />
              }
              bordered={false}
              title={item.couponName}>
              <Controller
                name={`couponRegisterModels[${index}].couponIssueId`}
                defaultValue={item.couponIssueId}
                control={control}
                render={() => null}
              />
              {/* 판매제품 */}
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <div css={tagContainerStyle}>
                    <Tag color={item.couponType === '할인' ? 'red' : 'geekblue'}>{item.couponType}쿠폰</Tag>
                    <div>
                      {isSyncLens && <Tag>동일 도수 적용</Tag>}
                      {isSyncProduct && <Tag>동일 제품 적용</Tag>}
                    </div>
                  </div>
                </Col>

                {Array.from({ length: item.salesProductQuantity }).map((product, i) => (
                  <Col span={24} key={i}>
                    <Row gutter={24} align="middle">
                      {/* 제품  */}
                      <Col span={9}>
                        <Text>판매제품</Text>
                        <Controller
                          name={`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].productType`}
                          defaultValue={'SALES_PRODUCT'}
                          control={control}
                          render={() => null}
                        />
                        <Controller
                          name={`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].productId`}
                          control={control}
                          disabled={isSyncProduct && i !== 0}
                          render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                            <Cascader
                              value={value}
                              style={{ width: '100%' }}
                              options={item?.productDropData}
                              onChange={value => {
                                if (value) {
                                  onChange(value); // 추출한 값만 폼 상태로 전달
                                  const childrenValue = value[value.length - 1]; // children value만 추출
                                  handleChangeProduct(item.couponId, memberId, childrenValue, i, syncData);
                                } else {
                                  onChange(value); // 추출한 값만 폼 상태로 전달
                                  handleResetProduct(item.couponId, i, syncData);
                                }
                              }}
                              placeholder={isSyncProduct && i !== 0 ? '' : '판매제품'}
                              multiple={false}
                              {...rest}
                            />
                          )}
                        />
                      </Col>
                      {/* 좌/우 */}
                      <Col span={3}>
                        <Controller
                          name={`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.eyeSide`}
                          control={control}
                          defaultValue={'left'}
                          render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
                            return (
                              <Radios
                                onChange={selectedValue => {
                                  onChange(selectedValue);
                                  handleChangeEyeSide(index, i, syncData);
                                }}
                                options={[
                                  {
                                    key: 1,
                                    value: 'left',
                                    label: '좌',
                                  },
                                  {
                                    key: 2,
                                    value: 'right',
                                    label: '우',
                                  },
                                ]}
                                value={value}
                                {...rest}
                              />
                            );
                          }}
                          rules={{ required: true }}
                        />
                      </Col>
                      {/* 근시 */}
                      <Col span={3}>
                        <Text>근시</Text>
                        <Controller
                          name={`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberMyopia`}
                          control={control}
                          defaultValue={''}
                          render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                            <SelectBox
                              placeholder={'선택'}
                              value={value} // 현재 선택된 값
                              onChange={selectedValue => {
                                onChange(selectedValue);
                                handleChangeDiopter(index, syncData);
                              }}
                              options={optionData[index]?.[i]?.options?.myopia || []}
                              isDisabled={!optionData[index]?.[i]?.options?.myopia}
                              {...rest}
                            />
                          )}
                        />
                      </Col>
                      {/* 난시 */}
                      <Col span={3}>
                        <Text>난시</Text>
                        <Controller
                          name={`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAsti`}
                          control={control}
                          defaultValue={''}
                          render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                            <SelectBox
                              placeholder={'선택'}
                              value={value} // 현재 선택된 값
                              onChange={selectedValue => {
                                onChange(selectedValue);
                                handleChangeDiopter(index, syncData);
                              }}
                              options={optionData[index]?.[i]?.options?.asti || []}
                              isDisabled={!optionData[index]?.[i]?.options?.asti}
                              {...rest}
                            />
                          )}
                        />
                      </Col>
                      {/* 축 */}
                      <Col span={3}>
                        <Text>축</Text>
                        <Controller
                          name={`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAxis`}
                          control={control}
                          defaultValue={''}
                          render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                            <SelectBox
                              placeholder={'선택'}
                              value={value} // 현재 선택된 값
                              onChange={selectedValue => {
                                onChange(selectedValue);
                                handleChangeDiopter(index, syncData);
                              }}
                              options={optionData[index]?.[i]?.options?.axis || []}
                              isDisabled={!optionData[index]?.[i]?.options?.axis}
                              {...rest}
                            />
                          )}
                        />
                      </Col>
                      {/* ADD */}
                      <Col span={3}>
                        <Text>ADD</Text>
                        <Controller
                          name={`couponRegisterModels[${index}].couponRegisterInfoModels[${i}].memberDiopterModel.memberAdd`}
                          control={control}
                          defaultValue={''}
                          render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                            <SelectBox
                              disabled={true}
                              placeholder={'선택'}
                              value={value} // 현재 선택된 값
                              onChange={selectedValue => {
                                onChange(selectedValue);
                                handleChangeDiopter(index, syncData);
                              }}
                              options={optionData[index]?.[i]?.options?.add || []}
                              isDisabled={!optionData[index]?.[i]?.options?.add}
                              {...rest}
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                ))}

                {/* <Col span={24} css={addbuttonBox_style}>
                <PlusOutlined style={{ fontSize: '30px', fontWeight: 800, cursor: 'pointer' }} />
              </Col> */}
              </Row>

              {/* 증정제품 */}
              {item.giftProductQuantity > 0 && (
                <>
                  <DividingLine />
                  <Row gutter={[24, 24]}>
                    {Array.from({ length: item.giftProductQuantity }).map((product, e) => {
                      const a = e + item.salesProductQuantity;
                      return (
                        <Col span={24} key={a}>
                          <Row gutter={24} align="middle">
                            {/* 제품  */}
                            <Col span={9}>
                              <Text>증정제품</Text>
                              <Controller
                                name={`couponRegisterModels[${index}].couponRegisterInfoModels[${a}].productType`}
                                defaultValue={'GIFT_PRODUCT'}
                                control={control}
                                render={() => null}
                              />
                              <Controller
                                name={`couponRegisterModels[${index}].couponRegisterInfoModels[${a}].productId`}
                                control={control}
                                disabled={isSyncProduct}
                                render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                                  <Cascader
                                    style={{ width: '100%' }}
                                    options={item?.giftDropData}
                                    value={value}
                                    onChange={value => {
                                      if (value) {
                                        onChange(value); // 추출한 값만 폼 상태로 전달
                                        const childrenValue = value[value.length - 1]; // children value만 추출
                                        handleChangeProduct(item.couponId, memberId, childrenValue, a, syncData);
                                      } else {
                                        onChange(value); // 추출한 값만 폼 상태로 전달
                                        handleResetProduct(item.couponId, a, syncData);
                                      }
                                    }}
                                    placeholder={isSyncProduct ? '' : '증정제품'}
                                    multiple={false}
                                    {...rest}
                                  />
                                )}
                              />
                            </Col>
                            {/* 좌/우 */}
                            <Col span={3}>
                              <Controller
                                name={`couponRegisterModels[${index}].couponRegisterInfoModels[${a}].memberDiopterModel.eyeSide`}
                                control={control}
                                defaultValue={'left'}
                                disabled={isSyncLens}
                                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
                                  return (
                                    <Radios
                                      onChange={selectedValue => {
                                        onChange(selectedValue);
                                        handleChangeEyeSide(index, a, syncData);
                                      }}
                                      options={[
                                        {
                                          key: 1,
                                          value: 'left',
                                          label: '좌',
                                        },
                                        {
                                          key: 2,
                                          value: 'right',
                                          label: '우',
                                        },
                                      ]}
                                      value={value}
                                      {...rest}
                                    />
                                  );
                                }}
                              />
                            </Col>
                            {/* 근시 */}
                            <Col span={3}>
                              <Text>근시</Text>
                              <Controller
                                name={`couponRegisterModels[${index}].couponRegisterInfoModels[${a}].memberDiopterModel.memberMyopia`}
                                control={control}
                                defaultValue={''}
                                render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                                  <SelectBox
                                    placeholder={'선택'}
                                    value={value} // 현재 선택된 값
                                    onChange={selectedValue => {
                                      onChange(selectedValue);
                                      handleChangeDiopter(index, syncData);
                                    }}
                                    options={optionData[index]?.[a]?.options?.myopia || []}
                                    isDisabled={!optionData[index]?.[a]?.options?.myopia || optionData[index]?.[a]?.options?.myopia.length === 0}
                                    {...rest}
                                  />
                                )}
                              />
                            </Col>
                            {/* 난시 */}
                            <Col span={3}>
                              <Text>난시</Text>
                              <Controller
                                name={`couponRegisterModels[${index}].couponRegisterInfoModels[${a}].memberDiopterModel.memberAsti`}
                                control={control}
                                defaultValue={''}
                                render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                                  <SelectBox
                                    placeholder={'선택'}
                                    value={value} // 현재 선택된 값
                                    onChange={selectedValue => {
                                      onChange(selectedValue);
                                      handleChangeDiopter(index, syncData);
                                    }}
                                    options={optionData[index]?.[a]?.options?.asti || []}
                                    isDisabled={!optionData[index]?.[a]?.options?.asti || optionData[index]?.[a]?.options?.asti.length === 0}
                                    {...rest}
                                  />
                                )}
                              />
                            </Col>
                            {/* 축 */}
                            <Col span={3}>
                              <Text>축</Text>
                              <Controller
                                name={`couponRegisterModels[${index}].couponRegisterInfoModels[${a}].memberDiopterModel.memberAxis`}
                                control={control}
                                defaultValue={''}
                                render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                                  <SelectBox
                                    placeholder={'선택'}
                                    value={value} // 현재 선택된 값
                                    onChange={selectedValue => {
                                      onChange(selectedValue);
                                      handleChangeDiopter(index, syncData);
                                    }}
                                    options={optionData[index]?.[a]?.options?.axis || []}
                                    isDisabled={!optionData[index]?.[a]?.options?.axis || optionData[index]?.[a]?.options?.axis.length === 0}
                                    {...rest}
                                  />
                                )}
                              />
                            </Col>
                            {/* ADD */}
                            <Col span={3}>
                              <Text>ADD</Text>
                              <Controller
                                name={`couponRegisterModels[${index}].couponRegisterInfoModels[${a}].memberDiopterModel.memberAdd`}
                                control={control}
                                defaultValue={''}
                                render={({ field: { ref, value, label, onChange, ...rest }, fieldState }) => (
                                  <SelectBox
                                    disabled={true}
                                    placeholder={'선택'}
                                    value={value} // 현재 선택된 값
                                    onChange={selectedValue => {
                                      onChange(selectedValue);
                                      handleChangeDiopter(index, syncData);
                                    }}
                                    options={optionData[index]?.[a]?.options?.add || []}
                                    isDisabled={!optionData[index]?.[a]?.options?.add || optionData[index]?.[a]?.options?.add.length === 0}
                                    {...rest}
                                  />
                                )}
                              />
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              )}
            </Card>
            <DividingLine border={false} />
          </div>
        );
      })}
    </CardContainer>
  );
};

export default OrderBioCouponSection;

const summaryStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  margin-top: 16px;
  border-top: 1.5px solid gray;
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

const addbuttonBox_style = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const iconStyle = css`
  font-size: 30px;
`;

const tagContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
