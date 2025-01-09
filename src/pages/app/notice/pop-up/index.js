import { AppLayout } from '@/components/layouts';
import { AppNoticeListTemplate } from '@/components/template';

const promotion = () => {
  return (
    <>
      <AppNoticeListTemplate />
    </>
  );
};

promotion.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default promotion;
