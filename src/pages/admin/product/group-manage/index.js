import { AppLayout } from '@/components/layouts';
import { GroupManagementTemplate } from '@/components/template';

const group_management = () => {
  return (
    <>
      <GroupManagementTemplate />
    </>
  );
};

group_management.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default group_management;
