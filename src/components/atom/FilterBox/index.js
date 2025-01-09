import { Buttons, ColGrid, DividingLine, RowGrid } from '@/components/atom';
import { marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';

const FilterBox = ({ children, handleReset, handleSubmit }) => {
  return (
    <>
      <RowGrid css={rowWrapStyle}>{children}</RowGrid>
      <DividingLine border={false} />
      <RowGrid>
        <ColGrid span={8} />
        <ColGrid span={8} css={buttonRowStyle}>
          <Buttons type={'default'} name={'초기화'} htmlType={'button'} icon={<RedoOutlined />} css={marginRightStyle(5)} onClick={handleReset} />
          <Buttons
            type={'primary'}
            name={'필터 적용'}
            htmlType={'submit'}
            onClick={handleSubmit}
            icon={<SearchOutlined />}
            css={marginLeftStyle(5)}
          />
        </ColGrid>
        <ColGrid span={8} />
      </RowGrid>
    </>
  );
};

export default FilterBox;
const rowWrapStyle = css`
  display: flex;
  column-gap: 64px;
  row-gap: 24px;
  flex-wrap: wrap;
  > :not(:first-of-type) {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: -32px;
      width: 1px;
      height: 100%;
      background: var(--backgroundColor);
    }
  }
`;
const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
