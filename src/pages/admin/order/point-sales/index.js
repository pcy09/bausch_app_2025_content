import { AppLayout } from '@/components/layouts';
import { OrderPointSalesListTemplate } from '@/components/template';

const OrderManageList = () => {
  return (
    <>
      <OrderPointSalesListTemplate />
    </>
  );
};

OrderManageList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default OrderManageList;
