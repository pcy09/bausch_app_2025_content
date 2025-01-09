import { css } from '@emotion/react';

// flex Center Css

export const buttonFlexEndRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const buttonFlexStartRowStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const buttonFlexBetweenRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const searchAtomContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 13px;
  :last-of-type .ant-checkbox-wrapper span {
    padding-right: 0;
  }
`;

// 상하 중앙정렬
export const alignCenter = css`
  display: flex;
  align-items: center;
`;
// 상하 중앙정렬
export const gap = gap => css`
  gap: ${gap}px;
`;

// 상하 끝정렬
export const alignEnd = css`
  display: flex;
  align-items: end;
`;
// 상하좌우 중앙정렬
export const flexCenterStyle = (direction = 'row') => css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${direction};
`;

// Contents 영역 컨테이너
export const contentsContainerStyle = css`
  height: calc(100vh - 55.28px);
  // overflow: scroll;
  background: transparent;
`;

// width css
export const widthSize = width => css`
  width: ${width}%;
`;

// margin 공통 css
export const marginTopStyle = margin => css`
  margin-top: ${margin}px;
`;
export const marginBottomStyle = margin => css`
  margin-bottom: ${margin}px;
`;
export const marginLeftStyle = margin => css`
  margin-left: ${margin}px;
`;
export const marginRightStyle = margin => css`
  margin-right: ${margin}px;
`;

// padding 공통 css
export const paddingStyle = padding => css`
  padding: ${padding}px;
`;
export const paddingTopStyle = padding => css`
  padding-top: ${padding}px;
`;
export const paddingBottomStyle = padding => css`
  padding-bottom: ${padding}px;
`;
export const paddingLeftStyle = padding => css`
  padding-left: ${padding}px;
`;
export const paddingRightStyle = padding => css`
  padding-right: ${padding}px;
`;

// Card Style css
export const cardTitleStyle = css`
  font-weight: bold;
`;
export const cardCustomBackgroundStyle = color => css`
  background: ${color};
`;

// Divider style css
export const dividerColumnStyle = css`
  height: auto;
`;

// table row line style css
export const tableRowStyle = (margin, line) => css`
  margin-bottom: ${margin}px;
  display: flex;
  align-items: ${line};
`;

// table search style css
export const tableSearch = css`
  display: flex;
  justify-content: end;
`;

export const descStyle = css`
  display: flex;
  justify-content: space-between;
`;

// subLabel style
export const subLabel = css`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
  display: block;
`;

// file upload label
export const fileuploadLabel = css`
  color: #8997a3;
  margin-left: 10px;
`;

export const mainColor = css`
  color: var(--mainColor);
`;

export const highlightRow = css`
  background-color: #f0f0f0;
`;

export const emptyTableStyle = css`
  background-color: #f9f9f9; /* 연한 그레이 배경 */
  padding: 20px;
  border: 1px dotted #d0d0d0; /* 점선 테두리 */
  border-radius: 8px; /* 모서리 둥글게 처리 */
  font-size: 14px; /* 폰트 크기 설정 */
  color: #7d7d7d; /* 글자 색상 그레이로 설정 */
  font-weight: normal; /* 글자 두께를 normal로 설정 */
  text-align: center; /* 중앙 정렬 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 살짝 그림자를 주어 강조 */
  margin: 20px 0; /* 위아래 마진 */
  width: 100%; /* 가로 크기 100% */
  max-width: 500px; /* 최대 가로 크기 */
  margin: 0 auto; /* 가로 중앙 정렬 */
  transition: all 0.5s ease; /* 부드러운 변환 효과 */

  // /* 호버 효과 */
  // :hover {
  //   background-color: #eaeaea; /* 호버 시 배경색이 약간 진해짐 */
  //   cursor: pointer; /* 포인터 커서로 변경 */
  //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 호버 시 그림자 강조 */
  // }

  // /* 클릭 효과 (누를 때의 느낌) */
  // :active {
  //   transform: translateY(2px); /* 클릭 시 눌린 느낌 */
  //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 효과 감소 */
  // }

  // /* 클릭을 했을 때 텍스트 색상 변화 */
  // :active {
  //   color: #5f5f5f; /* 클릭 시 텍스트 색상 어두운 그레이로 변경 */
  // }
`;
