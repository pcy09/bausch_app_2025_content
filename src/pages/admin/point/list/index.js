import { AppLayout } from '@/components/layouts';
import { PointLogTemplate } from '@/components/template';

const point_log = () => {
  return (
    <>
      <PointLogTemplate />
    </>
  );
};

point_log.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default point_log;
