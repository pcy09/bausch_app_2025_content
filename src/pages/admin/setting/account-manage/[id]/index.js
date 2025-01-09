import { AppLayout } from '@/components/layouts';
import { AdminManageDetailTemplate } from '@/components/template';

const AdminManageDetail = () => {
  return (
    <>
      <AdminManageDetailTemplate />
    </>
  );
};

AdminManageDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AdminManageDetail;
