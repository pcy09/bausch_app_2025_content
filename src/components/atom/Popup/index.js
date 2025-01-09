import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { openPops } from '@/store/reducers/popupsReducer';
import { useEffect } from 'react';
import Portal from '@/components/atom/Portal';
const Popup = () => {
  const dispatch = useDispatch();
  const { isModalOpen, content, title, buttonsConfig, width } = useSelector(state => state.popups);
  const handleClosePopup = () => {
    dispatch(openPops({ width: null, isModalOpen: false, content: null, title: 'My Custom Title' }));
  };

  return (
    <Modal
      title={title}
      width={width}
      open={isModalOpen}
      onCancel={handleClosePopup}
      style={{ top: 20 }} // 모달 상단 여백
      footer={
        buttonsConfig?.length > 0 ? (
          <>
            <div css={buttonsContainerStyle}>
              {buttonsConfig.map(button => (
                <Button key={button.key} type={button.type} onClick={button.onClick} icon={button.icon}>
                  {button.text}
                </Button>
              ))}
            </div>
          </>
        ) : (
          false
        )
      }>
      {content}
    </Modal>
  );
};
export default Popup;
const buttonsContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;
