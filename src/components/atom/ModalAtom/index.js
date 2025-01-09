import { Modal } from 'antd';
import Portal from '@/components/atom/Portal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/reducers/modalReducer';
import { Form, SelectSearchAtom } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import Buttons from '@/components/atom/Buttons';
import { asyncReturnOrderAction, asyncWebOrderDataAction, webOrderReset } from '@/store/reducers/lensly/webOrderReducer';
import { changeReservationStatusAction } from '@/store/reducers/lensly/reservationReducer';

const ModalAtom = ({ onOk, onCancel }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading.loading);
  const modal = useSelector(state => state.modal.modalInfo);
  const { orderHeaderFile, orderDetailFile, returnData, successData, failData, mappingData } = useSelector(state => state.webOrder);

  const { show, title, description, selectedOption, okText, cancelText, okFunction, sendData, ids, functions = '' } = modal;

  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSearch(data);
  const onError = errors => console.log('fail', errors);

  const handleSearch = useCallback(data => {
    console.log(data);
  }, []);

  const handleOkFunction = () => {
    switch (okFunction) {
      case 'webOrder':
        const sendObject = {
          orderHeaderFile,
          orderDetailFile,
          successData,
          failData,
          mappingData,
          ids,
        };

        return dispatch(asyncWebOrderDataAction({ sendObject }));
      case 'changeProductStatus':
        // return handleSearch({ stats: getValues('selectOption'), sendObject: sendData });
        return dispatch(changeReservationStatusAction({ sendObject: { ...sendData, status: getValues('selectOption') } }));
      case 'returnOrder':
        return dispatch(
          asyncReturnOrderAction({
            sendObject: {
              returnData,
              successData,
            },
          }),
        );
      case 'productGroupPriceAdd':
        return;
      default:
        return () => {};
    }
  };

  const closedModal = () => {
    dispatch(webOrderReset());
    dispatch(closeModal());
  };
  return (
    <Portal selector={'modal-root'}>
      <Modal
        title={title}
        centered
        open={show}
        // cancelButtonProps={{ type: 'danger' }}
        // okText={okText}
        // cancelText={cancelText}
        // onOk={handleOkFunction}
        onCancel={() => closedModal()}
        footer={[
          <Buttons loading={loading} key={'cancel'} name={cancelText} htmlType={'button'} type={'danger'} onClick={closedModal} />,
          <Buttons loading={loading} key={'ok'} name={okText} htmlType={'button'} type={'primary'} onClick={handleOkFunction} />,
        ]}>
        {!selectedOption && <span>{description}</span>}

        {selectedOption && (
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <SelectSearchAtom title={'예약 상태'} control={control} options={selectedOption} />
          </Form>
        )}
      </Modal>
    </Portal>
  );
};

export default ModalAtom;
