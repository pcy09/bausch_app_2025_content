import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, SelectBox, Tables } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import NoticeLabel from '@/components/atom/Notice';
import { useDispatch, useSelector } from 'react-redux';
import { AdminIpLogFormSection, AdminManageListSection, ListHeaderSection, PageTitle } from '@/components/molecules';
import { contentsContainerStyle, marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { createIpAction, deleteSettingIPListAction, settingAdminIpListAction } from '@/store/reducers/admin/settingMemberReducer';
import usePagination from '@/hooks/usePagination';
import useCommonCode from '@/hooks/useCommonCode';

// 폼 데이터
const form_data = [
  {
    title: 'IP',
    input_name: 'user_ip',
    input_type: 'text',
    placeholder: 'ip주소를 입력하세요',
  },
  {
    title: '담당부서',
    input_name: 'user_part',
    input_type: 'text',
    placeholder: '담당부서를 입력하세요',
  },
];

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    align: 'center',
  },
  {
    title: '담당부서',
    dataIndex: 'unit',
    align: 'center',
  },
];

const AdminIpLogTemplate = ({}) => {
  // ip 리스트
  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { content } = useSelector(state => state?.settingMember);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.settingMember, settingAdminIpListAction);
  const [adminIpSearchCode] = useCommonCode('adminIpSearchCode');
  const onSubmit = data => handleSendData(data);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  // 계정 등록 버튼 눌렀을 때
  const handleRegister = data => {
    const { user_ip, user_part } = data;
    if (user_ip && user_part) {
      const sendObject = {
        ip: user_ip,
        unit: user_part,
      };
      dispatch(createIpAction({ sendObject: sendObject }));
      dispatch(settingAdminIpListAction());
    } else {
      alert('값들을 입력해주세요');
    }
  };

  const handleSearch = data => {
    console.log('StoreManageListTemplatehandleSearchdata:', data.selectOptions);
    const adminIpSearchCodeOption = adminIpSearchCode.find(option => option.value === data.selectOptions); // 선택된 옵션의 값을 추출
    const adminIpSearchCodeKey = adminIpSearchCodeOption ? adminIpSearchCodeOption.key : null; // 키값을 추출

    const searchData = {
      searchCode: adminIpSearchCodeKey || null, // 키값을 params에 포함
      searchValue: data.searchText || '',
    };
    console.log('searchData:', searchData);

    dispatch(settingAdminIpListAction({ params: searchData }));
    getInitData({ page: 0, size: 10 }, searchData);
  };

  // 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    dispatch(settingAdminIpListAction());
  }, [dispatch]);

  //삭제
  const handleSendData = data => {
    const sendObject = {
      ...data,
      ids: selectedRowKeys,
    };
    console.log('sendOb작동ject:', sendObject);
    dispatch(deleteSettingIPListAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  return (
    <>
      <NoticeLabel title={'👉🏼어드민 사이트에 접속 가능한 IP 리스트이며, 권한이 있는 계정은 IP 등록이 가능합니다. '} />
      <DividingLine border={false} />
      <AdminIpLogFormSection form_data={form_data} addSubmit={handleRegister} />
      <DividingLine border={false} />
      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          handleChangePageOption={handlePageChange}
          pagination={pagination}
          selectOptions={adminIpSearchCode}
        />
        <Tables
          checkbox={true}
          detail={false}
          listData={content}
          columns={columns}
          selectedRowKeys={selectedRowKeys}
          onSelectListItem={selectListItem}
          handleChangePageOption={handlePageChange}
          pagination={pagination}
          option={
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Buttons htmlType={'danger'} type={'danger'} name="삭제" css={marginLeftStyle(5)}></Buttons>
            </Form>
          }
        />
      </CardContainer>
      <DividingLine border={false} />
    </>
  );
};

export default AdminIpLogTemplate;
