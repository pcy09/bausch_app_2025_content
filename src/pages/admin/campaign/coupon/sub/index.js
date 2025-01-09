import { AppLayout } from '@/components/layouts';
import { DetailPageTitle, PageTitle } from '@/components/molecules';
import { CouponAddTemplate } from '@/components/template';
import { useRouter } from 'next/router';

const Add = () => {
  return (
    <>
      <CouponAddTemplate />
    </>
  );
};

Add.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Add;
