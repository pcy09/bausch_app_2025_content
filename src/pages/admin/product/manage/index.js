import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { ProductListTemplate } from '@/components/template';
import ProductManageListTemplate from '@/components/template/ProductsManageTemplate/ProductManageListTemplate';

const Products = () => {
  return (
    <>
      <ProductManageListTemplate />
    </>
  );
};

Products.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Products;
