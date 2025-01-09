import { AppLayout } from '@/components/layouts';
import { LenslyGuideTemplate } from '@/components/template';

const LenslyGuide = () => {
  return (
    <>
      <LenslyGuideTemplate />
    </>
  );
};

LenslyGuide.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default LenslyGuide;
