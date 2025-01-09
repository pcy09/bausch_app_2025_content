import NoticeLabel from '@/components/atom/Notice';
import PromotionSearchBox from '@/components/molecules/SearchBox/PromotionSearchBox';
import { useDispatch } from 'react-redux';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import PromotionListSection from '@/components/molecules/DevCreatement_kyj/PromotionListSection';
import { useState } from 'react';
import { Tabs } from 'antd';
import { Buttons, CardContainer, DividingLine, RowGrid } from '@/components/atom';
import { contentsContainerStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { DownloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { SHOW_OPTIONS } from '@/common/options';
import AppNoticeListSection from '@/components/molecules/DevCreatement_kyj/AppNoticeListSection';
import { css } from '@emotion/react';

const AppNoticeListTemplate = ({}) => {
  // 체크박스 선택 값
  const [selectedPromotionKeys, setSelectedPromotionKeys] = useState([]);
  const router = useRouter();

  // 아이템 선택
  const selectPromotionListItem = newSelectedPromotionKeys => {
    setSelectedPromotionKeys(newSelectedPromotionKeys);
  };
  const dispatch = useDispatch();
  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

  const promotionSearchCode = SHOW_OPTIONS;

  const handleChangeTabMenu = (key, e) => {
    console.log(key);
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬 소비자 앱의 공지 팝업을 관리하는 리스트 페이지입니다. '} />
      <DividingLine border={false} />
      {/* 탭 */}
      {/* 필터 */}
      <PromotionSearchBox selectOptions={promotionSearchCode} onHandleSearchData={getInitData} />
      {/* 테이블 */}
      <AppNoticeListSection selectPromotionListItem={selectPromotionListItem} />
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid css={buttonRightStyle}>
          <Buttons type={'primary'} name={'팝업 등록'} htmlType={'submit'} onClick={() => router.push('/app/notice/pop-up/sub')} />
        </RowGrid>
      </CardContainer>
    </>
  );
};

export default AppNoticeListTemplate;

const buttonRightStyle = css`
  dispay: flex;
  justify-content: right;
`;
