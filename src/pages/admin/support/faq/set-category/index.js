import { AppLayout } from '@/components/layouts';
import { FaqCategoryTemplate } from '@/components/template';

const FaqCategory = () => {
  return (
    <>
      <FaqCategoryTemplate />
    </>
  );
};

FaqCategory.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default FaqCategory;
