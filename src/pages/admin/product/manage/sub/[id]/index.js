import { AppLayout } from '@/components/layouts';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import ProductManageSalesTemplate from '@/components/template/ProductsManageTemplate/ProductManageSalesTemplate';
import { useRouter } from 'next/router';

const ProductManageCreate = () => {
  const router = useRouter().query.id;

  return (
    <>
      <ProductManageSalesTemplate types={router} />
    </>
  );
};

ProductManageCreate.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default ProductManageCreate;
