import { AppLayout } from '@/components/layouts';
import { AdminManageTemplate } from '@/components/template';

const AdminManage = () => {
  return (
    <>
      <AdminManageTemplate />
    </>
  );
};

AdminManage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AdminManage;
