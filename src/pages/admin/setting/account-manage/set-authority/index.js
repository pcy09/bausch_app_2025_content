import { AppLayout } from '@/components/layouts';
import { SetAuthorityTemplate } from '@/components/template';

const setAuthority = () => {
  return (
    <>
      <SetAuthorityTemplate />
    </>
  );
};

setAuthority.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default setAuthority;
