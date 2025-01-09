import { CardContainer, Form, Inputs, SelectBox } from '@/components/atom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Descriptions, Modal } from 'antd';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import {
  getStoreGroupDetailListAction,
  storeGroupReset,
  updateStoreGroupDetailAutoOrderStatusAction,
  updateStoreGroupNameDetailAction,
} from '@/store/reducers/admin/storeGroupReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const StoreGroupDetailGroupNameTemplate = ({ autoOrderStatusByTypeOptions }) => {
  const dispatch = useDispatch();
  const { query, back, push } = useRouter();

  const { setValue, control, handleSubmit } = useForm();
  const { content } = useSelector(state => state?.storeGroup);
  const groupName = useSelector(state => state?.storeGroup?.groupName);

  useEffect(() => {
    if (content.length > 0) {
      const firstItem = content[0];
      setValue('groupName', groupName);
      setValue('autoOrderStatusKey', firstItem.groupAutoOrderStatus);
    }
  }, [content, setValue]);

  // 그룹명 변경
  const handleChangeGroupName = data => {
    if (!data.groupName) {
      Modal.error({
        title: '오류',
        content: '그룹 이름을 입력해 주세요.',
      });
      return; // groupName이 없을 경우 함수 종료
    }
    Modal.confirm({
      title: '그룹명 변경',
      icon: <ExclamationCircleOutlined />,
      content: '그룹명을 변경하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      onOk: () => {
        dispatch(updateStoreGroupNameDetailAction({ id: query.id, params: data.groupName }));
      },
    });
  };

  const handleChangeAutoOrderStatus = value => {
    Modal.confirm({
      title: '발주 정보 변경',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div style={{ fontSize: '16px' }}>
          모든 스토어들의 발주 정보를{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>{value === 'AUTO_ORDER_ENABLED' ? '자동발주' : '미발주'}</span>로 업데이트 하시겠습니까?`
        </div>
      ),
      okText: '확인',
      cancelText: '취소',
      onOk: () => {
        dispatch(updateStoreGroupDetailAutoOrderStatusAction({ id: query.id, params: value }));
        setValue(`autoOrderStatusKey`, value);
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(handleChangeGroupName)}>
      <CardContainer>
        <Descriptions title="스토어 그룹 정보" bordered={true} column={4} labelStyle={{ width: '200px' }}>
          <Descriptions.Item span={1} label="스토어 그룹명">
            <Controller
              name="groupName"
              control={control}
              defaultValue=""
              render={({ field: { ref, value, ...rest }, fieldState }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                  <Button htmlType="submit" type="primary" style={{ marginLeft: '8px' }}>
                    그룹명 변경
                  </Button>
                </div>
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item span={2} label="스토어 그룹 발주 정보">
            <Controller
              name="autoOrderStatusKey"
              control={control}
              render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
                return (
                  <SelectBox
                    options={autoOrderStatusByTypeOptions}
                    value={value}
                    onChange={value => {
                      handleChangeAutoOrderStatus(value);
                    }}
                    {...rest}
                  />
                );
              }}
            />
          </Descriptions.Item>
        </Descriptions>
      </CardContainer>
    </Form>
  );
};

export default StoreGroupDetailGroupNameTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: left;
  align-items: center;
`;
