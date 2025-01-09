import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { ContentsContainer, DividingLine, Form } from '@/components/atom';
import { Badge, Descriptions, Divider } from 'antd';
import { Controller } from 'react-hook-form';
import { css } from '@emotion/react';
import { UserDetailTemplate } from '@/components/template';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import AdminUserDetailTemplate from '@/components/template/AdminUserTemplate/AdminUserDetailTemplate';

const UserDetail = () => {
  return (
    <>
      <AdminUserDetailTemplate />
    </>
  );
};

UserDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default UserDetail;

const detailContainer = css`
  background: white;
  box-shadow: 12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 100px 100px 80px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  padding: 24px;
  //height: calc(100vh - 197.28px);
  //max-height: calc(100vh - 257.28px);
  overflow-y: scroll;
`;
