import { AppLayout } from '@/components/layouts';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import ProductManageSalesDetailTemplate from '@/components/template/ProductsManageTemplate/ProductManageSalesDetailTemplate';
import { useRouter } from 'next/router';
import ProductManageSalesLenslyDetailTemplate from '@/components/template/ProductsManageTemplate/ProductManageSalesLenslyDetailTemplate';
import { useEffect } from 'react';

const ProductManageDetail = () => {
  const router = useRouter().query.tabstatus;

  return (
    <>
      {router === 'bausch' && <ProductManageSalesDetailTemplate />}
      {router === 'lensly' && <ProductManageSalesLenslyDetailTemplate />}
    </>
  );
};

ProductManageDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default ProductManageDetail;
