import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { ProductCreateTemplate, ProductDetailTemplate } from '@/components/template';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { ContentsContainer } from '@/components/atom';

const ProductDetail = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <ContentsContainer css={contentsContainerStyle} shadow={false}>
        {query?.id === 'create' && <ProductCreateTemplate />}
        {query?.id !== 'create' && <ProductDetailTemplate />}
      </ContentsContainer>
    </>
  );
};

ProductDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default ProductDetail;
