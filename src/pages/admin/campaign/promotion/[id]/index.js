import { AppLayout } from '@/components/layouts';
import { PromotionDetailTemplate } from '@/components/template';

const Add = () => {
  return (
    <>
      <PromotionDetailTemplate />
    </>
  );
};

Add.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Add;
