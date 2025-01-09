import { Buttons, CardContainer, DividingLine, RowGrid } from '@/components/atom';
import NoticeLabel from '@/components/atom/Notice';
import { PageTitle } from '@/components/molecules';
import AdminUserCancelManageListSection from '@/components/molecules/DevCreatement_kyj/AdminUserCancelManageListSection';
import { marginLeftStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';

const AdminUserCancelManageTemplate = ({}) => {
  const router = useRouter();

  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬 탈퇴 회원 관리 페이지입니다. 30일 이내에 탈퇴한 회원을 검색하여 확인할 수 있습니다.'} />
      <DividingLine border={false} />
      {/* 회원 리스트 */}
      <AdminUserCancelManageListSection />
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid justify="space-between">
          <Buttons type={'default'} name={'이전'} css={marginLeftStyle(5)} onClick={() => router.push('/admin/member')} />
        </RowGrid>
      </CardContainer>
    </>
  );
};

export default AdminUserCancelManageTemplate;
