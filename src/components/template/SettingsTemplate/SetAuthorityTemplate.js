import { Buttons, CardContainer, DividingLine, Form, RowGrid } from '@/components/atom';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import NoticeLabel from '@/components/atom/Notice';
import { useRouter } from 'next/router';
import { AuthorityFormSection } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSettingAdminPermissionAction,
  settingAdminMemberDetailReset,
  updateSettingPermissionAction,
} from '@/store/reducers/admin/settingMemberDetailReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { Descriptions } from 'antd';

const form_data = [
  {
    label: 'Lv',
    input_name: 'level_01',
    input_type: 'text',
    defaultValue: '관리자',
    placeholder: '',
  },
  {
    label: '권한',
    input_name: 'level_01_setting',
    input_type: 'checkbox',
    defaultValue: [],
    placeholder: '',
  },
  {
    label: 'Lv',
    input_name: 'level_02',
    input_type: 'text',
    defaultValue: '중간 관리자',
    placeholder: '',
  },
  {
    label: '권한',
    input_name: 'level_02_setting',
    input_type: 'checkbox',
    defaultValue: [],
    placeholder: '',
  },
  {
    label: 'Lv',
    input_name: 'level_03',
    input_type: 'text',
    defaultValue: '책임자',
    placeholder: '',
  },
  {
    label: '권한',
    input_name: 'level_03_setting',
    input_type: 'checkbox',
    defaultValue: [],
    placeholder: '',
  },
  {
    label: 'Lv',
    input_name: 'level_04',
    input_type: 'text',
    defaultValue: '일반 관리자',
    placeholder: '',
  },
  {
    label: '권한',
    input_name: 'level_04_setting',
    input_type: 'checkbox',
    defaultValue: [],
    placeholder: '',
  },
  {
    label: 'Lv',
    input_name: 'level_05',
    input_type: 'text',
    defaultValue: '이용자',
    placeholder: '',
  },
  {
    label: '권한',
    input_name: 'level_05_setting',
    input_type: 'checkbox',
    defaultValue: [],
    placeholder: '',
  },
];

const SetAuthorityTemplate = () => {
  const router = useRouter();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { content } = useSelector(state => state?.settingMemberDetail);
  const [adminProperty] = useCommonCode('adminProperty'); //난시
  const [formSections, setFormSections] = useState([]);

  // 폼 설정
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  const onError = errors => console.log('fail', errors);

  // 정보 가져오기
  useEffect(() => {
    dispatch(getSettingAdminPermissionAction());
    return () => {
      dispatch(settingAdminMemberDetailReset());
    };
  }, []);

  useEffect(() => {
    if (content.length > 0) {
      content.forEach(item => {
        setValue(`level_0${item.level}`, item.levelName);
        setValue(
          `level_0${item.level}_setting`,
          item.permissions.filter(perm => perm.checkStatus === 'CHECKED').map(perm => perm.propertyName),
        );
      });

      const filteredData = content?.map(level => {
        const options = level.permissions.map(permission => ({
          label: permission.propertyName,
          value: permission.propertyName,
        }));
        const filteredFormData = form_data.filter(f => f.input_name.includes(`level_0${level.level}`));
        return { level, options, filteredFormData };
      });

      setFormSections(filteredData);
    }
  }, [content, setValue]);

  const onSubmit = data => {
    const updateAdminLevelDto = content.map(level => {
      const levelName = data[`level_0${level.level}`]; // 각 레벨의 이름을 가져옴
      const checkedPermissions = data[`level_0${level.level}_setting`];

      const updatePermissionReqDtoList = adminProperty.map(prop => ({
        adminProperty: prop.key,
        checkStatus: checkedPermissions.includes(prop.value) ? 'CHECKED' : 'UNCHECKED',
      }));

      return updatePermissionReqDtoList.length > 0
        ? {
            level: level.level,
            levelName: levelName, // 변경된 레벨명을 함께 전송
            updatePermissionReqDtoList,
          }
        : null;
    });

    const payload = {
      updateAdminLevelDto,
    };
    dispatch(updateSettingPermissionAction({ sendObject: payload, callback: router }));
  };
  return (
    <>
      <NoticeLabel title={'👉🏼 어드민 사이트의 관리자 계정 권한 설정 화면입니다.'} />
      <DividingLine border={false} />
      <CardContainer>
        <Descriptions title={'관리자 권한설정'} labelStyle={{ width: '80px', textAlign: 'center' }} bordered={true} column={4}></Descriptions>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* 권한설정 폼 */}
          {formSections.map(({ level, options, filteredFormData }) => (
            <AuthorityFormSection
              key={level.levelId}
              control={control}
              form_data={filteredFormData}
              options={options} // 각 레벨의 권한을 options으로 전달
            />
          ))}
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
      </CardContainer>
    </>
  );
};

export default SetAuthorityTemplate;
const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
