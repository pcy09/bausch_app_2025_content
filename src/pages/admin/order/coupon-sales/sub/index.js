import { AppLayout } from '@/components/layouts';
import OrderCouponSalesAddTemplate from '@/components/template/OrderTemplate/OrderCouponSalesAddTemplate';

//point-sales/sub 복제 나중에 수정필요
const orderCouponSalesPageSub = () => {
  return (
    <>
      <OrderCouponSalesAddTemplate />
    </>
  );
};

orderCouponSalesPageSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default orderCouponSalesPageSub;
