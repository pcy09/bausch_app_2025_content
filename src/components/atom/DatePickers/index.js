import { DatePicker } from 'antd';
import { Controller } from 'react-hook-form';
const { RangePicker } = DatePicker;
const DatePickers = ({
  period = 'date',
  control,
  title,
  placeholder = ['시작 일', '종료 일'],
  format = 'YYYY-MM-DD',
  name = 'date',
  defaultValue,
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue || null}
    render={({ field: { ref, value, ...rest }, fieldState }) => {
      return <RangePicker picker={period} placeholder={placeholder} value={value || null} format={format} style={{ width: '100%' }} {...rest} />;
    }}
  />
);
export default DatePickers;
