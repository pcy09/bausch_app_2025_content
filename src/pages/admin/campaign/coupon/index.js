import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import PromotionCouponTemplate from '@/components/template/CampaignTemplate/PromotionCouponTemplate';

const coupon = () => {
  return (
    <>
      <PromotionCouponTemplate />
    </>
  );
};

coupon.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default coupon;
