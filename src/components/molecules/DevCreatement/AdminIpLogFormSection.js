import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, Label, RowGrid } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Descriptions } from 'antd';

const AdminIpLogFormSection = ({ form_data, addSubmit }) => {
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => addSubmit(data);
  const onError = errors => console.log('fail', errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <CardContainer>
        <Descriptions labelStyle={{ width: '150px' }} bordered={true} column={6}>
          {form_data.map((item, index) => (
            <>
              <Descriptions.Item span={3} label={item.title}>
                <Controller
                  name={item.input_name}
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <Inputs type={item.input_type} placeholder={item.placeholder} value={value || null} {...rest} />
                  )}
                />
              </Descriptions.Item>
            </>
          ))}
        </Descriptions>
        <DividingLine border={false} />
        <RowGrid css={buttonRowStyle}>
          <Buttons type={'primary'} htmlType={'submit'} name={'IP 등록'} />
        </RowGrid>
      </CardContainer>
    </Form>
  );
};

export default AdminIpLogFormSection;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
