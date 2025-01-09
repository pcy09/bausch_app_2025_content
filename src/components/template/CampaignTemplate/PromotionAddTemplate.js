import { DetailPageTitle, PromotionBasicSection, PromotionImageSection, PromotionStoreSection } from '@/components/molecules';
import { CardContainer, Form, RowGrid, Buttons, DividingLine } from '@/components/atom';
import { useForm } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';

const PromotionAddTemplate = ({}) => {
  const [channel, setChannel] = useState('point');
  const router = useRouter();

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const handleAddData = () => {
    const values = getValues();
    console.log(values);
  };

  const handleRadioChange = e => {
    const value = e.target.value;
    setValue('pro_channel', value);
    setChannel(value);
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬에서 진행하는 프로모션 등록 페이지입니다.'} />
      <DividingLine border={false} />
      <Form>
        {/* 기본 설정 */}
        <CardContainer size={'default'} bordered={false}>
          <PromotionBasicSection
            pro_date={[]}
            pro_channel={'point'}
            pro_title={''}
            pro_subTitle={''}
            pro_memo={''}
            pro_show={'Y'}
            control={control}
            handleRadioChange={handleRadioChange}
          />
          <DividingLine border={false} />

          {/* 스토어 설정 */}
          <PromotionStoreSection control={control} />
          <DividingLine border={false} />

          {/* 프로모션 이미지 */}
          <PromotionImageSection pro_thumb={[]} pro_detail={[]} channel={channel} />
        </CardContainer>
        <DividingLine border={false} />

        {/* 등록,취소 */}
        <CardContainer size={'default'} bordered={false}>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'취소'} htmlType={'button'} onClick={() => router.push('/admin/campaign/promotion')} />
            <Buttons type={'primary'} name={'등록하기'} htmlType={'button'} onClick={handleAddData} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default PromotionAddTemplate;
