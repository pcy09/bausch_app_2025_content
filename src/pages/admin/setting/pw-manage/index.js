import { AppLayout } from '@/components/layouts';
import { PwManageTemplate } from '@/components/template';

const PwManage = () => {
  return (
    <>
      <PwManageTemplate />
    </>
  );
};

PwManage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default PwManage;
