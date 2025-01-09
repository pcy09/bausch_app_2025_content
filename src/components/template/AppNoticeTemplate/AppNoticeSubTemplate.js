import NoticeLabel from '@/components/atom/Notice';
import { useDispatch } from 'react-redux';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import PromotionListSection from '@/components/molecules/DevCreatement_kyj/PromotionListSection';
import { useState } from 'react';
import { Form, Tabs } from 'antd';
import { Buttons, CardContainer, DividingLine, RowGrid } from '@/components/atom';
import { contentsContainerStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { DownloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { SHOW_OPTIONS } from '@/common/options';
import AppNoticeListSection from '@/components/molecules/DevCreatement_kyj/AppNoticeListSection';
import { css } from '@emotion/react';
import { AppNoticeDetailBasicSection, AppNoticeDetailDateSection, PromotionStoreSection } from '@/components/molecules/DevCreatement';
import { useForm } from 'react-hook-form';

const AppNoticeSubTemplate = ({}) => {
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
      <NoticeLabel title={'👉🏼 바슈롬 소비자 앱의 공지팝업을 등록할 수 있는 등록 페이지입니다. '} />
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
            <Buttons type={'primary'} name={'등록하기'} onClick={handleAddData} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default AppNoticeSubTemplate;

const buttonRightStyle = css`
  dispay: flex;
  justify-content: right;
`;
