import { DetailPageTitle, PromotionBasicSection, PromotionImageSection, PromotionStoreSection } from '@/components/molecules';
import { CardContainer, Form, RowGrid, Buttons, DividingLine } from '@/components/atom';
import { useForm } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import moment from 'moment';
import {
  AppNoticeBasicSection,
  AppNoticeDateSection,
  AppNoticeDetailBasicSection,
  AppNoticeDetailDateSection,
} from '@/components/molecules/DevCreatement';

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

const AppNoticeDetailTemplate = ({}) => {
  const [channel, setChannel] = useState('point');
  const [fileList, setFileList] = useState([]);

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
      <NoticeLabel title={'👉🏼 바슈롬 소비자 앱의 공지팝업을 확인 및 수정할 수 있는 상세 페이지입니다.'} />
      <DividingLine border={false} />
      <Form>
        <CardContainer>
          {/* 기본 설정 */}
          <AppNoticeDetailBasicSection fileList={fileList} control={control} handleRadioChange={handleRadioChange} />
          <DividingLine border={false} />

          {/* 스토어 설정 */}
          <PromotionStoreSection control={control} />
          <DividingLine border={false} />

          {/* 프로모션 이미지 */}
          <AppNoticeDetailDateSection />
        </CardContainer>
        <DividingLine border={false} />

        {/* 하단 버튼 */}
        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'취소'} htmlType={'button'} onClick={() => router.push('/app/notice/pop-up')} />
            <Buttons type={'primary'} name={'수정하기'} onClick={handleAddData} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default AppNoticeDetailTemplate;
