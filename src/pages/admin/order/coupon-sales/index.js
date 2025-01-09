import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { OrderCouponSaleListTemplate } from '@/components/template';

const OrderManageList = () => {
  return (
    <>
      <OrderCouponSaleListTemplate />
    </>
  );
};

OrderManageList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default OrderManageList;
