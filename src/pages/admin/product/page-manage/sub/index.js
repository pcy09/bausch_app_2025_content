import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { ContentsContainer } from '@/components/atom';
import ProductsInfoCreateTemplate from '@/components/template/ProductsInfoTemplate/ProductsInfoCreateTemplate';
import { ProductsInfoDetailTemplate } from '@/components/template';

const ProductPageSub = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <ProductsInfoCreateTemplate />
    </>
  );
};

ProductPageSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default ProductPageSub;
