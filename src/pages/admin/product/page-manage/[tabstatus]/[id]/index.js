import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { ProductsInfoDetailTemplate, ProductsInfoLenslyDetailTemplate } from '@/components/template';

// const ProductInfoDetail = () => {
//   const router = useRouter().query.tabstatus;
//   return <>{router === 'bausch' ? <ProductsInfoDetailTemplate /> : <ProductsInfoLenslyDetailTemplate />}</>;
// };
const ProductInfoDetail = () => {
  const router = useRouter().query.tabstatus;
  return <ProductsInfoDetailTemplate tabStatus={router} />;
};

ProductInfoDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default ProductInfoDetail;
