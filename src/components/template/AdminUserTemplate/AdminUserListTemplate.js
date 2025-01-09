import Tables from '../../atom/Tables';
import { Buttons, CardContainer, ColGrid, DividingLine } from '@/components/atom';
import { descStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { ListHeaderSection } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCommonCode from '@/hooks/useCommonCode';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import NoticeLabel from '@/components/atom/Notice';
import { ExclamationCircleOutlined, SettingOutlined } from '@ant-design/icons';
import AdminUserSearchFilterBox from '@/components/molecules/SearchBox/AdminUserSearchFilterBox';
import ListFooterSection from '@/components/molecules/ListFooterSection';
import usePagination from '@/hooks/usePagination';
import { getMemberListAction, memberResetAction } from '@/store/reducers/admin/memberReducer';
import dayjs from 'dayjs';
import { downloadExcel, transFilterSelectBox, transSelectBox } from '@/common/utiles';
import { Modal } from 'antd';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

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
    title: '스토어 코드',
    dataIndex: 'myStoreCode',
    align: 'center',
  },
  {
    title: '스토어명',
    dataIndex: 'myStoreName',
    align: 'center',
  },
  {
    title: '근시(좌/우)',
    dataIndex: 'myopiaLeft',
    align: 'center',
    render: (text, record) => `${record.myopiaLeft}/${record.myopiaRight}`,
  },
  {
    title: '가입일',
    dataIndex: 'regDate',
    align: 'center',
    render: (text, record) => `${dayjs(record.regDate).format('YYYY-MM-DD')}`,
  },
  {
    title: '업데이트일',
    dataIndex: 'updateDate',
    align: 'center',
    render: (text, record) => `${dayjs(record.updateDate).format('YYYY-MM-DD')}`,
  },
];

const AdminUserListTemplate = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 공통코드 호출
  const { memberType, memberListSearchCond } = useCommonCodeBatch(['memberType', 'memberListSearchCond']);
  const { content } = useSelector(state => state?.member);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.member, getMemberListAction);
  const [memberListSearchCondOptions, setMemberListSearchCondOptions] = useState([]);
  const [memberTypeOptions, setMemberTypeOptions] = useState([]);
  const [resetState, setResetState] = useState(false);

  // 테이블 헤더 옵션
  useEffect(() => {
    if (memberListSearchCond) {
      setMemberListSearchCondOptions(transSelectBox(memberListSearchCond));
    }
  }, [memberListSearchCond]);

  // 회원 구분 옵션 (전체 포함)
  useEffect(() => {
    if (memberType) {
      setMemberTypeOptions(transFilterSelectBox(memberType));
    }
  }, [memberType]);

  // 리스트 가져오기
  useEffect(() => {
    getInitData({ page: 0, size: 10 });
    return () => {
      dispatch(memberResetAction());
    };
  }, [dispatch, getInitData]);

  // 탈퇴회원 관리
  const handleDeleteAccount = () => {
    router.push('/admin/member/set-quit');
  };

  // 테이블 헤더 검색
  const handleSearch = data => {
    const { selectOptions, searchText } = data;

    const searchData = {
      searchCond: selectOptions,
      searchValue: searchText,
    };

    getInitData({ page: 0, size: 10 }, searchData);
  };

  // 엑셀 양식
  const exportData = content?.map(item => ({
    구분: item.memberType,
    회원명: item.memberName,
    '휴대폰 번호': item.memberPhone,
    이메일: item.memberEmail,
    '스토어 코드': item.myStoreCode,
    스토어명: item.myStoreName,
    '근시(좌/우)': `${item.myopiaLeft}/${item.myopiaRight}`,
    가입일: dayjs(item.regDate).format('YYYY-MM-DD'), // 날짜 형식 변경
    '업데이트 일': dayjs(item.updateDate).format('YYYY-MM-DD'), // 날짜 형식 변경
  }));

  // 엑셀 다운로드
  const handleDownloadExcelClick = () => {
    Modal.confirm({
      title: '엑셀 다운로드',
      icon: <ExclamationCircleOutlined />,
      content: '현재 테이블을 엑셀 다운로드 하시겠습니까?',
      okText: '다운로드',
      cancelText: '취소',
      onOk: () => downloadExcel(exportData),
    });
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 바슈롬 회원 리스트입니다. 회원 전체 현황을 확인할 수 있으며 조건에 맞는 회원을 검색할 수 있습니다.'} />
        <ColGrid span={8} />
        <Buttons type={'dashed'} onClick={handleDeleteAccount} icon={<SettingOutlined />} name={'탈퇴 회원 관리'} css={marginRightStyle(10)} />
      </div>
      <DividingLine border={false} />
      {/* 필터 */}
      <AdminUserSearchFilterBox selectOptions={memberTypeOptions} onHandleSearchData={getInitData} setResetState={setResetState} />
      {/* 테이블 */}
      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          total={pagination?.total}
          selectOptions={memberListSearchCondOptions}
          defaultValue="MEMBER_NAME"
          resetState={resetState}
          setResetState={setResetState}
        />

        <Tables listData={content} columns={columns} pagination={pagination} handleChangePageOption={handlePageChange} />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <ListFooterSection showButton={true} showLeftBtn={true} lfText="엑셀 다운로드" onClick={handleDownloadExcelClick} />
      </CardContainer>
    </>
  );
};

export default AdminUserListTemplate;
