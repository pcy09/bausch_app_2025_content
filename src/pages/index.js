import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const { replace } = useRouter();
  useEffect(() => {
    replace('/admin/login');
  }, [replace]);

  return <h1>어드민 로그인페이지로 리다이렉트 됩니다.</h1>;
};

export default RedirectPage;
