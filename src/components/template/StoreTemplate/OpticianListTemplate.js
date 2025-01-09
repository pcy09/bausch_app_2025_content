import { contentsContainerStyle, descStyle, marginBottomStyle, marginLeftStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection, PageTitle } from '@/components/molecules';
import { Buttons, CardContainer, ColGrid, DividingLine, InputSearchAtom, RowGrid, SelectBox, SelectInputSearchAtom } from '@/components/atom';
import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import OpticianSearchBox from '@/components/molecules/SearchBox/OpticianSearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { getOpticianListAction, opticianReset } from '@/store/reducers/admin/opticianReducer';
import NoticeLabel from '@/components/atom/Notice';
import { Form } from 'antd';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { OPTICIAN_STATUS_OPTIONS } from '@/common/options';
import { OpticianStatus } from '@/components/atom/TableAtoms';

const columns = [
  {
    title: '안경사 코드',
    dataIndex: 'data1',
    align: 'center',
  },
  {
    title: '안경사',
    dataIndex: 'data2',
    align: 'center',
  },
  {
    title: '휴대폰 번호',
    dataIndex: 'data3',
    align: 'center',
  },
  {
    title: '스토어 코드',
    dataIndex: 'data4',
    align: 'center',
  },
  {
    title: '스토어 명',
    dataIndex: 'data5',
    align: 'center',
  },
  {
    title: '등록일',
    dataIndex: 'data6',
    align: 'center',
  },
  {
    title: '업데이트일',
    dataIndex: 'data7',
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'data8',
    width: 100,
    align: 'center',
    render: value => <OpticianStatus value={value} options={showStatusOptions} />,
  },
];

const showStatusOptions = [
  { label: '재직', value: 'work' },
  { label: '퇴직', value: 'retire' },
];
const selectOptions = OPTICIAN_STATUS_OPTIONS;
const OpticianListTemplate = () => {
  // TODO: 추가할 것 체크박스 선택 값
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { push } = useRouter();
  const onSubmit = data => handleSendData(data);
  const dispatch = useDispatch();
  const { paging } = useSelector(state => state.optician);
  const opticianList = [
    {
      data1: '123123123',
      data2: '아큐브',
      data3: '010-1111-1111',
      data4: '111111',
      data5: '바슈롬 성남',
      data6: '2024-09-11',
      data7: '2024-09-11',
      data8: 'work',
      key: 111,
    },
    {
      data1: '123123123',
      data2: '안경 나라',
      data3: '010-2222-2222',
      data4: '123123',
      data5: '바슈롬 성남',
      data6: '2024-09-11',
      data7: '2024-09-11',
      data8: 'retire',
      key: 222,
    },
    {
      data1: '123123123',
      data2: '바슈롬',
      data3: '010-3333-3333',
      data4: '321312',
      data5: '바슈롬 성남',
      data6: '2024-09-11',
      data7: '2024-09-11',
      data8: 'work',
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

  const handleSendData = data => {
    const sendObject = {
      ...data,
      ids: selectedRowKeys,
    };

    // const params = {
    //   pageSize: pagination.pageSize,
    //   offset: pagination.current,
    //   status: tab,
    //   ...search,
    // };

    dispatch(productDeleteAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  // TODO: 추가할 것
  // const selectListItem = newSelectedRowKeys => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
    push('/admin/store/optician/sub');
  };
  // 리스트 셀렉트 박스 라벨
  const list = ['안경사', '안경사 코드', '휴대폰 번호', '스토어 코드', '스토어명'];
  const handleSearch = data => {
    console.log(data);
  };
  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬의 제품을 취급하는 스토어의 안경사 리스트이며, 안경사 등록 및 수정이 가능합니다.'} />
      <DividingLine border={false} />
      <OpticianSearchBox selectOptions={selectOptions} onHandleSearchData={handleSendData} />
      <CardContainer>
        <ListHeaderSection handleSearch={handleSearch} list={list} total={paging?.total} select={selectedRowKeys?.length} />

        <Tables
          onSelectListItem={selectListItem}
          checkbox
          selectedRowKeys={selectedRowKeys}
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
        <ListFooterSection
          goRouterHandler={goRouterHandler}
          showButton={true}
          showLeftBtn={true}
          showRightBtn={true}
          rtText="안경사 등록"
          lfText="엑셀 다운로드"
        />
      </CardContainer>
    </>
  );
};

export default OpticianListTemplate;
