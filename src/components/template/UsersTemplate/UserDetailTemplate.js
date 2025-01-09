import { AppLayout } from '@/components/layouts';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, RowGrid, SelectBox } from '@/components/atom';
import { Descriptions } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetailAction, updateUserStatusAction, userReset } from '@/store/reducers/userReducer';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { buttonFlexEndRowStyle, contentsContainerStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import useCommonCode from '@/hooks/useCommonCode';
import { PageTitle } from '@/components/molecules';

const UserDetailTemplate = () => {
  const { query, back, push } = useRouter();
  const userDetail = useSelector(state => state.user.userDetail);
  const dispatch = useDispatch();
  const router = useRouter();

  // 회원 상태 코드
  const [userStatusCode, findUserStatusCode] = useCommonCode('userStatusCode');

  // 회원 회원가입 경로
  const [registerTypeCode, findRegisterTypeCode] = useCommonCode('userRegisterTypeCode');

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const handleSendData = data => {
    const sendObject = {
      ...data,
    };
    dispatch(updateUserStatusAction({ id: query?.id, sendObject }));
  };

  useEffect(() => {
    if (query?.id) {
      dispatch(getUserDetailAction({ id: query.id }));
    }
    return () => {
      dispatch(userReset());
    };
  }, [query?.id, dispatch]);

  useEffect(() => {
    if (userDetail) {
      setValue('user_status', userDetail.user_status);
    }
  }, [userDetail, setValue]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardContainer>
          <Descriptions title="회원 정보(필수)" labelStyle={{ width: '250px' }} bordered={true}>
            <Descriptions.Item span={2} label="이름">
              {userDetail?.user_name}
            </Descriptions.Item>
            <Descriptions.Item span={1} label="이메일">
              {userDetail?.user_email}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="휴대폰 번호">
              {userDetail?.user_phone}
            </Descriptions.Item>
            <Descriptions.Item span={1} label="로그인 방법">
              {findRegisterTypeCode?.[userDetail?.user_register_type]}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="가입일">
              {userDetail?.user_register_date}
            </Descriptions.Item>
            <Descriptions.Item span={1} label="회원상태">
              {/*{userDetail?.user_status}*/}
              <Controller
                name="user_status"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <SelectBox value={value || ''} options={userStatusCode} placeholder={'선택해주세요'} {...rest} />;
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="회원상태 변경일">
              {userDetail?.user_modify_date}
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>
        <DividingLine border={false} />
        <CardContainer>
          <Descriptions title="부가정보" labelStyle={{ width: '250px' }} bordered={true}>
            <Descriptions.Item span={3} label="좌">
              <RowGrid>
                <ColGrid span={12}>근시 : -</ColGrid>
                <ColGrid span={12}>난시 : -</ColGrid>
              </RowGrid>
            </Descriptions.Item>
            <Descriptions.Item span={3} label="우">
              <RowGrid>
                <ColGrid span={12}>근시 : -</ColGrid>
                <ColGrid span={12}>난시 : -</ColGrid>
              </RowGrid>
            </Descriptions.Item>

            <Descriptions.Item span={2} label="예약내역">
              <RowGrid>
                <ColGrid css={alignStyle} span={6}>
                  {userDetail?.reservationDetails}
                </ColGrid>
                <ColGrid span={18}>
                  <Buttons type={'default'} htmlType={'button'} name={'예약 내역 바로가기'} onClick={() => router.push('/reservation')} />
                </ColGrid>
              </RowGrid>
            </Descriptions.Item>
            <Descriptions.Item span={1} label="관심매장">
              <RowGrid>
                <ColGrid css={alignStyle} span={6}>
                  {userDetail?.storesInterest}
                </ColGrid>
                <ColGrid span={18}>
                  <Buttons type={'default'} htmlType={'button'} name={'안경원 리스트 바로가기'} onClick={() => router.push('/optician')} />
                </ColGrid>
              </RowGrid>
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>
        <DividingLine border={false} />
        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons type={'default'} name={'목록으로'} htmlType={'button'} css={marginRightStyle(5)} onClick={() => router.push('/users')} />
            <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

UserDetailTemplate.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default UserDetailTemplate;

const alignStyle = css`
  display: flex;
  align-items: center;
`;

// const detailContainer = css`
//   background: white;
//   box-shadow: 12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 100px 100px 80px rgba(0, 0, 0, 0.07);
//   border-radius: 8px;
//   padding: 24px;
//   //height: calc(100vh - 197.28px);
//   //max-height: calc(100vh - 257.28px);
//   overflow-y: scroll;
// `;
// const testCss = css`
//   th {
//     width: 20%;
//   }
//   td {
//     width: 30%;
//   }
// `;
