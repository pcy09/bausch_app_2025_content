import { AppLayout } from '@/components/layouts';
import { PromotionAddTemplate } from '@/components/template';

const Add = () => {
  return (
    <>
      <PromotionAddTemplate />
    </>
  );
};

Add.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Add;
