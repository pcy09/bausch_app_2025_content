import { Buttons, Form, Inputs, RowGrid } from '@/components/atom';
import { css } from '@emotion/react';
import { marginRightStyle } from '@/styles/components/atomCommonStyle';
import { Controller, useForm } from 'react-hook-form';
import { Col } from 'antd';

const CategoryAddSection = ({ list, setList, block }) => {
  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  const onAddSubmit = data => handleAdd(data);
  const onError = errors => console.log('fail', errors);

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
          id: 123123,
          text: data?.addText,
          length: 1,
          disabled: true,
        };
        setList(prev => [newValue, ...prev]);
        reset();
      } else {
        alert('이미 존재하는 그룹명입니다');
      }
    } else {
      alert('그룹명을 입력해주세요');
      reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onAddSubmit, onError)}>
      <RowGrid css={row_style}>
        <Col span={3} css={col_style}>
          <span> 카테고리 명 :</span>
        </Col>
        <Col span={18}>
          <Controller
            control={control}
            name={`addText`}
            disabled={block}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => {
              return <Inputs type="text" value={value} placeholder={'카테고리명을 입력해주세요.'} {...rest} />;
            }}
          />
        </Col>
        <Col span={3} css={col_style}>
          <Buttons disabled={block} type={'primary'} htmlType={'submit'} name={'등록'} css={marginRightStyle(5)} />
        </Col>
      </RowGrid>
    </Form>
  );
};

export default CategoryAddSection;
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
