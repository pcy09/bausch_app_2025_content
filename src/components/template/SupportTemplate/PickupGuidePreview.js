import { css } from '@emotion/react';
import { Buttons } from '@/components/atom';
import { marginBottomStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useSelector } from 'react-redux';

const PickupGuidePreview = ({ previewGuide }) => {
  const pickupData = useSelector(state => state.pickup.pickupData);

  console.log(pickupData?.pickupContent);
  return (
    <div css={backgroundStyle}>
      <div css={[buttonDivStyle, marginBottomStyle(20)]}>
        <Buttons css={buttonWidthStyle} htmlType={'button'} type={'danger'} name={'닫기'} onClick={() => previewGuide(false)} />
      </div>

      <div css={contentDivStyle} dangerouslySetInnerHTML={{ __html: pickupData.pickupContent }} />
    </div>
  );
};
export default PickupGuidePreview;

const backgroundStyle = css`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f4f6;
  width: 100%;
  height: 100%;
  display: flex;
  min-width: 1200px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
`;

const buttonDivStyle = css`
  z-index: 101;
  width: 100%;
  max-width: 1920px;
  display: flex;
  justify-content: center;
`;

const buttonWidthStyle = css`
  width: 400px;
`;

const contentDivStyle = css`
  z-index: 101;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  max-width: 1920px;

  display: flex;
  align-items: center;
  flex-direction: column;
  //background: yellow;
`;
