import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, RowGrid, TextAreas } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { Descriptions } from 'antd';
import { marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductInquiryDetailAction, resetProductInquiryAction, updateProductInquiryAction } from '@/store/reducers/productInquiryReducer';

const ProductInquiryDetailTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);
  const productInquiryDetail = useSelector(state => state.productInquiry.productInquiryDetailData);

  const handleSendData = data => {
    const sendObject = {
      qaId: Number(router.query.id),
      answerContent: data.productDescription || '',
    };
    dispatch(updateProductInquiryAction({ sendObject, callback: router }));
  };

  // 상세 데이터 호출
  useEffect(() => {
    if (router.query.id) {
      dispatch(getProductInquiryDetailAction({ id: router.query.id }));
    }
    return () => {
      dispatch(resetProductInquiryAction());
    };
  }, [router.query.id]);

  if (productInquiryDetail?.product_name) {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <CardContainer>
            <Descriptions title="제품문의 정보" labelStyle={{ width: '250px' }} bordered={true}>
              <Descriptions.Item span={2} label="문의 상품">
                {productInquiryDetail?.product_name}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="이메일">
                {productInquiryDetail?.user_email}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="이름">
                {productInquiryDetail?.user_name || '이름(user_name)'}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="휴대폰 번호">
                {productInquiryDetail?.user_phone || '휴대폰 번호(user_phone)'}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="등록일">
                {productInquiryDetail?.qa_register_date}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="답변상태">
                {productInquiryDetail?.answer_status === 'Y' ? '답변완료' : '미답변'}
              </Descriptions.Item>

              <Descriptions.Item span={4} label="제목">
                {productInquiryDetail?.qa_title}
              </Descriptions.Item>
              <Descriptions.Item span={4} label="내용">
                {productInquiryDetail?.qa_content}
              </Descriptions.Item>
              <Descriptions.Item span={4} label="답변 내용">
                <Controller
                  name="productDescription"
                  control={control}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <TextAreas defaultValue={productInquiryDetail?.qa_answer || ''} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
                  )}
                />
              </Descriptions.Item>
            </Descriptions>
          </CardContainer>

          <DividingLine border={false} />

          <RowGrid>
            <ColGrid span={24} css={buttonRowStyle}>
              <Buttons
                type={'default'}
                name={'목록으로'}
                htmlType={'button'}
                onClick={() => router.push('/products/inquiry')}
                css={marginRightStyle(5)}
              />
              <Buttons type={'primary'} name={'답변달기'} htmlType={'submit'} css={marginLeftStyle(5)} />
            </ColGrid>
          </RowGrid>
        </Form>
      </>
    );
  }
};

export default ProductInquiryDetailTemplate;
const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
