import {
  SettingOutlined,
  HomeOutlined,
  InboxOutlined,
  ShopOutlined,
  EyeOutlined,
  CreditCardOutlined,
  FundProjectionScreenOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Function to select the appropriate icon based on the current page
const BreadcrumbsIcon = () => {
  const { pathname } = useRouter();
  const [name, setName] = useState('홈');
  useEffect(() => {
    pathname.includes('/order/') && setName('주문');
    pathname.includes('/product/') && setName('제품');
    pathname.includes('/store/') && setName('스토어');
    pathname.includes('/point/') && setName('적립금');
    pathname.includes('/campaign/') && setName('캠페인');
    pathname.includes('/member/') && setName('회원');
    pathname.includes('/support/') && setName('고객지원');
    pathname.includes('/setting/') && setName('설정');
    pathname === '/admin' && setName('홈');
  }, [pathname]);

  const iconsMap = {
    홈: <HomeOutlined css={color} />,
    주문: <InboxOutlined css={[color, size('18px')]} />,
    제품: <EyeOutlined css={color} />,
    스토어: <ShopOutlined css={color} />,
    적립금: <CreditCardOutlined css={color} />,
    캠페인: <FundProjectionScreenOutlined css={color} />,
    회원: <UserOutlined css={color} />,
    고객지원: <InfoCircleOutlined css={color} />,
    설정: <SettingOutlined css={color} />,
  };

  return iconsMap[name] || <HomeOutlined style={style} />;
};

export default BreadcrumbsIcon;
const color = css`
  color: var(--mainColor);
`;
const size = px => css`
  font-size: ${px};
`;
