import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { StoreManageDetailTemplate } from '@/components/template';
import SupportNewsDetailTemplate from '@/components/template/SupportNewsTemplate/SupportNewsDetailTemplate';

const NewsDetail = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <SupportNewsDetailTemplate />
    </>
  );
};

NewsDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default NewsDetail;
