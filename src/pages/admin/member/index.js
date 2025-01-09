import { AppLayout } from '@/components/layouts';
import { AdminUserListTemplate } from '@/components/template';

const Users = () => {
  return (
    <>
      <AdminUserListTemplate />
    </>
  );
};

Users.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Users;
