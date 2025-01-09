import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import NoticeLabel from '@/components/atom/Notice';
import { useRouter } from 'next/router';
import { BannerBasicSection, BannerShowSection, DetailPageTitle, PromotionStoreSection } from '@/components/molecules';
import { contentsContainerStyle, marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { useState } from 'react';
import moment from 'moment';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { useDispatch } from 'react-redux';

// 날짜 형식
const dateFormat = 'YYYY-MM-DD';

const BannerDetailTemplate = ({}) => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const [channel, setChannel] = useState('point');

  const dispatch = useDispatch();
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

  const handlePopup = type => {
    const updateData = {
      show: true,
      type,
    };
    dispatch(openPopupAction(updateData));
  };
  return (
    <>
      <NoticeLabel title={'👉🏼POINT site, App 채널에 노출되는 배너를 수정 및 확인하는 상세 페이지입니다. '} />
      <DividingLine border={false} />
      <Form>
        {/* 기본 정보 */}
        <CardContainer size={'default'} bordered={false}>
          <BannerBasicSection
            control={control}
            banner_channel={channel}
            setChannel={setChannel}
            setValue={setValue}
            banner_title={'신제품 울트라 원데이 난시 출시'}
            banner_image={fileList}
            setFileList={setFileList}
            banner_link={'www.bausch.co.kr'}
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
          <BannerShowSection control={control} banner_show={'Y'} banner_date={[moment('2015-01-01', dateFormat), moment('2016-01-01', dateFormat)]} />
        </CardContainer>
        <DividingLine border={false} />
        {/* 버튼 */}
        <CardContainer size={'default'} bordered={false}>
          <RowGrid justify="space-between">
            <span>
              <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => router.push('/admin/support/banner')} />
              <Buttons
                onClick={() => {
                  handlePopup('delete');
                }}
                type={'danger'}
                name="삭제"
                css={marginLeftStyle(5)}
              />
            </span>
            <Buttons type={'primary'} name={'수정'} onClick={handleAddData} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default BannerDetailTemplate;
