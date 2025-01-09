import { Label } from '@/components/atom';
import { marginRightStyle } from '@/styles/components/atomCommonStyle';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';

const LensSelect = ({ label, name, control, options, disabled = false, width = 120, ...props }) => {
  return (
    <div>
      <Label title={label} />
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, value, ...rest }, fieldState }) => {
          return (
            <Select
              {...rest}
              {...props}
              disabled={disabled}
              style={{
                width,
              }}
              options={options}
              value={value}
              placeholder={'선택'}
            />
          );
        }}
        rules={{ required: true }}
      />
    </div>
  );
};

export default LensSelect;
