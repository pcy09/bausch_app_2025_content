import { AppLayout } from '@/components/layouts';
import SupportBannerTemplate from '@/components/template/SupportBannerTemplate/SupportBannerTemplate';

const banner = () => {
  return (
    <>
      <SupportBannerTemplate />
    </>
  );
};

banner.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default banner;
