import { Inputs, DatePickers, Radios, TextAreas } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions } from 'antd';

// 채널 라디오
const channel_radioList = [
  {
    id: 1,
    value: 'bausch',
    label: 'BAUSCH',
  },
  {
    id: 2,
    value: 'lensly',
    label: 'LENSLY',
  },
];

// 유형 라디오
const type_radioList = [
  {
    id: 1,
    value: 'present',
    label: '증정',
  },
  {
    id: 2,
    value: 'discount',
    label: '할인',
  },
];

// 구분 라디오
const sort_radioList = [
  {
    id: 1,
    value: 'online',
    label: '온라인',
  },
  {
    id: 2,
    value: 'offline',
    label: '오프라인',
  },
];

// 노출여부 라디오
const show_radioList = [
  {
    id: 1,
    value: 'Y',
    label: '노출',
  },
  {
    id: 2,
    value: 'N',
    label: '비노출',
  },
];

const CouponBasicSection = ({
  coupon_show,
  coupon_memo,
  coupon_date,
  coupon_channel,
  coupon_type,
  coupon_sort,
  coupon_title,
  control,
  handleRadioChange,
}) => {
  return (
    <Descriptions title={'기본 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item span={2} label={'쿠폰 ID'}>
        <Controller
          name="coupon_id"
          control={control}
          disabled={true}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={''} value={value || 'werwesdvx12312'} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'쿠폰 유효 기간'}>
        <DatePickers name="coupon_date" defaultValue={coupon_date} control={control} />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'채널'}>
        <Controller
          name="coupon_channel"
          control={control}
          defaultValue={coupon_channel}
          render={({ field: { ref, value, ...rest }, fieldState }) => {
            return <Radios options={channel_radioList} value={value} {...rest} />;
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'쿠폰 유형'}>
        <Controller
          name="coupon_type"
          control={control}
          defaultValue={coupon_type}
          render={({ field: { ref, onChange, value, ...rest }, fieldState }) => {
            return (
              <Radios
                onChange={e => {
                  handleRadioChange(e);
                }}
                options={type_radioList}
                value={value}
                {...rest}
              />
            );
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'쿠폰 구분'}>
        <Controller
          name="coupon_sort"
          control={control}
          defaultValue={coupon_sort}
          render={({ field: { ref, value, ...rest }, fieldState }) => {
            return <Radios options={sort_radioList} value={value} {...rest} />;
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'쿠폰명'}>
        <Controller
          name="coupon_title"
          control={control}
          defaultValue={coupon_title}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'쿠폰명을 입력해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>

      <Descriptions.Item span={4} label={'관리자 메모'}>
        <Controller
          name={`coupon_memo`}
          control={control}
          defaultValue={coupon_memo}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <TextAreas height={100} value={value || null} placeholder={'쿠폰에 대한 설명을 작성해주세요'} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={4} label={'노출 여부'}>
        <Controller
          name="coupon_show"
          control={control}
          defaultValue={coupon_show}
          render={({ field: { ref, value, ...rest }, fieldState }) => {
            return <Radios options={show_radioList} value={value} {...rest} />;
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CouponBasicSection;
