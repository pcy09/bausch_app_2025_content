import { Buttons, CardContainer, DividingLine, Form, RowGrid } from '@/components/atom';
import { useForm } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { BannerBasicSection, BannerShowSection, DetailPageTitle, PromotionStoreSection } from '@/components/molecules';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// 날짜 형식
const dateFormat = 'YYYY-MM-DD';

const BannerSubTemplate = ({}) => {
  const [fileList, setFileList] = useState([]);
  const [channel, setChannel] = useState('point');

  const dispatch = useDispatch();

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

  return (
    <>
      <NoticeLabel title={'👉🏼POINT site, App 채널에 노출되는 배너를 등록하는 페이지입니다. '} />
      <DividingLine border={false} />
      <Form>
        {/* 기본 정보 */}
        <CardContainer size={'default'} bordered={false}>
          <BannerBasicSection
            control={control}
            banner_channel={channel}
            setChannel={setChannel}
            setValue={setValue}
            banner_title={''}
            banner_image={fileList}
            setFileList={setFileList}
            banner_link={''}
            banner_target={'Y'}
          />
        </CardContainer>
        <DividingLine border={false} />

        {/* 스토어 설정 */}
        {channel === 'point' && (
          <>
            <CardContainer size={'default'} bordered={false}>
              <PromotionStoreSection control={control} />
            </CardContainer>
            <DividingLine border={false} />
          </>
        )}

        {/* 노출 정보 */}
        <CardContainer size={'default'} bordered={false}>
          <BannerShowSection control={control} banner_show={'Y'} banner_date={[]} />
        </CardContainer>
        <DividingLine border={false} />

        {/* 버튼 */}
        <CardContainer size={'default'} bordered={false}>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'취소'} htmlType={'button'} onClick={() => router.push('/admin/support/banner')} />
            <Buttons type={'primary'} name={'등록'} onClick={handleAddData} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default BannerSubTemplate;
