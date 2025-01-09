import { Controller } from 'react-hook-form';
import { Buttons, DividingLine, Form, Inputs, TextAreas } from '@/components/atom';
import { Descriptions } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUseInfoAction, resetUseInfoAction } from '@/store/reducers/useInfoReducer';

const UsageGuide = ({ control, fields, append, remove, setValue }) => {
  const dispatch = useDispatch();
  const useInfoList = useSelector(state => state.useInfo.useInfoList);
  // 이용가이드 불러오기 및 초기화
  useEffect(() => {
    dispatch(getUseInfoAction());
    return () => {
      dispatch(resetUseInfoAction());
    };
  }, [dispatch]);

  useEffect(() => {
    if (useInfoList?.length > 0) {
      setValue('usageInfo', useInfoList);
    }
  }, [useInfoList, setValue]);

  const handleAppendField = () => {
    // if (fields?.length < 5) {
    append({ id: null, use_info_title: '', use_info_content: '', use_info_front_id: '' });
    // }
    // if (fields?.length >= 5) {
    //   alert('최대 리스트 갯수는 5개 입니다.');
    // }
  };

  const handleRemoveField = index => {
    if (fields?.length === 1) {
      alert('더 이상 삭제할 수 없습니다.');
    }
    if (fields?.length >= 2) {
      remove(index);
      console.log(index);
    }
  };

  return (
    <Form>
      {/*<CardContainer>*/}

      {fields?.length > 0 &&
        fields?.map((item, index) => {
          return (
            <Fragment key={item.use_info_front_id}>
              <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
                <Descriptions.Item span={3} label="제목">
                  <Controller
                    name={`usageInfo[${index}].use_info_title`}
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <Inputs type="text" value={value || null} placeholder={'입력해주세요.'} {...rest} />
                    )}
                  />
                </Descriptions.Item>
                <Descriptions.Item span={3} label="내용">
                  <Controller
                    name={`usageInfo[${index}].use_info_content`}
                    control={control}
                    defaultValue=""
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <TextAreas value={value || null} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                    )}
                  />
                  <DividingLine border={false} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={() => handleRemoveField(index)}>
                    <Buttons icon={<DeleteOutlined css={iconStyle} />} type={'danger'} ghost name={'삭제하기'} htmlType={'button'} />
                  </div>
                </Descriptions.Item>
              </Descriptions>
              <DividingLine border={false} />
            </Fragment>
          );
        })}

      <DividingLine border={false} />
      {/*{fields?.length < 5 && (*/}
      <Buttons icon={<PlusOutlined />} type={'primary'} ghost name={'추가하기'} htmlType={'button'} onClick={handleAppendField} />
      {/*)}*/}
    </Form>
  );
};

export default UsageGuide;

const iconStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff5784;
`;
