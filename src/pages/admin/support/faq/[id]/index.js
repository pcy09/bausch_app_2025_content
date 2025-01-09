import { AppLayout } from '@/components/layouts';
import AdminSupportFaqDetailTemplate from '@/components/template/AdminSupportFaqTemplate/AdminSupportFaqDetailTemplate';

const EventDetail = () => {
  return (
    <>
      <AdminSupportFaqDetailTemplate />
    </>
  );
};

EventDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default EventDetail;
