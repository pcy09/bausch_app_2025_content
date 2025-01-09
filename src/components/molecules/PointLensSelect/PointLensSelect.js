import { Label } from '@/components/atom';
import { marginRightStyle } from '@/styles/components/atomCommonStyle';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';

const PointLensSelect = ({ label, name, control, options, disabled = false, width = 120, resetMyopia }) => {
  return (
    <div>
      <Label title={label} />
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
          return (
            <Select
              {...rest}
              disabled={disabled}
              style={{
                width,
              }}
              options={options}
              value={value}
              onChange={value => {
                onChange(value);
                resetMyopia();
              }}
              placeholder={'선택'}
            />
          );
        }}
        rules={{ required: true }}
      />
    </div>
  );
};

export default PointLensSelect;
