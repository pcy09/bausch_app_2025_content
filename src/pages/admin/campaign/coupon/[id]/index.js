import { AppLayout } from '@/components/layouts';
import { CouponDetailTemplate } from '@/components/template';

const CouponDetail = () => {
  return (
    <>
      <CouponDetailTemplate />
    </>
  );
};

CouponDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default CouponDetail;
