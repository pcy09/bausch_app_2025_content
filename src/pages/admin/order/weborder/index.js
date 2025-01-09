import { AppLayout } from '@/components/layouts';
import { OrderManageListTemplate } from '@/components/template';

const OrderManageList = () => {
  return (
    <>
      <OrderManageListTemplate />
    </>
  );
};

OrderManageList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default OrderManageList;
