import { Buttons, CardContainer, DividingLine, RowGrid } from '@/components/atom';
import { DetailPageTitle, PageTitle, ProductGroupAddSection, ProductGroupList } from '@/components/molecules';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';
import NoticeLabel from '@/components/atom/Notice';
import { useDispatch, useSelector } from 'react-redux';
import { getProductGroupListAction } from '@/store/reducers/admin/productGroupReducer';

const GroupManagementTemplate = ({}) => {
  const dispatch = useDispatch();

  // 그룹 리스트 데이터
  const productGroupList = useSelector(state => state?.productGroup.productBauschGroupList);

  const productLenslyGroupList = useSelector(state => state?.productGroup.productLenslyGroupList);

  const [appList, setAppList] = useState([]);
  const [lenslyList, setLenslyList] = useState([]);

  const [appBlock, setAppBlock] = useState(false);
  const [lenslyBlock, setLenslyBlock] = useState(false);

  const router = useRouter();

  const [activeKey, setActiveKey] = useState('BAUSCH');

  // 탭 메뉴 변경 함수
  const handleTabChange = key => {
    setActiveKey(key);
  };

  // 제품 그룹 리스트가 변경될 때마다 초기화
  useEffect(() => {
    if (productGroupList) {
      const result = productGroupList.map(item => ({
        ...item,
        disabled: true, // 모든 항목을 초기에는 비활성화 상태로 설정
      }));

      setAppList(result);
    }
  }, [productGroupList]);

  useEffect(() => {
    if (productLenslyGroupList) {
      const result = productLenslyGroupList.map(item => ({
        ...item,
        disabled: true, // 모든 항목을 초기에는 비활성화 상태로 설정
      }));

      setLenslyList(result);
    }
  }, [productLenslyGroupList]);

  // 활성 탭 변경 시 데이터 가져오기
  useEffect(() => {
    dispatch(getProductGroupListAction({ tabTypes: activeKey }));
  }, [dispatch, activeKey]);

  // 각 탭에 표시할 내용 정의
  const children = (list, setList, block, setBlock, activeKey = { activeKey }) => {
    return (
      <>
        {/* 등록 */}
        <CardContainer>
          <ProductGroupAddSection list={list} setList={setList} activeKey={activeKey} />
        </CardContainer>
        <DividingLine border={false} />

        {/* 리스트 */}
        <ProductGroupList list={list} setList={setList} block={block} setBlock={setBlock} activeKey={activeKey} />
        <DividingLine border={false} />

        {/* 버튼 */}
        <CardContainer size={'default'} bordered={false}>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'이전'} htmlType={'button'} onClick={() => router.push('/admin/product/manage')} />
          </RowGrid>
        </CardContainer>
      </>
    );
  };

  // 탭 메뉴 배열 만들기
  const tabMenuList = () => {
    return [
      {
        label: 'BAUSCH APP',
        key: 'BAUSCH',
        children: children(appList, setAppList, appBlock, setAppBlock, activeKey),
      },
      {
        label: 'LENSLY',
        key: 'LENSLY',
        children: children(lenslyList, setLenslyList, appBlock, setAppBlock, activeKey),
      },
    ];
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬 제품의 그룹을 설정하는 페이지입니다.'} />
      <DividingLine border={false} />
      <Tabs onTabClick={handleTabChange} defaultActiveKey={activeKey} type="line" centered size={'small'} items={tabMenuList()} />
    </>
  );
};

export default GroupManagementTemplate;
