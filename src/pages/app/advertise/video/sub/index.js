import { AppLayout } from '@/components/layouts';
import { AppAdvertiseSubTemplate } from '@/components/template';

const AppAdvertiseList = () => {
  return (
    <>
      <AppAdvertiseSubTemplate />
    </>
  );
};

AppAdvertiseList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AppAdvertiseList;
