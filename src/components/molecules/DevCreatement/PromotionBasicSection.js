import { CardContainer, Inputs, DatePickers, Radios, TextAreas } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions } from 'antd';

// 채널 라디오
const channel_radioList = [
  {
    id: 1,
    value: 'point',
    label: 'BAUSCH POINT',
  },
  {
    id: 2,
    value: 'app',
    label: 'BAUSCH APP',
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

const PromotionBasicSection = ({ control, handleRadioChange, pro_date, pro_channel, pro_title, pro_subTitle, pro_memo, pro_show }) => {
  return (
    <Descriptions title={'기본 설정'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
      <Descriptions.Item span={2} label={'프로모션 ID'}>
        <Controller
          name="pro_id"
          control={control}
          disabled={true}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={''} value={value || 'werwesdvx12312'} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'프로모션 기간'}>
        <DatePickers name="pro_date" control={control} defaultValue={pro_date} />
      </Descriptions.Item>
      <Descriptions.Item span={4} label={'채널'}>
        <Controller
          name="pro_channel"
          control={control}
          defaultValue={pro_channel}
          render={({ field: { ref, onChange, value, ...rest }, fieldState }) => {
            return (
              <Radios
                onChange={e => {
                  handleRadioChange(e);
                }}
                options={channel_radioList}
                value={value}
                {...rest}
              />
            );
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'프로모션 명'}>
        <Controller
          name="pro_title"
          control={control}
          defaultValue={pro_title}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'프로모션명을 입력해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={2} label={'프로모션 부제목'}>
        <Controller
          name="pro_subTitle"
          control={control}
          defaultValue={pro_subTitle}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <Inputs type="text" placeholder={'프로모션 부제목을 입력해주세요'} value={value || null} {...rest} />
          )}
        />
      </Descriptions.Item>

      <Descriptions.Item span={4} label={'관리자 메모'}>
        <Controller
          name={`pro_memo`}
          control={control}
          defaultValue={pro_memo}
          render={({ field: { ref, value, ...rest }, fieldState }) => (
            <TextAreas height={100} value={value || null} placeholder={'프로모션에 대한 설명을 작성해주세요'} {...rest} />
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item span={4} label={'노출 여부'}>
        <Controller
          name="pro_show"
          control={control}
          defaultValue={pro_show}
          render={({ field: { ref, value, ...rest }, fieldState }) => {
            return <Radios options={show_radioList} value={value} {...rest} />;
          }}
          rules={{ required: true }}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PromotionBasicSection;
