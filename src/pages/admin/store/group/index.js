import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { StoreGroupList } from '@/components/template';

const StoreGroup = () => {
  return (
    <>
      <StoreGroupList />
    </>
  );
};

StoreGroup.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default StoreGroup;
