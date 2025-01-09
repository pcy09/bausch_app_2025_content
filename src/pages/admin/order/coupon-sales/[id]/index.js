import { AppLayout } from '@/components/layouts';
import { OrderCouponSaleDetailTemplate } from '@/components/template';

const Point_detail = () => {
  return (
    <>
      <OrderCouponSaleDetailTemplate />
    </>
  );
};

Point_detail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Point_detail;
