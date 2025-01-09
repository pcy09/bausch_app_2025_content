import { AppLayout } from '@/components/layouts';
import { OrderPointSalesDetailTemplate } from '@/components/template';

const Point_detail = () => {
  return (
    <>
      <OrderPointSalesDetailTemplate />
    </>
  );
};

Point_detail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Point_detail;
