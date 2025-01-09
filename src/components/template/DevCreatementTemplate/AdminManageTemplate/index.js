import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, SelectBox, Tables } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import NoticeLabel from '@/components/atom/Notice';
import { AdminManageFormSection, AdminManageListSection, ListHeaderSection, PageTitle } from '@/components/molecules';
import { contentsContainerStyle, descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { AUTHORITY_SETTING } from '@/common/options';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, Select } from 'antd';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { signUpAction } from '@/store/reducers/authReducer';
import {
  deleteSettingAdminMemberListAction,
  getSettingAdminMemberLevelDropsAction,
  getSettingAdminMemberListAction,
  settingAdminMemberReset,
} from '@/store/reducers/admin/settingMemberReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { transSelectBox } from '@/common/utiles';

const AdminManageTemplate = ({}) => {
  // 리스트 칼럼 설정
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      width: 40,
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'adminName',
      align: 'center',
    },
    {
      title: '어드민 ID',
      dataIndex: 'loginId',
      align: 'center',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '담당부서',
      dataIndex: 'unit',
      align: 'center',
    },
    {
      title: '전화번호',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '권한',
      dataIndex: 'levelName',
      align: 'center',
    },
  ];
  const dispatch = useDispatch();
  const router = useRouter();
  const { push } = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { content } = useSelector(state => state?.settingMember);
  const { level } = useSelector(state => state?.settingMember);
  const [adminSearchCode] = useCommonCode('adminSearchCode');
  const [adminSearchCodeOptions, setAdminSearchCodeOptions] = useState([]);

  // 테이블 헤더 옵션 (전체 미포함)
  useEffect(() => {
    if (adminSearchCode) {
      setAdminSearchCodeOptions(transSelectBox(adminSearchCode));
    }
  }, [adminSearchCode]);

  // 정보가져오기
  useEffect(() => {
    dispatch(getSettingAdminMemberLevelDropsAction());
    dispatch(getSettingAdminMemberListAction());
    return () => {
      dispatch(settingAdminMemberReset());
    };
  }, [dispatch]);

  // 아이템 선택
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 테이블 헤더 검색
  const handleSearch = data => {
    const { selectOptions, searchText } = data;

    const searchData = {
      searchCode: selectOptions,
      searchValue: searchText,
    };

    dispatch(getSettingAdminMemberListAction({ params: searchData }));
  };

  // 체크한 관리자 계정 삭제
  const handleDeleteAdminAccount = () => {
    const sendObject = {
      ids: selectedRowKeys,
    };
    dispatch(deleteSettingAdminMemberListAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼어드민 사이트의 계정리스트이며, 권한이 있는 경우 계정을 추가 등록할 수 있습니다.  '} />
        <ColGrid span={8} />
        <Buttons
          type={'dashed'}
          icon={<SettingOutlined />}
          name={'권한 설정'}
          onClick={() => push('/admin/setting/account-manage/set-authority')}
          css={marginRightStyle(10)}
        />
      </div>
      <DividingLine border={false} />

      {/* 관리자 등록 폼 */}
      <AdminManageFormSection authorityOptions={level} />
      <DividingLine border={false} />

      {/* 관리자 리스트 */}
      <CardContainer>
        <Descriptions title={'관리자 리스트'} />
        <ListHeaderSection handleSearch={handleSearch} selectOptions={adminSearchCodeOptions} defaultValue="ADMIN_NAME" />
        <Tables
          listData={content}
          columns={columns}
          checkbox
          selectedRowKeys={selectedRowKeys}
          onSelectListItem={selectListItem}
          footer={() => (
            <Buttons
              disabled={!selectedRowKeys?.length > 0}
              onClick={() => {
                handleDeleteAdminAccount();
              }}
              type={'danger'}
              name="삭제"
              htmlType={'danger'}
              css={marginLeftStyle(5)}
            />
          )}
        />
      </CardContainer>
    </>
  );
};

export default AdminManageTemplate;
