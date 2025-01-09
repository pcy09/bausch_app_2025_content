import NoticeLabel from '@/components/atom/Notice';
import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import CustomerSupportList from '@/components/template/CustomerSupportTemplate/CustomerSupportListTemplate';

const PointCs = () => {
  return (
    <>
      <CustomerSupportList />
    </>
  );
};

PointCs.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default PointCs;
