import { Buttons } from '@/components/atom';
import { css } from '@emotion/react';
import { marginRightStyle } from '@/styles/components/atomCommonStyle';

const ProductGroupFooter = ({ showButton = true, showLeftBtn = true, showRightBtn = true, lfText = '취소', rtText = '저장' }) => {
  return (
    <div css={titleBoxStyle}>
      {showButton && (
        <div css={buttonBoxStyle}>
          {showLeftBtn && (
            <div>
              <Buttons
                onClick={() => {
                  window.location.reload();
                }}
                name={lfText}
                css={marginRightStyle(10)}
              />
            </div>
          )}
          {showRightBtn && (
            <div>
              <Buttons htmlType={'submit'} type={'submit'} name={rtText} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGroupFooter;

const titleBoxStyle = css`
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
`;

const buttonBoxStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
