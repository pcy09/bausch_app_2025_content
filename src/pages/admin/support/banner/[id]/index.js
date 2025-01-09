import { AppLayout } from '@/components/layouts';
import { BannerDetailTemplate } from '@/components/template';

const BannerDetail = () => {
  return (
    <>
      <BannerDetailTemplate />
    </>
  );
};

BannerDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default BannerDetail;
