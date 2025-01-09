import NoticeLabel from '@/components/atom/Notice';
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
import { PromotionSearchBox } from '@/components/molecules';

const PromotionTemplate = ({}) => {
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

  const tabMenuList = () => {
    return [
      {
        label: 'BAUSCH POINT',
        key: 'P',
      },
      {
        label: 'BAUSCH APP',
        key: 'A',
      },
    ];
  };

  const handleChangeTabMenu = (key, e) => {
    console.log(key);
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬에서 진행하는 프로모션 리스트입니다'} />
      <DividingLine border={false} />
      {/* 탭 */}
      <Tabs onTabClick={(key, e) => handleChangeTabMenu(key, e)} type="line" centered size={'smail'} items={tabMenuList()} />
      {/* 필터 */}
      <PromotionSearchBox selectOptions={promotionSearchCode} onHandleSearchData={getInitData} />
      {/* 테이블 */}
      <PromotionListSection selectPromotionListItem={selectPromotionListItem} />
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid justify="space-between">
          <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} css={marginRightStyle(10)} />
          <Buttons
            type={'primary'}
            name={'프로모션 등록'}
            htmlType={'submit'}
            css={marginLeftStyle(5)}
            onClick={() => router.push('/admin/campaign/promotion/sub')}
          />
        </RowGrid>
      </CardContainer>
    </>
  );
};

export default PromotionTemplate;
