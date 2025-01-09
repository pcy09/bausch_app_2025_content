import { AppLayout } from '@/components/layouts';
import AdminSupportFaqListTemplate from '@/components/template/AdminSupportFaqTemplate/AdminSupportFaqListTemplate';
import AdminSupportInquiryListTemplate from '@/components/template/AdminSupportInquiryTemplate/AdminSupportInquiryListTemplate';

const InquiryOne = () => {
  return (
    <>
      <AdminSupportInquiryListTemplate />
    </>
  );
};

InquiryOne.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default InquiryOne;
