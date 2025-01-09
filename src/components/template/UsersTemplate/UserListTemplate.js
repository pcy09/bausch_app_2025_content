import Tables from '../../atom/Tables';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, SelectBox } from '@/components/atom';
import { contentsContainerStyle, marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { PageTitle, UserSearchBox } from '@/components/molecules';
import { css } from '@emotion/react';
import { DownloadOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTabMenu, getUserListAction, updateManyUserStatusAction } from '@/store/reducers/userReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { Tabs } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { useRouter } from 'next/router';

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    width: 40,
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'user_name',
    width: 150,
    align: 'center',
  },
  {
    title: '이메일',
    dataIndex: 'user_email',
  },
  {
    title: '휴대폰번호',
    dataIndex: 'user_phone',
    width: 150,
    align: 'center',
  },
  {
    title: '가입일',
    dataIndex: 'user_register_date',
    width: 130,
    align: 'center',
  },
  {
    title: '근시(좌/우)',
    dataIndex: 'user_shortSight',
    width: 110,
    align: 'center',
  },
  {
    title: '난시(좌/우)',
    dataIndex: 'user_astigmatic',
    width: 110,
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'user_status_name',
    width: 80,
    align: 'center',
    render: text => <span css={statusColorStyle(text)}>{text}</span>,
  },
];

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

const UsersTemplate = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.user.userList);
  const pagination = useSelector(state => state.user.paging);
  const search = useSelector(state => state.user.search);
  const tab = useSelector(state => state.user.tab);

  const { query } = useRouter();

  // 회원 상태 코드 custom hooks
  const [userStatusCode, findUserStatusCode] = useCommonCode('userStatusCode');

  // 탭 메뉴 상태
  // const [tabMenu, setTabMenu] = useState('L');

  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  // 회원 상태 변경
  const onSubmit = data => handleSendData(data);

  // 리스트 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 회원 상태 변경 함수
  const handleSendData = data => {
    if (data.user_status) {
      const sendObject = {
        ...data,
        ids: selectedRowKeys,
      };
      const params = {
        pageSize: pagination.pageSize,
        offset: pagination.current,
        status: tab,
        ...search,
      };
      dispatch(updateManyUserStatusAction({ sendObject, params, findUserStatusCode }));

      setSelectedRowKeys([]);
      setValue('user_status', '');
    } else {
      dispatch(
        errorSnackOpen({
          message: '상태 변경 실패',
          description: '변경할 상태를 선택해주세요.',
        }),
      );
    }
  };

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e) => {
    setSelectedRowKeys([]);
    dispatch(changeTabMenu({ tab: key }));
    const params = {
      pageSize: pagination.pageSize,
      offset: 1,
      status: key,
      ...search,
    };
    getUserListData(params);
  };
  // 탭 메뉴 배열 만들기
  const tabMenuList = () => {
    return userStatusCode?.map(el => {
      return {
        ...el,
        key: el.value,
        children: renderUserList(),
      };
    });
  };
  // table component
  const renderUserList = () => {
    return (
      <Tables
        checkbox
        listData={usersData}
        pagination={pagination}
        handleChangePageOption={getUserListData}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        onSelectListItem={selectListItem}
        option={
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="user_status"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <SelectBox css={selectStyle} options={userStatusCode} placeholder={'회원 상태 선택'} {...rest} />
              )}
            />
            <Buttons type={'default'} name={'상태 변경'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </Form>
        }
      />
    );
  };

  // 회원 리스트 호출
  const getUserListData = useCallback(
    params => {
      dispatch(
        getUserListAction({
          params: {
            ...params,
            status: params?.status ?? tab,
          },
          findUserStatusCode,
        }),
      );
    },

    [findUserStatusCode, tab, dispatch],
    // console.log(findUserStatusCode)
  );

  useEffect(() => {
    if (findUserStatusCode) {
      const params = {
        pageSize: pagination.pageSize,
        offset: 1,
        status: tab,
        ...search,
      };

      getUserListData(params);
    }
  }, [findUserStatusCode, getUserListData, pagination, search, tab]);

  return (
    <>
      <DividingLine border={false} />
      <UserSearchBox options={options} onGetUserListData={getUserListData} />

      <CardContainer>
        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{pagination?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} css={marginRightStyle(5)} />
          </ColGrid>
        </RowGrid>
        <Tabs onTabClick={(key, e) => handleChangeTabMenu(key, e)} activeKey={tab} type="card" centered size={'smail'} items={tabMenuList()} />
        {/*<Tables checkbox listData={usersData} pagination={pagination} handleChangePageOption={getUserListData} columns={columns} />*/}
      </CardContainer>
    </>
  );
};

export default UsersTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const statusColorStyle = text => css`
  ${text === '정상' &&
  `
    color: #141414;
  `}

  ${text === '휴먼' &&
  `
    color: #fa8c16;
  `}

  ${text === '삭제 대기' &&
  `
    color: #f5222d;
  `}
  font-weight: bold;
`;

const selectStyle = css`
  width: 39%;
`;
