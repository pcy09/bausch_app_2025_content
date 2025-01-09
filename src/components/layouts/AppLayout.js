import { Button, Layout, Menu, Select } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ADMIN_LIST, APP_LIST, LENSLY_LIST } from '@/common/menu';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '@/store/reducers/authReducer';
import LoginLogo from '@public/assets/png/bl-logo-white.png';
import CollapsedLoginLogo from '@public/assets/png/group.png';
import Image from 'next/image';
import { insertKeyAction, keyReset } from '@/store/reducers/navigationReducer';
import { BreadcrumbsBox } from '../molecules';

const options = [
  {
    value: '/admin',
    label: '통합 어드민',
  },
  {
    value: '/lensly/main',
    label: '렌즐리 어드민',
  },
  {
    value: '/app/main',
    label: 'APP 어드민',
  },
];

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname, push } = useRouter();
  const [collapsed, setCollapsed] = useState();
  const openKeysState = useSelector(state => state?.navigation?.openKeys);
  const selectedKeys = useSelector(state => state?.navigation?.selectedKeys);
  const [openKeys, setOpenKeys] = useState(openKeysState);
  const [path, setPath] = useState('/admin');
  const [navigation, setNavigation] = useState([]);
  const { Sider, Content } = Layout;
  const router = useRouter();
  const { query } = router;

  const menuItem = navigation.reduce(
    (acc, cur) =>
      acc.concat({
        key: cur.key,
        icon: cur.icon,
        label: !cur.key.includes('sub') ? <Link href={cur.path}>{cur.label}</Link> : cur.label,
        children: cur.children?.reduce(
          (acc2, cur2) =>
            acc2.concat({
              key: cur2.key,
              icon: cur2.icon,
              label: <Link href={cur2.path}>{cur2.label}</Link>,
            }),
          [],
        ),
      }),
    [],
  );

  // 화면 크기에 따라 네비게이션 펼침/닫힘
  useEffect(() => {
    window.innerWidth <= 1280 ? setCollapsed(true) : setCollapsed(false);
    return () => {
      dispatch(keyReset());
    };
  }, [dispatch]);

  // 글로벌 메뉴(어드민/앱/렌즐리) 구분
  useEffect(() => {
    // 바슈롬 어드민
    if (pathname.includes('/admin')) {
      setPath('/admin');
      setNavigation(ADMIN_LIST);
    }
    // 바슈롬 앱
    else if (pathname.includes('/app')) {
      setPath('/app/main');
      setNavigation(APP_LIST);
    }
    // 렌즐리
    else {
      setPath('/lensly/main');
      setNavigation(LENSLY_LIST);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname == '/admin' && navigation) {
      dispatch(keyReset());
    } else if (pathname !== '/admin' && navigation) {
      navigation?.forEach(el => {
        const currentItem = el?.children?.find(item => pathname.includes(item.path));
        currentItem && dispatch(insertKeyAction({ openKeys: [el.key], selectedKeys: [currentItem.key] }));
      });
    }
  }, [pathname, navigation, query?.id, dispatch]);

  // 네비게이션 닫혀있는 경우 메뉴 닫기
  useEffect(() => {
    collapsed ? setOpenKeys([]) : setOpenKeys(openKeysState);
  }, [collapsed, openKeysState]);

  // 글로벌 메뉴(어드민/앱/렌즐리) 선택 시
  const handleSelect = value => {
    dispatch(keyReset());
    push(value);
  };

  // 네비게이션 함수 (닫힘)
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys?.indexOf(key) === -1);
    const rootSubmenuKeys = navigation.map(el => el.key);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 네비게이션 함수 (펼침)
  const handleClick = e => {
    const keyPath = e.keyPath;
    const currentPath = keyPath[0];
    const parentPath = keyPath[1];
    // dispatch(insertKeyAction({ openKeys: parentPath ? [parentPath] : [], selectedKeys: [currentPath] }));
  };

  // 로그아웃 함수
  const handelLogout = () => {
    dispatch(logoutAction({ callback: push }));
  };

  return (
    <>
      <Layout hasSider css={layoutFlexStyle}>
        {pathname !== '/main' && (
          <>
            <Sider css={sidebarDynamicBackground(collapsed)} trigger={null} collapsible collapsed={collapsed} width={250}>
              <div css={sticky}>
                <div>
                  <div css={logo(collapsed)}>
                    <div
                      className="logoBox"
                      onClick={() => {
                        handleSelect(path);
                      }}>
                      {collapsed ? (
                        <Image style={{ marginBottom: '5px' }} src={CollapsedLoginLogo} alt="Collapsed Logo" />
                      ) : (
                        <Image src={LoginLogo} alt="Login Logo" />
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      {collapsed ? (
                        <MenuUnfoldOutlined
                          onClick={() => setCollapsed(!collapsed)}
                          className={'trigger'}
                          style={{ color: '#000', padding: '0 calc(50% - 16px / 2)', marginTop: '10px' }}
                        />
                      ) : (
                        <MenuFoldOutlined
                          onClick={() => setCollapsed(!collapsed)}
                          className={'trigger'}
                          style={{ color: '#000', paddingLeft: '12px' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* {!collapsed && (
                    <div css={selectStyle}>
                      <Select onChange={handleSelect} value={path} options={options} placeholder={'선택해주세요'} />
                    </div>
                  )} */}
                  <Menu
                    css={menuCustomCss} // Pass 'product' to apply dynamic styles
                    theme="light"
                    mode="inline"
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onOpenChange={onOpenChange}
                    onClick={handleClick}
                    items={menuItem}
                    getPopupContainer={node => node.parentNode}
                  />
                </div>
                <div css={siderFooterStyle}>
                  {!collapsed && (
                    <Button type="primary" css={logoutButtonStyle} onClick={handelLogout}>
                      로그아웃
                    </Button>
                  )}{' '}
                </div>
              </div>
            </Sider>
          </>
        )}
        <Layout css={contentLayoutStyle} className="site-layout">
          <Content css={contentAutoHeightStyle}>
            {pathname !== '/main' && <BreadcrumbsBox menu={navigation} />}
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default AppLayout;
const sidebarDynamicBackground = collapsed => css`
  .ant-layout-sider-children,
  .ant-layout-sider-children ul {
    background: #336699;
  }
  .ant-menu {
    transition: ${collapsed ? `all 0.05s` : `all 0.2s`};
  }
  .ant-menu-item:hover {
    background: var(--mainColor);
  }

  .anticon,
  .ant-menu-item a,
  .ant-menu-sub.ant-menu-inline > .ant-menu-item,
  .ant-menu-sub.ant-menu-inline > .ant-menu-item a,
  .ant-menu-submenu-title:hover,
  .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,
  .ant-menu-submenu-selected,
  .ant-menu-submenu-arrow {
    color: #fff !important;
  }
  .ant-menu-submenu-selected,
  .ant-menu-submenu-open {
    background: var(--mainColor) !important;
  }
  .ant-menu-submenu-title {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .ant-menu-submenu-title:active {
    // background: var(--mainColor) !important;
    background: none !important;
  }
  .ant-menu-submenu-title:hover {
    background: var(--mainColor) !important;
  }
  .ant-menu-item:not(:last-child) {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .ant-menu-item-selected {
    background: var(--mainColor);
  }
  .ant-menu-sub.ant-menu-inline > .ant-menu-item,
  .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    background: #07335f;
    margin: 0;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: var(--mainColor);
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected: active {
    background: var(--mainColor);
  }
  .ant-menu-sub.ant-menu-inline > .ant-menu-item:hover {
    padding-bottom: 0.02px;
    background: var(--mainColor);
    color: #fff;
  }
  .ant-menu-sub.ant-menu-inline > .ant-menu-item:hover a {
    color: #fff;
  }
  .ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed {
    width: 80px;
  }
  .ant-select-dropdown {
    z-index: 99999 !important;
  }
`;
const logo = collapsed => css`
  display: flex;
  justify-content: space-between;
  padding: ${collapsed ? '24px 0' : '24px'};
  padding-left: ${collapsed ? '0' : '24px'};
  padding-top: ${collapsed ? '12px' : '24px'};
  padding-bottom: ${collapsed ? '12px' : '24px'};
  align-items: center;
  border-bottom: 1px solid #fff; // Add a border top if needed to separate from the menu items
  margin-bottom: 20px;
  flex-direction: ${collapsed ? 'column' : 'row'}; // Adjust direction based on collapsed state
  .logoBox {
    cursor: pointer;
  }
`;
const siderFooterStyle = css`
  width: 100%;
  padding: 24px;
  background: #336699; // Use the same color as your sidebar background
  margin-top: 50px;
  border-top: 1px solid #07335f;
  color: #fff;
  .ant-btn-link {
    color: #fff;
    margin-bottom: 12px;
    margin-left: 12px;
  }
`;
const menuCustomCss = css`
  font-size: 16px;
  width: 249px;
  border: none;
  color: #fff;
`;
const layoutFlexStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const contentAutoHeightStyle = css`
  flex: 1;
  overflow: auto;
  padding: 24px 12px;
`;
const sticky = css`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #336699;
`;
const logoutButtonStyle = css`
  border-radius: 2px;
  border: solid 1px rgba(0, 0, 0, 0.15) !important;
  background: #1a4c7f !important;
  &:hover {
    background: #1e5792 !important;
  }
`;
const contentLayoutStyle = css`
  background: var(--backgroundColor);
`;
const selectStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  .ant-select {
    width: 80% !important;
  }
  .ant-select-arrow .anticon {
    color: var(--defaultFontColor) !important;
  }
`;
