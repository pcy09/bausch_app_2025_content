import { Buttons, CardContainer, Form, RowGrid } from '@/components/atom';
import { CategoryAddSection, CategoryListSection, DetailPageTitle } from '@/components/molecules';
import { Tabs } from 'antd';
import { useState } from 'react';
import { css } from '@emotion/react';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';

// BAUSCH point 더미 리스트
const point_default_list = [];
for (let i = 0; i < 5; i++) {
  point_default_list.push({
    id: i,
    text: `테스트${i}`,
    length: i,
    disabled: true,
  });
}

// BAUSCH app 더미 리스트
const app_default_list = [];
for (let i = 0; i < 5; i++) {
  app_default_list.push({
    id: i + 5,
    text: `테스트${i}`,
    length: i,
    disabled: true,
  });
}

// 렌즐리 더미 그룹 리스트
const lensly_default_list = [];
for (let i = 0; i < 5; i++) {
  lensly_default_list.push({
    id: i + 10,
    text: `테스트${i}`,
    length: i,
    disabled: true,
  });
}

const InquiryOneCategoryTemplate = ({}) => {
  const [pointList, setPointList] = useState(point_default_list);
  const [appList, setAppList] = useState(app_default_list);
  const [lenslyList, setLenslyList] = useState(lensly_default_list);

  const [pointBlock, setPointBlock] = useState(false);
  const [appBlock, setAppBlock] = useState(false);
  const [lenslyBlock, setLenslyBlock] = useState(false);

  const router = useRouter();

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e) => {
    console.log(key);
  };

  const children = (list, setList, block, setBlock) => (
    <div css={section_wrapper_style}>
      {/* 등록 */}
      <CardContainer>
        <CategoryAddSection list={list} setList={setList} block={block} />
      </CardContainer>

      {/* 리스트 */}
      <CategoryListSection list={list} setList={setList} block={block} setBlock={setBlock} />
      {/* 버튼 */}
      <CardContainer size={'default'} bordered={false}>
        <RowGrid justify="space-between">
          <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => router.push('/admin/support/inquiry-one')} />
        </RowGrid>
      </CardContainer>
    </div>
  );

  // 탭 메뉴 배열 만들기
  const tabMenuList = () => {
    return [
      {
        label: 'BAUSCH Point',
        key: 'A',
        children: children(pointList, setPointList, pointBlock, setPointBlock),
      },
      {
        label: 'BAUSCH App',
        key: 'B',
        children: children(appList, setAppList, appBlock, setAppBlock),
      },
      {
        label: 'Lensly',
        key: 'C',
        children: children(lenslyList, setLenslyList, lenslyBlock, setLenslyBlock),
      },
    ];
  };

  return (
    <>
      <Tabs onTabClick={(key, e) => handleChangeTabMenu(key, e)} defaultActiveKey={'A'} type="line" centered size={'small'} items={tabMenuList()} />
    </>
  );
};

export default InquiryOneCategoryTemplate;

const section_wrapper_style = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
`;

const list_wrapper_style = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 5px;
`;

const row_style = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const col_style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const button_col_style = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;
