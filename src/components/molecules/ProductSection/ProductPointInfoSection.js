import { Descriptions } from 'antd';
import { Buttons, CardContainer, Inputs } from '@/components/atom';
import { Controller } from 'react-hook-form';

const ProductPointInfoSection = ({ control, getValues }) => {
  const handleSaveBasicInfo = () => {
    console.log(getValues());
  };

  const renderSaveButton = () => {
    return <Buttons onClick={handleSaveBasicInfo} name={'저장'} type={'default'} htmlType={'button'} />;
  };

  return (
    <CardContainer size="default" title={'포인트 정보'} bordered={false}>
      <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
        <Descriptions.Item span={1} label="포인트 비율">
          <Controller
            name="productName"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'제품명을 입력해주세요.'} {...rest} />}
          />
        </Descriptions.Item>

        <Descriptions.Item span={2} label="포인트 지급">
          <Controller
            name="productName"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'제품명을 입력해주세요.'} {...rest} />}
          />
        </Descriptions.Item>
        <Descriptions.Item span={3} label="포인트 소멸기준">
          <Controller
            name="productName"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'제품명을 입력해주세요.'} {...rest} />}
          />
        </Descriptions.Item>
      </Descriptions>
    </CardContainer>
  );
};

export default ProductPointInfoSection;
