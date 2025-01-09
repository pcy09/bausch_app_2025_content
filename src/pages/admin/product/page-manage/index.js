import { AppLayout } from '@/components/layouts';
import ProductsInfoListTemplate from '@/components/template/ProductsInfoTemplate/ProductsInfoListTemplate';

const Products = () => {
  return (
    <>
      <ProductsInfoListTemplate />
    </>
  );
};

Products.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Products;
