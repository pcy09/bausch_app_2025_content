import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, RowGrid } from '@/components/atom';
import { Descriptions } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { buttonFlexEndRowStyle, buttonFlexStartRowStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { passwordLengthRex, phoneNumRex } from '@/common/regex';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { useEffect } from 'react';
import { deleteManagerAction, getManagerDetail, managerReset, updateManagerAction } from '@/store/reducers/admin/managerReducer';

const ManagementCreateTemplate = () => {
  const { query } = useRouter();
  const managerDetail = useSelector(state => state.manager.managerDetail);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);

  // 데이터 수정 함수
  const handleSendData = data => {
    const { manager_phone, manager_group, manager_password, confirmPassword } = data;
    let sendObject = {
      manager_phone,
      manager_group,
      manager_password,
    };

    if (manager_password === '' || (passwordLengthRex.test(manager_password) && manager_password === confirmPassword)) {
      dispatch(updateManagerAction({ id: query?.id, sendObject }));
      setValue('manager_password', '');
      setValue('confirmPassword', '');
    } else {
      dispatch(
        errorSnackOpen({
          message: '관리자 등록 실패',
          description: '비밀번호가 일치하지 않습니다.',
        }),
      );
    }
  };

  // 관리자 삭제
  const handleRemoveManager = () => {
    dispatch(deleteManagerAction({ id: query?.id, callback: router }));
  };

  // 데이터 넣어주는 함수
  useEffect(() => {
    if (managerDetail) {
      const { id, manager_name, manager_email, manager_phone, manager_group } = managerDetail;
      setValue('manager_name', manager_name);
      setValue('manager_email', manager_email);
      setValue('manager_phone', manager_phone);
      setValue('manager_group', manager_group);
    }
  }, [managerDetail, setValue]);

  // 데이터 호출 함수
  useEffect(() => {
    if (query?.id) {
      dispatch(getManagerDetail({ id: query.id }));
    }
    return () => {
      dispatch(managerReset());
    };
  }, [query]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardContainer>
          <Descriptions title="관리자 계정 정보" labelStyle={{ width: '250px' }} bordered={true}>
            <Descriptions.Item span={2} label="관리자명">
              <Controller
                name="manager_name"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs readOnly={true} value={value || ''} type="text" disabled placeholder={'관리자명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={1} label="휴대전화번호">
              <Controller
                name="manager_phone"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: phoneNumRex }}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || ''} type="text" placeholder={'휴대전화번호를 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="이메일">
              <Controller
                name="manager_email"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs readOnly={true} value={value || ''} type="test" disabled placeholder={'관리자명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={1} label="소속">
              <Controller
                name="manager_group"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || ''} type="text" placeholder={'관리자명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="비밀번호">
              <Controller
                name="manager_password"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type={'password'} value={value || ''} placeholder={'비밀번호를 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={1} label="비밀번호 확인">
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type={'password'} value={value || ''} placeholder={'비밀번호를 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />

        <RowGrid>
          <ColGrid span={1} css={buttonFlexStartRowStyle}>
            <Buttons type={'danger'} name={'삭제'} htmlType={'button'} onClick={() => handleRemoveManager()} />
          </ColGrid>
          <ColGrid span={23} css={buttonFlexEndRowStyle}>
            <Buttons
              type={'default'}
              name={'목록으로'}
              htmlType={'button'}
              css={marginRightStyle(5)}
              onClick={() => router.push('/account-management')}
            />
            <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </ColGrid>
        </RowGrid>
      </Form>
    </>
  );
};

export default ManagementCreateTemplate;
