import { Buttons, CardContainer, DividingLine, Form, ShowStatus, Tables } from '@/components/atom';
import NoticeLabel from '@/components/atom/Notice';
import { ListHeaderSection, PageTitle } from '@/components/molecules';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { descStyle, marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SHOW_OPTIONS } from '@/common/options';
import TermsListSearchBox from '@/components/molecules/SearchBox/TermsListSearchBox';

const showStatusOption = SHOW_OPTIONS;
const options = [
  {
    value: 'Y',
    label: '노출',
  },
  {
    value: 'N',
    label: '비노출',
  },
];

const TermsListTemplate = ({}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { push, puery, asPath } = useRouter();
  const { register, control, handleSubmit } = useForm();

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e, url) => {
    if (key === 'A') {
      //NOTE: 리스트 데이터 Dispatch
    } else if (key === 'P') {
      //NOTE: 리스트 데이터 Dispatch
    } else {
      //NOTE: 리스트 데이터 Dispatch
    }
  };

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
      {
        label: 'LENSLY',
        key: 'L',
      },
    ];
  };

  const bannerListItem = [
    {
      banner_name: '0.2v',
      banner_add_date: '개인정보 관리',
      banner_date: '2024-2-16',
      banner_category: '개인정보 관리(2024)',
      banner_show_status: 'Y',
      key: 111,
    },
    {
      banner_name: '0.2v',
      banner_add_date: '개인정보 관리2',
      banner_date: '2024-3-10',
      banner_category: '개인정보 관리(2025)',
      banner_show_status: 'N',
      key: 222,
    },
    {
      banner_name: '0.2v',
      banner_add_date: '개인정보 관리3',
      banner_date: '2024-2-30',
      banner_category: '개인정보 관리(2026)',
      banner_show_status: 'Y',
      key: 333,
    },
  ];

  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: '버전',
      dataIndex: 'banner_name',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'banner_add_date',
      align: 'center',
    },
    {
      title: '카테고리',
      dataIndex: 'banner_category',
      align: 'center',
    },
    {
      title: '등록일',
      dataIndex: 'banner_date',
      align: 'center',
    },
    {
      title: '노출 여부',
      dataIndex: 'banner_show_status',
      align: 'center',
      render: (value, record) => <ShowStatus options={options} value={value} />,
    },
  ];

  const { opticianList, paging } = useSelector(state => state.optician);

  const goRouterHandler = () => {
    push('/admin/support/terms/sub');
  };

  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };
  // 리스트 셀렉트 박스 라벨
  const list = ['제목'];
  const handleSearch = data => {
    console.log(data);
  };
  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼바슈롬 포인트, 바슈롬 앱, 렌즐리의 약관 및 정책을 관리할 수 있습니다. '} />
      </div>
      {/* 탭 */}
      <DividingLine border={false} />
      <Tabs onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)} type="line" centered size={'middle'} items={tabMenuList()} />
      {/* 서치 */}
      <TermsListSearchBox showStatusOption={showStatusOption} />
      {/* 리스트 */}
      <CardContainer>
        <ListHeaderSection handleSearch={handleSearch} list={list} total={1350} select={selectedRowKeys?.length} />

        <Tables
          onSelectListItem={selectListItem}
          selectedRowKeys={selectedRowKeys}
          checkbox
          listData={bannerListItem}
          columns={columns}
          pagination={paging}
          handleChangePageOption={getInitData}
          option={
            <Form onSubmit={''}>
              <Buttons type={'danger'} name="삭제" htmlType={'danger'} css={marginLeftStyle(5)}></Buttons>
            </Form>
          }
        />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <ListFooterSection goRouterHandler={goRouterHandler} showButton={true} showRightBtn={true} rtText="약관 등록" />
      </CardContainer>
    </>
  );
};

export default TermsListTemplate;
