import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { StoreManageListTemplate } from '@/components/template';

const StoreManageList = () => {
  return (
    <>
      <StoreManageListTemplate />
    </>
  );
};

StoreManageList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default StoreManageList;
