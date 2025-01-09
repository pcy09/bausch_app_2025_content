import { buttonFlexEndRowStyle, contentsContainerStyle } from '@/styles/components/atomCommonStyle';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, RowGrid, TextAreas } from '@/components/atom';
import { Descriptions, Radio } from 'antd';
import React, { Fragment, useCallback, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { getFaqAction, resetFaqAction, updateFaqAction } from '@/store/reducers/faqReducer';
import { useDispatch, useSelector } from 'react-redux';

const SupportFaqTemplate = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  // 자주 묻는 질문
  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: 'faqInfo',
    keyName: 'faq_front_id',
  });

  const onSubmit = data => handleSubmitFaq(data);
  const onError = e => console.log(e);
  // ***************************faq(자주 묻는 질문) 정보 불러오기 _ (작업자 : 박찬영)

  const dispatch = useDispatch();
  const faqList = useSelector(state => state.faq.faqList);
  // 이용가이드 불러오기 및 초기화
  useEffect(() => {
    console.log('시작!');
    dispatch(getFaqAction());
    return () => {
      dispatch(resetFaqAction());
    };
  }, [dispatch]);
  const handleSubmitFaq = () => {
    fields.forEach((item, index) => {
      if (item.id === null) {
        setValue(`faqInfo[${index}].faq_front_id`, item.faq_front_id);
      }
    });
    const listItem = getValues().faqInfo;
    const data = {
      data: listItem.map(item => {
        console.log(item, '데이타');
        return {
          id: item.id,
          faq_title: item.faq_title,
          faq_content: item.faq_content,
          faq_front_id: item.faq_front_id,
          faq_exposed: item.faq_exposed,
        };
      }),
    };
    dispatch(updateFaqAction({ sendObject: data }));
  };

  useEffect(() => {
    if (faqList?.length > 0) {
      setValue('faqInfo', faqList);
    }
  }, [faqList, setValue]);
  // **********************************************************************************

  const handleAppendField = () => {
    // if (fields?.length < 5) {
    append({ id: null, faq_title: '', faq_content: '', faq_front_id: '' });
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
    }
  };
  return (
    <>
      <CardContainer>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          {/*<CardContainer>*/}
          {fields?.length > 0 &&
            fields?.map((item, index) => {
              return (
                <Fragment key={item.faq_front_id}>
                  <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
                    <Descriptions.Item span={3} label="제목">
                      <Controller
                        name={`faqInfo[${index}].faq_title`}
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, value, ...rest }, fieldState }) => (
                          <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                        )}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="내용">
                      <Controller
                        name={`faqInfo[${index}].faq_content`}
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, value, ...rest }, fieldState }) => (
                          <TextAreas value={value || null} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                        )}
                      />
                      <DividingLine border={false} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} onClick={() => handleRemoveField(index)}>
                          <Buttons
                            style={{ marginRight: '10px' }}
                            icon={<DeleteOutlined css={iconStyle} />}
                            type={'danger'}
                            ghost
                            name={'삭제하기'}
                            htmlType={'button'}
                          />
                        </div>
                        <div>
                          <Controller
                            name={`faqInfo[${index}].faq_exposed`}
                            control={control}
                            defaultValue="N"
                            render={({ field: { ref, value, ...rest }, fieldState }) => (
                              <Radio.Group
                                options={[
                                  { label: '노출', value: 'Y' },
                                  { label: '비노출', value: 'N' },
                                ]}
                                onChange={target => console.log(target)}
                                value={value || null}
                                {...rest}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </Descriptions.Item>
                    {/* <Descriptions.Item span={1} label="노출 여부">
                      <Controller
                        name="show_status"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, value, ...rest }, fieldState }) => (
                          <Radio.Group
                            options={[
                              { label: '노출', value: 'Y' },
                              { label: '비노출', value: 'N' },
                            ]}
                            onChange={target => console.log(target)}
                            value={value || null}
                            {...rest}
                          />
                        )}
                      />
                    </Descriptions.Item> */}
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
      </CardContainer>
      <DividingLine border={false} />
      <RowGrid>
        <ColGrid span={24} css={buttonFlexEndRowStyle}>
          <Buttons type={'primary'} name={'저장'} htmlType={'button'} onClick={handleSubmitFaq} />
        </ColGrid>
      </RowGrid>
    </>
  );
};

export default SupportFaqTemplate;

const iconStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff5784;
`;
