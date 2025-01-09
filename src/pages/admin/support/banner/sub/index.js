import { AppLayout } from '@/components/layouts';
import { BannerSubTemplate } from '@/components/template';

const BannerSub = () => {
  return (
    <>
      <BannerSubTemplate />
    </>
  );
};

BannerSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default BannerSub;
