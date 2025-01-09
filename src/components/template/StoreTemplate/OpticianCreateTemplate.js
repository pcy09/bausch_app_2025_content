import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, Radios, RowGrid, SelectBox, Tables } from '@/components/atom';
import { Button, Card, Checkbox, Col, DatePicker, Descriptions, Input, Radio, Row, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { contentsContainerStyle, descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getOpticianDetailAction, getOpticianListAction, opticianReset, updateOpticianAction } from '@/store/reducers/admin/opticianReducer';
import { storeMaping } from '@/common/utiles';
import { DetailPageTitle, PageTitle } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    width: 40,
    align: 'center',
  },
  {
    title: '안경사 코드',
    dataIndex: 'fiStoreID',
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'fsStoreName',
    align: 'center',
  },
  {
    title: '전화번호',
    dataIndex: 'fsStoreABC',
    align: 'center',
  },
  {
    title: '이메일',
    dataIndex: 'fsStoreABC',
    align: 'center',
  },
];
const OpticianCreateTemplate = () => {
  const dispatch = useDispatch();
  const { opticianDetail } = useSelector(state => state?.optician);
  console.log('opticianDetail', opticianDetail);
  const storeGroupOptions = opticianDetail?.fsSaleItem?.split(',') || [];
  const defaultStoreGroup = storeGroupOptions.shift();
  const { opticianList, paging } = useSelector(state => state.optician);
  const { query, back, push } = useRouter();

  // 예시를 위한 주소
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  // TODO: 임시 데이터 마이그레이션 이후 변경 예정
  const optionChannelData = [opticianDetail]?.reduce((acc, cur) => {
    if (cur) {
      return acc.concat({
        label: storeMaping(cur.fsStoreChannel),
        id: cur.fiStoreID,
        value: cur.fsStoreChannel,
      });
    }
  }, []);

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);

  const handleSendData = data => {
    dispatch(updateOpticianAction({ id: router.query.id, sendObject: data }));
  };

  useEffect(() => {
    if (!opticianList.length) {
      dispatch(getOpticianListAction());
    }
  }, [dispatch, opticianList.length]);

  // 상세 데이터 호출
  useEffect(() => {
    if (router.query.id) {
      dispatch(getOpticianDetailAction({ id: router.query.id, callback: router }));
    }
    return () => {
      dispatch(opticianReset());
    };
  }, [router.query.id]);

  useEffect(() => {
    if (opticianDetail) {
      setValue('store_show_status', opticianDetail?.store_show_status);
      setValue('store_channel', opticianDetail?.fsStoreChannel);
      setValue('terms_type', opticianDetail.fcWebOrder);
    }
  }, [opticianDetail]);

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼바슈롬의 제품을 취급하는 스토어의 안경사 등록 페이지입니다.'} />
      </div>
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          <Descriptions title="스토어 정보" bordered column={3}>
            <Descriptions.Item label="스토어 그룹명">
              <Descriptions.Item rules={[{ required: true, message: '스토어 그룹명을 입력해주세요.' }]}>
                <Inputs placeholder="스토어 그룹명을 입력해주세요." />
              </Descriptions.Item>
            </Descriptions.Item>
            <Descriptions.Item>
              <Button type="primary" htmlType="submit">
                코드확인
              </Button>
            </Descriptions.Item>
            <Descriptions.Item label="스토어 명">
              <Inputs placeholder="코드 확인 시 자동입력." />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />
        <DividingLine border={false} />

        <CardContainer>
          <Descriptions title="기본 정보" bordered={true}>
            <Descriptions.Item label="이름" rules={[{ required: true, message: '스토어 그룹명을 입력해주세요.' }]}>
              <Inputs placeholder="이름을 입력해주세요." />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="전화번호">
              <Inputs placeholder="전화번호를 입력해주세요." />
            </Descriptions.Item>
            <Descriptions.Item span={1} label="이메일">
              <Inputs placeholder="이메일을 입력해주세요." />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="상태">
              <Controller
                name="terms_type"
                control={control}
                defaultValue={opticianDetail?.fcWebOrder === 'Y' ? 'Y' : 'N'}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Radio.Group
                    options={[
                      { label: '재직', value: 'Y' },
                      { label: '퇴직', value: 'N' },
                    ]}
                    value={value}
                    {...rest}
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>
        <DividingLine border={false} />
      </Form>
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid>
          <ColGrid span={24} css={buttonRowStyle}>
            <Buttons
              type={'default'}
              name={'취소'}
              htmlType={'button'}
              onClick={() => router.push('/admin/store/optician')}
              css={marginRightStyle(5)}
            />
            <Buttons type={'primary'} name={'등록하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </ColGrid>
        </RowGrid>
      </CardContainer>
      {/*</CardContainer>*/}
      <DividingLine border={false} />
    </>
  );
};

export default OpticianCreateTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
