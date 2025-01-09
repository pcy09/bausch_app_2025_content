AppAdvertiseDetailTemplate;

import { AppLayout } from '@/components/layouts';
import { AppAdvertiseDetailTemplate } from '@/components/template';

const AppAdvertiseList = () => {
  return (
    <>
      <AppAdvertiseDetailTemplate />
    </>
  );
};

AppAdvertiseList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AppAdvertiseList;
