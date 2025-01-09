import { AppLayout } from '@/components/layouts';
import { PointAddTemplate } from '@/components/template';

const Point_add = () => {
  return (
    <>
      <PointAddTemplate />
    </>
  );
};

Point_add.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Point_add;
