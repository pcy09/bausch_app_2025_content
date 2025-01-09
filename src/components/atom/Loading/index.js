import { LoadingOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import Portal from '@/components/atom/Portal';
import { useSelector } from 'react-redux';

const Loading = () => {
  const loading = useSelector(state => state.loading.loading);
  return (
    <Portal selector={'loading-root'}>
      {loading && (
        <div css={backgroundStyle}>
          {/*<LoadingOutlined size={32} css={loadingBarStyle} />*/}
          <div className="loader">
            <div className="cell d-0"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>

            <div className="cell d-1"></div>
            <div className="cell d-2"></div>

            <div className="cell d-2"></div>
            <div className="cell d-3"></div>

            <div className="cell d-3"></div>
            <div className="cell d-4"></div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default Loading;

const backgroundStyle = css`
  //background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 800;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    --cell-size: 52px;
    --cell-spacing: 1px;
    --cells: 3;
    --total-size: calc(var(--cells) * (var(--cell-size) + 2 * var(--cell-spacing)));
    display: flex;
    flex-wrap: wrap;
    width: var(--total-size);
    height: var(--total-size);
  }

  .cell {
    flex: 0 0 var(--cell-size);
    margin: var(--cell-spacing);
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 4px;
    animation: 1.5s ripple ease infinite;
  }

  .cell.d-1 {
    animation-delay: 100ms;
  }

  .cell.d-2 {
    animation-delay: 200ms;
  }

  .cell.d-3 {
    animation-delay: 300ms;
  }

  .cell.d-4 {
    animation-delay: 400ms;
  }

  .cell:nth-of-type(1) {
    --cell-color: #00ff87;
  }

  .cell:nth-of-type(2) {
    --cell-color: #0cfd95;
  }

  .cell:nth-of-type(3) {
    --cell-color: #17fba2;
  }

  .cell:nth-of-type(4) {
    --cell-color: #23f9b2;
  }

  .cell:nth-of-type(5) {
    --cell-color: #30f7c3;
  }

  .cell:nth-of-type(6) {
    --cell-color: #3df5d4;
  }

  .cell:nth-of-type(7) {
    --cell-color: #45f4de;
  }

  .cell:nth-of-type(8) {
    --cell-color: #53f1f0;
  }

  .cell:nth-of-type(9) {
    --cell-color: #60efff;
  }

  /*Animation*/
  @keyframes ripple {
    0% {
      background-color: transparent;
    }

    30% {
      background-color: var(--cell-color);
    }

    60% {
      background-color: transparent;
    }

    100% {
      background-color: transparent;
    }
  }
`;
