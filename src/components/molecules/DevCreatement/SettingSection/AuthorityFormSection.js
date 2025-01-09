import { CardContainer, ColGrid, Form, Inputs, RowGrid } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Checkbox, Descriptions } from 'antd';

const AuthorityFormSection = ({ form_data, options, control }) => {
  return (
    <Descriptions bordered={true} column={4}>
      {form_data.map((el, index) => {
        if (el.input_type === 'text') {
          return (
            <Descriptions.Item key={index} label={el.label} labelStyle={{ width: '80px' }} contentStyle={{ width: '200px' }}>
              <Controller
                name={el.input_name}
                control={control}
                defaultValue={el.defaultValue}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type={el.input_type} placeholder={el.placeholder} value={value || ''} {...rest} />
                )}
              />
            </Descriptions.Item>
          );
        }
        if (el.input_type === 'checkbox') {
          return (
            <Descriptions.Item key={index} label={el.label} span={3}>
              <Controller
                name={el.input_name}
                control={control}
                defaultValue={el.defaultValue}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Checkbox.Group
                    options={options} // Each level's property names will be used here
                    value={value}
                    {...rest}
                  />
                )}
              />
            </Descriptions.Item>
          );
        }
        return null; // If none of the types match, return null
      })}
    </Descriptions>
  );
};

export default AuthorityFormSection;
