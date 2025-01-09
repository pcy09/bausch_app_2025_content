import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { StoreManageListTemplate } from '@/components/template';
import SupportNewsListTemplate from '@/components/template/SupportNewsTemplate/SupportNewsListTemplate';

const News = () => {
  return (
    <>
      <SupportNewsListTemplate />
    </>
  );
};

News.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default News;
