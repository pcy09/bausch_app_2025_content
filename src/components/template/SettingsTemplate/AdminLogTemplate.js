import AdminLogSearchBox from '@/components/molecules/SearchBox/AdminLogSearchBox';
import NoticeLabel from '@/components/atom/Notice';
import { getOpticianListAction } from '@/store/reducers/admin/opticianReducer';
import { useDispatch } from 'react-redux';
import { Buttons, CardContainer, ColGrid, DividingLine, RowGrid, SelectInputSearchAtom, Tables } from '@/components/atom';
import { contentsContainerStyle, marginRightStyle, tableRowStyle, tableSearch } from '@/styles/components/atomCommonStyle';
import { useForm } from 'react-hook-form';
import { ListHeaderSection, PageTitle } from '@/components/molecules';
import { DownloadOutlined } from '@ant-design/icons';

const AdminLogTemplate = () => {
  const { control } = useForm();
  const dispatch = useDispatch();
  const getInitData = ({ offset = 1, pageSize = 20 } = {}, search) => {
    const params = {
      pageSize,
      offset,
      ...search,
    };
    dispatch(getOpticianListAction({ params }));
  };

  const adminLogList = [
    {
      data1: '김영재',
      data2: 'KYJ',
      data3: 'development',
      data4: '회원>회원관리',
      data5: '/member/member_list',
      data6: '',
      data7: '/member_list',
      data8: '192.230.33.1',
      data9: '2024-03-03',
      key: 111,
    },
    {
      data1: '김영재',
      data2: 'KYJ',
      data3: 'development',
      data4: '회원>회원관리',
      data5: '/member/member_list',
      data6: '',
      data7: '/member_list',
      data8: '192.230.33.1',
      data9: '2024-03-03',
      key: 222,
    },
    {
      data1: '김영재',
      data2: 'KYJ',
      data3: 'development',
      data4: '회원>회원관리',
      data5: '/member/member_list',
      data6: '',
      data7: '/member_list',
      data8: '192.230.33.1',
      data9: '2024-03-03',
      key: 333,
    },
  ];

  const columns = [
    {
      title: '이름',
      dataIndex: 'data1',
      align: 'center',
    },
    {
      title: '어드민 ID',
      dataIndex: 'data2',
      align: 'center',
    },
    {
      title: '당담부서',
      dataIndex: 'data3',
      align: 'center',
    },
    {
      title: '접근화면',
      dataIndex: 'data4',
      align: 'center',
    },
    {
      title: 'URL',
      dataIndex: 'data5',
      align: 'center',
    },
    {
      title: 'Query',
      dataIndex: 'data6',
      align: 'center',
    },
    {
      title: 'Param',
      dataIndex: 'data7',
      align: 'center',
    },
    {
      title: 'IP',
      dataIndex: 'data8',
      align: 'center',
    },
    {
      title: '접속일시',
      dataIndex: 'data9',
      align: 'center',
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
      value: 'user_id',
      label: '아이디',
    },
  ];

  const paging = { total: 150, pageSize: 20, current: 1 };

  // 리스트 셀렉트 박스 라벨
  const list = ['이름', '어드민 ID', '담당부서', '접근화면', 'URL'];
  const handleSearch = data => {
    console.log(data);
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 어드민 사이트에 접속한 계정들의 로그 리스트입니다. 조건에 맞게 검색 결과를 확인할 수 있습니다.'} />
      <DividingLine border={false} />
      <AdminLogSearchBox onHandleSearchData={getInitData} />
      <CardContainer>
        <ListHeaderSection handleSearch={handleSearch} list={list} total={30} />
        <Tables
          listData={adminLogList} //뿌리려는 리스트 값
          columns={columns} //열 구분 하는 방법 및 사용할 데이터 지정
          pagination={paging} //페이지네이션 할때
          handleChangePageOption={getInitData} //페이지 바뀔때
        />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} css={marginRightStyle(10)} />
      </CardContainer>
    </>
  );
};

export default AdminLogTemplate;
