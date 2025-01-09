import { ADMIN_LIST } from '@/common/menu';
import { BreadcrumbsIcon, Breadcrumbs, Buttons, DividingLine } from '@/components/atom';
import { insertKeyAction } from '@/store/reducers/navigationReducer';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const DetailPageTitle = ({ menu = ADMIN_LIST, showButton = false }) => {
  const openKeys = useSelector(state => state?.navigation?.openKeys);
  const selectedKeys = useSelector(state => state?.navigation?.selectedKeys);
  const dispatch = useDispatch();
  const [list, setList] = useState();
  const [child, setChild] = useState();
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const item = menu?.find(el => el.key === openKeys[0]);
    setList(item);
    const subItem = item?.children?.find(el => el.key === selectedKeys[0]);
    setChild(subItem);
  }, [openKeys, selectedKeys, query, menu]);

  const handleLink = () => {
    const parentKeys = [list?.key];
    const childKeys = [list?.children[0].key];
    dispatch(insertKeyAction({ openKeys: parentKeys, selectedKeys: childKeys }));
  };

  const handleSubLink = () => {
    const parentKeys = [list?.key];
    const childKeys = [child?.key];
    dispatch(insertKeyAction({ openKeys: parentKeys, selectedKeys: childKeys }));
  };

  return (
    <>
      <div css={titleBoxStyle}>
        <BreadcrumbsIcon />
        <Link onClick={handleLink} href={list?.path || '/'}>
          <h1 css={titleStyle}>{list?.label}</h1>
        </Link>
        <span css={titleStyle}>{'>'}</span>
        <Link onClick={handleSubLink} href={child?.path || '/'}>
          <h1 css={titleStyle}>{child?.label}</h1>
        </Link>
        <span css={titleStyle}>{'>'}</span>
        <Breadcrumbs breadcrumbList={[child]} />
        {showButton && (
          <div css={buttonBoxStyle}>
            <Buttons name={'Korean'} type={'text'} css={buttonStyle(true)} />
            <Buttons name={'English'} type={'text'} css={buttonStyle(false)} />
          </div>
        )}
      </div>
      <DividingLine />
    </>
  );
};

export default DetailPageTitle;

const titleBoxStyle = css`
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  gap: 10px;
`;
const titleStyle = css`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const buttonBoxStyle = css`
  position: absolute;
  top: 15px;
  left: 330px;
`;
const buttonStyle = lang => css`
  border-bottom: ${lang ? '2px solid #001529' : 'none'};
  &:hover {
    border-bottom: 2px solid #001529;
  }
`;
