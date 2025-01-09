import { AppLayout } from '@/components/layouts';
import { StoreGroupDetail } from '@/components/template';

const StoreGroupDetailList = () => {
  return (
    <>
      <StoreGroupDetail />
    </>
  );
};

StoreGroupDetailList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default StoreGroupDetailList;
