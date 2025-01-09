import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DetailPageTitle from '../DetailPageTitle';
import PageTitle from '../PageTitle';

const BreadcrumbsBox = ({ menu }) => {
  const { query, pathname, push } = useRouter();
  const [isDetail, setIsDetail] = useState(false);
  useEffect(() => {
    // 바슈롬 어드민
    if (pathname.includes('/sub') || pathname.includes('/set-') || query?.id) {
      setIsDetail(true);
    } else {
      setIsDetail(false);
    }
  }, [pathname, query?.id]);

  return <>{isDetail ? <DetailPageTitle menu={menu} /> : <PageTitle menu={menu} />}</>;
};

export default BreadcrumbsBox;
