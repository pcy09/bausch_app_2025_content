import { CardContainer, DividingLine, Inputs } from '@/components/atom';
import { Controller } from 'react-hook-form';
import { Descriptions } from 'antd';
import SelectMultiBox from '@/components/atom/SelectMultiBox';
import MultiSelectTabArea from '@/components/atom/MultiSelectTabArea';

const PointInfoSection = ({ control, options, point_name, product_list }) => {
  return (
    <CardContainer size="default" bordered={false}>
      <Descriptions title={'제품 정보'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
        <Descriptions.Item tispan={4} label="적립금 명">
          <Controller
            name="pointGroupName"
            control={control}
            rules={{ required: true }}
            defaultValue={point_name}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" placeholder={'적립금명을 작성해주세요'} value={value || null} {...rest} />
            )}
          />
        </Descriptions.Item>
      </Descriptions>
      <DividingLine />
      <Descriptions title={'적립금 구매가능 제품'} labelStyle={{ width: '250px' }} bordered={true} column={4}>
        <Descriptions.Item span={4} label={'적립금 구매가능 제품'}>
          <Controller
            name="pointProductReqDto"
            control={control}
            render={({ field: { ref, value, label, ...rest }, fieldState }) => {
              return (
                <SelectMultiBox
                  defaultValue={product_list}
                  style={{ width: '100%' }}
                  name="pointProductReqDto"
                  control={control}
                  placeholder={'적립 구매 가능 제품을 선택하세요.'}
                  options={options}
                  value={value}
                  multiple={true}
                  showCheckedStrategy="SHOW_CHILD"
                  {...rest}
                />
              );
            }}
          />
        </Descriptions.Item>
      </Descriptions>
    </CardContainer>
  );
};

export default PointInfoSection;
