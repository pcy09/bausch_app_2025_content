import {
  contentsContainerStyle,
  descStyle,
  marginBottomStyle,
  marginLeftStyle,
  marginRightStyle,
  tableSearch,
} from '@/styles/components/atomCommonStyle';
import { ListHeaderSection, PageTitle, UserSearchBox } from '@/components/molecules';
import {
  AnswerStatus,
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  InputSearchAtom,
  RowGrid,
  SelectBox,
  SelectInputSearchAtom,
} from '@/components/atom';

import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { getOpticianListAction, opticianReset } from '@/store/reducers/admin/opticianReducer';
import NoticeLabel from '@/components/atom/Notice';
import { Form, Tabs } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AdminSupportFaqSearchBox, AdminSupportNewsSearchBox } from '@/components/molecules/SearchBox';
import AdminSupportInquirySearchBox from '@/components/molecules/SearchBox/AdminSupportInquirySearchBox';
import { CATEGORY_OPTIONS, SHOW_OPTIONS } from '@/common/options';

const tabMenuList = () => {
  return [
    {
      label: '전체',
      key: '',
    },
    {
      label: '답변대기',
      key: 'A',
    },
    {
      label: '답변완료',
      key: 'C',
    },
  ];
};

const columns = [
  {
    title: 'No',
    dataIndex: 'data1',
    align: 'center',
  },
  {
    title: '카테고리',
    dataIndex: 'data2',
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'data3',
    align: 'center',
  },
  {
    title: '회원 ID',
    dataIndex: 'data4',
    align: 'center',
  },
  {
    title: '문의 날짜',
    dataIndex: 'data5',
    align: 'center',
  },
  {
    title: '처리 날짜',
    dataIndex: 'data6',
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'data7',
    align: 'center',
    render: status => {
      return <AnswerStatus status={status} />;
    },
  },
];

const opticianList = [
  {
    data1: '1',
    data2: '구매 및 교환권',
    data3: '바슈롬 신제품-커스텀 렌즈 출시',
    data4: 'kk22',
    data5: '2024-02-05',
    data6: '2024-02-05',
    data7: '답변완료',
    key: 111,
  },
  {
    data1: '1',
    data2: '구매 및 교환권',
    data3: '바슈롬 신제품-커스텀 렌즈 출시',
    data4: 'kk22',
    data5: '2024-02-05',
    data6: '2024-02-05',
    data7: '답변대기',
    key: 222,
  },
  {
    data1: '1',
    data2: '구매 및 교환권',
    data3: '바슈롬 신제품-커스텀 렌즈 출시',
    data4: 'kk22',
    data5: '2024-02-05',
    data6: '2024-02-05',
    data7: '답변대기',
    key: 333,
  },
];
const AdminSupportInquiryListTemplate = () => {
  // TODO: 추가할 것 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { push, puery, asPath } = useRouter();

  const dispatch = useDispatch();
  const { paging } = useSelector(state => state.optician);

  const { register, control, handleSubmit } = useForm();

  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

  //TODO : 추후 카테고리 데이터 불러서 데이터 작성
  const categoryOptions = CATEGORY_OPTIONS;

  // TODO: 추가할 것
  // const selectListItem = newSelectedRowKeys => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  useEffect(() => {
    getInitData();

    return () => {
      dispatch(opticianReset());
    };
  }, [dispatch, getInitData]);

  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e, url) => {
    if (key === 'A') {
      //NOTE: 리스트 데이터 Dispatch
    } else if (key === 'P') {
      //NOTE: 리스트 데이터 Dispatch
    } else {
      //NOTE: 리스트 데이터 Dispatch
    }
    // setSelectionIds([]);
    // dispatch(changeTabMenu({ tab: key }));
    // const params = {
    //   pageSize: paging.pageSize,
    //   offset: 1,
    //   status: key,
    // };
    // getInitData(params);
  };

  const goRouterHandler = () => {
    push('/admin/support/faq/sub');
  };

  // 리스트 셀렉트 박스 라벨
  const list = ['제목', '회원 ID'];
  const handleSearch = data => {
    console.log(data);
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 App 채널의 1:1 문의 관리 페이지입니다. 1:1 문의 확인 및 답변을 회신할 수 있습니다. '} />
        <Buttons
          type={'dashed'}
          icon={<SettingOutlined />}
          name={'카테고리 관리'}
          onClick={() => push('/admin/support/inquiry-one/set-category')}
          css={marginRightStyle(10)}
        />
      </div>
      <DividingLine border={false} />

      <Tabs onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)} type="line" centered size={'middle'} items={tabMenuList()} />

      <AdminSupportInquirySearchBox categoryOptions={categoryOptions} onHandleSearchData={getInitData} />

      <CardContainer>
        <ListHeaderSection handleSearch={handleSearch} list={list} total={paging?.total} select={selectedRowKeys?.length} />

        <Tables
          onSelectListItem={selectListItem}
          listData={opticianList}
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

      <DividingLine border={false} />
      <CardContainer>
        <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} css={marginRightStyle(10)} />
      </CardContainer>
    </>
  );
};

export default AdminSupportInquiryListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
