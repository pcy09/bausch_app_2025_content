import { AppLayout } from '@/components/layouts';
import PromotionReissueTemplate from '@/components/template/CampaignTemplate/PromotionReissueTemplate';

const coupon_reissue = () => {
  return (
    <>
      <PromotionReissueTemplate />
    </>
  );
};

coupon_reissue.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default coupon_reissue;
