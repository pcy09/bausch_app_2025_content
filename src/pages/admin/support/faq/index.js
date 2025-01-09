import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { StoreManageListTemplate } from '@/components/template';
import AdminSupportFaqListTemplate from '@/components/template/AdminSupportFaqTemplate/AdminSupportFaqListTemplate';
import SupportNewsListTemplate from '@/components/template/SupportNewsTemplate/SupportNewsListTemplate';

const Faq = () => {
  return (
    <>
      <AdminSupportFaqListTemplate />
    </>
  );
};

Faq.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Faq;
