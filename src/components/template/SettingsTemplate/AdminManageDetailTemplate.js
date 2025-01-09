import { Buttons, CardContainer, DividingLine, Form, Inputs, RowGrid } from '@/components/atom';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import NoticeLabel from '@/components/atom/Notice';
import { useRouter } from 'next/router';
import { AccountDetailFormSection } from '@/components/molecules/DevCreatement';
import { Descriptions, Select } from 'antd';
import { descStyle } from '@/styles/components/atomCommonStyle';
import { useEffect } from 'react';
import {
  getSettingAdminMemberDetailAction,
  settingAdminMemberDetailReset,
  updateSettingMemberDetailAction,
  updateSettingMemberPwResetAction,
} from '@/store/reducers/admin/settingMemberDetailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingAdminMemberLevelDropsAction } from '@/store/reducers/admin/settingMemberReducer';

const AdminManageDetailTemplate = ({}) => {
  const router = useRouter();
  const { query, back, push } = useRouter();
  const dispatch = useDispatch();

  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  // 폼 제출 핸들러
  const onSubmit = data => handleSendData(data);
  const onError = errors => handleError(errors);

  const { level } = useSelector(state => state?.settingMember);
  const { content } = useSelector(state => state?.settingMemberDetail);
  useEffect(() => {
    if (query?.id) {
      dispatch(getSettingAdminMemberDetailAction({ id: query.id }));
      dispatch(getSettingAdminMemberLevelDropsAction());
    }
    return () => {
      dispatch(settingAdminMemberDetailReset());
    };
  }, [query.id]);

  useEffect(() => {
    if (content) {
      console.log(content);
      setValue('adminName', content?.adminName);
      setValue('phone', content?.phone);
      setValue('loginId', content?.loginId);
      setValue('email', content?.email);
      setValue('unit', content?.unit);
      setValue('level', content?.level);
    }
  }, [content]);

  // 수정
  const handleSendData = data => {
    const { adminName, loginId, email, unit, phone, level } = data;
    const sendObject = {
      name: adminName,
      loginId: loginId,
      email: email,
      unit: unit,
      phone: phone,
      level: level,
    };
    dispatch(updateSettingMemberDetailAction({ id: query.id, sendObject, callback: router }));
  };
  // 비밀번호 리셋 핸들러
  const handlePwReset = () => {
    dispatch(updateSettingMemberPwResetAction({ id: query.id })); // 비밀번호 리셋 액션 실행
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 어드민 사이트의 계정 상세 페이지입니다. 관리자 정보 및 권한을 설정할 수 있고 비밀번호를 리셋할 수 있습니다.'} />
      <DividingLine border={false} />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 관리자 정보 폼 */}
        <CardContainer size={'default'} bordered={false}>
          <Descriptions
            title={
              <div css={descStyle}>
                <div>관리자 정보</div>
                <Buttons name={'비밀번호 리셋'} onClick={handlePwReset} />
              </div>
            }
            labelStyle={{ width: '250px' }}
            bordered={true}
            column={4}>
            <Descriptions.Item span={2} label={'이름'}>
              <Controller
                name="adminName"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label={'휴대폰 번호'}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label={'어드민 ID'}>
              {content?.loginId}
            </Descriptions.Item>
            <Descriptions.Item span={2} label={'이메일'}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label={'담당부서'}>
              <Controller
                name="unit"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label={'권한설정'}>
              <Controller
                name="level"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Select style={{ width: '100%' }} value={value} {...rest}>
                    {level?.map(option => {
                      return (
                        <Select.Option key={option?.id} value={option?.level}>
                          {option?.levelName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>
        <DividingLine border={false} />

        <CardContainer>
          <RowGrid css={buttonRowStyle}>
            <Buttons
              type={'default'}
              htmlType={'button'}
              onClick={() => {
                push('/admin/setting/account-manage');
              }}
              name={'이전'}
            />
            <Buttons type={'primary'} htmlType={'submit'} name={'수정하기'} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default AdminManageDetailTemplate;
const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
