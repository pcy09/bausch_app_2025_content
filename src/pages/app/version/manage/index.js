import { AppLayout } from '@/components/layouts';
import { AppVersionListTemplate } from '@/components/template';

const promotion = () => {
  return (
    <>
      <AppVersionListTemplate />
    </>
  );
};

promotion.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default promotion;
