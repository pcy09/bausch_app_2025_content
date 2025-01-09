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
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  InputSearchAtom,
  RowGrid,
  SelectBox,
  SelectInputSearchAtom,
  ShowStatus,
} from '@/components/atom';
import { DownloadOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import OpticianSearchBox from '@/components/molecules/SearchBox/OpticianSearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { getOpticianListAction, opticianReset } from '@/store/reducers/admin/opticianReducer';
import NoticeLabel from '@/components/atom/Notice';
import { Form, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AdminSupportFaqSearchBox, AdminSupportNewsSearchBox } from '@/components/molecules/SearchBox';
import { CATEGORY_OPTIONS, SHOW_OPTIONS } from '@/common/options';

const tabMenuList = () => {
  return [
    {
      label: 'BAUSCH Point',
      key: 'P',
    },
    {
      label: 'BAUSCH App',
      key: 'A',
    },
    {
      label: 'Lesnly',
      key: 'L',
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
    title: '답변',
    dataIndex: 'data4',
    align: 'center',
  },
  {
    title: '조회수',
    dataIndex: 'data5',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'data6',
    align: 'center',
  },
  {
    title: '노출 여부',
    dataIndex: 'data7',
    align: 'center',
    render: (value, record) => <ShowStatus options={options} value={value} />,
  },
];

const opticianList = [
  {
    data1: '1',
    data2: '기타',
    data3: '바슈롬 신제품-커스텀 렌즈 출시',
    data4: '제품 유효기간은. 제조일로 부터...',
    data5: '200',
    data6: '2024-02-05',
    data7: 'Y',
    key: 111,
  },
  {
    data1: '2',
    data2: '기타',
    data3: '바슈롬 신제품-커스텀 렌즈 출시',
    data4: '제품 유효기간은. 제조일로 부터...',
    data5: '11',
    data6: '2024-02-05',
    data7: 'N',
    key: 222,
  },
  {
    data1: '3',
    data2: '기타',
    data3: '바슈롬 신제품-커스텀 렌즈 출시',
    data4: '제품 유효기간은. 제조일로 부터...',
    data5: '320',
    data6: '2024-02-05',
    data7: 'Y',
    key: 333,
  },
];

const showStatusOptions = SHOW_OPTIONS;
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

const AdminSupportFaqListTemplate = () => {
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
  const list = ['제목', '답변'];
  const handleSearch = data => {
    console.log(data);
  };
  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼POINT site, LESLY site, App 채널의 FAQ 리스트입니다. 각 채널의 FAQ를 관리할 수 있습니다.'} />
        <Buttons
          type={'dashed'}
          icon={<SettingOutlined />}
          name={'카테고리 관리'}
          onClick={() => push('/admin/support/faq/set-category')}
          css={marginRightStyle(10)}
        />
      </div>
      <DividingLine border={false} />

      <Tabs onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)} type="line" centered size={'middle'} items={tabMenuList()} />

      <AdminSupportFaqSearchBox showStatusOption={showStatusOptions} categoryOptions={categoryOptions} onHandleSearchData={getInitData} />

      <CardContainer>
        <ListHeaderSection handleSearch={handleSearch} list={list} total={paging?.total} select={selectedRowKeys?.length} />

        <Tables
          onSelectListItem={selectListItem}
          selectedRowKeys={selectedRowKeys}
          checkbox
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

      <CardContainer>
        <ListFooterSection goRouterHandler={goRouterHandler} showButton={true} showRightBtn={true} rtText="등록" />
      </CardContainer>
    </>
  );
};

export default AdminSupportFaqListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
