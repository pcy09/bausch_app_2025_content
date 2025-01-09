import { CardContainer, DateSearchAtom, FilterBox, SelectAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import Form from '@/components/atom/Form';
import dayjs from 'dayjs';
import { marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { useEffect } from 'react';

const PromotionCouponSearchBox = ({ selectOptions1, selectOptions2, selectOptions3, onHandleSearchData, setResetState, tabStatus }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = data => {
    const { date, couponType, couponOnOffType, exposedStatus } = data;
    const searchData = {
      startDate: date ? dayjs(date[0]).format('YYYY-MM-DDT00:00:00') : null,
      endDate: date ? dayjs(date[1]).format('YYYY-MM-DDT23:59:59') : null,
      couponType: couponType === 'all' ? null : couponType,
      couponOnOffType: couponOnOffType === 'all' ? null : couponOnOffType,
      exposedStatus: exposedStatus === 'all' ? null : exposedStatus,
    };
    onHandleSearchData({ page: 0, size: 10 }, searchData); // 검색시 초기화
  };

  const handleResetSearch = () => {
    reset();
    setResetState(true);

    onHandleSearchData({ page: 0, size: 10 });
  };

  useEffect(() => {
    reset();
    setResetState(true);
  }, [tabStatus, reset, setResetState]);

  return (
    <CardContainer css={[marginBottomStyle(24)]}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FilterBox handleReset={handleResetSearch}>
          <DateSearchAtom title={'쿠폰 유효 기간'} control={control} />
          <SelectAtom name="couponType" defaultValue="all" control={control} title={'쿠폰 유형'} options={selectOptions1} />
          {tabStatus !== 'REISSUE' && (
            <SelectAtom name="couponOnOffType" defaultValue="all" control={control} title={'쿠폰 구분'} options={selectOptions2} />
          )}
          <SelectAtom name="exposedStatus" defaultValue="all" control={control} title={'노출 여부'} options={selectOptions3} />
        </FilterBox>
      </Form>
    </CardContainer>
  );
};

export default PromotionCouponSearchBox;
