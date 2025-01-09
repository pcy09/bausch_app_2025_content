import { AppLayout } from '@/components/layouts';
import { PromotionTemplate } from '@/components/template';

const promotion = () => {
  return (
    <>
      <PromotionTemplate />
    </>
  );
};

promotion.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default promotion;
