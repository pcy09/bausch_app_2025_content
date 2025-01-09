import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import OrderPointSalesAddTemplate from '@/components/template/OrderTemplate/OrderPointSalesAddTemplate';

const orderPointSalesPageSub = () => {
  return (
    <>
      <OrderPointSalesAddTemplate />
    </>
  );
};

orderPointSalesPageSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default orderPointSalesPageSub;
