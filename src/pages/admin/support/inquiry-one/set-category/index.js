import { AppLayout } from '@/components/layouts';
import { InquiryOneCategoryTemplate } from '@/components/template';

const InquiryOneCategory = () => {
  return (
    <>
      <InquiryOneCategoryTemplate />
    </>
  );
};

InquiryOneCategory.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default InquiryOneCategory;
