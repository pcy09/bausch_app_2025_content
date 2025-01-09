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
} from '@/components/atom';
import { Card, Checkbox, Col, DatePicker, Descriptions, Input, Modal, Radio, Row, Select, Tag, Tooltip, Upload } from 'antd';
import { Controller, FormProvider, useForm } from 'react-hook-form';
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
import {
  getProductInfoListAction,
  productBauschInfoReset,
  productInfoDeleteBauschAction,
  updateProductInfoExposedAction,
} from '@/store/reducers/admin/productBauschInfoReducer';
import { getProductInfoLenslyDetailAction } from '@/store/reducers/admin/productReducer';

// 제품 상세 데이터 불러오기
// const productinfoDetail = useSelector(state => state.product.productDetail);

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

const ProductsInfoLenslyDetailTemplate = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  // 사용 구분
  const [lensCycleCode, findLensCycleCode] = useCommonCode('lensCycleCode');

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tags: [], // Initialize the tags in the form state
      channel_type: '', // 기본값 설정
    },
  });

  const dispatch = useDispatch();
  const { opticianDetail } = useSelector(state => state?.optician);
  console.log('opticianDetail', opticianDetail);
  const [showStatusCode, findShowStatusCode] = useCommonCode('opticianShowStatusCode');
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
  const [channelType, setChannelType] = useState('');
  const [tags, setTags] = useState([]);
  const { query, back, push } = useRouter();

  const handleDelete = newTags => {
    setTags(newTags); // 상태 업데이트
  };

  const handleAddition = newTag => {
    setTags(prevTags => [...prevTags, newTag]);
  };
  const router = useRouter();

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);

  const handleSendData = data => {
    dispatch(updateOpticianAction({ id: router.query.id, sendObject: data }));
  };

  //ANCHOR: 신규작업

  const editorRef = useRef(null);

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
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    if (type === 'header') {
      setHeaderPreviewImage(file.url || file.preview);
      setHeaderPreviewOpen(true);
      setHeaderPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    } else {
      setThumbnailPreviewImage(file.url || file.preview);
      setThumbnailPreviewOpen(true);
      setThumbnailPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'channel_type') {
        setChannelType(value.channel_type);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // 썸네일 이미지 등록
  // 이미지 등록
  const handleUpload = ({ fileList: newFileList }, type) => {
    const id = router?.query?.id;
    const formData = new FormData();
    if (type === 'header') {
      // TODO: 받아온 데이터 양식에 따른 이미지 등록
      // if (newFileList.length > 0) {
      //   newFileList?.forEach(image => formData.append('headerImage', image.originFileObj));
      //   formData.append('type', 'lens');
      //   dispatch(upsertProductImagesInfoAction({ id, sendObject: formData, type: 'lens' }));
      // }
    } else {
      // 추가된 이미지만 filter (TODO: 받아온 데이터 양식에 따른 이미지 등록)
      // const thumbnailFile = newFileList.filter(file => file.originFileObj);
      // if (thumbnailFile.length > 0) {
      //   thumbnailFile?.forEach(image => formData.append('thumbnail', image.originFileObj));
      //   formData.append('type', 'thumbnail');
      //   dispatch(upsertProductImagesInfoAction({ id, sendObject: formData, type: 'thumbnail' }));
      // }
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  // 텍스트 에디터에 추가된 이미지 update
  const saveEditorImageID = id => {
    setEditorImageId(id);
  };

  // BAUSCH-APP 라디오 버튼 선택 시 포커스 이동 방지
  const testHandler = e => {
    console.log(e.target.value, 'e.target.value');
    setValue('channel_type', e.target.value);
    // 여기서 태그 입력 부분으로 포커스 이동하는 로직을 제거
  };

  // 상세데이터 호출
  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getProductInfoLenslyDetailAction({ id: router.query.id, callback: router }));
    }
  }, [dispatch, router, router.query.id]);

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={''} />
      </div>
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          <Descriptions title="채널 및 제품 선택" bordered={true}>
            <Descriptions.Item span={2} label="채널 선택 ⭐️">
              <Controller
                name="channel_type"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                  <Radio.Group
                    {...rest}
                    options={[
                      { label: 'BAUSCH-APP', value: 'B' },
                      { label: 'LENSLY', value: 'L' },
                    ]}
                    value={value}
                    onChange={e => {
                      onChange(e);
                      testHandler(e);
                    }}
                    {...rest}
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="제품 선택 ⭐️">
              <Controller
                name="product_type"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={showStatusCode} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          <Descriptions title="상세 정보" bordered={true}>
            <Descriptions.Item span={2} label="도수구분">
              <Controller
                name="terms_title"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <SelectBox value={value || ''} options={[]} placeholder={'선택해주세요'} {...rest} />;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="사용구분">
              <Controller
                name="cycle_code"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={lensCycleCode} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="컬러라인">
              <Controller
                name="colorline_id"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={[]} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="컬러">
              <Controller
                name="color_id"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={[]} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="직경">
              <Controller
                name="diameter_id"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={[]} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="BC(곡률)">
              <Controller
                name="bc_version"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'입력해주세요.'} {...rest} />}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="중심두께">
              <Controller
                name="center_thickness"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'중심 두께를 입력해주세요..'} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="함수율">
              <Controller
                name="water_content"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" placeholder={'함수율을 입력해주세요.'} {...rest} value={value || null} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="이벤트 제품">
              <Controller
                name="product_event"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Checkbox checked={value} onChange={target => console.log(value)} {...rest}>
                    이벤트 상품 등록
                  </Checkbox>
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="재질">
              <Controller
                name="texture"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || null} placeholder={'재질을 입력해주세요.'} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="개입">
              <Controller
                name="bc_version"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'입력해주세요.'} {...rest} />}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="도수범위">
              <Controller
                name="bc_version"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'입력해주세요.'} {...rest} />}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={3} label="제품 설명 ⭐️">
              <Controller
                name="productDescription"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  // <TextAreas defaultValue={productInquiryDetail?.qa_answer || ''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                  <TextAreas defaultValue={''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          <Descriptions title="이미지 등록" bordered={true}>
            <Descriptions.Item
              span={3}
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
                  {fileList.length >= 1 ? null : uploadButton}
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
                    alt={'previewImage'}
                    layout="responsive"
                  />
                </Modal>
              </>
            </Descriptions.Item>
            <Descriptions.Item
              span={3}
              label={
                <div>
                  헤더 이미지 ⭐️<div css={subLabel}>이미지사이즈 440x260</div>
                </div>
              }>
              <>
                <Upload
                  listType="picture-card"
                  fileList={headerFileList}
                  onPreview={file => handlePreview(file, 'header')}
                  onChange={fileList => handleUpload(fileList, 'header')}
                  beforeUpload={() => false}>
                  {fileList.length >= 1 ? null : uploadButton}
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
                    alt={'previewImage'}
                    layout="responsive"
                  />
                </Modal>
              </>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="제품 상세 내용 ⭐️">
              <Controller
                name="event_content"
                control={control}
                render={({ field: { ref, value, onChange, ...rest } }) => (
                  <Editor
                    border={false}
                    value={value || ''}
                    onChange={onChange}
                    isError={errors?.content}
                    forwardRef={editorRef}
                    saveEditorImageID={saveEditorImageID}
                    // customHeight={'auto'}
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          {/* 여기 아래부터는 채널 값에 따른 렌더 다르게 */}

          {channelType === 'B' && <ProductBauschSection tags={tags} handleDelete={handleDelete} handleAddition={handleAddition} control={control} />}
          <FormProvider {...{ handleSubmit, control, getValues, setValue, watch, reset, errors }}>
            {channelType === 'L' && <ProductLenslySection control={control} />}
          </FormProvider>
          <DividingLine border={false} />

          <Descriptions title="노출 여부" bordered={true}>
            <Descriptions.Item span={4} label="노출 여부 ⭐️">
              <Controller
                name="discount_apply"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Radio.Group
                    options={[
                      { label: '노출', value: 'Y' },
                      { label: '비노출', value: 'N' },
                    ]}
                    onChange={target => console.log(target)}
                    value={value || 'N'}
                    {...rest}
                  />
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
        {/*</CardContainer>*/}
      </Form>
    </>
  );
};

export default ProductsInfoLenslyDetailTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
