import { AppLayout } from '@/components/layouts';
import { AppVersionDetailTemplate } from '@/components/template';

const VersionDetail = () => {
  return (
    <>
      <AppVersionDetailTemplate />
    </>
  );
};

VersionDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default VersionDetail;
