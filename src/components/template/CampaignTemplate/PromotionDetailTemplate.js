import { DetailPageTitle, PromotionBasicSection, PromotionImageSection, PromotionStoreSection } from '@/components/molecules';
import { CardContainer, Form, RowGrid, Buttons, DividingLine } from '@/components/atom';
import { useForm } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import moment from 'moment';

// 날짜 형식
const dateFormat = 'YYYY-MM-DD';
// 이미지 더미
const image_dummy = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

const PromotionDetailTemplate = ({}) => {
  const [channel, setChannel] = useState('point');

  const router = useRouter();
  const { query } = router;

  const {
    handleSubmit,
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
      <NoticeLabel title={'👉🏼 바슈롬에서 진행하는 프로모션 상세 페이지이며, 프로모션 정보에 대한 확인 및 수정이 가능합니다.'} />
      <DividingLine border={false} />
      <Form>
        <CardContainer>
          {/* 기본 설정 */}
          <PromotionBasicSection
            pro_date={[moment('2015-01-01', dateFormat), moment('2016-01-01', dateFormat)]}
            pro_channel={'point'}
            pro_title={'울트라 원데이 할인행사'}
            pro_subTitle={'울트라 원데이 할인행사'}
            pro_memo={'울트라 원데이 할인행사 - 일반 안경원 대상'}
            pro_show={'Y'}
            control={control}
            handleRadioChange={handleRadioChange}
          />
          <DividingLine border={false} />

          {/* 스토어 설정 */}
          <PromotionStoreSection control={control} />
          <DividingLine border={false} />

          {/* 프로모션 이미지 */}
          <PromotionImageSection pro_detail={image_dummy} pro_thumb={image_dummy} channel={channel} />
        </CardContainer>
        <DividingLine border={false} />

        {/* 하단 버튼 */}
        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'취소'} htmlType={'button'} onClick={() => router.push('/admin/campaign/promotion')} />
            <Buttons type={'primary'} name={'등록하기'} onClick={handleAddData} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default PromotionDetailTemplate;
