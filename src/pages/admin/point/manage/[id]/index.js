import { AppLayout } from '@/components/layouts';
import { PointDetailTemplate } from '@/components/template';

const Point_detail = () => {
  return (
    <>
      <PointDetailTemplate />
    </>
  );
};

Point_detail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Point_detail;
