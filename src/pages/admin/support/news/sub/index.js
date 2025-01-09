import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { OpticianCreateTemplate } from '@/components/template';
import SupportNewsCreateTemplate from '@/components/template/SupportNewsTemplate/SupportNewsCreateTemplate';

const NewsCreate = () => {
  const { query, back, push } = useRouter();

  return (
    <>
      <SupportNewsCreateTemplate />
    </>
  );
};

NewsCreate.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default NewsCreate;
