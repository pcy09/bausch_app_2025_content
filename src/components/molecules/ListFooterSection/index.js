import { Breadcrumbs, Buttons, CardContainer } from '@/components/atom';
import { css } from '@emotion/react';

import { marginBottomStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { DownloadOutlined } from '@ant-design/icons';

const ListFooterSection = ({
  title,
  goRouterHandler,
  mdButtonHandler = false,
  showButton = false,
  showLeftBtn = false,
  showRightBtn = false,
  showMdBtn = false,
  rtText = '',
  onClick = '',
  mdText = '',
}) => {
  return (
    <div>
      <div css={titleIconStyle}>{title}</div>
      {showButton && (
        <div css={buttonBoxStyle}>
          {showLeftBtn && (
            <div>
              <Buttons type={'dashed'} onClick={onClick} icon={<DownloadOutlined />} name={'엑셀 다운로드'} css={marginRightStyle(10)} />
            </div>
          )}
          {showRightBtn && (
            <div css={buttonBoxRtStyle}>
              {showMdBtn && (
                <div css={titleIconStyle}>
                  <Buttons onClick={mdButtonHandler} type={'danger'} name={mdText} />
                </div>
              )}
              <Buttons onClick={goRouterHandler} type={'primary'} name={rtText} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListFooterSection;

const cardContainer = css`
  background-color: #c9ced3;
`;

const titleBoxStyle = css`
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
`;
const titleStyle = css`
  padding-top: 8px;
  font-size: 16px;
  font-weight: 700;
  padding-right: 10px;
`;
const titleIconStyle = css`
  padding-right: 10px;
`;
const buttonBoxStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const buttonBoxRtStyle = css`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const buttonStyle = lang => css`
  border: ${lang ? '2px solid #001529' : 'none'};
  &:hover {
    border-bottom: 2px solid #001529;
  }
`;
