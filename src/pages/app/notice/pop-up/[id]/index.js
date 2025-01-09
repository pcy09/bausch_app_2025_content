import { AppLayout } from '@/components/layouts';
import { AppNoticeDetailTemplate } from '@/components/template';

const NoticeDetail = () => {
  return (
    <>
      <AppNoticeDetailTemplate />
    </>
  );
};

NoticeDetail.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default NoticeDetail;
