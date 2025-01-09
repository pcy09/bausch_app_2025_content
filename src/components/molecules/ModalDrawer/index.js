import { useSelector } from 'react-redux';
import Portal from '@/components/atom/Portal';
import { DrawerRegisterBanner, DrawerRegisterProduct } from '@/components/atom';

const ModalDrawer = () => {
  const drawerInfo = useSelector(state => state.modal);

  return (
    <>
      {drawerInfo.show && (
        <Portal selector={drawerInfo?.type}>
          {drawerInfo?.name === 'createBanner' && <DrawerRegisterBanner open={drawerInfo.show} />}
          {drawerInfo?.name === 'registerProduct' && <DrawerRegisterProduct open={drawerInfo.show} />}
        </Portal>
      )}
    </>
  );
};

export default ModalDrawer;
