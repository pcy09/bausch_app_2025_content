import { AppLayout } from '@/components/layouts';
import AdminSupportTermsDetailTemplate from '@/components/template/AdminSupportTermsDetailTemplate/AdminSupportTermsDetailTemplate';

const FaqSub = () => {
  return (
    <>
      <AdminSupportTermsDetailTemplate />
    </>
  );
};

FaqSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default FaqSub;
