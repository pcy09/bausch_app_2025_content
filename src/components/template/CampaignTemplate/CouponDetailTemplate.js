import { CardContainer, Form, RowGrid, Buttons, DividingLine, Inputs, DatePickers, Radios, TextAreas } from '@/components/atom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { contentsContainerStyle, subLabel } from '@/styles/components/atomCommonStyle';
import { CouponDetailProductSettingSection, CouponProductSettingSection } from '@/components/molecules/DevCreatement';
import CouponDetailStoreTemplate from './CouponDetailStoreTemplate';
import { getCouponDetailListAction, getDetailCouponStoreListAction, updateCouponAction } from '@/store/reducers/admin/campaignDetailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, Descriptions, Image, Modal, Upload } from 'antd';
import useCommonCode from '@/hooks/useCommonCode';
import { transDate, transFormRadioValue, transProductOption, transSelectBox } from '@/common/utiles';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import moment from 'moment';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

const { RangePicker } = DatePicker;

const CouponDetailTemplate = ({}) => {
  const router = useRouter();
  const { query, back, push } = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({});

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const channelType = useWatch({
    control,
    name: 'channelType',
    defaultValue: 'BAUSCH',
  });

  const onSubmit = data => handleUpdateData(data);
  const onError = errors => handleError(errors);

  const handleError = err => {
    console.error(err);
    const { eventDate, couponName, couponSalesProductIds, couponGiftProductIds, discountPrice, pointProductGroupId, discountStorePoint } = err;
    if (eventDate) {
      dispatch(
        errorSnackOpen({
          message: '쿠폰 유효 기간을 입력해주세요',
        }),
      );
    }
    if (couponName) {
      dispatch(
        errorSnackOpen({
          message: '쿠폰명을 입력하세요',
        }),
      );
    }
    if (couponSalesProductIds) {
      dispatch(
        errorSnackOpen({
          message: '판매제품을 선택하세요',
        }),
      );
    }
    if (couponGiftProductIds) {
      dispatch(
        errorSnackOpen({
          message: '증정제품을 선택하세요',
        }),
      );
    }
    if (discountPrice) {
      dispatch(
        errorSnackOpen({
          message: '할인금액을 입력하세요',
        }),
      );
    }
    if (discountStorePoint) {
      dispatch(
        errorSnackOpen({
          message: '안경원 적립금을 입력하세요',
        }),
      );
    }
    if (pointProductGroupId) {
      dispatch(
        errorSnackOpen({
          message: '적립금을 선택하세요',
        }),
      );
    }
  };

  // 공통코드 호출
  const { productBauschDrop, bauschGiftDrop, productLenslyDrop, lenslyGiftDrop, pointProductGroup, exposedStatus, storeSetSearchCode } =
    useCommonCodeBatch([
      'productBauschDrop',
      'bauschGiftDrop',
      'productLenslyDrop',
      'lenslyGiftDrop',
      'pointProductGroup',
      'exposedStatus',
      'storeSetSearchCode',
    ]);
  const { resultDetail, result } = useSelector(state => state?.campaignDetail);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [couponType, setCouponType] = useState('GIFT');

  // 제품 그룹 정제 데이터
  const [productBauschDropOptions, setProductBauschDropOptions] = useState([]);
  const [bauschGiftDropOptions, setBauschGiftDropOptions] = useState([]);
  const [productLenslyDropOptions, setProductLenslyDropOptions] = useState([]);
  const [lenslyGiftDropOptions, setLenslyGiftDropOptions] = useState([]);
  const [pointProductGroupOptions, setPointProductGroupOptions] = useState([]);
  const [exposedStatusOptions, setExposedStatusOptions] = useState([]);
  const [storeSetSearchCodeOptions, setStoreSetSearchCodeOptions] = useState([]);

  const [currentOptions, setCurrentOptions] = useState();
  const [currentGiftOptions, setCurrentGiftOptions] = useState();
  const [equalProduct, setEqualProduct] = useState(false);

  // 상세 데이터 호출
  useEffect(() => {
    if (query?.id) {
      dispatch(getCouponDetailListAction({ id: query.id }));
    }
  }, [query?.id, dispatch]);

  // 상세 데이터 넣기
  useEffect(() => {
    if (resultDetail) {
      const eventDate = [moment(resultDetail.startDate), moment(resultDetail.endDate)];
      // 판매제품
      const couponSalesProductIds = resultDetail?.salesProductDropList?.flatMap(group =>
        group.dropProductInfoList.map(product => [group.productGroupId, product.productId]),
      );
      // 증정제품
      const couponGiftProductIds = resultDetail?.giftProductDropList?.flatMap(group =>
        group.dropProductInfoList.map(product => [group.productGroupId, product.productId]),
      );

      setValue('couponId', resultDetail?.couponId);
      setValue('eventDate', eventDate);
      setValue('channelType', resultDetail?.channelType);
      setValue('couponType', resultDetail?.couponType);
      setCouponType(resultDetail?.couponType);
      setValue('couponName', resultDetail?.couponName);
      setValue('couponOnOffType', resultDetail?.couponOnOffType);
      setValue('adminMemo', resultDetail?.adminMemo);
      setValue('exposedStatus', resultDetail?.exposedStatus);
      setValue('syncLensPowerStatus', resultDetail?.syncLensPowerStatus);
      setValue('couponSalesProductIds', couponSalesProductIds);
      setValue('salesProductQuantity', resultDetail?.salesProductQuantity);
      setValue('syncSaleGiftStatus', resultDetail?.syncSaleGiftStatus);
      setValue('couponGiftProductIds', couponGiftProductIds);
      setValue('giftProductQuantity', resultDetail?.giftProductQuantity);
      setValue('discountPrice', resultDetail?.discountPrice || '');
      setValue('pointProductGroupId', String(resultDetail?.pointProductGroupId));
      setValue('discountStorePoint', resultDetail?.discountStorePoint);
      setValue('exposureBenefit', resultDetail?.exposureBenefit || '');
      setValue('exposureProduct', resultDetail?.exposureProduct || '');
      setValue('exposureGift', resultDetail?.exposureGift || '');
      setValue('exposureEvent', resultDetail?.exposureEvent || '');

      if (resultDetail?.thumbImage) {
        setFileList([{ url: resultDetail?.thumbImage }]);
      }

      if (resultDetail?.syncSaleGiftStatus === 'SYNC_SALE_ON') {
        setValue(`couponGiftProductIds`, []);
        setEqualProduct(true);
      }
    }
  }, [resultDetail, setValue]);

  // 쿠폰타입이 바뀔때마다 value 넣어주기
  useEffect(() => {
    if (couponType === 'GIFT' && resultDetail) {
      setValue('exposureGift', resultDetail?.exposureGift || '');
    }
  }, [couponType, resultDetail, setValue]);

  // baucsh 판매 제품 옵션
  useEffect(() => {
    if (productBauschDrop) {
      const options = transProductOption(productBauschDrop);
      setProductBauschDropOptions(options);
    }
  }, [productBauschDrop]);

  // baucsh 증정 제품 옵션
  useEffect(() => {
    if (bauschGiftDrop) {
      const options = transProductOption(bauschGiftDrop);
      setBauschGiftDropOptions(options);
    }
  }, [bauschGiftDrop]);

  // lensly 판매제품 옵션
  useEffect(() => {
    if (productLenslyDrop) {
      const options = transProductOption(productLenslyDrop);
      setProductLenslyDropOptions(options);
    }
  }, [productLenslyDrop]);

  // lensly 증정 제품 옵션
  useEffect(() => {
    if (lenslyGiftDrop) {
      const options = transProductOption(lenslyGiftDrop);
      setLenslyGiftDropOptions(options);
    }
  }, [lenslyGiftDrop]);

  // 테이블 헤더 옵션 (전체 미포함)
  useEffect(() => {
    if (storeSetSearchCode) {
      setStoreSetSearchCodeOptions(transSelectBox(storeSetSearchCode));
    }
  }, [storeSetSearchCode]);

  // 채널에 따라 제품 옵션 다르게 설정
  useEffect(() => {
    if (channelType === 'BAUSCH') {
      setCurrentOptions(productBauschDropOptions); //bausch 판매 제품
      setCurrentGiftOptions(bauschGiftDropOptions); //bausch 증정 제품
    } else if (channelType === 'LENSLY') {
      setCurrentOptions(productLenslyDropOptions); //렌즐리 판매 제품
      setCurrentGiftOptions(lenslyGiftDropOptions); //렌즐리  증정제품
    }
  }, [channelType, productBauschDropOptions, bauschGiftDropOptions, productLenslyDropOptions, lenslyGiftDropOptions]);

  // 안경원 적립금 옵션
  useEffect(() => {
    if (pointProductGroup) {
      setPointProductGroupOptions(transSelectBox(pointProductGroup));
    }
  }, [pointProductGroup]);

  // 노출여부 옵션
  useEffect(() => {
    if (exposedStatus) {
      setExposedStatusOptions(transSelectBox(exposedStatus));
    }
  }, [exposedStatus]);

  // 썸네일 이미지 & 파일
  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleCancel = () => setPreviewOpen(false);

  // 썸네일 이미지 미리보기
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview || file.thumbUrl);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // 수정하기
  const handleUpdateData = () => {
    const data = getValues();
    // 스토어 설정 안한경우
    if (result.length === 0) {
      dispatch(
        errorSnackOpen({
          message: '대상 스토어 설정을 해주세요',
        }),
      );
      return;
    }
    const {
      couponId, // 쿠폰 ID
      eventDate, // 날짜 범위
      channelType, // 채널 타입
      couponType, // 쿠폰 타입
      couponName, // 쿠폰명
      couponOnOffType, // 쿠폰 구분
      adminMemo, // 관리자 메모
      exposedStatus, // 노출 여부
      syncLensPowerStatus, // 판매,증정 동일도수 여부
      couponSalesProductIds, // 판매 제품 ID 리스트
      salesProductQuantity, // 판매 제품 수량
      syncSaleGiftStatus, // 판매제품과 동일제품 여부
      couponGiftProductIds, // 증정 제품 ID 리스트
      giftProductQuantity, // 증정 제품 수량
      exposureBenefit, // 혜택
      exposureProduct, // 제품
      exposureGift, // 증정품
      exposureEvent, // 행사명
      discountPrice, //할인 금액
      pointProductGroupId, //적립금
      discountStorePoint, //적립금액
    } = data;

    const childrenCouponSalesProductIds = []; //판매제품 자식요소 ID리스트
    const childrenCouponGiftProductIds = []; //증정제품 자식요소 ID리스트

    if (couponSalesProductIds?.length > 0) {
      const childrenIds = couponSalesProductIds.map(item => item[1]);
      childrenCouponSalesProductIds.push(...childrenIds);
    }
    if (couponGiftProductIds?.length > 0) {
      const childrenIds = couponGiftProductIds.map(item => item[1]);
      childrenCouponGiftProductIds.push(...childrenIds);
    }

    if (syncSaleGiftStatus === 'SYNC_SALE_ON') {
      const childrenIds = couponSalesProductIds.map(item => item[1]);
      childrenCouponGiftProductIds.push(...childrenIds);
    }

    const jsonData = {
      couponId,
      couponReissue: 0,
      couponName,
      adminMemo,
      channelType,
      startDate: transDate(eventDate[0], 'YYYY-MM-DDT00:00:00'),
      endDate: transDate(eventDate[1], 'YYYY-MM-DDT23:59:59'),
      exposedStatus,
      couponOnOffType,
      couponType,
      discountPrice: discountPrice || null,
      pointProductGroupId: Number(pointProductGroupId) || null,
      discountStorePoint: discountStorePoint,
      couponSalesProductIds: childrenCouponSalesProductIds,
      couponGiftProductIds: childrenCouponGiftProductIds,
      giftProductQuantity,
      salesProductQuantity,
      syncLensPowerStatus,
      syncSaleGiftStatus,
      exposureEvent,
      exposureBenefit,
      exposureProduct,
      exposureGift,
      thumbImageURL: resultDetail.thumbImage || null,
    };
    const files = fileList.map(file => file.originFileObj);
    const sendObject = {
      data: jsonData,
      files,
    };
    // API 호출
    dispatch(updateCouponAction({ sendObject, callback: router }));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <NoticeLabel
        title={
          '👉🏼 등록한 쿠폰의 상세 페이지입니다. 쿠폰의 상세 정보를 수정 또는 삭제할 수 있고 복사하기를 통해 동일한 설정의 쿠폰을 재발행할 수 있습니다.'
        }
      />
      <DividingLine border={false} />

      <CardContainer size={'default'} bordered={false}>
        {/* 기본 설정 */}
        <Descriptions title={'기본 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
          <Descriptions.Item span={2} label={'쿠폰 ID'}>
            <Controller
              name="couponId"
              control={control}
              disabled={true}
              render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={''} value={value} {...rest} />}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label={'쿠폰 유효 기간 ⭐️'}>
            <Controller
              name="eventDate"
              control={control}
              render={({ field: { onCalendarChange, ref, value, ...rest }, fieldState }) => (
                <RangePicker placeholder={['시작일', '종료일']} value={value} format="YYYY-MM-DD" style={{ width: '100%' }} {...rest} />
              )}
              rules={{ required: true }}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label={'채널 ⭐️'}>
            {resultDetail.channelType}
          </Descriptions.Item>
          <Descriptions.Item span={2} label={'쿠폰 유형 ⭐️'}>
            {resultDetail.couponTypeValue}
          </Descriptions.Item>
          <Descriptions.Item span={2} label={'쿠폰명 ⭐️'}>
            <Controller
              name="couponName"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs value={value} type="text" placeholder={'입력해주세요.'} {...rest} />
              )}
              rules={{ required: true }}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label={'쿠폰 구분 ⭐️'}>
            {resultDetail.onOffTypeValue}
          </Descriptions.Item>
          <Descriptions.Item span={4} label={'관리자 메모'}>
            <Controller
              name="adminMemo"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => <TextAreas value={value} type="text" {...rest} />}
            />
          </Descriptions.Item>
          <Descriptions.Item span={4} label={'노출 여부 ⭐️'}>
            <Controller
              name="exposedStatus"
              control={control}
              defaultValue={'EXPOSED'}
              render={({ field: { ref, value, ...rest }, fieldState }) => {
                return <Radios options={exposedStatusOptions} value={value} {...rest} />;
              }}
              rules={{ required: true }}
            />
          </Descriptions.Item>
        </Descriptions>
        <DividingLine border={false} />

        {/* 제품 설정 */}
        {/* <CouponDetailProductSettingSection */}
        <CouponProductSettingSection
          control={control}
          options={currentOptions}
          getValues={getValues}
          setValue={setValue}
          bauschGiftOption={currentGiftOptions}
          pointProductGroupOptions={pointProductGroupOptions}
          couponType={resultDetail.couponType}
          equalProduct={equalProduct}
          setEqualProduct={setEqualProduct}
        />
        <DividingLine border={false} />

        {/* 스토어 설정 */}
        <CouponDetailStoreTemplate storeSetSearchCodeOptions={storeSetSearchCodeOptions} />
        <DividingLine border={false} />

        {/* 노출 정보 */}
        <Descriptions title={'기본 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
          <Descriptions.Item span={4} label="혜택">
            <Controller
              name="exposureBenefit"
              control={control}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs type="text" value={value} placeholder={'소비자 APP에 노출될 쿠폰 혜택을 작성해주세요.'} {...rest} />
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item span={4} label="제품">
            <Controller
              name="exposureProduct"
              control={control}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs type="text" value={value} placeholder={'소비자 APP에 노출될 쿠폰 제품을 작성해주세요.'} {...rest} />
              )}
            />
          </Descriptions.Item>
          {couponType === 'GIFT' && (
            <Descriptions.Item span={4} label="증정품">
              <Controller
                name="exposureGift"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value} placeholder={'소비자 APP에 노출될 쿠폰 증정품을 작성해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
          )}

          <Descriptions.Item span={4} label="매장 찾기 행사명">
            <Controller
              name="exposureEvent"
              control={control}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <Inputs type="text" value={value} placeholder={'소비자 APP에서 매장 찾기시 노출될 쿠폰 행사명을 입력해주세요.'} {...rest} />
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item
            span={4}
            label={
              <div>
                썸네일 이미지 <div css={subLabel}>이미지사이즈 267x268</div>
              </div>
            }>
            <>
              <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleUpload} beforeUpload={() => false}>
                {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}>
                      Upload
                    </div>
                  </div>
                )}
              </Upload>
              <Modal
                width={800}
                centered={true}
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
                style={{ position: 'relative' }}>
                <Image
                  src={previewImage}
                  width={1000}
                  height={500}
                  style={{ width: '100%', height: 'auto' }}
                  alt={'previewImage'}
                  layout="responsive"
                />
              </Modal>
            </>
          </Descriptions.Item>
        </Descriptions>
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid justify="space-between">
          <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => router.push('/admin/campaign/coupon')} />
          <Buttons type={'primary'} name={'쿠폰 수정'} onClick={handleUpdateData} />
        </RowGrid>
      </CardContainer>
    </Form>
  );
};

export default CouponDetailTemplate;
