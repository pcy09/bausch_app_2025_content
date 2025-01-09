import { Buttons, CardContainer, Inputs, RowGrid } from '@/components/atom';
import Form from '@/components/atom/Form';
import { Col } from 'antd';
import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { openPopupAction } from '@/store/reducers/popupReducer';
import { css } from '@emotion/react';

const CategoryListSection = ({ list, setList, block, setBlock }) => {
  const dispatch = useDispatch();
  const handlePopup = type => {
    const updateData = {
      show: true,
      type,
    };
    dispatch(openPopupAction(updateData));
  };

  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    reset();
    list.forEach((item, index) => {
      setValue(`groupName${index}`, item.text);
    });
  }, [list, setValue, reset]);

  const onSubmit = data => handleSave(data);
  const onError = errors => console.log('fail', errors);

  // 저장 (안씀)
  const handleSave = data => {
    console.log(data);
  };
  // 수정 버튼 누르면
  const handleDisabled = index => {
    const copy = [...list];
    copy[index].disabled = !copy[index].disabled;
    setList(copy);
    setBlock(true);
  };

  // 수정 확인 버튼 누르면
  const handleUpdate = (index, name) => {
    const prevValue = list[index].text;
    const value = getValues(name);
    if (value !== prevValue) {
      const isNew =
        list.findIndex(item => {
          return item.text === value;
        }) === -1;
      if (isNew) {
        const copy = [...list];
        copy[index].text = value;
        copy[index].disabled = true;
        setList(copy);
      } else {
        setValue(name, prevValue);
        alert('이미 존재하는 카테고리명입니다');
      }
    } else {
      const copy = [...list];
      copy[index].disabled = true;
      setList(copy);
    }
    setBlock(false);
  };

  // 수정 취소 버튼 누르면
  const handleCancel = index => {
    const copy = [...list];
    copy[index].disabled = !copy[index].disabled;
    setList(copy);
    setBlock(false);
  };

  // 삭제
  const handleDelete = index => {
    const copy = [...list];
    copy.splice(index, 1);
    setList(copy);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} css={section_wrapper_style}>
      <CardContainer>
        <div css={list_wrapper_style}>
          {list?.map((item, index) => {
            return (
              <RowGrid key={index}>
                <Col span={3} css={col_style}>
                  {list.length - index}
                </Col>
                <Col span={15} css={col_style}>
                  <Controller
                    control={control}
                    name={`groupName${index}`}
                    defaultValue=""
                    disabled={item.disabled}
                    render={({ field: { ref, value, ...rest }, fieldState }) => {
                      return <Inputs type="text" value={value || item.text} placeholder={'제품 그룹명을 입력해주세요.'} {...rest} />;
                    }}
                  />
                </Col>
                <Col span={6} css={button_col_style}>
                  <Buttons
                    // onClick={() => {
                    //   handleDelete(index);
                    // }}
                    disabled={block}
                    type="danger"
                    onClick={() => {
                      handlePopup('delete');
                    }}
                    name={'삭제'}
                  />
                  {item.disabled && (
                    <Buttons
                      disabled={block}
                      onClick={() => {
                        handleDisabled(index);
                      }}
                      name={'수정'}
                    />
                  )}
                  {!item.disabled && (
                    <Buttons
                      onClick={() => {
                        handleUpdate(index, `groupName${index}`);
                      }}
                      name={'저장'}
                      type="primary"
                    />
                  )}
                  {!item.disabled && (
                    <Buttons
                      onClick={() => {
                        handleCancel(index);
                      }}
                      name={'취소'}
                      type="danger"
                    />
                  )}
                </Col>
              </RowGrid>
            );
          })}
        </div>
      </CardContainer>
      {/* <CardContainer>
        <ProductGroupFooter />
      </CardContainer> */}
    </Form>
  );
};

export default CategoryListSection;
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
