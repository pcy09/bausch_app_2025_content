import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { insertKeyAction } from '@/store/reducers/navigationReducer';
import { useEffect, useState } from 'react';

const Breadcrumbs = ({ breadcrumbList }) => {
  const { query, pathname, push } = useRouter();
  const openKeys = useSelector(state => state?.navigation?.openKeys);
  const dispatch = useDispatch();
  const [isDetail, setIsDetail] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [isSet, setIsSet] = useState(false);
  useEffect(() => {
    if (pathname.includes('/sub')) {
      setIsSub(true);
    } else if (pathname.includes('/set-')) {
      setIsSet(true);
    } else if (query?.id) {
      setIsDetail(true);
    } else {
      setIsSub(false);
      setIsDetail(false);
    }
  }, [pathname, query?.id]);

  const handleRouter = el => {
    dispatch(insertKeyAction({ openKeys, selectedKeys: [el.key] }));
    !isDetail && !isSub && !isSet && push(el.path);
  };

  const renderList = () =>
    breadcrumbList?.map((el, index) => {
      const isActive = el?.path === pathname || isDetail || isSub || isSet;
      const className = isActive ? 'default active' : 'default';

      const label = isSub ? el?.sub : isSet ? el?.set : isDetail ? el?.detail : el?.label;
      return (
        <Breadcrumb.Item key={index} className={className} onClick={() => handleRouter(el)}>
          {label}
        </Breadcrumb.Item>
      );
    });

  return (
    <>
      <Breadcrumb separator={''} css={breadcrumbsStyle}>
        {renderList()}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;

const breadcrumbsStyle = css`
  cursor: pointer;
  .default {
    font-size: 12px;
    font-weight: 500;

    background-color: #fff;
    border: 2px solid #d9d9d9;
    padding: 4px 20px;
    // color: #868e96;
    color: var(--defaultFontColor);
    margin-right: 3px;
    transition: all 0.3s;
    &:hover {
      // background-color: #fff;
      // border-color: #868e96;
      // color: black;
      background-color: var(--mainColor);
      color: #fff;
      border-color: var(--mainColor);
    }
  }
  .active {
    // background-color: #868e96;
    background-color: var(--mainColor);
    color: #fff;
    border-color: var(--mainColor);
  }
`;
