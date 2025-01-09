import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, SelectBox, SelectInputSearchAtom, Tables } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { marginLeftStyle, marginRightStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useCommonCode from '@/hooks/useCommonCode';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWithdrawMemberListAction,
  recoveryWithdrawnMemberAction,
  withdrawMemberResetAction,
  withdrawnMemberDeletionAction,
} from '@/store/reducers/admin/withdrawMemberReducer';
import dayjs from 'dayjs';
import ListHeaderSection from '../ListHeaderSection';
import { withdrawnMemberDeletionApi } from '@/api/admin/withdrawnMemberApi';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePagination from '@/hooks/usePagination';

const AdminUserCancelManageListSection = ({}) => {
  const columns = [
    {
      title: '구분',
      dataIndex: 'memberType',
      align: 'center',
    },
    {
      title: '회원명',
      dataIndex: 'memberName',
      align: 'center',
      render: (text, record) => <a href={`/admin/member/${record.memberId}`}>{record.memberName}</a>,
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'memberPhone',
      align: 'center',
    },
    {
      title: '이메일',
      dataIndex: 'memberEmail',
      align: 'center',
    },
    {
      title: '앱 가입일',
      dataIndex: 'appRegDate',
      align: 'center',
      render: (text, record) => `${dayjs(record.appRegDate).format('YYYY-MM-DD')}`,
    },
    {
      title: '최종 로그인',
      dataIndex: 'lastLoginDate',
      align: 'center',
      render: (text, record) => `${dayjs(record.lastLoginDate).format('YYYY-MM-DD')}`,
    },
    {
      title: '휴면전환일',
      dataIndex: 'inActiveDate',
      align: 'center',
      render: (text, record) => `${dayjs(record.inActiveDate).format('YYYY-MM-DD')}`,
    },
    {
      title: '탈퇴일',
      dataIndex: 'withdrawDate',
      align: 'center',
      render: (text, record) => `${dayjs(record.withdrawDate).format('YYYY-MM-DD')}`,
    },
    {
      title: '계정복구',
      dataIndex: 'user_restoration',
      align: 'center',
      render: (text, record) => (
        <Buttons type={'primary'} name="복구" htmlType={'submit'} onClick={() => recoveryConfirmHandler(record.memberId)}></Buttons>
      ),
    },
    {
      title: '바로삭제',
      dataIndex: 'user_delete',
      align: 'center',
      render: (text, record) => (
        <Buttons type={'danger'} name="삭제" htmlType={'danger'} onClick={() => deleteConfirmHandler(record.memberId)}></Buttons>
      ),
    },
  ];
  const router = useRouter();
  const dispatch = useDispatch();
  const withdrawMemberSearchCond = useCommonCode('withdrawMemberSearchCond');
  const withdrawMemberList = useSelector(state => state?.withdrawMember.content);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state.withdrawMember, getWithdrawMemberListAction);

  // 검색 selectOption 정제
  const selectOptions = withdrawMemberSearchCond[0]?.map(item => {
    return {
      label: item.value,
      value: item.key,
    };
  });

  const { control } = useForm();

  useEffect(() => {
    getInitData({ page: 0, size: 10 });
    return () => {
      dispatch(withdrawMemberResetAction());
    };
  }, [getInitData, dispatch]);

  // 삭제모달
  const deleteConfirmHandler = id => {
    Modal.confirm({
      title: '탈퇴 회원 바로 삭제',
      icon: <ExclamationCircleOutlined />,
      content: '회원 정보를 삭제 하시겠습니까? 삭제 된 회원정보는 복구가 불가능합니다.',
      okText: '삭제',
      cancelText: '취소',
      onOk: () => handleDelete(id),
    });
  };

  // 삭제하기
  const handleDelete = id => {
    const sendObject = {
      id,
    };
    dispatch(withdrawnMemberDeletionAction({ sendObject }));
  };

  // 복구 모달
  const recoveryConfirmHandler = id => {
    Modal.confirm({
      title: '탈퇴 회원 복구',
      icon: <ExclamationCircleOutlined />,
      content: '계정을 복구 하시겠습니까?',
      okText: '복구',
      cancelText: '취소',
      onOk: () => handleRecovery(id),
    });
  };

  // 복구하기
  const handleRecovery = id => {
    const sendObject = {
      id,
    };
    dispatch(recoveryWithdrawnMemberAction({ sendObject }));
  };

  // 테이블 헤더 검색
  const handleSearch = data => {
    const params = {
      searchValue: data.searchText || '',
      searchCond: data.selectOptions || '',
    };
    getInitData({ page: 0, size: 10 }, params);
  };

  return (
    <CardContainer>
      <ListHeaderSection handleSearch={handleSearch} total={withdrawMemberList.length} selectOptions={selectOptions} defaultValue="MEMBER_NAME" />
      <Tables
        rowKey={'memberId'}
        detail={false}
        scroll={{ y: 500 }}
        listData={withdrawMemberList} //뿌리려는 리스트 값
        columns={columns} //열 구분 하는 방법 및 사용할 데이터 지정
        pagination={pagination}
        handleChangePageOption={handlePageChange} //페이지 바뀔때
      />
    </CardContainer>
  );
};

export default AdminUserCancelManageListSection;
