import { Buttons, CardContainer, Inputs, SelectAtom } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions } from 'antd';
import { descStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { SettingOutlined } from '@ant-design/icons';

const AccountDetailFormSection = ({ control, form_data, selectOption }) => {
  // 비번 리셋 버튼 눌렀을 때
  const handleResetPw = () => {
    if (confirm(`비밀번호를 리셋하시겠습니까?`)) {
      alert('초기화 되었습니다');
    }
  };
  return (
    <CardContainer>
      <Descriptions
        title={
          <div css={descStyle}>
            <div>관리자 정보</div>
            <Buttons onClick={handleResetPw} name={'비밀번호 리셋'} />
          </div>
        }
        labelStyle={{ width: '150px', textAlign: 'center' }}
        bordered={true}
        column={4}>
        {form_data.map((el, index) => {
          if (el.input_type === 'text' || el.input_type === 'tel' || el.input_type === 'email') {
            return (
              <Descriptions.Item label={el.label} span={2} key={index}>
                <Controller
                  name={el.input_name}
                  control={control}
                  defaultValue={el.defaultValue}
                  disabled={el.disabled}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <Inputs type={'text'} placeholder={el.placeholder} value={value || null} {...rest} />
                  )}
                />
              </Descriptions.Item>
            );
          } else if (el.input_type === 'select') {
            return (
              <Descriptions.Item label={el.label} span={2} key={index}>
                <SelectAtom name={el.input_name} defaultValue={el.defaultValue} control={control} options={selectOption} />
              </Descriptions.Item>
            );
          }
        })}
      </Descriptions>
    </CardContainer>
  );
};

export default AccountDetailFormSection;
