import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { StoreManageDetailTemplate } from '@/components/template';

const StoreManageDetail = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <StoreManageDetailTemplate />
    </>
  );
};

StoreManageDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default StoreManageDetail;
