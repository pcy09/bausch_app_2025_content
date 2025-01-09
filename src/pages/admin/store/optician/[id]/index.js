import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { OpticianDetailTemplate } from '@/components/template';

const OpticianDetail = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <OpticianDetailTemplate />
    </>
  );
};

OpticianDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default OpticianDetail;
