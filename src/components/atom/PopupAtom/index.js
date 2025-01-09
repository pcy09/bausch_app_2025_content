import { useDispatch, useSelector } from 'react-redux';
import Portal from '@/components/atom/Portal';
import { resetPopupAction } from '@/store/reducers/popupReducer';
import Buttons from '../Buttons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const PopupAtom = () => {
  const { show, type } = useSelector(state => state?.popup);
  const dispatch = useDispatch();
  // 취소버튼
  const handleClosePopup = () => {
    dispatch(resetPopupAction());
  };
  return (
    <>
      {/* 삭제 여부 묻는 팝업 */}
      {show && (
        <Portal selector={'popup-root'}>
          {type === 'delete' && (
            <Modal
              open={show}
              onOk={handleClosePopup}
              onCancel={handleClosePopup}
              width={300}
              footer={[<Buttons key={'delete'} type="danger" name={'삭제'} onClick={handleClosePopup} />]}>
              <Space align="center" size={'large'}>
                <ExclamationCircleOutlined style={{ color: 'red', fontSize: '34px' }} />
                삭제하시겠습니까?
              </Space>
            </Modal>
          )}
        </Portal>
      )}
    </>
  );
};
export default PopupAtom;
