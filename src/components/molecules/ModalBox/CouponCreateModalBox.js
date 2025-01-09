import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import PromotionCouponSearchBox from '../SearchBox/PromotionCouponSearchBox';
import { CouponSearchBox } from '../SearchBox';
import usePagination from '@/hooks/usePagination';
import { campaignReset, getCampaignCouponListAction } from '@/store/reducers/admin/campaignReducer';
import { useEffect, useState } from 'react';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, RowGrid, Tables } from '@/components/atom';
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { marginRightStyle } from '@/styles/components/atomCommonStyle';
import { downloadExcel } from '@/common/utiles';
import { Descriptions, InputNumber, Modal } from 'antd';
import { createOfflineCouponAction, getOfflineCouponAction, OfflineCouponResetAction } from '@/store/reducers/admin/offlineCouponReducer';
import { openPops } from '@/store/reducers/popupsReducer';

const CouponCreateModalBox = ({ couponId }) => {
  const columns = [
    { title: '쿠폰번호', dataIndex: 'userCouponCode', align: 'center' },
    { title: '등록일', dataIndex: 'createDate', align: 'center' },
  ];
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = data => handleAddData(data);
  const onError = errors => handleError(errors);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.offlineCoupon, getOfflineCouponAction, couponId);
  const { content } = useSelector(state => state?.offlineCoupon);
  const { isModalOpen } = useSelector(state => state.popups);

  // 생성
  const handleAddData = data => {
    const { couponQuantity } = data;
    if (couponQuantity > 0) {
      const sendObject = {
        couponId,
        couponQuantity,
      };
      Modal.confirm({
        title: '쿠폰 번호 생성',
        icon: <ExclamationCircleOutlined />,
        content: `${couponQuantity}개의 쿠폰번호를 생성하시겠습니까?`,
        okText: '등록',
        cancelText: '취소',
        onOk: () => {
          dispatch(createOfflineCouponAction({ sendObject }));
        },
      });
    } else {
      dispatch(
        errorSnackOpen({
          message: '쿠폰번호 생성 에러',
          description: '생성에 필요한 갯수를 입력해주세요',
        }),
      );
    }
  };
  // 에러
  const handleError = errors => {
    console.error(errors);
  };

  // 엑셀로 내보낼 데이터 형식 조정
  const exportData = content?.map(item => ({
    쿠폰번호: item.userCouponCode,
    등록일: item.createDate,
  }));

  // 초기화
  useEffect(() => {
    if (!isModalOpen) {
      reset({ couponQuantity: '' });
      dispatch(OfflineCouponResetAction());
    }
  }, [isModalOpen, dispatch, reset]);

  return (
    <>
      <Descriptions title={'쿠폰 번호 생성'} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RowGrid>
          <ColGrid span={14}>
            <Controller
              name={'couponQuantity'}
              control={control}
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  max={100}
                  type={'number'}
                  placeholder={'쿠폰번호 생성 숫자 입력 (최대 100개)'}
                  value={value || null}
                  {...rest}
                />
              )}
            />
          </ColGrid>
          <ColGrid span={1}></ColGrid>
          <ColGrid span={6}>
            <Buttons type={'primary'} htmlType={'submit'} name={'생성'} />
          </ColGrid>
        </RowGrid>
      </Form>
      <DividingLine border={false} />
      <DividingLine border />
      <DividingLine border={false} />
      <Descriptions title={'해당 쿠폰번호 생성 내역'} />
      <CardContainer>
        {/* 필터 */}
        <CouponSearchBox onHandleSearchData={getInitData} id={couponId} />
      </CardContainer>
      <DividingLine border={false} />
      {/* 테이블 */}
      <Tables
        detail={false}
        checkbox={false}
        listData={content}
        columns={columns}
        handleChangePageOption={handlePageChange}
        pagination={pagination}
      />
      <DividingLine border={false} />
      {/* 엑셀 다운로드 */}
      <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} onClick={() => downloadExcel(exportData)} />
    </>
  );
};

export default CouponCreateModalBox;
