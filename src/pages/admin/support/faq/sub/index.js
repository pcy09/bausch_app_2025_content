import { AppLayout } from '@/components/layouts';
import AdminSupportFaqCreateTemplate from '@/components/template/AdminSupportFaqTemplate/AdminSupportFaqCreateTemplate';

const FaqSub = () => {
  return (
    <>
      <AdminSupportFaqCreateTemplate />
    </>
  );
};

FaqSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default FaqSub;
