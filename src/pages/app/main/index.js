import React from 'react';
import { AppLayout } from '@/components/layouts';
import { css } from '@emotion/react';
import { PageTitle } from '@/components/molecules';
import { ADMIN_LIST, APP_LIST, LENSLY_LIST, adminMenuSummary, rightAdminMenuSummary } from '@/common/menu';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Card } from 'antd';
import { CardContainer } from '@/components/atom';
import { useDispatch } from 'react-redux';
import { insertKeyAction } from '@/store/reducers/navigationReducer';

const Main = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const handleMovePage = el => {
    const { key, path, children } = el;
    const openKeys = children ? [key] : [];
    const selectedKeys = children ? [children[0].key] : [key];
    dispatch(insertKeyAction({ openKeys, selectedKeys }));
    push(path);
  };
  const handleMoveSubPage = (openKey, item) => {
    const { key, path } = item;
    const openKeys = [openKey];
    const selectedKeys = [key];
    dispatch(insertKeyAction({ openKeys, selectedKeys }));
    push(path);
  };

  const handleMovePageInNewTab = path => {
    window.open(path);
  };

  return (
    <>
      <div css={homeContainerStyle}>
        <div css={gridStyle}>
          {APP_LIST?.map(el => {
            if (el.label !== 'HOME') {
              return (
                <Card hoverable css={cardStyle} key={el.key} onClick={() => handleMovePage(el)}>
                  <div css={iconContainerStyle}>
                    <div css={menuStyle}>
                      <div css={iconStyle}>{el.icon}</div>
                      <span className={'menuLabel'}>{el.label}</span>
                    </div>
                  </div>
                  <div css={childrenWrapStyle}>
                    {el?.children?.map(item => {
                      return (
                        <div
                          key={item.key}
                          css={childrenMenuStyle}
                          onClick={event => {
                            event.stopPropagation();
                            handleMoveSubPage(el.key, item);
                          }}>
                          <span css={childrenMenuTextStyle}>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            }
          })}
        </div>
        <div css={gridStyle2}>
          {rightAdminMenuSummary?.map((el, index) => {
            return (
              <Card hoverable css={cardStyle} key={index} onClick={() => handleMovePageInNewTab(el.link)}>
                <div key={index} css={iconContainerStyle}>
                  <div css={menuStyle} onClick={() => handleMovePageInNewTab(el.link)}>
                    <div css={iconStyle}>{el.icon}</div>
                    <span className={'menuLabel'}>{el.text}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

Main.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Main;

const homeContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
  width: 80%;
`;

const gridStyle2 = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  grid-gap: 28px;
  margin-top: 20px;
  width: 20%;
  margin-left: 20px;
`;

const cardStyle = css`
  box-shadow: inset 0px 0px 0px 1px #d9d9d9;
  border: none;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: var(--borderRadius);
  padding: 24px;
  // transition: box-shadow 0.3s;
  transition: transform 0.14s ease-in, text-shadow 0.1s ease-in;
  display: flex;
  justify-content: center;
  text-align: center;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none;
    border-radius: 3px;
    box-shadow: 0 10px 24px 0px rgba(0, 0, 0, 0.02), 0 8px 20px -2px rgba(0, 0, 0, 0.06), 0 6px 10px -6px rgba(0, 0, 0, 0.1);
    transition: opacity 0.1s ease-in;
    will-change: opacity;
    opacity: 0;
    z-index: -1;
  }
  &:hover {
    // box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transform: translate3d(0, -4px, 0);
    .menuLabel,
    .anticon {
      color: var(--mainColor);
    }
  }
  &:hover:before {
    opacity: 1;
  }
  h3 {
    margin-top: 16px;
    text-align: center;
  }
`;

const iconContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const menuStyle = css`
  cursor: pointer;
  .menuLabel {
    display: block;
    //margin-top: 15px;
    font-weight: 700;
    white-space: pre-wrap;
    text-align: center;
    transition: color 0.3s;
  }
  .menuIcon {
    font-size: 50px;
    transition: all 0.3s;
  }
  &:hover {
    .menuLabel {
      color: var(--mainColor);
    }
    .menuIcon {
      color: var(--mainColor);
      font-size: 60px;
    }
  }
`;

const iconStyle = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin-bottom: 16px;
`;

const childrenMenuStyle = css`
  position: relative;
  min-width: 145px;
  z-index: 1;
  border: 1px solid #999999;
  border-radius: var(--borderRadius);
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
  display: inline-block;
  color: #000;
  overflow: hidden;
  transition: all 0.3s;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: white;
    border: 1px solid var(--mainColor);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50px;
    z-index: -1;
    width: 150%;
    height: 100%;
    background-color: var(--mainColor);
    transform: scaleX(0) skewX(35deg);
    transform-origin: left;
    transition: transform 0.6s;
  }
  &:hover::before {
    transform: scaleX(1) skewX(35deg);
  }
`;

const childrenMenuTextStyle = css`
  white-space: nowrap;
  font-size: 12px;
`;
const childrenWrapStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;
