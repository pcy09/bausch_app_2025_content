import { useRouter } from 'next/router';
import { AppLayout } from '@/components/layouts';
import { PageTitle } from '@/components/molecules';
import { contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { ContentsContainer } from '@/components/atom';
import CustomerSupportCreateTemplate from '@/components/template/CustomerSupportTemplate/CustomerSupportCreateTemplate';

const PointCsDetail = () => {
  const { query, back, push } = useRouter();

  return (
    <ContentsContainer css={contentsContainerStyle} shadow={false}>
      {query.id === 'create' && <CustomerSupportCreateTemplate />}
      {/* {query.id !== 'create' && <SupportTermDetailTemplate />} */}
    </ContentsContainer>
  );
};

PointCsDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default PointCsDetail;
