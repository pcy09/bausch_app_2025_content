import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { OpticianCreateTemplate } from '@/components/template';

const OpticianCreate = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <OpticianCreateTemplate />
    </>
  );
};

OpticianCreate.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default OpticianCreate;
