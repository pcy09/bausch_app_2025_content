import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { OpticianListTemplate } from '@/components/template';

const OpticianList = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <OpticianListTemplate />
    </>
  );
};

OpticianList.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default OpticianList;
