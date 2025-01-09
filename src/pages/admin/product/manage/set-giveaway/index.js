import { AppLayout } from '@/components/layouts';
import ProductManageGiftTemplate from '@/components/template/ProductsManageTemplate/ProductManageGiftTemplate';

const ProductManageGiveAway = () => {
  return (
    <>
      <ProductManageGiftTemplate />
    </>
  );
};

ProductManageGiveAway.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default ProductManageGiveAway;
