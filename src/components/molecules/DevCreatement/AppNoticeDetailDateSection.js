import { DatePickers, Radios } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { Descriptions } from 'antd';

// 새창여부 라디오
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

const AppNoticeDetailDateSection = ({ banner_show, banner_date }) => {
  const {
    control,
    formState: { errors },
  } = useForm({});

  return (
    <Descriptions title={'노출 정보'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item span={4} label={'노출 기간'}>
        <DatePickers name="banner_date" control={control} defaultValue={banner_date} />
      </Descriptions.Item>
      <Descriptions.Item span={4} label={'노출 여부'}>
        <Controller
          name="banner_show"
          control={control}
          defaultValue={banner_show}
          render={({ field: { ref, value, ...rest }, fieldState }) => {
            return <Radios options={show_radioList} value={value} {...rest} />;
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default AppNoticeDetailDateSection;
