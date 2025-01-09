import {
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  Form,
  Inputs,
  PreviewEditor,
  Radios,
  RowGrid,
  SelectBox,
  Tables,
  TextAreas,
  UploadEditor,
} from '@/components/atom';
import { Card, Cascader, Checkbox, Col, DatePicker, Descriptions, Input, Modal, Radio, Row, Select, Tag, Tooltip, Upload } from 'antd';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { contentsContainerStyle, descStyle, marginLeftStyle, marginRightStyle, subLabel } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getOpticianListAction, updateOpticianAction } from '@/store/reducers/admin/opticianReducer';
import { storeMaping, transProductOption, transSelectBox } from '@/common/utiles';
import useCommonCode from '@/hooks/useCommonCode';
import { DetailPageTitle, PageTitle, ProductBauschSection, ProductLenslySection } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';
import Image from 'next/image';
import { PlusOutlined } from '@ant-design/icons';
import {
  deleteEditorImageAction,
  getProductInfoListAction,
  productBauschInfoReset,
  productInfoDeleteBauschAction,
  updateProductInfoAction,
  updateProductInfoExposedAction,
  updateProductLenslyInfoAction,
} from '@/store/reducers/admin/productBauschInfoReducer';
import { getProductInfoDetailAction, getProductInfoLenslyDetailAction } from '@/store/reducers/admin/productReducer';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

import { AXIOS_GET } from '@/api/axios/useAxios';

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

const channelOption = [
  { label: 'BAUSCH-APP', value: 'bausch' },
  { label: 'LENSLY', value: 'lensly' },
];

const ProductsInfoDetailTemplate = ({ tabStatus }) => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { query, back, push } = useRouter();

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);

  const [bauschProductOption, setBauschProductOption] = useState([]); //바슈롬 제품드랍
  const [lenslyProductOption, setLenslyProductOption] = useState([]); //렌즐리 제품드랍
  const [lensColorLineOption, setLensColorLineOption] = useState([]); //렌즈 컬러라인 드랍
  const [lensColorOption, setLensColorOption] = useState([]); //렌즈 컬러 드랍
  const [lensDiameterOption, setLensDiameterOption] = useState([]); //직경 드랍
  const [lensPowerTypeOption, setLensPowerTypeOption] = useState([]); //도수구분 드랍
  const [lensCycleOption, setLensCycleOption] = useState([]); //사용구분 드랍
  const [exposedStatusOption, setExposedStatusOption] = useState([]); //노출여부 드랍
  const [tags, setTags] = useState([]); //태그

  // 썸네일 이미지 & 파일
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [thumbnailPreviewOpen, setThumbnailPreviewOpen] = useState(false);
  const [thumbnailPreviewTitle, setThumbnailPreviewTitle] = useState('');
  const [thumbnailPreviewImage, setThumbnailPreviewImage] = useState('');
  // 헤더 이미지 & 파일
  const [headerFileList, setHeaderFileList] = useState([]);
  const [headerPreviewOpen, setHeaderPreviewOpen] = useState(false);
  const [headerPreviewTitle, setHeaderPreviewTitle] = useState('');
  const [headerPreviewImage, setHeaderPreviewImage] = useState('');

  const [editorImages, setEditorImages] = useState([]); //상세 이미지

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

  // 썸내일 미리보기 종료
  const handleClosePreview = type => {
    if (type === 'header') {
      setHeaderPreviewOpen(false);
    } else {
      setThumbnailPreviewOpen(false);
    }
  };

  // 태그 삭제
  const handleDelete = newTags => {
    setTags(newTags);
  };
  // 태그 추가
  const handleAddition = newTag => {
    setTags(prevTags => [...prevTags, newTag]);
  };

  // 상세데이터 호출
  useEffect(() => {
    if (tabStatus === 'bausch') {
      dispatch(getProductInfoDetailAction({ id: query.id, callback: router }));
    }
    if (tabStatus === 'lensly') {
      dispatch(getProductInfoLenslyDetailAction({ id: query.id, callback: router }));
    }
  }, [tabStatus]);

  useEffect(() => {
    if (tabStatus) {
      setValue('channel_type', tabStatus);
    }
  }, [tabStatus]);

  // 상품 상세 데이터 불러오기
  const { basicInfo, imageInfo, tagInfo, priceInfo, usedImages } = useSelector(state => state?.product?.productInfoDetail);

  useEffect(() => {
    if (basicInfo && tabStatus) {
      const {
        channelType, //채널
        productGroupId, //제품 그룹 id
        productId, // 제품 id
        lensPowerType, //도수구분
        lensCycle, //사용구분
        lensColorLine, //컬러라인
        lensColor, //컬러
        lensDiameter, //직경
        lensBaseCurve, //BC 곡률
        lensThickness, //중심두께
        lensWaterContent, //함수율
        eventProductStatus, //EVENT(활성화) // NON_EVENT(비활성화) ->
        lensMaterial, //재질
        lensUnit, //개입
        lensPowerRange, //도수범위
        description, //제품 설명
        exposedStatus, //노출
      } = basicInfo;
      const productData = [productGroupId, productId];
      setValue('productId', productData);
      handleChangeProduct(productData);
      setValue('lensColorLine', lensColorLine);
      setValue('lensColor', lensColor);
      setValue('lensDiameter', lensDiameter);
      setValue('lensBaseCurve', lensBaseCurve);
      setValue('lensThickness', lensThickness);
      setValue('lensWaterContent', lensWaterContent);
      setValue('eventProductStatus', eventProductStatus);
      setValue('lensMaterial', lensMaterial);
      setValue('lensUnit', lensUnit);
      setValue('lensPowerRange', lensPowerRange);
      setValue('description', description);
      setValue('exposedStatus', exposedStatus);
      // console.log(basicInfo, 'basicInfo');
    }
    if (tagInfo && tabStatus) {
      const { newProductStatus, productApprovalNumber, productOptions } = tagInfo;
      setValue('newProductStatus', newProductStatus);
      setValue('productApprovalNumber', productApprovalNumber);
      const tagsArr = productOptions.map(item => item.productOptionName);
      setTags(tagsArr);
      // console.log(tagInfo, 'tagInfo');
    }
    if (priceInfo && tabStatus) {
      const {
        recommendPrice, //권장소비자가
        memberDiscountRate, //회원 할인율
        finalPrice, //최종 판매가 (customer_price)
        opticianSupplyRate, //안경원 공급단가율
        opticianSupplyPrice, //안경원 공급단가 (store_price)
        discountStatus, //
        opticianSupplyStatus, //
      } = priceInfo;
      setValue('recommendPrice', recommendPrice);
      setValue('memberDiscountRate', memberDiscountRate);
      setValue('opticianSupplyRate', opticianSupplyRate);

      // console.log(priceInfo, 'priceInfo');
    }
    if (imageInfo && tabStatus) {
      const { thumbImgUrl, headerImgUrl, lensImgUrl, detailDescription } = imageInfo;
      const thumbFile = [
        {
          status: 'done',
          url: thumbImgUrl,
        },
      ];
      const headerFile = [
        {
          status: 'done',
          url: headerImgUrl ? headerImgUrl : lensImgUrl,
        },
      ];
      setThumbnailFileList(thumbFile);
      setHeaderFileList(headerFile);
      setValue('detailDescription', detailDescription);

      // console.log(imageInfo, 'imageInfo');
    }
    if (usedImages && tabStatus) {
      setEditorImages(usedImages);
    }
  }, [basicInfo, tabStatus]);

  // 공통코드 호출
  const { productBauschDrop, productLenslyDrop, lensColorLine, lensColor, lensDiameter, lensPowerType, lensCycle, exposedStatus } =
    useCommonCodeBatch([
      'productBauschDrop',
      'productLenslyDrop',
      'lensColorLine',
      'lensColor',
      'lensDiameter',
      'lensPowerType',
      'lensCycle',
      'exposedStatus',
    ]);

  // 드랍 정보 넣기
  useEffect(() => {
    if (productBauschDrop) {
      const options = transProductOption(productBauschDrop);
      setBauschProductOption(options);
    }
    if (productLenslyDrop) {
      const options = transProductOption(productLenslyDrop);
      setLenslyProductOption(options);
    }
    if (lensColorLine) {
      const options = transSelectBox(lensColorLine);
      setLensColorLineOption(options);
    }
    if (lensColor) {
      const options = transSelectBox(lensColor);
      setLensColorOption(options);
    }
    if (lensDiameter) {
      const options = transSelectBox(lensDiameter);
      setLensDiameterOption(options);
    }
    if (lensPowerType) {
      const options = transSelectBox(lensPowerType);
      setLensPowerTypeOption(options);
    }
    if (lensCycle) {
      const options = transSelectBox(lensCycle);
      setLensCycleOption(options);
    }
    if (exposedStatus) {
      const options = transSelectBox(exposedStatus);
      setExposedStatusOption(options);
    }
  }, [productBauschDrop]);

  // 제품선택 API 호출
  const handleChangeProduct = async data => {
    const productId = data[1];
    try {
      const response = await AXIOS_GET(`/product-${tabStatus}/info/diopter-cycle?id=${productId}`);
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

  // 상세 수정
  const handleSendData = data => {
    if (thumbnailFileList.length === 0 || headerFileList.length === 0) {
      alert('썸네일,헤더 이미지를 확인해주세요');
    } else {
      const {
        channel_type,
        productId,
        lensPowerType,
        lensCycle,
        lensColorLine,
        lensColor,
        lensDiameter,
        lensBaseCurve,
        lensThickness,
        lensWaterContent,
        eventProductStatus,
        lensMaterial,
        lensUnit,
        lensPowerRange,
        description,
        exposedStatus,
        productApprovalNumber,
        newProductStatus,
        detailDescription,
        recommendPrice,
        memberDiscountRate,
        opticianSupplyRate,
      } = data;

      const discountStatus = 'DISCOUNT_ENABLED'; //사라진 옵션 (하드코딩 처리)
      const opticianSupplyStatus = 'OPTICIAN_SUPPLY_ENABLED'; //사라진 옵션 (하드코딩 처리)

      const { thumbImgUrl, headerImgUrl, lensImgUrl } = imageInfo;
      const productOptions = tags.map(tag => ({ productOptionName: tag }));

      const updateBasicInfo = {
        productId: productId[1],
        lensPowerType,
        lensCycle,
        lensColorLine,
        lensColor,
        lensDiameter,
        lensBaseCurve,
        lensThickness,
        lensWaterContent,
        eventProductStatus,
        lensMaterial,
        lensUnit,
        lensPowerRange,
        description,
        exposedStatus,
      };

      // 이미지 삭제하거나 없는 경우 : []
      // 수정 안한 경우 : [undefined]
      // 새로 이미지 등록/교체한 경우 : 파일
      let thumbFile = thumbnailFileList.map(file => file.originFileObj);
      let headFile = headerFileList.map(file => file.originFileObj);

      const files = {
        thumbFile,
        headFile,
      };

      // 문자열에서 모든 이미지 URL을 추출
      const regex = /<img[^>]*src="([^"]*)"/g;
      let matches;
      const extractedUrls = [];

      // 정규 표현식으로 이미지 URL 추출
      while ((matches = regex.exec(detailDescription)) !== null) {
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
        const unmatchedParams = `?` + unmatchedImageIds.map(id => `ids=${id}`).join('&');
        dispatch(deleteEditorImageAction({ params: unmatchedParams, tabStatus }));
      }

      // 바슈앱
      if (tabStatus === 'bausch') {
        const productImageInfo = {
          thumbImgUrl,
          headerImgUrl,
          detailDescription,
          usedImageIds: filteredImageIds,
        };
        const jsonData = {
          updateBasicInfo,
          productImageInfo,
          productTagInfo: {
            productOptions,
            productApprovalNumber,
            newProductStatus,
          },
        };

        dispatch(updateProductInfoAction({ sendObject: { data: jsonData, files }, callback: router, id: query.id }));
      }
      // 렌즐리
      else {
        const productImageInfo = {
          thumbImgUrl,
          lensImgUrl,
          detailDescription,
          usedImageIds: filteredImageIds,
        };
        // 데이터 정제
        const jsonData = {
          updateBasicInfo,
          productImageInfo,
          productPriceInfo: {
            recommendPrice, // 권장 소비자가
            discountStatus,
            memberDiscountRate, // 회원 할인율
            opticianSupplyStatus,
            opticianSupplyRate, // 안경원 공급 단가율
          },
        };
        console.log(jsonData, 'jsonData!!!');
        dispatch(updateProductLenslyInfoAction({ sendObject: { data: jsonData, files }, callback: router, id: query.id }));
      }
    }
  };
  // 에디터 이미지 관리하기
  const handleEditorImages = newImage => {
    setEditorImages(prevState => [...prevState, newImage]);
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 BAUSCH APP, LENSLY 채널의 상품 상세 페이지입니다. 상품 페이지를 확인 및 수정할 수 있습니다.'} />
      </div>
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          {/* 채널 및 제품 선택 */}
          <Descriptions title="채널 및 제품 선택" bordered={true} column={4} labelStyle={{ width: '250px' }} contentStyle={{ width: '250px' }}>
            <Descriptions.Item span={2} label="채널 선택 ⭐️">
              <Controller
                name="channel_type"
                control={control}
                disabled
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Radio.Group
                    options={channelOption}
                    value={value}
                    onChange={e => {
                      onChange(e);
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
                render={({ field: { ref, onChange, value, ...rest }, fieldState }) => (
                  <Cascader
                    value={value}
                    options={tabStatus === 'bausch' ? bauschProductOption : lenslyProductOption}
                    placeholder={'선택해주세요'}
                    onChange={e => {
                      onChange(e);
                      handleChangeProduct(e); // 원하는 핸들러 호출
                    }}
                    {...rest}
                  />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />

          {/* 상세 정보 */}
          <Descriptions title="상세 정보" bordered={true} column={4} labelStyle={{ width: '250px' }}>
            <Descriptions.Item span={2} label="도수구분">
              <Controller
                name="lensPowerType"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox isDisabled options={lensPowerTypeOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="사용구분">
              <Controller
                name="lensCycle"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox isDisabled options={lensCycleOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="컬러라인">
              <Controller
                name="lensColorLine"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={lensColorLineOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="컬러">
              <Controller
                name="lensColor"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={lensColorOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="직경">
              <Controller
                name="lensDiameter"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={lensDiameterOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="BC(곡률)">
              <Controller
                name="lensBaseCurve"
                control={control}
                defaultValue={basicInfo?.lensBaseCurve}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="중심두께">
              <Controller
                name="lensThickness"
                control={control}
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
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'재질을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="개입">
              <Controller
                name="lensUnit"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="도수범위">
              <Controller
                name="lensPowerRange"
                control={control}
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
                  <TextAreas defaultValue={''} value={value || ''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />

          {/* 이미지 등록 */}
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
                  {tabStatus === 'bausch' ? (
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
            <Descriptions.Item span={2} label="제품 상세 내용">
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
                      apiUrl={tabStatus === 'bausch' ? `/product-bausch/info/image` : `/product-lensly/info/image`}
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

          {/* 태그 상세 정보 (바슈롬)) */}
          {tabStatus === 'bausch' && (
            <ProductBauschSection tags={tags} handleDelete={handleDelete} handleAddition={handleAddition} control={control} />
          )}

          {tabStatus === 'lensly' && (
            <FormProvider {...{ handleSubmit, control, getValues, setValue, watch, reset, errors }}>
              <ProductLenslySection control={control} />
            </FormProvider>
          )}
          <DividingLine border={false} />

          <Descriptions title="노출 여부" bordered={true} column={4} labelStyle={{ width: '250px' }}>
            <Descriptions.Item span={4} label="노출 여부 ⭐️">
              <Controller
                name="exposedStatus"
                control={control}
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Radio.Group options={exposedStatusOption} onChange={e => onChange(e)} value={value} {...rest} />
                )}
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
              <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
            </ColGrid>
          </RowGrid>
        </CardContainer>
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
