import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, Radios, RowGrid, SelectBox, TextAreas } from '@/components/atom';
import { Descriptions, Upload, Collapse, Modal, InputNumber } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { buttonFlexEndRowStyle, buttonFlexStartRowStyle, descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useCommonCode from '@/hooks/useCommonCode';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { cardTitle, downloadExcel, handleDownload, transFormRadioValue } from '@/common/utiles';
import { DownloadOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import { css } from '@emotion/react';
import { getProductDetailAction, updateInsertSkuAction, updateProductDetailAction, updateSkuAction } from '@/store/reducers/admin/productReducer';
import NoticeLabel from '@/components/atom/Notice';
import ProductSkuListTemplate from '../ProductsTemplate/ProductSkuListTemplate';

export default function ProductManageSalesDetailTemplate() {
  const dispatch = useDispatch();
  const router = useRouter();

  // 공통코드 호출
  const { lensCycle, lensPowerType, storeGroup, productGroupBausch } = useCommonCodeBatch([
    'lensCycle',
    'lensPowerType',
    'storeGroup',
    'productGroupBausch',
  ]);

  // 제품 상세 데이터 불러오기
  const productDetail = useSelector(state => state.product.productDetail);
  const [productGroupBauschType, setProductGroupBauschType] = useState([]);
  const isSkuUploadingRef = useRef(false); // 추가됨
  const [powerRetouchType, setPowerRetouchType] = useState([]);
  const [skuFileList, setSkuFileList] = useState([]);
  const [storeGroupType, setStoreGroupType] = useState([]);
  const [originSku, setOriginSku] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      productPointPriceGroupModels: [{ storeGroupId: [], pointPrice: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productPointPriceGroupModels',
    keyName: 'fieldId', // 고유한 key 설정을 위해 keyName을 지정합니다.
  });

  const onSubmit = data => addConfirm(data);
  const onError = errors => handleError(errors);

  const skuHandler = file => {
    isSkuUploadingRef.current = true; // 추가됨
    const formData = new FormData();
    formData.append('skuInfo', file.file);
    dispatch(updateSkuAction({ formData }));
  };

  const setProductDetailData = () => {
    if (productDetail && storeGroupType.length > 0) {
      const {
        channelType,
        finalPrice,
        lensCycle,
        lensPowerType,
        minStock,
        pointOrderable,
        productDescription,
        productGroupId,
        productId,
        productName,
        productNameEn,
        productQuantity,
        recommendPrice,
        salesStatus,
        skuInfoModels,
        productPointPriceGroupModels,
      } = productDetail;

      setValue('channelType', channelType);
      setValue('finalPrice', finalPrice);
      setValue('lensCycle', lensCycle);
      setValue('lensPowerType', lensPowerType);
      setValue('minStock', minStock);
      setValue('pointOrderable', pointOrderable);
      setValue('productDescription', productDescription);

      setValue('productId', productId);
      setValue('productName', productName);
      setValue('productNameEn', productNameEn);
      setValue('productQuantity', productQuantity);
      setValue('recommendPrice', recommendPrice);
      setValue('salesStatus', salesStatus);
      setValue('skuInfoModels', skuInfoModels);

      if (productPointPriceGroupModels !== undefined) {
        const transformedProductPointPriceGroupModels = productPointPriceGroupModels.map(item => {
          return {
            pointPrice: item.pointPrice,
            storeGroupId: item.storeGroupId.map(id => {
              const matchedGroup = storeGroupType.find(group => group.value === id);
              return [matchedGroup?.label ? matchedGroup.value : '']; // 각 그룹 ID를 개별 배열로 변환
            }),
          };
        });

        if (productGroupBauschType !== undefined) {
          const sendProductGroupId = productGroupBauschType.find(item => item.value === String(productGroupId));
          setValue('productGroupId', sendProductGroupId?.label);
        }

        setValue('productPointPriceGroupModels', transformedProductPointPriceGroupModels);
      }
    }
  };

  useEffect(() => {
    if (!isSkuUploadingRef.current && productDetail?.channelType) {
      setProductDetailData();
    }
  }, [productDetail, productGroupBauschType, storeGroupType]);

  // 상세 confirm
  const addConfirm = data => {
    Modal.confirm({
      title: '제품 상세 수정',
      icon: <ExclamationCircleOutlined />,
      content: '수정하시겠습니까?',
      okText: '수정',
      cancelText: '취소',
      onOk: () => handleSendData(data),
    });
  };

  // sku upload
  const uploadProps = {
    onRemove: file => {
      setSkuFileList([]);
      dispatch(updateInsertSkuAction({ skuInfoModels: [] }));
    },
    beforeUpload: file => {
      return false;
    },
    onChange: async file => {
      const { fileList } = file;
      // 삭제된 파일은 무시
      const validFiles = fileList.filter(file => file.status !== 'removed');

      if (validFiles.length > 0) {
        skuHandler(file);
      }
      setSkuFileList(fileList);
    },
    fileList: skuFileList,
  };

  const handleSendData = data => {
    const {
      channelType,
      productGroupId,
      productName,
      productNameEn,
      productQuantity,
      lensPowerType,
      salesStatus,
      recommendPrice,
      finalPrice,
      productDescription,
      pointOrderable,
      minStock,
      skuInfoModels,
    } = data;

    const sendGroupData = productGroupBauschType.find(val => val.label === productGroupId).value;

    const sendLensCycle = lensCycle?.find(val => val.value === data.lensCycle)?.key;

    // 숫자 값을 올바르게 변환
    const numericalProductQuantity = Number(productQuantity);
    const numericalRecommendPrice = recommendPrice ? Number(recommendPrice) : null;
    const numericalFinalPrice = finalPrice ? Number(finalPrice) : null;
    const numericalMinStock = minStock ? Number(minStock) : null;

    // 적립제품 설정 리스트
    const listItem = getValues().productPointPriceGroupModels;

    // 데이터를 정제하는 함수
    const refineData = data => {
      return data.map(item => {
        const refinedStoreGroupIds = item.storeGroupId.map(idArray => {
          if (Array.isArray(idArray)) {
            const group = storeGroupType.find(group => group.label === idArray[0] || group.value === idArray[0]);
            return group ? [String(group.label)] : idArray;
          } else {
            const group = storeGroupType.find(group => group.label === idArray || group.value === idArray[0]);
            return group ? [String(group.label)] : [idArray];
          }
        });
        return {
          ...item,
          storeGroupId: refinedStoreGroupIds,
        };
      });
    };
    const refinedListItem = refineData(listItem);

    const resultPointGroupModel = refinedListItem.map(item => {
      const storeGroupIds =
        item.storeGroupId === ''
          ? null
          : Array.isArray(item.storeGroupId)
          ? item.storeGroupId.map(id => {
              const group = storeGroupType.find(group => group.label === id[0]);

              return Number(group?.value);
            })
          : (() => {
              const group = storeGroupType.find(group => group.label === item.storeGroupId.label);

              return [Number(group?.value)];
            })();

      return {
        pointPrice: Number(item.pointPrice) ? Number(item.pointPrice) : null,
        storeGroupId: storeGroupIds,
      };
    });

    const sendObject = {
      productBauschReqDto: {
        channelType: channelType,
        productGroupId: Number(sendGroupData),
        productName,
        productNameEn,
        productQuantity: numericalProductQuantity,
        lensPowerType,
        lensCycle: sendLensCycle,
        salesStatus,
        recommendPrice: numericalRecommendPrice,
        finalPrice: numericalFinalPrice,
        productDescription: productDescription === '' ? null : productDescription,
        productDescription,
        pointOrderable,
        minStock: numericalMinStock,
        productPointPriceGroupModels: resultPointGroupModel,
      },
      skuInfoModels: productDetail.skuInfoModels,
    };

    const id = router.query?.id;

    if (productDetail.skuInfoModels.length === 0) {
      dispatch(
        errorSnackOpen({
          message: 'SKU 등록이 필요합니다',
        }),
      );
    } else if (resultPointGroupModel.some(item => item.storeGroupId.length === 0)) {
      dispatch(
        errorSnackOpen({
          message: '스토어 그룹을 선택해주세요.',
        }),
      );
    } else {
      dispatch(updateProductDetailAction({ id, sendObject, callback: router }));
    }
  };

  // 필수값 누락시 에러 모달
  const handleError = errors => {
    // 제품 그룹 누락 에러
    if (errors?.productGroupId) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '제품 그룹을 입력 해 주세요.',
        }),
      );
    }
    // 제품명 누락 에러
    if (errors?.productName) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '제품명을 입력 해 주세요.',
        }),
      );
    }
    // 제품명(영문) 누락 에러
    if (errors?.productNameEn) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '제품명(영문)을 입력해 주세요.',
        }),
      );
    }
    // 제품 개입 누락 에러
    if (errors?.terms_essential_status) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '제품 개입을 입력 해주세요.',
        }),
      );
    }
    // 사용주기 누락 에러
    if (errors?.productPointPriceGroupModels) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '적립제품 구매가 설정을 입력 해주세요.',
        }),
      );
    }
    if (errors?.lensCycle) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '사용주기를 입력 해주세요.',
        }),
      );
    }
    // 재고수량 누락 에러
    if (errors?.minStock) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '최소 재고수량을 입력 해주세요.',
        }),
      );
    }
    // sku 누락 에러
    if (errors?.skuInfoModels) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: 'SKU 파일 업로드는 필수입니다.',
        }),
      );
    }
  };

  // 새로운 구매 설정을 추가하는 함수
  const addPurchaseSetting = () => {
    append({ storeGroupId: '', pointPrice: '' });
  };

  // 구매 설정을 제거하는 함수
  const removePurchaseSetting = id => {
    if (fields?.length >= 2) {
      remove(id);
    }
  };

  // 오더 정보에 따른 노출 여부를 위한 변수
  const pointOrderable = watch('pointOrderable');

  // 상세데이터 호출
  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getProductDetailAction({ id: router.query.id, callback: router }));
    }
  }, [dispatch, router, router.query.id]);

  useEffect(() => {
    if (lensPowerType && lensPowerType.length > 0) {
      setPowerRetouchType(transFormRadioValue(lensPowerType));
    }
    if (storeGroup && storeGroup.length > 0) {
      setStoreGroupType(transFormRadioValue(storeGroup));
    }

    if (productGroupBausch && productGroupBausch.length > 0) {
      setProductGroupBauschType(transFormRadioValue(productGroupBausch));
    }
  }, [lensPowerType, productGroupBausch, storeGroup]);

  useEffect(() => {
    if (productDetail?.skuInfoModels.length > 0 && originSku.length === 0) {
      const id = {
        number: 'No',
        sku: 'SKU',
        productBarcode: 'Barcode',
        myopia: 'Myopia',
        asti: 'Asti',
        axis: 'Axis',
        lensAdd: 'ADD',
        bc: 'BC',
        wareHouseCode: 'WarehouseCode',
        ref2: 'REF#2',
      };
      setOriginSku([id, ...productDetail?.skuInfoModels]);
    }
  }, [productDetail]);

  const handleOriginDownload = () => {
    // 엑셀로 내보낼 데이터 형식 조정
    const exportData = originSku?.map(item => ({
      No: item.number,
      SKU: item.sku,
      바코드: item.productBarcode,
      근시: item.myopia,
      난시: item.asti,
      축: item.axis,
      ADD: item.lensAdd,
      BC: item.bc,
      창고: item.wareHouseCode,
      'REF#2': item.ref2,
    }));
    downloadExcel(exportData);
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 바슈롬의 판매 제품상세 페이지입니다. 바슈롬 제품을 확인 및 수정할 수 있습니다.'} />
      </div>
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer bordered={false}>
          <Descriptions title={'제품 정보'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
            <Descriptions.Item span={2} label="채널⭐️">
              <Controller
                name="channelType"
                control={control}
                disabled
                defaultValue={'BAUSCH'}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return (
                    <Radios
                      options={[
                        { label: 'BAUSCH', value: 'BAUSCH' },
                        { label: 'LENSLY', value: 'LENSLY' },
                      ]}
                      value={'BAUSCH'}
                      {...rest}
                    />
                  );
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="제품 그룹⭐️">
              <Controller
                name="productGroupId"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <SelectBox value={value || []} options={productGroupBausch} placeholder={'선택해주세요'} {...rest} />;
                }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="제품명⭐️">
              <Controller
                name="productName"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || ''} placeholder={'제품명을 입력해주세요.'} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="제품명(영문)⭐️">
              <Controller
                name="productNameEn"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || ''} placeholder={'제품명(영문)을 입력해주세요.'} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="개입⭐️">
              <Controller
                name="productQuantity"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <InputNumber
                    placeholder="개입을 입력해주세요."
                    min={0} // 최소값 설정
                    style={{ width: '100%' }}
                    value={value}
                    {...rest}
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="도수⭐️">
              <Controller
                name="lensPowerType"
                control={control}
                defaultValue={''}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Radios options={powerRetouchType} value={value} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="사용주기⭐️">
              <Controller
                name="lensCycle"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <SelectBox value={value || null} options={lensCycle} placeholder={'사용주기를 선택해주세요'} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="단종⭐️">
              <Controller
                name="salesStatus"
                control={control}
                defaultValue={''}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return (
                    <Radios
                      options={[
                        { label: '단종', value: 'DISCONTINUE' },
                        { label: '판매중', value: 'ACTIVE' },
                      ]}
                      value={value}
                      {...rest}
                    />
                  );
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="권장 소비자가">
              <Controller
                name="recommendPrice"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <InputNumber
                    placeholder="권장 소비자가를 입력해주세요"
                    min={0} // 최소값 설정
                    style={{ width: '100%' }}
                    value={value}
                    {...rest}
                  />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="최종판매가">
              <Controller
                name="finalPrice"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <InputNumber
                    placeholder="최종 판매가를 입력해주세요."
                    min={0} // 최소값 설정
                    style={{ width: '100%' }}
                    value={value}
                    {...rest}
                  />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={4} label="제품설명">
              <Controller
                name="productDescription"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <TextAreas defaultValue={''} value={value || ''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>

          <DividingLine border={false} />

          <Descriptions title="적립제품 설정⭐️" labelStyle={{ width: '250px' }} bordered={true} column={4}>
            <Descriptions.Item span={2} label="주문 가능 여부">
              <Controller
                name="pointOrderable"
                control={control}
                defaultValue={'BUY_ENABLED'}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return (
                    <Radios
                      options={[
                        { label: '가능', value: 'BUY_ENABLED' },
                        { label: '불가', value: 'BUY_DISABLED' },
                      ]}
                      value={value}
                      {...rest}
                    />
                  );
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            {pointOrderable === 'BUY_ENABLED' && (
              <Descriptions.Item span={2} label="최소 재고 수량⭐️">
                <Controller
                  name="minStock"
                  control={control}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <InputNumber
                      placeholder="주문 가능한 최소 재고 수량을 입력해 주세요"
                      min={0} // 최소값 설정
                      style={{ width: '100%' }}
                      value={value}
                      {...rest}
                    />
                  )}
                  rules={{ required: true }}
                />
              </Descriptions.Item>
            )}
          </Descriptions>

          <DividingLine border={false} />

          <Descriptions column={1} title="적립제품 구매가 설정⭐️">
            {fields?.map((setting, index) => (
              <RowGrid key={setting.fieldId}>
                <ColGrid span={11}>
                  <Controller
                    name={`productPointPriceGroupModels[${index}].storeGroupId`}
                    control={control}
                    render={({ field: { ref, value, ...rest }, fieldState }) => {
                      return (
                        <SelectMultiBox
                          type="text"
                          style={{ width: '100%' }}
                          placeholder="스토어 그룹을 선택해주세요"
                          value={value}
                          options={storeGroupType}
                          {...rest}
                        />
                      );
                    }}
                  />
                </ColGrid>
                <ColGrid span={6}>
                  <Controller
                    name={`productPointPriceGroupModels[${index}].pointPrice`}
                    control={control}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <InputNumber
                        placeholder="구매가를 입력하세요"
                        min={0} // 최소값 설정
                        style={{ width: '100%' }}
                        css={marginLeftStyle(20)}
                        value={value}
                        {...rest}
                      />
                    )}
                  />
                </ColGrid>
                <ColGrid span={3} css={buttonFlexEndRowStyle}>
                  {index === 0 && <Buttons type={'primary'} name={'+'} onClick={() => addPurchaseSetting(index)} css={marginLeftStyle(5)} />}
                  {index !== 0 && <Buttons type={'danger'} name={'x'} onClick={() => removePurchaseSetting(index)} css={marginLeftStyle(5)} />}
                </ColGrid>
              </RowGrid>
            ))}
          </Descriptions>

          <DividingLine border={false} />

          <Descriptions
            title={
              <>
                SKU 등록⭐️
                <span style={{ fontSize: '14px', color: '#888', marginLeft: '10px', fontWeight: '400' }}>
                  현재 등록된 SKU를 다운로드하거나 새 파일을 업로드하세요.
                </span>
              </>
            }
            labelStyle={{ width: '250px' }}
            bordered={true}
            extra={<Buttons type={'solid'} name={'샘플 다운로드'} icon={<DownloadOutlined />} htmlType={'button'} onClick={handleDownload} />}>
            <Descriptions.Item span={3} label="SKU">
              <div style={{ display: 'flex', gap: '10px' }}>
                {getValues().skuInfoModels && (
                  // <span css={[marginRightStyle(10)]}>
                  //   현재 등록된 SKU는 <span>{getValues().skuInfoModels?.length}개</span> 입니다.
                  // </span>
                  <span>
                    <Buttons type={'dashed'} name={'기존 SKU 파일 다운로드'} icon={<DownloadOutlined />} onClick={handleOriginDownload} />
                  </span>
                )}

                <Upload accept=".xlsx" maxCount={1} {...uploadProps}>
                  <Buttons type={'danger'} name={'새 SKU 파일 업로드'} icon={<UploadOutlined />} />
                </Upload>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />
        <Collapse defaultActiveKey={['preview']}>
          <Collapse.Panel header={'SKU 보기'} key={'preview'}>
            {productDetail?.skuInfoModels?.length !== 0 && <ProductSkuListTemplate skuList={productDetail?.skuInfoModels} />}
          </Collapse.Panel>
        </Collapse>

        <DividingLine border={false} />

        <CardContainer size={'default'} bordered={false}>
          <RowGrid>
            <ColGrid span={23} css={buttonFlexStartRowStyle}>
              <Buttons
                type={'default'}
                name={'이전'}
                htmlType={'button'}
                css={marginRightStyle(20)}
                onClick={() => router.push('/admin/product/manage')}
              />
            </ColGrid>
            <ColGrid span={1} css={buttonFlexEndRowStyle}>
              <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
            </ColGrid>
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
}

const alignStyle = css`
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;
