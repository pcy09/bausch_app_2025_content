import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, Tables } from '@/components/atom';
import { PageTitle } from '@/components/molecules';
import { DatePicker, Descriptions, Input, message } from 'antd';
import ReissueCouponListSection from '@/components/molecules/DevCreatement_kyj/ReissueCouponListSection';
import ReissueUserListSection from '@/components/molecules/DevCreatement_kyj/ReissueUserListSection';
import { contentsContainerStyle, emptyTableStyle, marginBottomStyle, marginLeftStyle, tableRowStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getReissueCouponSelectAction, getReissueMemberCouponAction, postReissueCouponAction } from '@/store/reducers/admin/campaignReducer';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { transSelectBox } from '@/common/utiles';
import { errorSnackOpen } from '@/store/reducers/snackReducer';

const { RangePicker } = DatePicker;

const PromotionReissueTemplate = ({}) => {
  // 선택 쿠폰 칼럼
  const reissueSelectColumns = [
    {
      title: '유형',
      dataIndex: 'couponType',
      align: 'center',
      width: 150,
    },
    {
      title: '쿠폰명',
      dataIndex: 'couponName',
      align: 'center',
    },
    {
      title: '쿠폰 ID',
      dataIndex: 'couponId',
      align: 'center',
      width: 150,
    },
    {
      title: '유효 기간',
      dataIndex: 'eventDate',
      align: 'center',
      width: 300,
      render: (value, record) => (
        <Descriptions.Item label={'쿠폰 유효 기간'}>
          <RangePicker
            placeholder={['시작일', '종료일']}
            value={value}
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
            onChange={dates => handleDateChange(record.couponId, dates)}
          />
        </Descriptions.Item>
      ),
    },
    {
      title: '수량',
      dataIndex: 'couponQuantity',
      align: 'center',
      width: 150,
      render: (value, record) => (
        <Input type="number" defaultValue={1} min={1} value={value} onChange={e => handleQuantityChange(record.couponId, e.target.value)} />
      ),
    },
    {
      title: '삭제',
      dataIndex: 'couponId',
      align: 'center',
      width: 150,
      render: (value, record) => <Buttons type="danger" name={'삭제'} onClick={() => handleDeleteCoupon(value)} />,
    },
  ];

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => handleError(errors);

  const dispatch = useDispatch();
  const router = useRouter();

  // 공통코드 호출
  const { memberSearchCond, couponSearchCode } = useCommonCodeBatch(['memberSearchCond', 'couponSearchCode']);

  const [reissueSelectList, setReissueSelectList] = useState([]);
  const [memberSearchCondOptions, setMemberSearchCondOptions] = useState([]);
  const [couponSearchCodeOptions, setCouponSearchCodeOptions] = useState([]);
  const [selectedMemberInfo, setSelectedMemberInfo] = useState(null);

  const reissueMemberListData = useSelector(state => state.campaign.reissueMemberListData);
  const reissueCouponSelectData = useSelector(state => state.campaign.reissueCouponSelectData);

  // 테이블 헤더 옵션 (전체 미포함)
  useEffect(() => {
    if (memberSearchCond) {
      setMemberSearchCondOptions(transSelectBox(memberSearchCond));
    }
  }, [memberSearchCond]);

  // 테이블 헤더 옵션 (전체 미포함)
  useEffect(() => {
    if (couponSearchCode) {
      setCouponSearchCodeOptions(transSelectBox(couponSearchCode));
    }
  }, [couponSearchCode]);

  /****************************************************************************************** */

  // 쿠폰을 선택했을 때 리스트에 추가하는 함수
  const handleAddCoupon = coupon => {
    const uniqueKey = `${coupon.couponId}_${Date.now()}`; // 고유한 키 생성

    setReissueSelectList(prevList => [
      ...prevList,
      {
        key: uniqueKey,
        couponType: coupon.couponType,
        couponName: coupon.couponName,
        couponId: coupon.couponId,
        couponQuantity: 1,
      },
    ]);
  };

  const handleQuantityChange = (couponId, value) => {
    setReissueSelectList(prevList => prevList.map(coupon => (coupon.couponId === couponId ? { ...coupon, couponQuantity: value } : coupon)));
  };

  const handleDateChange = (couponId, dates) => {
    setReissueSelectList(prevList => prevList.map(coupon => (coupon.couponId === couponId ? { ...coupon, eventDate: dates } : coupon)));
  };

  const handleDeleteCoupon = couponId => {
    setReissueSelectList(prevList => prevList.filter(coupon => coupon.couponId !== couponId));
  };

  // 발급하기
  const handleSendData = data => {
    let isCompleted = true;
    const reissueCouponModels = reissueSelectList.map(coupon => {
      if (coupon?.eventDate && coupon.eventDate.length === 2 && coupon.couponQuantity > 0) {
        const startDate = dayjs(coupon.eventDate[0]).format('YYYY-MM-DDT00:00:00');
        const endDate = dayjs(coupon.eventDate[1]).format('YYYY-MM-DDT23:59:59');

        return {
          couponId: coupon.couponId,
          startDate: startDate,
          endDate: endDate,
          couponQuantity: Number(coupon.couponQuantity),
        };
      } else {
        isCompleted = false;
      }
    });
    if (reissueSelectList.length === 0) {
      dispatch(
        errorSnackOpen({
          message: '선택된 쿠폰이 없습니다. 쿠폰을 선택해주세요',
        }),
      );
      return;
    }
    if (!isCompleted) {
      dispatch(
        errorSnackOpen({
          message: '선택된 쿠폰의 유효기간 및 수량 정보를 정확하게 입력해주세요',
        }),
      );
      return;
    } else {
      const sendObject = {
        memberId: selectedMemberInfo?.memberId,
        reissueCouponModels: reissueCouponModels,
      };

      dispatch(postReissueCouponAction({ sendObject, callback: router }));
    }
  };

  return (
    // 회원 쿠폰 재발급
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <DividingLine border={false} />
      <CardContainer>
        {/* 회원정보 선택 */}
        <ReissueUserListSection
          control={control}
          getValues={getValues}
          reissueMemberListData={reissueMemberListData}
          memberSearchCondOptions={memberSearchCondOptions}
          selectedMemberInfo={selectedMemberInfo}
          setSelectedMemberInfo={setSelectedMemberInfo}
          setReissueSelectList={setReissueSelectList}
        />
        <DividingLine border={false} />

        {/* 쿠폰 선택 */}
        <ReissueCouponListSection
          control={control}
          getValues={getValues}
          storeId={selectedMemberInfo?.storeId}
          reissueCouponSelectData={reissueCouponSelectData}
          onAddCoupon={handleAddCoupon}
          handleDeleteCoupon={handleDeleteCoupon}
          couponSearchCodeOptions={couponSearchCodeOptions}
          reissueSelectList={reissueSelectList}
        />
      </CardContainer>
      <DividingLine border={false} />

      {/* 선택 쿠폰 */}
      <CardContainer>
        <Descriptions title="선택 쿠폰" bordered={false} />
        <Tables
          emptyText="선택된 쿠폰이 없습니다. 쿠폰을 선택해주세요"
          detail={false}
          listData={reissueSelectList} //뿌리려는 리스트 값
          columns={reissueSelectColumns} //열 구분 하는 방법 및 사용할 데이터 지정
        />
      </CardContainer>
      <DividingLine border={false} />

      {/* 하단 */}
      <CardContainer>
        <RowGrid justify="space-between">
          <Buttons name={'취소'} onClick={() => router.push('/admin/campaign/coupon')} />
          <Buttons type={'primary'} name={'발급하기'} onClick={handleSendData} />
        </RowGrid>
      </CardContainer>
    </Form>
  );
};

export default PromotionReissueTemplate;
