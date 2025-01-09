import { AppLayout } from '@/components/layouts';
import AdminSupportTermCreateTemplate from '@/components/template/AdminSupportTermCreateTemplate/AdminSupportTermCreateTemplate';

const FaqSub = () => {
  return (
    <>
      <AdminSupportTermCreateTemplate />
    </>
  );
};

FaqSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default FaqSub;
