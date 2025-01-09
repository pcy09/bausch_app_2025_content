import { AppLayout } from '@/components/layouts';
import { TermsListTemplate } from '@/components/template';

const Terms = () => {
  return (
    <>
      <TermsListTemplate />
    </>
  );
};

Terms.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Terms;
