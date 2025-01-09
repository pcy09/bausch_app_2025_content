import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { StoreManageDetailTemplate } from '@/components/template';
import AdminSupportInquiryDetailTemplate from '@/components/template/AdminSupportInquiryTemplate/AdminSupportInquiryDetailTemplate';

const InquiryDetail = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <AdminSupportInquiryDetailTemplate />
    </>
  );
};

InquiryDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default InquiryDetail;
