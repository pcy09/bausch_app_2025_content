import { contentsContainerStyle, descStyle, marginBottomStyle, marginLeftStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection, PageTitle, UserSearchBox } from '@/components/molecules';
import {
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  InputSearchAtom,
  PublishStatus,
  RowGrid,
  SelectBox,
  SelectInputSearchAtom,
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
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AdminSupportNewsSearchBox } from '@/components/molecules/SearchBox';
import { PUBLISH_OPTIONS } from '@/common/options';

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

const columns = [
  {
    title: 'No',
    dataIndex: 'data1',
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'data2',
    align: 'center',
  },
  {
    title: '조회수',
    dataIndex: 'data3',
    align: 'center',
  },
  {
    title: '작성자',
    dataIndex: 'data4',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'data5',
    align: 'center',
  },
  {
    title: '발행 여부',
    dataIndex: 'data6',
    align: 'center',
    render: (value, record) => <PublishStatus options={options} value={value} />,
  },
];

const showStatusOptions = PUBLISH_OPTIONS;
const options = [
  {
    value: 'Y',
    label: '발행',
  },
  {
    value: 'N',
    label: '미발행',
  },
];

const SupportNewsListTemplate = () => {
  // TODO: 추가할 것 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { push, puery, asPath } = useRouter();

  const dispatch = useDispatch();
  const { paging } = useSelector(state => state.optician);
  const opticianList = [
    {
      data1: '1',
      data2: '바슈롬 신제품-커스텀 렌즈 출시',
      data3: '322',
      data4: '홍길동',
      data5: '2024-02-05',
      data6: 'Y',
      key: 111,
    },
    {
      data1: '2',
      data2: '바슈롬 신제품-커스텀 렌즈 출시',
      data3: '1322',
      data4: '홍길동',
      data5: '2024-02-05',
      data6: 'N',
      key: 222,
    },
    {
      data1: '3',
      data2: '바슈롬 신제품-커스텀 렌즈 출시',
      data3: '22',
      data4: '홍길동',
      data5: '2024-02-05',
      data6: 'N',
      key: 333,
    },
  ];

  const { register, control, handleSubmit } = useForm();

  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

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
    push('/admin/support/news/sub');
  };
  // 리스트 셀렉트 박스 라벨
  const list = ['제목', '작성자'];
  const handleSearch = data => {
    console.log(data);
  };
  return (
    <>
      <div css={descStyle}>
        <NoticeLabel
          title={'👉🏼POINT site, LESLY site, App 채널에 바슈롬 소식을 업로드하는 뉴스 리스트입니다. 각 채널의 뉴스를 관리할 수 있습니다. '}
        />
      </div>
      <DividingLine border={false} />

      <Tabs onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)} type="line" centered size={'middle'} items={tabMenuList()} />

      <AdminSupportNewsSearchBox selectOptions={showStatusOptions} onHandleSearchData={getInitData} />

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
        <ListFooterSection goRouterHandler={goRouterHandler} showButton={true} showRightBtn={true} rtText="뉴스 등록" />
      </CardContainer>
    </>
  );
};

export default SupportNewsListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
