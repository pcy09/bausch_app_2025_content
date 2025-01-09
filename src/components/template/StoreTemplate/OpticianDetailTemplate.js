import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, Radios, RowGrid, SelectBox, Tables } from '@/components/atom';
import { Button, Descriptions, Radio } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { contentsContainerStyle, descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getOpticianDetailAction, getOpticianListAction, opticianReset, updateOpticianAction } from '@/store/reducers/admin/opticianReducer';
import { storeMaping } from '@/common/utiles';
import { DetailPageTitle, PageTitle } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';
import OpticianDetailListTemplate from './OpticianDetailListTemplate';
import { OpticianStatus } from '@/components/atom/TableAtoms';

const columns = [
  {
    title: '스토어 코드',
    dataIndex: 'data1',
    align: 'center',
  },
  {
    title: '스토어 명',
    dataIndex: 'data2',
    align: 'center',
  },
  {
    title: '신청일',
    dataIndex: 'data3',
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'data4',
    align: 'center',
    render: value => <OpticianStatus value={value} options={showStatusOptions} />,
  },
];
const showStatusOptions = [
  { label: '재직', value: 'work' },
  { label: '퇴직', value: 'retire' },
];
const OpticianDetailTemplate = () => {
  const dispatch = useDispatch();
  const { opticianDetail } = useSelector(state => state?.optician);
  console.log('opticianDetail', opticianDetail);
  const storeGroupOptions = opticianDetail?.fsSaleItem?.split(',') || [];
  const defaultStoreGroup = storeGroupOptions.shift();
  const { paging } = useSelector(state => state.optician);
  const opticianList = [
    {
      data1: '123123123',
      data2: '바슈롬 성남',
      data3: '2024-09-11',
      data4: 'work',
      key: 111,
    },
    {
      data1: '22222222',
      data2: '다비치 성남',
      data3: '2024-09-11',
      data4: 'retire',
      key: 222,
    },
    {
      data1: '33333333',
      data2: '다비치 강남',
      data3: '2024-09-11',
      data4: 'work',
      key: 333,
    },
  ];

  // 예시를 위한 주소
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { query, back, push } = useRouter();

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
          <DividingLine border={false} />
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
      </Form>
      <DividingLine border={false} />
      <CardContainer>
        <Descriptions title="이력 관리" />
        <Tables columns={columns} listData={opticianList} />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid>
          <ColGrid span={24} css={buttonRowStyle}>
            <div>
              <Buttons
                type={'default'}
                name={'이전'}
                htmlType={'button'}
                onClick={() => router.push('/admin/optician/administration')}
                css={marginRightStyle(5)}
              />
              <Buttons
                type={'default'}
                name={'삭제'}
                htmlType={'button'}
                onClick={() => router.push('/admin/optician/administration')} //삭제 API 연결 및 수정
                css={marginRightStyle(5)}
              />
            </div>
            <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </ColGrid>
        </RowGrid>
      </CardContainer>
      {/*</CardContainer>*/}
      <DividingLine border={false} />
    </>
  );
};

export default OpticianDetailTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
