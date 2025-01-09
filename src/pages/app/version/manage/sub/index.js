import { AppLayout } from '@/components/layouts';
import { AppVersionSubTemplate } from '@/components/template';

const VersionSub = () => {
  return (
    <>
      <AppVersionSubTemplate />
    </>
  );
};

VersionSub.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default VersionSub;
