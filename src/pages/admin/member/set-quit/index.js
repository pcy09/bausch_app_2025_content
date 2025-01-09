import { AppLayout } from '@/components/layouts';
import AdminUserCancelManageTemplate from '@/components/template/AdminUserTemplate/AdminUserCancelManageTemplate';

const CancelManage = () => {
  return (
    <>
      <AdminUserCancelManageTemplate />
    </>
  );
};

CancelManage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default CancelManage;
