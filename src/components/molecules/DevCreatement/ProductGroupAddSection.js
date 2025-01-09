import { Buttons, Form, Inputs, RowGrid } from '@/components/atom';
import { css } from '@emotion/react';
import { marginRightStyle } from '@/styles/components/atomCommonStyle';
import { Controller, useForm } from 'react-hook-form';
import { Col, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Portal from '@/components/atom/Portal';
import { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createProductGroupAction } from '@/store/reducers/admin/productGroupReducer';
import { errorSnackOpen, snackOpen } from '@/store/reducers/snackReducer';

const ProductGroupAddSection = ({ list, setList, activeKey }) => {
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const onAddSubmit = data => addConfirmHandler(data);
  const onError = errors => console.log('fail', errors);
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  // 등록 confirm
  const addConfirmHandler = data => {
    Modal.confirm({
      title: '제품 그룹 등록',
      icon: <ExclamationCircleOutlined />,
      content: '제품 그룹명을 등록하시겠습니까?',
      okText: '등록',
      cancelText: '취소',
      onOk: () => handleAdd(data),
    });
  };

  // 등록
  const handleAdd = data => {
    const addText = data?.addText?.trim();
    if (addText) {
      const this_index = list.findIndex(item => {
        return item.text === addText;
      });
      // 중복 없는경우
      if (this_index === -1) {
        let newValue = {
          channelType: activeKey, // 바슈롬 앱
          productGroupCount: 0, // 카운터
          productGroupId: list.length, // 그룹 아이디
          productGroupName: addText, // 제품 그룹명
        };

        const sendObject = {
          channelType: activeKey,
          groupName: addText,
        };

        dispatch(createProductGroupAction({ sendObject, activeKey }));

        reset();
      }
    } else {
      dispatch(
        errorSnackOpen({
          message: '제품 그룹명이 중복입니다. 새로운 그룹명을 입력해주세요',
        }),
      );
      reset();
    }
  };

  // 실시간으로 input의 watch
  const watchAddText = watch('addText', '');

  useEffect(() => {
    setIsButtonDisabled(watchAddText.trim() === '');
  }, [watchAddText]);

  return (
    <>
      <Form onSubmit={handleSubmit(onAddSubmit, onError)}>
        <RowGrid css={row_style}>
          <Col span={3} css={col_style}>
            <span> 제품 그룹명 :</span>
          </Col>
          <Col span={18}>
            <Controller
              control={control}
              name={`addText`}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => {
                return <Inputs type="text" value={value} placeholder={'등록할 제품의 그룹명을 입력해주세요'} {...rest} />;
              }}
            />
          </Col>
          <Col span={3} css={col_style}>
            <Buttons disabled={isButtonDisabled} type={'primary'} htmlType={!isButtonDisabled && 'submit'} name={'등록'} css={marginRightStyle(5)} />
          </Col>
        </RowGrid>
      </Form>
    </>
  );
};

export default ProductGroupAddSection;
const row_style = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const col_style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
