import { AppLayout } from '@/components/layouts';
import { AdminIpLogTemplate } from '@/components/template';

const AdminManage = () => {
  return (
    <>
      <AdminIpLogTemplate />
    </>
  );
};

AdminManage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AdminManage;
