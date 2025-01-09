import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../Label';
import { Controller, useForm } from 'react-hook-form';
import { LensSelect } from '@/components/molecules';
import { Cascader, Form, InputNumber, Modal } from 'antd';
import Buttons from '../Buttons';
import Portal from '../Portal';
import Inputs from '../Inputs';
import { closeModals } from '@/store/reducers/modals';

const selectOption = [
  {
    value: '-3.25',
    label: '-3.25',
  },
  {
    value: '-3.00',
    label: '-3.00',
  },
];
const options = [
  {
    value: 'group_01',
    label: '그룹_01',
    children: [
      {
        value: 'product_01',
        label: '제품_01',
      },
    ],
  },
  {
    value: 'group_02',
    label: '그룹_02',
    children: [
      {
        value: 'product_02',
        label: '제품_02',
      },
    ],
  },
];

const ProductChangeModal = () => {
  const dispatch = useDispatch();
  const open = useSelector(state => state?.modals?.show);
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleChange(data);
  const onError = errors => console.log('fail', errors);

  const handleChange = () => {
    const data = getValues();
    reset();
    dispatch(closeModals());
  };
  const handleCancel = () => {
    reset();
    dispatch(closeModals());
  };

  const onChange = value => {
    setValue('product', value);
  };

  const handleNumberChange = value => {
    console.log(value);
    setValue('number', value);
  };
  return (
    <>
      <Portal selector={'modal-root'}>
        <Modal
          open={open}
          centered
          title="제품 변경"
          onCancel={handleCancel}
          width={1200}
          footer={[
            <Buttons key={'cancel'} name={'취소'} onClick={handleCancel} />,
            <Buttons key={'submit'} name={'변경하기'} onClick={handleChange} type="primary" htmlType="submit" />,
          ]}>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div css={formBoxStyle}>
              <div>
                <Label title={'제품명'} />
                <Controller
                  name={'product'}
                  control={control}
                  defaultValue={['group_01', 'product_01']}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <Cascader onChange={onChange} value={value} options={options} placeholder="Please select" />
                  )}
                />
              </div>
              <div css={lensBoxStyle}>
                <LensSelect label={'근시'} name={'short_sight'} options={selectOption} control={control} />
                <LensSelect label={'난시'} name={'astigmatism'} options={selectOption} control={control} />
                <LensSelect label={'축'} name={'axis'} options={selectOption} control={control} />
                <LensSelect label={'ADD'} name={'add'} options={selectOption} control={control} />
              </div>
              <div css={lensBoxStyle}>
                <div>
                  <Label title={'적립 구매가'} />
                  <Controller
                    name={'price'}
                    control={control}
                    defaultValue={'11,000'}
                    render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs disabled value={value} />}
                  />
                </div>
                <div>
                  <Label title={'수량'} />
                  <Controller
                    name={'number'}
                    control={control}
                    defaultValue={1}
                    render={({ field: { ref, value, ...rest }, fieldState }) => <InputNumber min={1} value={value} onChange={handleNumberChange} />}
                  />
                </div>
                <div>
                  <Label title={'사용 적립금'} />
                  <Controller
                    name={'totalPrice'}
                    control={control}
                    defaultValue={'33,000'}
                    render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs disabled value={value} />}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal>
      </Portal>
    </>
  );
};
export default ProductChangeModal;
const formBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
`;
const lensBoxStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;
