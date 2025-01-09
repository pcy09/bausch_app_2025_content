import { Buttons, CardContainer, DividingLine, Inputs, RowGrid } from '@/components/atom';
import Form from '@/components/atom/Form';
import { Col, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { css } from '@emotion/react';
import { productGroupDeleteAction, productUpdateAction } from '@/store/reducers/admin/productGroupReducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { errorSnackOpen } from '@/store/reducers/snackReducer';

const ProductGroupList = ({ list, setList, block, setBlock, activeKey }) => {
  const dispatch = useDispatch();

  const [editStates, setEditStates] = useState(list.map(() => true)); // 모든 항목 초기값을 true로 설정
  const [initialValues, setInitialValues] = useState(list.map(item => item.productGroupName)); // 초기값 저장

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    reset();
    list.forEach((item, index) => {
      setValue(`productGroups[${index}].productGroupName`, item.productGroupName);
    });
    setInitialValues(list.map(item => item.productGroupName));
    setEditStates(list.map(() => true)); // 리스트가 변경될 때마다 초기값으로 설정
  }, [list, setValue, reset]);

  const onSubmit = data => handleSave(data);
  const onError = errors => console.log('fail', errors);

  const handleSave = data => {
    console.log(data);
  };

  const handleEdit = index => {
    const copy = [...editStates];
    copy[index] = false;
    setEditStates(copy);
  };

  const updateGroupHandler = (index, name, item) => {
    Modal.confirm({
      title: '제품 수정',
      icon: <ExclamationCircleOutlined />,
      content: '제품 그룹을 수정 하시겠습니까?',
      okText: '수정',
      cancelText: '취소',
      onOk: () => handleUpdate(index, name, item, activeKey),
    });
  };

  const handleUpdate = (index, name, item, activeKey) => {
    const prevValue = list[index].productGroupName;
    const value = getValues(name);
    const { productGroupId, productGroupName, channelType } = item;
    console.log(item, 'item');
    if (value !== prevValue) {
      const isNew = list.findIndex(item => item.productGroupName === value) === -1;

      if (isNew) {
        const sendObject = {
          channelType,
          groupName: watch().productGroups[index].productGroupName,
        };
        // 업데이트 dispatch
        dispatch(productUpdateAction({ id: productGroupId, activeKey, sendObject }));
      } else {
        dispatch(
          errorSnackOpen({
            message: '이미 존재하는 그룹명입니다',
          }),
        );
      }
    } else {
      const editCopy = [...editStates];
      editCopy[index] = true;
      setEditStates(editCopy);
    }
    setBlock(false);
  };

  const handleCancel = index => {
    const editCopy = [...editStates];
    editCopy[index] = true;
    setEditStates(editCopy);
    setValue(`productGroups[${index}].productGroupName`, initialValues[index]);
    setBlock(false);
  };

  const deleteConfirmHandler = id => {
    Modal.confirm({
      title: '제품 그룹 삭제',
      icon: <ExclamationCircleOutlined />,
      content: '제품 그룹을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = productGroupId => {
    const sendObject = {
      productGroupId,
    };

    dispatch(productGroupDeleteAction({ sendObject, activeKey }));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} css={section_wrapper_style}>
      <CardContainer>
        <div css={list_wrapper_style}>
          {list?.map((item, index) => {
            const { productGroupCount, productGroupName, productGroupId } = item;

            return (
              <RowGrid key={index}>
                <Col span={3} css={col_style}>
                  {list.length - index}
                </Col>
                <Col span={15} css={col_style}>
                  <Controller
                    control={control}
                    name={`productGroups[${index}].productGroupName`}
                    defaultValue={productGroupName}
                    render={({ field }) => (
                      <Inputs
                        type="text"
                        value={field.value}
                        disabled={editStates[index]} // 초기에는 모든 필드가 비활성화 상태
                        placeholder={'제품 그룹명을 입력해주세요.'}
                        onChange={e => field.onChange(e.target.value)}
                      />
                    )}
                  />
                </Col>
                <Col span={6} css={button_col_style}>
                  {productGroupCount > 0 ? (
                    `${productGroupCount} 개`
                  ) : (
                    <>
                      {editStates[index] && (
                        <div css={button_wrapper_style}>
                          <Buttons disabled={block} type={'danger'} onClick={() => deleteConfirmHandler(productGroupId)} name={'삭제'} />
                        </div>
                      )}
                    </>
                  )}
                  {editStates[index] ? (
                    <Buttons
                      disabled={block}
                      onClick={() => handleEdit(index)} // 수정 버튼 클릭 시 필드 활성화
                      name={'수정'}
                    />
                  ) : (
                    <>
                      <div css={button_wrapper_style}>
                        <Buttons
                          onClick={() => updateGroupHandler(index, `productGroups[${index}].productGroupName`, item)} // 확인 버튼 클릭 시 필드 비활성화 및 값 업데이트
                          name={'확인'}
                          type="primary"
                        />
                      </div>
                      <div css={button_wrapper_style}>
                        <Buttons
                          onClick={() => handleCancel(index)} // 취소 버튼 클릭 시 초기값으로 되돌림
                          name={'취소'}
                          type="danger"
                        />
                      </div>
                    </>
                  )}
                </Col>
              </RowGrid>
            );
          })}
        </div>
      </CardContainer>
    </Form>
  );
};

export default ProductGroupList;

const section_wrapper_style = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
`;

const list_wrapper_style = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 5px;
`;

const button_col_style = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

const col_style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const button_wrapper_style = css`
  display: flex;
  align-items: center;
  height: 44px; /* 버튼 또는 갯수 텍스트의 높이와 동일하게 설정 */
`;
