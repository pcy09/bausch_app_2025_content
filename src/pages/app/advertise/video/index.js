import { AppLayout } from '@/components/layouts';
import { AppAdvertiseListTemplate } from '@/components/template';

const AppAdvertiseList = () => {
  return (
    <>
      <AppAdvertiseListTemplate />
    </>
  );
};

AppAdvertiseList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AppAdvertiseList;
