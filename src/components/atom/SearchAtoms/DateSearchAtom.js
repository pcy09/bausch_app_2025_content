import { DatePicker, Space } from 'antd';
import { css } from '@emotion/react';
import { Label } from '@/components/atom';
import { searchAtomContainer } from '@/styles/components/atomCommonStyle';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const DateSearchAtom = ({
  handleChangeDate,
  control,
  title,
  period = 'date',
  placeholder = ['시작 일', '종료 일'],
  format = 'YYYY-MM-DD',
  ...props
}) => (
  <div css={searchAtomContainer}>
    <Label title={title} />
    <Space direction="vertical" size={'middle'} css={rangePickerStyle}>
      <Controller
        name="date"
        control={control}
        render={({ field: { ref, value, ...rest }, fieldState }) => {
          return <RangePicker picker={period} placeholder={placeholder} value={value || null} format={format} style={{ width: '100%' }} {...rest} />;
        }}
      />
      {/*<RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} onChange={handleChangeDate} />*/}
    </Space>
  </div>
);
export default DateSearchAtom;

const rangePickerStyle = css`
  width: 100%;
  //margin-left: 8px;
`;
