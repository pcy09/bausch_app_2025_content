import { AppLayout } from '@/components/layouts';
import { AppNoticeSubTemplate } from '@/components/template';

const Add = () => {
  return (
    <>
      <AppNoticeSubTemplate />
    </>
  );
};

Add.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Add;
