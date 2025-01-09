import { contentsContainerStyle, marginBottomStyle, marginLeftStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { PageTitle, UserSearchBox } from '@/components/molecules';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, SelectBox, SelectInputSearchAtom } from '@/components/atom';

import Tables from '../../atom/Tables';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getOpticianListAction, opticianReset } from '@/store/reducers/admin/opticianReducer';
import CustomerSupportSearchBox from '@/components/molecules/SearchBox/CustomerSupportSearchBox';
import NoticeLabel from '@/components/atom/Notice';
import { Tabs } from 'antd';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// 탭 메뉴 배열 만들기
const tabMenuList = () => {
  return [
    {
      label: 'Lensly',
      key: 'R',
    },
    {
      label: 'Point',
      key: 'S',
    },
    {
      label: 'App',
      key: 'D',
    },
  ];
};

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    width: 40,
    align: 'center',
  },
  {
    title: '뉴스 제목',
    dataIndex: 'fsStoreName',
    align: 'center',
  },
  {
    title: '조회수',
    dataIndex: 'fiStoreID',
    align: 'center',
  },
  {
    title: '작성자',
    dataIndex: 'fsStoreAddr1',
  },
  {
    title: '작성일',
    dataIndex: 'fsStoreABC',
    align: 'center',
  },
  {
    title: '발행 여부',
    dataIndex: 'store_show_status',
    align: 'center',
    render: (text, record) => (
      <SelectBox options={publishStatusOptions} placeholder="Select status" defaultValue={text === '발행' ? '발행' : '비발행'} />
    ),
  },
];

const publishStatusOptions = [
  { label: '발행', value: '발행' },
  { label: '비발행', value: '비발행' },
];

const selectOptions = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'Y',
    label: '발행',
  },
  {
    value: 'N',
    label: '미발행',
  },
];

// 테이블 검색 옵션
const options = [
  {
    value: 'user_name',
    label: '이름',
  },
  {
    value: 'user_email',
    label: '이메일',
  },
  {
    value: 'user_phone',
    label: '휴대폰번호',
  },
];

const CustomerSupportList = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { register, control, handleSubmit } = useForm();

  const { opticianList, paging } = useSelector(state => state.optician);

  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    getInitData();

    return () => {
      dispatch(opticianReset());
    };
  }, []);

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e) => {
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

  const handleChangeCreate = () => {
    push(`/point/cs/create`);
  };

  return (
    <>
      <NoticeLabel title={'👉🏼POINT site, LESLY site, App 채널에 바슈롬 소식을 업로드하는 뉴스 리스트입니다. 각 채널의 뉴스를 관리할 수 있습니다. '} />
      <DividingLine border={false} />
      <Tabs onTabClick={(key, e) => handleChangeTabMenu(key, e)} type="line" centered size={'smail'} items={tabMenuList()} />
      {/* 필터 박스 */}
      <CustomerSupportSearchBox selectOptions={selectOptions} onHandleSearchData={getInitData} />

      <CardContainer>
        <RowGrid css={tableRowStyle(12, 'center')}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{paging?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={tableSearch}>
            <SelectInputSearchAtom options={options} control={control} />
          </ColGrid>
        </RowGrid>
        <Tables
          onSelectListItem={selectListItem}
          checkbox
          selectedRowKeys={selectedRowKeys}
          listData={opticianList}
          columns={columns}
          pagination={paging}
          optionBtn={'뉴스 등록'}
          optionClick={handleChangeCreate}
          handleChangePageOption={getInitData}
          option={
            // handleSubmit(onSubmit)
            <Form onSubmit={''}>
              <Buttons type={'danger'} name="삭제" htmlType={'danger'} css={marginLeftStyle(5)}></Buttons>
            </Form>
          }
        />
      </CardContainer>
    </>
  );
};

export default CustomerSupportList;
