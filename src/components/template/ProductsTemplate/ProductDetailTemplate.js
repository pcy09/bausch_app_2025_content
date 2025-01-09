import { flexCenterStyle, marginTopStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { ColGrid, DividingLine, RowGrid } from '@/components/atom';
import { Button, Card, Steps } from 'antd';
import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { SaveOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  deleteProductImagesAction,
  getProductDetailAction,
  sendNextStepAction,
  updateLensImageListAction,
  updateThumbnailImageListAction,
  uploadSkuAction,
  upsertProductBasicInfoAction,
  upsertProductDetailInfoAction,
  upsertProductImagesInfoAction,
  upsertProductPriceInfoAction,
} from '@/store/reducers/admin/productReducer';
import {
  ProductBasicInfoSection,
  ProductDetailInfoSection,
  ProductImageUploadSection,
  ProductPriceSection,
  ProductSkuUploadSection,
} from '@/components/molecules';
import { put } from '@redux-saga/core/effects';
import { openDrawer } from '@/store/reducers/modalReducer';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
const ProductDetailTemplate = () => {
  const dispatch = useDispatch();
  // 제품 상세 데이터
  const productDetailData = useSelector(state => state.product.productDetail);
  const { usingImage, thumbnailImageList, lensImageList } = useSelector(state => state.product);
  // SKU 데이터
  const skuInfo = useSelector(state => state.product.skuInfo);

  const router = useRouter();

  // sku 엑셀 파일
  const [skuFileList, setSkuFileList] = useState([]);

  // 썸네일 파일
  const [thumbnailPreviewOpen, setThumbnailPreviewOpen] = useState(false);
  const [thumbnailPreviewImage, setThumbnailPreviewImage] = useState('');
  const [thumbnailPreviewTitle, setThumbnailPreviewTitle] = useState('');
  const [thumbnailFileList, setThumbnailFileList] = useState([]);

  // 렌즈 이미지
  const [lensPreviewOpen, setLensPreviewOpen] = useState(false);
  const [lensPreviewImage, setLensPreviewImage] = useState('');
  const [lensPreviewTitle, setLensPreviewTitle] = useState('');
  const [lensFileList, setLensFileList] = useState([]);

  // 현재 단계
  const [currentStep, setCurrentStep] = useState(null);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleRegisterProduct(data);
  const onError = errors => console.log('fail', errors);
  // 썸내일 미리보기 종료
  const handleClosePreview = type => {
    if (type === 'lens') {
      setLensPreviewOpen(false);
    } else {
      setThumbnailPreviewOpen(false);
    }
  };
  // 썸네일 미리보기
  const handlePreview = async (file, type) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    if (type === 'lens') {
      setLensPreviewImage(file.url || file.preview);
      setLensPreviewOpen(true);
      setLensPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    } else {
      setThumbnailPreviewImage(file.url || file.preview);
      setThumbnailPreviewOpen(true);
      setThumbnailPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    }
  };

  // 이미지 등록
  const handleUpload = ({ fileList: newFileList }, type) => {
    const id = router?.query?.id;
    const formData = new FormData();
    if (type === 'lens') {
      if (newFileList.length > 0) {
        newFileList?.forEach(image => formData.append('lensImage', image.originFileObj));
        formData.append('type', 'lens');
        dispatch(upsertProductImagesInfoAction({ id, sendObject: formData, type: 'lens' }));
      }
    } else {
      // 추가된 이미지만 filter
      const thumbnailFile = newFileList.filter(file => file.originFileObj);
      if (thumbnailFile.length > 0) {
        thumbnailFile?.forEach(image => formData.append('thumbnail', image.originFileObj));
        formData.append('type', 'thumbnail');
        dispatch(upsertProductImagesInfoAction({ id, sendObject: formData, type: 'thumbnail' }));
      }
    }
  };

  // 이미지 삭제
  const handleRemove = (file, type) => {
    const id = router?.query?.id;
    if (type === 'lens') {
      dispatch(updateLensImageListAction({ lensImageList: [] }));
      const params = {
        imageId: file.image_id,
        type: 'lens',
      };
      dispatch(deleteProductImagesAction({ id, params }));
    } else {
      const filterArr = thumbnailImageList.filter(item => item.thum_uuid_name !== file.uid);
      dispatch(updateThumbnailImageListAction({ thumbnailImageList: filterArr }));

      const params = {
        imageId: file.image_id,
        type: 'thumbnail',
      };
      dispatch(deleteProductImagesAction({ id, params }));
    }
  };

  // 등록 다음 단계 함수
  const nextStep = () => {
    const id = router?.query?.id;
    // STEP 1
    if (currentStep === 0) {
      // 파일 변경시 파일 업로드
      if (skuFileList?.length > 0) {
        const formData = new FormData();
        const file = skuFileList[0]?.file;
        formData.append('file', file);
        if (id) {
          formData.append('id', id);
        }
        dispatch(uploadSkuAction({ sendObject: formData, callback: router }));
      } else {
        setCurrentStep(currentStep + 1);
      }
    }

    // STEP 2
    if (currentStep === 1) {
      const { brand_id, product_description, product_name, product_sub_description } = getValues();

      const usingImageList = usingImage.filter(id => product_description.includes(id));
      const deleteImageList = usingImage.filter(id => !product_description.includes(id));

      const sendObject = {
        // product_name: ge
        brand_id,
        product_name,
        product_description,
        product_sub_description,
        usingImage: usingImageList,
        deleteImage: deleteImageList,
      };
      dispatch(upsertProductBasicInfoAction({ id, sendObject }));
    }

    // STEP 3
    if (currentStep === 2) {
      const {
        base_curve,
        center_thickness,
        color_id,
        colorline_id,
        pieces,
        cycle_code,
        diameter_id,
        product_event,
        show_status,
        sight_code,
        water_content,
        texture,
      } = getValues();

      const sendObject = {
        base_curve,
        center_thickness,
        color_id,
        colorline_id,
        pieces: parseInt(pieces),
        cycle_code,
        diameter_id,
        product_event: product_event ? 'Y' : 'N',
        show_status,
        sight_code,
        water_content,
        texture,
      };

      dispatch(upsertProductDetailInfoAction({ id, sendObject }));
    }

    // STEP 4 : 이미지 등록
    if (currentStep === 3) {
      if (productDetailData.step === 'E') {
        setCurrentStep(currentStep + 1);
      } else {
        dispatch(sendNextStepAction({ id, sendObject: { step: '5' } }));
      }
      // console.log(!)
    }
  };

  // STEP 5 : 가격 입력 후, 상품 등록 팝업
  const handleRegisterProduct = data => {
    const { discount_applicable, product_price, sale_price, store_discount, store_price, user_discount } = data;
    const sendObject = {
      discount_applicable,
      product_price,
      sale_price,
      store_discount: store_discount ?? 0,
      store_price,
      user_discount: discount_applicable === 'N' ? 0 : user_discount,
    };

    dispatch(upsertProductPriceInfoAction({ id: router.query.id, sendObject }));
  };

  // 등록 이전 단계 이동 함수
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // 실제로 주입입시켜 줄 배열
  const steps = [
    {
      title: 'SKU 등록',
      content: <ProductSkuUploadSection skuFileList={skuFileList} setSkuFileList={setSkuFileList} skuInfo={skuInfo} />,
    },
    {
      title: '기본 정보',
      content: <ProductBasicInfoSection productDetailData={productDetailData} control={control} errors={errors} setValue={setValue} />,
    },
    {
      title: '상세 정보',
      content: (
        <ProductDetailInfoSection
          productDetailData={productDetailData}
          control={control}
          errors={errors}
          getValues={getValues}
          watch={watch}
          setValue={setValue}
        />
      ),
    },
    {
      title: '이미지 등록',
      content: (
        <ProductImageUploadSection
          thumbnailFileList={thumbnailFileList}
          thumbnailPreviewOpen={thumbnailPreviewOpen}
          thumbnailPreviewTitle={thumbnailPreviewTitle}
          thumbnailPreviewImage={thumbnailPreviewImage}
          lensFileList={lensFileList}
          lensPreviewOpen={lensPreviewOpen}
          lensPreviewTitle={lensPreviewTitle}
          lensPreviewImage={lensPreviewImage}
          handleClosePreview={handleClosePreview}
          handleRemove={handleRemove}
          handlePreview={handlePreview}
          handleUpload={handleUpload}
        />
      ),
    },
    {
      title: '가격 설정',
      content: (
        <ProductPriceSection productDetailData={productDetailData} control={control} getValues={getValues} setValue={setValue} watch={watch} />
      ),
    },
  ];

  const items = steps.map(item => ({ key: item.title, title: item.title }));
  // 단계 이동 버튼 컴포넌트
  const stepsButton = () => {
    return (
      <RowGrid css={marginTopStyle(30)}>
        <ColGrid span={24} css={flexCenterStyle()}>
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prevStep()}>
              <SwapLeftOutlined /> 이전 단계
            </Button>
          )}

          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={() => nextStep()}>
              다음 단계
              <SwapRightOutlined />
            </Button>
          )}

          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType={'submit'}>
              <SaveOutlined /> 상품 등록
            </Button>
          )}
        </ColGrid>
      </RowGrid>
    );
  };

  // 상세데이터 호출
  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getProductDetailAction({ id: router.query.id, callback: router }));
    }
  }, [router?.query?.id, dispatch, router]);

  // 현재 진행중인 단계로 보내기
  useEffect(() => {
    if (productDetailData?.id) {
      if (productDetailData?.published === 'Y') {
        setCurrentStep(4);
      } else {
        if (productDetailData.step === 'E') {
          setCurrentStep(4);
        } else {
          setCurrentStep(parseInt(productDetailData?.step) - 1);
        }
      }
    }
  }, [productDetailData]);

  // 렌즈 이미지 데이터 세팅
  useEffect(() => {
    if (lensImageList?.length > 0) {
      const lensFile = lensImageList?.map(image => {
        // const imagePath =
        //   process.env.NODE_ENV === 'production'
        //     ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image?.image_path}`
        //     : `http://localhost:7070/editor/image/${image?.image_uuid_name}?path=uploadTest/product/lensImage/`;
        const imagePath = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image?.image_path}`;
        return {
          uid: image.image_uuid_name,
          name: image.image_path,
          image_id: image.id,
          status: 'done',
          url: imagePath,
        };
      });
      setLensFileList(lensFile);
    } else {
      setLensFileList([]);
    }
  }, [lensImageList]);

  // 썸네일 이미지 데이터 세팅
  useEffect(() => {
    if (thumbnailImageList?.length > 0) {
      const thumbnailFile = thumbnailImageList?.map(image => {
        // const imagePath =
        //   process.env.NODE_ENV === 'production'
        //     ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image?.thum_img_path}`
        //     : `http://localhost:7070/editor/image/${image?.thum_uuid_name}?path=uploadTest/product/thumbnail/`;
        const imagePath = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image?.thum_img_path}`;
        return {
          uid: image.thum_uuid_name,
          name: image.thum_img_path,
          image_id: image.id,
          status: 'done',
          url: imagePath,
        };
      });
      setThumbnailFileList(thumbnailFile);
    } else {
      setThumbnailFileList([]);
    }
  }, [thumbnailImageList]);

  return (
    <>
      <DividingLine border={false} />

      <Card>
        <Steps current={currentStep} items={items} />
      </Card>

      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* --------------------------- 단계별 컴포넌트 렌더링 --------------------------- */}
        {steps[currentStep]?.content}

        {/* --------------------------- 단계별 저장 버튼 --------------------------- */}
        {stepsButton()}
      </Form>
    </>
  );
};

export default ProductDetailTemplate;
const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const glassesContainer = css`
  .ant-descriptions-extra {
    position: absolute;
    left: 100px;
  }
`;

const brandSelectBox = css`
  width: 30%;
`;
