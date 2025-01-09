import { Buttons, CardContainer, ColGrid, DividingLine, Inputs, Radios, RowGrid, SelectBox, TextAreas } from '@/components/atom';
import { Descriptions, Upload, Collapse, Modal, InputNumber } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { buttonFlexEndRowStyle, descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useCommonCode from '@/hooks/useCommonCode';
import { errorSnackOpen, successSnackOpen } from '@/store/reducers/snackReducer';
import { cardTitle, handleDownload, transFormRadioValue } from '@/common/utiles';
import { DownloadOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import NoticeLabel from '@/components/atom/Notice';
import { createProductAction } from '@/store/reducers/admin/productReducer';
import { skuUploadApi } from '@/api/admin/productApi';
import ProductSkuListTemplate from '../ProductsTemplate/ProductSkuListTemplate';
import { createProductLenslyAction } from '@/store/reducers/admin/productLenslyReducer';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

export default function ProductManageSalesTemplate({ types }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [skuFileList, setSkuFileList] = useState(null);
  // 공통코드 호출
  const {
    lensCycle,
    lensPowerType,
    storeGroup,
    productGroupBausch,
    productGroupLensly: lenslyProductGroupBausch,
  } = useCommonCodeBatch(['lensCycle', 'lensPowerType', 'storeGroup', 'productGroupBausch', 'productGroupLensly']);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      productPointPriceGroupModels: [
        {
          id: 1,
          storeGroupId: [],
          pointPrice: '',
        },
      ],
    },
  });
  const onSubmit = data => addConfirmHandler(data);
  const onError = errors => handleError(errors);

  const productDivideType = types === 'bausch' ? productGroupBausch : lenslyProductGroupBausch;
  const [powerRetouchType, setPowerRetouchType] = useState([]);
  const [storeGroupType, setStoreGroupType] = useState([]);
  //sku 전송용 데이터
  const [sendSkuData, setSendSkuData] = useState([]);
  // 동적 컴포넌트 관리
  const [purchaseSettings, setPurchaseSettings] = useState([{ id: 1, storeGroupId: [], pointPrice: '' }]);
  // 수정된 부분: 새로운 구매 설정을 추가하는 함수
  const addPurchaseSetting = () => {
    append({ id: purchaseSettings.length + 1, storeGroupId: [], pointPrice: '' });
  };
  // 수정된 부분: 구매 설정을 제거하는 함수
  const removePurchaseSetting = id => {
    if (fields?.length >= 2) {
      remove(id);
    }
  };
  const skuHandler = async file => {
    const formData = new FormData();

    formData.append('skuInfo', file.file);

    const response = await skuUploadApi(formData);
    if (response.status === 200) {
      setSendSkuData(response.data.skuInfoModels);
      dispatch(
        successSnackOpen({
          message: 'SKU 업로드 성공',
          description: 'SKU 파일이 업로드 되었습니다.',
        }),
      );
    } else {
      dispatch(
        errorSnackOpen({
          message: 'SKU 업로드 실패',
          description: 'SKU 파일 정보를 확인 해보세요.',
        }),
      );
    }
  };

  // sku upload
  const uploadProps = {
    onRemove: file => {
      setSkuFileList([]);
      setSendSkuData([]);
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

  // 상세 useState

  const editorRef = useRef(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productPointPriceGroupModels',
  });

  // 등록 confirm
  const addConfirmHandler = data => {
    const { productPointPriceGroupModels } = data;
    if (sendSkuData.length === 0) {
      dispatch(
        errorSnackOpen({
          message: 'SKU 등록이 필요합니다',
        }),
      );
    }
    if (productPointPriceGroupModels.some(item => item?.storeGroupId?.length === 0)) {
      dispatch(
        errorSnackOpen({
          message: '스토어 그룹을 선택해주세요.',
        }),
      );
    }
    if (productPointPriceGroupModels.some(item => !item?.pointPrice)) {
      dispatch(
        errorSnackOpen({
          message: '구매가를 입력해주세요.',
        }),
      );
    }
    if (
      sendSkuData.length > 0 &&
      productPointPriceGroupModels.some(item => item?.storeGroupId?.length > 0) &&
      productPointPriceGroupModels.some(item => item?.pointPrice)
    ) {
      Modal.confirm({
        title: '제품 등록',
        icon: <ExclamationCircleOutlined />,
        content: '등록하시겠습니까?',
        okText: '등록',
        cancelText: '취소',
        onOk: () => handleSendData(data),
      });
    }
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
    } = data;

    const sendGroupData = productDivideType.find(val => val.value === productGroupId).key;

    const sendLensCycle = lensCycle?.find(val => val.value === data.lensCycle).key;

    // 숫자 값을 올바르게 변환
    const numericalProductQuantity = Number(productQuantity);
    const numericalRecommendPrice = recommendPrice ? Number(recommendPrice) : null;
    const numericalFinalPrice = finalPrice ? Number(finalPrice) : null;
    const numericalMinStock = minStock ? Number(minStock) : null;

    fields.forEach((item, index) => {
      if (item.id === null) {
        setValue(`productPointPriceGroupModels[${0}]`, item.productPointPriceGroupModels);
      }
    });

    // 적립제품 설정 리스트
    const listItem = getValues().productPointPriceGroupModels;
    const resultPointGroupModel = listItem.map(item => {
      // storeGroupId가 null인지 확인

      const storeGroupIds =
        item.storeGroupId === ''
          ? null // null일 경우 null로 설정
          : Array.isArray(item.storeGroupId)
          ? item.storeGroupId.map(Number) // 배열일 경우 숫자로 변환
          : [Number(item.storeGroupId)]; // 배열이 아닐 경우 배열로 변환

      return {
        pointPrice: Number(item.pointPrice) ? Number(item.pointPrice) : null,
        storeGroupId: storeGroupIds,
      };
    });

    // 필요한 변수들을 정의
    const sendObjectKey = types === 'bausch' ? 'productBauschReqDto' : 'productLenslyReqDto';

    const sendObject = {
      [sendObjectKey]: {
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
        pointOrderable,
        minStock: numericalMinStock,
        productPointPriceGroupModels: resultPointGroupModel,
      },
      skuInfoModels: sendSkuData,
    };

    if (sendObjectKey === 'productBauschReqDto') {
      dispatch(createProductAction({ sendObject, callback: router }));
    } else {
      dispatch(createProductLenslyAction({ sendObject, callback: router }));
    }
  };

  // 필수값 누락시 에러 모달
  const handleError = errors => {
    console.log(errors);
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
    if (errors?.productQuantity) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '제품 개입을 입력 해주세요.',
        }),
      );
    }
    // 사용주기 누락 에러
    if (errors?.lensCycle) {
      dispatch(
        errorSnackOpen({
          message: '제품 등록 실패',
          description: '사용주기를 입력 해주세요.',
        }),
      );
    }
  };

  useEffect(() => {
    if (lensPowerType && lensPowerType.length > 0) {
      setPowerRetouchType(transFormRadioValue(lensPowerType));
    }
    if (storeGroup && storeGroup.length > 0) {
      setStoreGroupType(transFormRadioValue(storeGroup));
    }
  }, [lensPowerType, storeGroup]);

  // 오더 정보에따른 노출 여부를 위한 변수
  const pointOrderable = watch('pointOrderable');

  useEffect(() => {
    if (types === 'bausch') {
      setValue('channelType', 'BAUSCH');
    }
    if (types === 'lensly') {
      setValue('channelType', 'LENSLY');
    }
  }, [types]);

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={`👉🏼 바슈롬의 판매 제품을 등록하는 페이지입니다. 바슈롬의 새로운 제품을 등록하세요.`} />
      </div>
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer bordered={false}>
          <Descriptions title={'제품 정보'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
            <Descriptions.Item span={2} label="채널⭐️">
              <Controller
                name="channelType"
                control={control}
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
                  return (
                    <Radios
                      options={[
                        { label: 'BAUSCH', value: 'BAUSCH' },
                        { label: 'LENSLY', value: 'LENSLY' },
                      ]}
                      onChange={e => {
                        const value = e.target.value;
                        if (value === 'BAUSCH') {
                          window.location.href = '/admin/product/manage/sub/bausch'; // 페이지 새로 고침
                        } else {
                          window.location.href = '/admin/product/manage/sub/lensly'; // 페이지 새로 고침
                        }
                      }}
                      value={value}
                      {...rest}
                    />
                  );
                }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="제품 그룹⭐️">
              <Controller
                name="productGroupId"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <SelectBox value={value} options={productDivideType} placeholder={'제품 그룹을 선택해주세요'} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="제품명⭐️">
              <Controller
                name="productName"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'제품명을 입력해주세요.'} {...rest} />}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="제품명(영문)⭐️">
              <Controller
                name="productNameEn"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={'제품명(영문)을 입력해주세요.'} {...rest} />
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
                defaultValue={'MYOPIA'}
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
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <SelectBox value={value} options={lensCycle} placeholder={'사용주기를 선택해주세요'} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="단종⭐️">
              <Controller
                name="salesStatus"
                control={control}
                defaultValue={'ACTIVE'}
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
                  <TextAreas defaultValue={''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />

          <Descriptions title="적립제품 설정⭐️" labelStyle={{ width: '250px', height: '64px' }} bordered={true} column={4}>
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
                  defaultValue={0}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <InputNumber
                      placeholder="주문 가능한 최소 재고 수량을 입력해 주세요"
                      min={0} // 최소값 설정
                      style={{ width: '100%' }}
                      value={value}
                      {...rest}
                    />
                  )}
                />
              </Descriptions.Item>
            )}
          </Descriptions>

          <DividingLine border={false} />

          <Descriptions column={1} title="적립제품 구매가 설정⭐️">
            {fields.map((setting, index) => (
              <RowGrid key={setting.id}>
                <ColGrid span={10}>
                  <Controller
                    name={`productPointPriceGroupModels[${index}].storeGroupId`}
                    control={control}
                    render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                      <SelectMultiBox
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="스토어 그룹을 선택해주세요"
                        onChange={value => {
                          onChange(value);
                        }} // 변경 이벤트를 전달
                        value={value}
                        options={storeGroupType}
                        {...rest}
                      />
                    )}
                  />
                </ColGrid>
                <ColGrid span={10}>
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
                  {index === 0 && <Buttons type={'primary'} name={'+'} onClick={addPurchaseSetting} css={marginLeftStyle(5)} />}

                  {index !== 0 && <Buttons type={'danger'} name={'x'} onClick={() => removePurchaseSetting(index)} css={marginLeftStyle(5)} />}
                </ColGrid>
              </RowGrid>
            ))}
          </Descriptions>
          <DividingLine border={false} />

          <Descriptions
            title={cardTitle('SKU 등록⭐️')}
            labelStyle={{ width: '250px' }}
            bordered={true}
            column={4}
            extra={<Buttons type={'solid'} name={'샘플 다운로드'} icon={<DownloadOutlined />} htmlType={'button'} onClick={handleDownload} />}>
            <Descriptions.Item span={2} label="SKU 업로드">
              {/* {pageId !== 'create' && (
              <span css={[marginRightStyle(10), fontSizeStyle]}>
                현재 등록된 SKU는 <span css={skuCountStyle}>{skuInfo?.length}개</span> 입니다.
              </span>
            )} */}

              <div style={{ display: 'flex' }}>
                <Upload accept=".xlsx" maxCount={1} {...uploadProps}>
                  <Buttons type={'dashed'} name={'SKU 파일 업로드'} icon={<UploadOutlined />} />
                </Upload>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />

        {sendSkuData?.length > 0 && (
          <Collapse defaultActiveKey={['preview']}>
            <Collapse.Panel header={'SKU 보기'} key={'preview'}>
              <ProductSkuListTemplate skuList={sendSkuData} />
            </Collapse.Panel>
          </Collapse>
        )}
        <DividingLine border={false} />

        <CardContainer size={'default'} bordered={false}>
          <RowGrid>
            <ColGrid span={24} css={buttonFlexEndRowStyle}>
              <Buttons
                type={'default'}
                name={'취소'}
                htmlType={'button'}
                css={marginRightStyle(5)}
                onClick={() => router.push('/admin/product/manage')}
              />
              <Buttons type={'primary'} name={'등록'} htmlType={'submit'} css={marginLeftStyle(5)} />
            </ColGrid>
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
}
