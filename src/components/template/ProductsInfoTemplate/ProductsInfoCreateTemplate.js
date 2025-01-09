import {
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  Editor,
  Form,
  Inputs,
  Radios,
  RowGrid,
  SelectBox,
  Tables,
  TextAreas,
  UploadEditor,
} from '@/components/atom';
import { Card, Cascader, Checkbox, Col, DatePicker, Descriptions, Input, Modal, Radio, Row, Select, Tag, Tooltip, Upload } from 'antd';
import { Controller, FormProvider, set, useForm, useWatch } from 'react-hook-form';
import { contentsContainerStyle, descStyle, marginLeftStyle, marginRightStyle, subLabel } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getOpticianListAction, updateOpticianAction } from '@/store/reducers/admin/opticianReducer';
import { storeMaping } from '@/common/utiles';
import useCommonCode from '@/hooks/useCommonCode';
import { DetailPageTitle, PageTitle, ProductBauschSection, ProductLenslySection } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';
import Image from 'next/image';
import { PlusOutlined } from '@ant-design/icons';
import { createProductInfoAction, createProductLenslyInfoAction, deleteEditorImageAction } from '@/store/reducers/admin/productBauschInfoReducer';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import { AXIOS_GET } from '@/api/axios/useAxios';
import { resetFaqAction } from '@/store/reducers/admin/faqReducer';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { errorSnackOpen } from '@/store/reducers/snackReducer';

const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}>
      Upload
    </div>
  </div>
);

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const ProductsInfoDetailTemplate = () => {
  // 제품 그룹 정제 데이터
  const [optionGroupLists, setOptionGroupLists] = useState([]);
  const [optionLenslyGroupLists, setOptionLenslyGroupLists] = useState([]);
  const [currentOptions, setCurrentOptions] = useState(optionGroupLists);
  const [editorImages, setEditorImages] = useState([]); //상세 이미지

  // 공통코드 호출
  const { lensColorLine, lensColor, lensDiameter, productBauschDrop, productLenslyDrop } = useCommonCodeBatch([
    'lensColorLine',
    'lensColor',
    'lensDiameter',
    'productBauschDrop',
    'productLenslyDrop',
  ]);
  const couponBauschProductOptionGroup = productBauschDrop;
  const couponProductLenslyOptionGroup = productLenslyDrop;

  // baucsh 판매 제품 옵션 정제
  useEffect(() => {
    if (couponBauschProductOptionGroup) {
      const options = couponBauschProductOptionGroup.map(group => ({
        key: 'BAUSCH_APP',
        label: group.productGroupName,
        value: `group_${group.productGroupId}`,
        originValue: group.productGroupId,
        children: group.dropProductInfoList.map(product => ({
          label: product.productName,
          value: product.productId,
        })),
      }));
      setOptionGroupLists(options);
    }
  }, [couponBauschProductOptionGroup]);

  // lensly 판매제품 공통 코드 옵션 정제
  useEffect(() => {
    if (couponProductLenslyOptionGroup) {
      const optionLenslyProduct = couponProductLenslyOptionGroup.map(group => ({
        key: 'LENSLY',
        label: group.productGroupName,
        value: `group_${group.productGroupId}`,
        originValue: group.productGroupId,
        children: group.dropProductInfoList.map(product => ({
          label: product.productName,
          value: product.productId,
        })),
      }));
      setOptionLenslyGroupLists(optionLenslyProduct);
    }
  }, [couponProductLenslyOptionGroup]);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = err => handleError(err);

  const handleError = err => {
    console.log(err);
    const { productId, description, recommendPrice } = errors;
    if (productId) {
      dispatch(
        errorSnackOpen({
          description: '판매제품을 선택하세요',
        }),
      );
    }
    if (description) {
      dispatch(
        errorSnackOpen({
          description: '제품 설명을 입력해주세요',
        }),
      );
    }
    if (recommendPrice) {
      dispatch(
        errorSnackOpen({
          description: '권장 소비자가를 입력해주세요',
        }),
      );
    }
  };

  const channelType = useWatch({
    control,
    name: 'channelType',
    defaultValue: 'BAUSCH_APP', // 초기값 설정
  });
  const dispatch = useDispatch();
  const { opticianDetail } = useSelector(state => state?.optician);
  const storeGroupOptions = opticianDetail?.fsSaleItem?.split(',') || [];
  const defaultStoreGroup = storeGroupOptions.shift();
  const { opticianList, paging } = useSelector(state => state.optician);

  // 썸네일 이미지 & 파일
  const [thumbnailPreviewOpen, setThumbnailPreviewOpen] = useState(false);
  const [thumbnailPreviewImage, setThumbnailPreviewImage] = useState('');
  const [thumbnailPreviewTitle, setThumbnailPreviewTitle] = useState('');
  const [thumbnailFileList, setThumbnailFileList] = useState([]);

  // 헤더 이미지 & 파일
  const [headerPreviewOpen, setHeaderPreviewOpen] = useState(false);
  const [headerPreviewImage, setHeaderPreviewImage] = useState('');
  const [headerPreviewTitle, setHeaderPreviewTitle] = useState('');
  const [headerFileList, setHeaderFileList] = useState([]);
  const [tags, setTags] = useState([]);
  const [radioValue, setRadioValue] = useState(''); // 초기값 설정

  const handleDelete = newTags => {
    setTags(newTags); // 상태 업데이트
  };

  const handleAddition = newTag => {
    setTags(prevTags => [...prevTags, newTag]);
  };
  const router = useRouter();

  const { query, back, push } = useRouter();

  // 제품선택 API 호출
  const handleChangeProduct = async data => {
    const productId = data[1];
    try {
      const response = await AXIOS_GET(`/product-bausch/info/diopter-cycle?id=${productId}`);
      const { status, data } = response;
      if (status === 200) {
        const lensCycle = data?.lensCycle;
        const lensPowerType = data?.lensPowerType;
        setValue('lensCycle', lensCycle);
        setValue('lensPowerType', lensPowerType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddData = () => {
    const values = getValues();
    handleSendData(values);
  };

  // 등록하기
  const handleSendData = data => {
    if (thumbnailFileList.length === 0) {
      dispatch(
        errorSnackOpen({
          description: '썸네일 이미지를 선택하세요',
        }),
      );
    }
    if (headerFileList.length === 0) {
      dispatch(
        errorSnackOpen({
          description: '헤더 이미지를 선택하세요',
        }),
      );
    }

    if (thumbnailFileList.length === 0 || headerFileList.length === 0) {
      return;
    }
    // 직경
    const selectedLensDiameter = lensDiameter?.find(option => option.value.trim().toLowerCase() === data.lensDiameter.trim().toLowerCase());
    const lensDiameterKey = selectedLensDiameter ? selectedLensDiameter.key : null;

    // 컬러라인
    const selectedLensColorLine = lensColorLine?.find(option => option.value.trim().toLowerCase() === data.lensColorLine.trim().toLowerCase());
    const lensColorLineKey = selectedLensColorLine ? selectedLensColorLine.key : null;

    // 컬러
    const selectedLensColor = lensColor?.find(option => option.value.trim().toLowerCase() === data.lensColor.trim().toLowerCase());
    const lensColorKey = selectedLensColor ? selectedLensColor.key : null;

    // 문자열에서 모든 이미지 URL을 추출
    const regex = /<img[^>]*src="([^"]*)"/g;
    let matches;
    const extractedUrls = [];

    // 정규 표현식으로 이미지 URL 추출
    while ((matches = regex.exec(data.detailDescription)) !== null) {
      extractedUrls.push(matches[1]);
    }

    // 일치하는 이미지들
    const filteredImages = editorImages.filter(image => extractedUrls.includes(image.imgUrl));
    const filteredImageIds = filteredImages.map(item => item.id);

    // 일치하지 않는 이미지들
    const unmatchedImages = editorImages.filter(image => !extractedUrls.includes(image.imgUrl));
    const unmatchedImageIds = unmatchedImages.map(item => item.id);
    if (unmatchedImageIds.length > 0) {
      // ?ids=1&ids=43 형식으로 만들기
      const tabStatus = channelType === 'BAUSCH_APP' ? 'bausch' : 'lensly';
      const unmatchedParams = `?` + unmatchedImageIds.map(id => `ids=${id}`).join('&');
      dispatch(deleteEditorImageAction({ params: unmatchedParams, tabStatus }));
    }

    // 공통 데이터 정제
    const commonData = {
      channelType: data.channelType,
      productId: data.productId[1],
      lensPowerType: data.lensPowerType,
      lensCycle: data.lensCycle,
      lensColorLine: lensColorLineKey,
      lensColor: lensColorKey,
      lensDiameter: lensDiameterKey,
      lensBaseCurve: data.lensBaseCurve,
      lensThickness: data.lensThickness,
      lensWaterContent: data.lensWaterContent,
      eventProductStatus: data.eventProductStatus,
      lensMaterial: data.lensMaterial,
      lensUnit: data.lensUnit,
      lensPowerRange: data.lensPowerRange,
      description: data.description,
      exposedStatus: data.exposedStatus,
    };

    if (channelType === 'BAUSCH_APP') {
      const productOptions = tags.map(tag => ({ productOptionName: tag }));

      // 데이터 정제
      const jsonData = {
        basicInfo: commonData,
        imageInfo: {
          headerImgUrl: null,
          thumbImgUrl: null,
          detailDescription: data.detailDescription,
          usedImageIds: filteredImageIds,
        },
        tagInfo: {
          productOptions: productOptions, // 태그 값 적용
          productApprovalNumber: data.productApprovalNumber,
          newProductStatus: data.newProductStatus,
        },
      };
      const thumbFile = thumbnailFileList.length > 0 ? thumbnailFileList[0].originFileObj : null;
      const headFile = headerFileList.length > 0 ? headerFileList[0].originFileObj : null;
      const files = [];
      if (thumbFile) files.push(thumbFile);
      if (headFile) files.push(headFile);
      console.log(jsonData, 'jsonData');

      dispatch(createProductInfoAction({ sendObject: { data: jsonData, files }, callback: router }));
    } else {
      // 데이터 정제
      const jsonData = {
        basicInfo: commonData,
        imageInfo: {
          headerImgUrl: null,
          thumbImgUrl: null,
          detailDescription: data.detailDescription,
          usedImageIds: filteredImageIds,
        },
        priceInfo: {
          recommendPrice: data?.recommendPrice, // 권장 소비자가
          discountStatus: 'DISCOUNT_ENABLED',
          memberDiscountRate: data?.memberDiscountRate, // 회원 할인율
          opticianSupplyStatus: 'OPTICIAN_SUPPLY_ENABLED',
          opticianSupplyRate: data?.opticianSupplyRate, // 안경원 공급 단가율
        },
      };
      const thumbFile = thumbnailFileList.length > 0 ? thumbnailFileList[0].originFileObj : null;
      const headFile = headerFileList.length > 0 ? headerFileList[0].originFileObj : null;
      const files = [];
      if (thumbFile) files.push(thumbFile);
      if (headFile) files.push(headFile);
      console.log(jsonData, 'jsonData');
      dispatch(createProductLenslyInfoAction({ sendObject: { data: jsonData, files }, callback: router }));
    }
  };

  // 썸내일 미리보기 종료
  const handleClosePreview = type => {
    if (type === 'header') {
      setHeaderPreviewOpen(false);
    } else {
      setThumbnailPreviewOpen(false);
    }
  };

  // 썸네일 미리보기
  const handlePreview = async (file, type) => {
    if (type === 'thumbnail') {
      setThumbnailPreviewImage(file.url || file.thumbUrl); // 썸네일 이미지 URL 설정
      setThumbnailPreviewTitle(file.name); // 썸네일 파일 이름 업데이트
      setThumbnailPreviewOpen(true); // 썸네일 미리보기 Modal 열기
    } else if (type === 'header') {
      setHeaderPreviewImage(file.url || file.thumbUrl); // 헤더 이미지 URL 설정
      setHeaderPreviewTitle(file.name); // 헤더 파일 이름 업데이트
      setHeaderPreviewOpen(true); // 헤더 미리보기 Modal 열기
    }
  };

  // 이미지 등록
  const handleUpload = (fileList, type) => {
    if (type === 'thumbnail') {
      setThumbnailFileList(fileList.fileList); // 썸네일 파일 리스트 업데이트
    } else if (type === 'header') {
      setHeaderFileList(fileList.fileList); // 헤더 파일 리스트 업데이트
    }
  };

  // BAUSCH-APP 라디오 버튼 선택 시 포커스 이동 방지
  const typeHandler = e => {
    setValue('channelType', e.target.value);
    // 여기서 태그 입력 부분으로 포커스 이동하는 로직을 제거
  };

  const handleRadioChange = e => {
    const newValue = e.target.value;
    setRadioValue(newValue); // radioValue 업데이트
    setValue('channelType', newValue); // channel_type 업데이트

    const tabStatus = newValue === 'BAUSCH_APP' ? 'lensly' : 'bausch';

    // 이전 이미지들 삭제
    const unmatchedImageIds = editorImages.map(item => item.id);
    if (unmatchedImageIds.length > 0) {
      // ?ids=1&ids=43 형식으로 만들기
      const unmatchedParams = `?` + unmatchedImageIds.map(id => `ids=${id}`).join('&');
      dispatch(deleteEditorImageAction({ params: unmatchedParams, tabStatus }));
      console.log(unmatchedParams, 'unmatchedParams!!!!!!!!!!!');
    }
    setEditorImages([]);
  };

  // Radio 그룹에만 초기값 설정 로직 적용
  useEffect(() => {
    if (radioValue === '') {
      const initialValue = 'BAUSCH_APP';
      setRadioValue(initialValue); // 초기값 설정
      setValue('channelType', initialValue); // channel_type 업데이트
      if (typeof onChange === 'function') {
        onChange({ target: { value: initialValue } }); // 부모 컴포넌트에 값 전달
      }
    }
  }, []);

  useEffect(() => {
    if (channelType === 'BAUSCH_APP') {
      setCurrentOptions(optionGroupLists);
    } else if (channelType === 'LENSLY') {
      setCurrentOptions(optionLenslyGroupLists);
    }
  }, [channelType, optionGroupLists, optionLenslyGroupLists]);

  useEffect(() => {
    setTags([]);
    reset({
      channelType: channelType, // 현재 선택된 channel_type 유지
      tags: [], // 태그 초기화
      // 다른 필드들을 필요한 기본값으로 초기화
    });
    // 상태 초기화
    setThumbnailFileList([]); // 썸네일 파일 리스트 초기화
    setThumbnailPreviewOpen(false); // 썸네일 미리보기 상태 초기화
    setThumbnailPreviewImage(''); // 썸네일 미리보기 이미지 초기화
    setThumbnailPreviewTitle(''); // 썸네일 미리보기 제목 초기화

    setHeaderFileList([]); // 헤더 파일 리스트 초기화
    setHeaderPreviewOpen(false); // 헤더 미리보기 상태 초기화
    setHeaderPreviewImage(''); // 헤더 미리보기 이미지 초기화
    setHeaderPreviewTitle(''); // 헤더 미리보기 제목 초기화

    setValue('detailDescription', '');
  }, [channelType, reset]);

  // 에디터 이미지 관리하기
  const handleEditorImages = newImage => {
    setEditorImages(prevState => [...prevState, newImage]);
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 BAUSCH APP, LENSLY 채널의 상품 페이지를 관리하는 페이지입니다. 채널별 상품 정보를 등록할 수 있습니다.'} />
      </div>
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          <Descriptions title="채널 및 제품 선택" bordered={true} column={4} labelStyle={{ width: '250px' }}>
            <Descriptions.Item span={2} label="채널 선택 ⭐️">
              <Controller
                name="channelType"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Radio.Group
                    options={[
                      { label: 'BAUSCH-APP', value: 'BAUSCH_APP' },
                      { label: 'LENSLY', value: 'LENSLY' },
                    ]}
                    value={radioValue}
                    onChange={e => {
                      handleRadioChange(e); // 라디오 값 변경 처리
                      if (typeof onChange === 'function') {
                        onChange(e); // 부모 컴포넌트에 값 전달
                      }
                      typeHandler(e); // 다른 로직 처리
                    }}
                    {...rest}
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="제품 선택 ⭐️">
              <Controller
                name="productId"
                control={control}
                defaultValue={[]}
                render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                  <Cascader
                    style={{ width: '100%' }}
                    name="productId"
                    control={control}
                    placeholder={'판매 제품을 선택하세요.'}
                    options={currentOptions}
                    value={value}
                    // multiple={false}
                    onChange={e => {
                      onChange(e);
                      handleChangeProduct(e); // 원하는 핸들러 호출
                    }}
                    {...rest}
                    defaultValue=""
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          <Descriptions column={4} title="상세 정보" bordered={true}>
            <Descriptions.Item span={2} label="도수구분">
              <Controller
                name="lensPowerType"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Inputs type="text" value={value || null} {...rest} disabled={true} />;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="사용구분">
              <Controller
                name="lensCycle"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" value={value || null} {...rest} disabled={true} />}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="컬러라인">
              <Controller
                name="lensColorLine"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={lensColorLine} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="컬러">
              <Controller
                name="lensColor"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={lensColor} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="직경">
              <Controller
                name="lensDiameter"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={lensDiameter} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="BC(곡률)">
              <Controller
                name="lensBaseCurve"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="중심두께">
              <Controller
                name="lensThickness"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'중심 두께를 입력해주세요..'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="함수율">
              <Controller
                name="lensWaterContent"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={'함수율을 입력해주세요.'} {...rest} value={value || null} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="이벤트 제품">
              <Controller
                name="eventProductStatus"
                control={control}
                defaultValue="NON_EVENT"
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Checkbox
                    checked={value === 'EVENT'} // 체크 상태가 'EVENT'일 때만 체크됨
                    onChange={e => {
                      onChange(e.target.checked ? 'EVENT' : 'NON_EVENT'); // 체크 여부에 따라 'EVENT' 또는 'NON_EVENT'로 설정
                    }}
                    {...rest}>
                    이벤트 상품 등록
                  </Checkbox>
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="재질">
              <Controller
                name="lensMaterial"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'재질을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="개입">
              <Controller
                name="lensUnit"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="도수범위">
              <Controller
                name="lensPowerRange"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={4} label="제품 설명 ⭐️">
              <Controller
                name="description"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  // <TextAreas defaultValue={productInquiryDetail?.qa_answer || ''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                  <TextAreas defaultValue={''} value={value || ''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          <Descriptions title="이미지 등록" bordered={true} column={4} labelStyle={{ width: '250px' }}>
            {/* 썸네일 이미지 등록 영역 */}
            <Descriptions.Item
              span={4}
              label={
                <div>
                  썸네일 이미지 ⭐️<div css={subLabel}>이미지사이즈 244x244</div>
                </div>
              }>
              <>
                <Upload
                  listType="picture-card"
                  fileList={thumbnailFileList}
                  onPreview={file => handlePreview(file, 'thumbnail')}
                  onChange={fileList => handleUpload(fileList, 'thumbnail')}
                  beforeUpload={() => false}>
                  {thumbnailFileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  width={800}
                  centered={true}
                  open={thumbnailPreviewOpen}
                  title={thumbnailPreviewTitle}
                  footer={null}
                  onCancel={() => handleClosePreview('thumbnail')}
                  style={{ position: 'relative' }}>
                  <Image
                    src={thumbnailPreviewImage}
                    width={1000}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                    alt={'thumbnailPreviewImage'}
                    layout="responsive"
                  />
                </Modal>
              </>
            </Descriptions.Item>

            {/* 헤더 이미지 등록 영역 */}
            <Descriptions.Item
              span={4}
              label={
                <>
                  {channelType === 'BAUSCH_APP' ? (
                    <div>
                      헤더 이미지 ⭐️<div css={subLabel}>이미지사이즈 440x260</div>
                    </div>
                  ) : (
                    <div>
                      렌즈 이미지 ⭐️<div css={subLabel}>이미지사이즈 40x40</div>
                    </div>
                  )}
                </>
              }>
              <>
                <Upload
                  listType="picture-card"
                  fileList={headerFileList}
                  onPreview={file => handlePreview(file, 'header')}
                  onChange={fileList => handleUpload(fileList, 'header')}
                  beforeUpload={() => false}>
                  {headerFileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  width={800}
                  centered={true}
                  open={headerPreviewOpen}
                  title={headerPreviewTitle}
                  footer={null}
                  onCancel={() => handleClosePreview('header')}
                  style={{ position: 'relative' }}>
                  <Image
                    src={headerPreviewImage}
                    width={1000}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                    alt={'headerPreviewImage'}
                    layout="responsive"
                  />
                </Modal>
              </>
            </Descriptions.Item>

            {/* 제품 상세 내용 */}
            <Descriptions.Item span={4} label="제품 상세 내용">
              <Controller
                name="detailDescription"
                control={control}
                render={({ field: { ref, value, onChange, ...rest } }) => {
                  return (
                    <UploadEditor
                      border={false}
                      value={value || ''}
                      onChange={content => {
                        onChange(content); // Quill 에디터의 값 업데이트
                      }}
                      apiUrl={channelType === 'BAUSCH_APP' ? `/product-bausch/info/image` : `/product-lensly/info/image`}
                      isError={errors?.content}
                      handleEditorImages={handleEditorImages}
                      customHeight={'800px'}
                    />
                  );
                }}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          {/* 여기 아래부터는 채널 값에 따른 렌더 다르게 */}

          {channelType === 'BAUSCH_APP' && (
            <ProductBauschSection tags={tags} handleDelete={handleDelete} handleAddition={handleAddition} control={control} />
          )}
          <FormProvider {...{ handleSubmit, control, getValues, setValue, watch, reset }}>
            {channelType === 'LENSLY' && <ProductLenslySection control={control} />}
          </FormProvider>
          <DividingLine border={false} />

          <Descriptions column={4} title="노출 여부" bordered={true}>
            <Descriptions.Item span={4} label="노출 여부 ⭐️">
              <Controller
                name="exposedStatus"
                control={control}
                defaultValue="EXPOSED"
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Radio.Group
                    options={[
                      { label: '노출', value: 'EXPOSED' },
                      { label: '비노출', value: 'HIDDEN' },
                    ]}
                    onChange={target => console.log(target)}
                    value={value || 'N'}
                    {...rest}
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />

        <CardContainer>
          <RowGrid>
            <ColGrid span={24} css={buttonRowStyle}>
              <Buttons
                type={'default'}
                name={'이전'}
                htmlType={'button'}
                onClick={() => router.push('/admin/product/page-manage')}
                css={marginRightStyle(5)}
              />
              <Buttons type={'primary'} name={'등록하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
            </ColGrid>
          </RowGrid>
        </CardContainer>
        {/*</CardContainer>*/}
      </Form>
    </>
  );
};

export default ProductsInfoDetailTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
