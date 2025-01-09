import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import BannerTemplate from '@/components/template/BannerTemplate';

const Banner = () => {
  return (
    <>
      <BannerTemplate />
    </>
  );
};

Banner.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Banner;
