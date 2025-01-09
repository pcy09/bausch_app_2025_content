import { AppLayout } from '@/components/layouts';
import { PointManageTemplate } from '@/components/template';

const point_manage = () => {
  return (
    <>
      <PointManageTemplate />
    </>
  );
};

point_manage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default point_manage;
