import { CardContainer, ColGrid, Form, Inputs, RowGrid } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Checkbox, Descriptions } from 'antd';

const form_data = [
  {
    label: '비밀번호 변경',
    input_name: 'pw',
    input_type: 'password',
    defaultValue: '',
    placeholder: '4~13자 영문 또는 숫자 사용',
  },
  {
    label: '비밀번호 확인',
    input_name: 'pw_confirm',
    input_type: 'password',
    defaultValue: '',
    placeholder: '동일한 비밀번호를 입력해주세요',
  },
];

const PwResetFormSection = ({ control, watch }) => {
  return (
    <CardContainer>
      <Descriptions title={'비밀번호 변경'} labelStyle={{ width: '150px', textAlign: 'center' }} bordered={true} column={4}>
        <Descriptions.Item label={'비밀번호 변경'} span={2}>
          <Controller
            name={'pw'}
            control={control}
            defaultValue={''}
            rules={{
              required: '비밀번호를 입력해주세요.', // 필수 입력값에 대한 에러 메시지
              minLength: {
                value: 4,
                message: '4자 이상 입력해주세요.',
              },
              maxLength: {
                value: 13,
                message: '13자 이하로 입력해주세요.',
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]*$/,
                message: '숫자, 영문, 특수문자만 입력 가능합니다.',
              },
            }}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type={'password'} placeholder={'4~13자 영문 또는 숫자 사용'} value={value} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item label={'비밀번호 확인'} span={2}>
          <Controller
            name={'pw_confirm'}
            control={control}
            defaultValue={''}
            rules={{
              required: '비밀번호 확인값을 입력해주세요. ', // 필수 입력값에 대한 에러 메시지
              minLength: {
                value: 4,
                message: '4자 이상 입력해주세요.',
              },
              maxLength: {
                value: 13,
                message: '13자 이하로 입력해주세요.',
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]*$/,
                message: '숫자, 영문, 특수문자만 입력 가능합니다.',
              },
              validate: value => value === watch('pw') || '비밀번호가 일치하지 않습니다.',
            }}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type={'password'} placeholder={'4~13자 영문 또는 숫자 사용'} value={value} {...rest} />
            )}
          />
        </Descriptions.Item>
      </Descriptions>
    </CardContainer>
  );
};

export default PwResetFormSection;
