import { AppLayout } from '@/components/layouts';
import {
  Buttons,
  CardContainer,
  ColGrid,
  DividingLine,
  Form,
  Inputs,
  Popup,
  RowGrid,
  Tables,
  TextAreas,
  Radio,
  Radios,
  TradeStatus,
} from '@/components/atom';
import { Anchor, Descriptions, Divider, Layout, Menu, Modal, Select, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { userReset } from '@/store/reducers/userReducer';
import { Controller, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import {
  alignCenter,
  buttonFlexBetweenRowStyle,
  descStyle,
  marginLeftStyle,
  marginRightStyle,
  tableSearch,
} from '@/styles/components/atomCommonStyle';
import { openPops } from '@/store/reducers/popupsReducer';
import { StoreChangeModalBox } from '@/components/molecules/ModalBox';
import { getMemberDetailAction, updateMemberAction } from '@/store/reducers/admin/memberReducer';
import NoticeLabel from '@/components/atom/Notice';
import dayjs from 'dayjs';
import { transSelectBox } from '@/common/utiles';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { withdrawnMemberAction } from '@/store/reducers/admin/withdrawMemberReducer';
import { updateStoreHistoryApi } from '@/api/admin/memberApi';
import { MEMBER_STATUS } from '../../../common/options';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';

const tabMenuList = () => {
  return [
    { label: '기본 정보', key: 'basicInfo' },
    { label: '마케팅 정보', key: 'marketingInfo' },
    { label: '회원 도수 정보', key: 'purchaseInfo' },
    { label: '부가 정보', key: 'additionalInfo' },
    { label: '마이 스토어 변경 이력', key: 'myPointStoreChangeHistory' },
    { label: '구매 이력', key: 'productPurchaseHistory' },
  ];
};

const AdminUserDetailTemplate = () => {
  // 마이스토어 칼럼
  const myPointColumns = [
    {
      title: '스토어 코드',
      dataIndex: 'storeCode',
      align: 'center',
    },
    {
      title: '스토어명',
      dataIndex: 'storeName',
      align: 'center',
      render: (value, record) => (
        <a href={`/admin/store/manage/${record.storeId}`} target={'_blank'}>
          {value}
        </a>
      ),
    },
    {
      title: '변경일',
      dataIndex: 'modifiedDate',
      align: 'center',
      render: (value, record) => `${dayjs(value).format('YYYY-MM-DD')}`,
    },
  ];

  // 구매 이력 컬럼
  const productBuyLogColumn = [
    {
      title: 'No',
      dataIndex: 'transactionInfoId',
      align: 'center',
    },
    {
      title: '거래 ID',
      dataIndex: 'transactionCode',
      align: 'center',
      render: (text, record) => (
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            window.open(`/admin/order/coupon-sales/${record.transactionInfoId}`, '_blank');
          }}>
          {text}
        </a>
      ),
    },
    {
      title: '스토어 코드',
      dataIndex: 'storeCode',
      align: 'center',
    },
    {
      title: '스토어 명',
      dataIndex: 'storeName',
      align: 'center',
      render: (text, record) => (
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            window.open(`/admin/store/manage/${record.storeId}`, '_blank');
          }}>
          {text}
        </a>
      ),
    },
    {
      title: '쿠폰 유형',
      dataIndex: 'couponType',
      align: 'center',
    },
    {
      title: '쿠폰명',
      dataIndex: 'couponName',
      align: 'center',
    },
    {
      title: '수량',
      dataIndex: 'transactionTotalQuantity',
      align: 'center',
    },
    {
      title: '구매일',
      dataIndex: 'transactionTime',
      align: 'center',
      render: (text, record) => `${dayjs(transactionHistoryInfo?.transactionTime).format('YYYY-MM-DD')}`,
    },
    {
      title: '거래 상태',
      dataIndex: 'orderStatus',
      align: 'center',
      render: status => {
        return <TradeStatus status={status} />;
      },
    },
  ];

  const router = useRouter();
  const { query, push } = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => updateConfirmHandler(data);
  const onError = errors => handleError(errors);

  const handleError = errors => {
    if (errors?.storeName) {
      dispatch(
        errorSnackOpen({
          message: '스토어 명 누락',
          description: '스토어 명을 입력해주세요.',
        }),
      );
    }
  };
  // 공통코드 호출
  const { myopia, asti, lensAdd: add, axis, memberType } = useCommonCodeBatch(['myopia', 'asti', 'lensAdd', 'axis', 'memberType']);
  const userDetail = useSelector(state => state?.member.memberDetail);
  const { basicInfo, marketingInfo, eyePrescriptionInfo, additionalInfo, transactionHistoryInfo, storeChangeHistoryInfo } = userDetail;
  const tabsRef = useRef(null); // Tabs를 참조하기 위한 ref
  const [isFixed, setIsFixed] = useState(false);
  const [memberTypeOptions, setMemberTypeOptions] = useState([]);
  const [myopiaOption, setMyOpiaOption] = useState([]); // 근시
  const [astiOption, setAstiOption] = useState([]); // 난시
  const [axisOption, setAxisOption] = useState([]); // 축
  const [addOption, setAddOption] = useState([]); // ADD
  const [myStoreData, setMyStoreData] = useState({
    storeCode: '',
    storeId: '',
    storeName: '',
  });

  // 회원 구분 (전체 미포함)
  useEffect(() => {
    if (memberType) {
      setMemberTypeOptions(transSelectBox(memberType));
    }
  }, [memberType]);

  // 도수 옵션 (전체 미포함)
  useEffect(() => {
    if (myopia) {
      setMyOpiaOption(transSelectBox(myopia));
    }
    if (asti) {
      setAstiOption(transSelectBox(asti));
    }
    if (axis) {
      setAxisOption(transSelectBox(axis));
    }
    if (add) {
      setAddOption(transSelectBox(add));
    }
  }, [myopia, asti, axis, add]);

  // 정보 가져오기
  useEffect(() => {
    if (query?.id) {
      dispatch(getMemberDetailAction({ id: query.id }));
    }
    return () => {
      dispatch(userReset());
    };
  }, [query?.id, dispatch]);

  // 정보 넣기
  useEffect(() => {
    if (userDetail) {
      setValue('memberName', basicInfo?.memberName);
      setValue('memberStatus', basicInfo?.memberStatus);
      setValue('memberType', basicInfo?.memberType);
      setValue('description', additionalInfo?.description);
      setValue('myopiaLeft', eyePrescriptionInfo?.myopiaLeft);
      setValue('myopiaRight', eyePrescriptionInfo?.myopiaRight);
      setValue('astiLeft', eyePrescriptionInfo?.astiLeft);
      setValue('astiRight', eyePrescriptionInfo?.astiRight);
      setValue('axisRight', eyePrescriptionInfo?.axisRight);
      setValue('axisLeft', eyePrescriptionInfo?.axisLeft);
      setValue('lensAddLeft', eyePrescriptionInfo?.lensAddLeft);
      setValue('lensAddRight', eyePrescriptionInfo?.lensAddRight);
      setValue('user_status', userDetail.user_status);
      setMyStoreData({
        storeId: additionalInfo?.memberStoreDto?.storeId,
        storeCode: additionalInfo?.memberStoreDto?.storeCode,
        storeName: additionalInfo?.memberStoreDto?.storeName,
      });
    }
  }, [userDetail, additionalInfo, basicInfo, eyePrescriptionInfo, setValue]);

  // 스토어 변경
  const showPopup = popupTitle => {
    const handleUpdate = async formData => {
      const sendObject = {
        storeCode: Number(formData.store_code),
      };
      try {
        const response = await updateStoreHistoryApi(router.query.id, sendObject);
        if (response && response.data) {
          const { tempStoreChange } = response.data;
          setMyStoreData({
            storeId: tempStoreChange.storeId,
            storeCode: tempStoreChange.storeCode,
            storeName: tempStoreChange.storeName,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    dispatch(
      openPops({
        isModalOpen: true,
        content: <StoreChangeModalBox handleUpdate={handleUpdate} />,
        title: popupTitle,
        buttonsConfig: [],
      }),
    );
  };

  // 회원 수정 모달
  const updateConfirmHandler = data => {
    Modal.confirm({
      title: '',
      icon: <ExclamationCircleOutlined />,
      content: '회원 정보를 수정 하시겠습니까?',
      okText: '수정',
      cancelText: '취소',
      onOk: () => updateHandler(data),
    });
  };

  // 회원 수정
  const updateHandler = data => {
    const {
      astiLeft,
      astiRight,
      axisLeft,
      axisRight,
      description,
      lensAddLeft,
      lensAddRight,
      memberName,
      memberStatus,
      memberType,
      myopiaLeft,
      myopiaRight,
    } = data;
    const sendObject = {
      memberName,
      memberType,
      memberStatus,
      description,
      myopiaLeft,
      myopiaRight,
      astiLeft,
      astiRight,
      axisLeft,
      axisRight,
      lensAddLeft,
      lensAddRight,
      storeId: myStoreData?.storeId,
    };
    dispatch(updateMemberAction({ id: query?.id, sendObject, callback: router }));
  };

  // 회원 탈퇴 모달
  const withdrawMemberConfirmHandler = id => {
    Modal.confirm({
      title: '회원 탈퇴',
      icon: <ExclamationCircleOutlined />,
      content: '탈퇴 하시겠습니까?',
      okText: '탈퇴',
      cancelText: '취소',
      onOk: () => withdrawMemberHandler(id),
    });
  };

  // 회원 탈퇴
  const withdrawMemberHandler = id => {
    const sendObject = {
      id,
      callback: router,
    };

    dispatch(withdrawnMemberAction({ sendObject }));
  };

  // 스크롤 부드럽게 이동
  const smoothScrollTo = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (tabsRef.current) {
      const offsetTop = tabsRef.current.offsetTop;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop >= offsetTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    }
  };

  // 스크롤 이벤트 리스너
  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tabs 스타일: 고정 상태에 따라 동적으로 적용
  const fixedStyle = isFixed
    ? {
        position: 'fixed',
        display: 'flex',
        bottom: 100,
        right: 24,
      }
    : {};

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 바슈롬 회원 상세 페이지입니다. 회원에 대한 상세 이력 확인 및 기본 정보 수정이 가능합니다.'} />
      </div>

      <DividingLine border={false} />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 탭메뉴 */}
        <div ref={tabsRef}>
          <Tabs
            css={activeTabStyle}
            type="line"
            centered
            size={'middle'}
            items={tabMenuList().map(tab => ({
              label: (
                <a
                  onClick={e => {
                    e.preventDefault();
                    smoothScrollTo(tab.key);
                  }}>
                  {tab.label}
                </a>
              ),
              key: tab.key,
            }))}
          />
          <div css={scrollTabStyle} style={fixedStyle}>
            {tabMenuList().map(tab => (
              <a key={tab.key} className="scrollTab" href={`#${tab.key}`}>
                {tab.label}
              </a>
            ))}
          </div>
        </div>

        <CardContainer>
          {/* 기본 정보 */}
          <div id="basicInfo">
            <Descriptions title="기본 정보" labelStyle={{ width: '250px' }} bordered column={3}>
              <Descriptions.Item span={1} label="이름">
                <Controller
                  name="memberName"
                  control={control}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <Inputs value={value} type="text" placeholder={'입력해주세요.'} {...rest} />
                  )}
                  rules={{ required: true }}
                />
              </Descriptions.Item>
              <Descriptions.Item span={2} label="회원 ID">
                {basicInfo?.loginId}
              </Descriptions.Item>
              <Descriptions.Item span={1} label="이메일">
                {basicInfo?.email}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="휴대폰 번호">
                {basicInfo?.memberPhone}
              </Descriptions.Item>
              <Descriptions.Item span={1} label="회원 구분">
                <Controller
                  name="memberType"
                  control={control}
                  render={({ field: { ref, value, ...rest }, fieldState }) => {
                    return <Radios options={memberTypeOptions} value={value} {...rest} />;
                  }}
                  rules={{ required: true }}
                />
              </Descriptions.Item>

              <Descriptions.Item span={2} label="회원 상태">
                <Controller
                  name="memberStatus"
                  control={control}
                  render={({ field: { ref, value, ...rest }, fieldState }) => {
                    return <Radios options={MEMBER_STATUS} value={value} {...rest} />;
                  }}
                  rules={{ required: true }}
                />
              </Descriptions.Item>
              <Descriptions.Item span={1} label="가입일">
                {dayjs(basicInfo?.regDate).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="정보 변경일">
                {dayjs(basicInfo?.modifiedDate).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item span={1} label="기기 정보(OS)">
                {basicInfo?.deviceOs}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="마지막 로그인">
                {dayjs(basicInfo?.lastLoginDate).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item span={3} label="상세주소">
                {basicInfo?.memberAddress}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <DividingLine border={false} />

          {/* 마케팅 정보 */}
          <div id="marketingInfo">
            <Descriptions title="마케팅 정보" labelStyle={{ width: '250px' }} bordered column={3}>
              <Descriptions.Item span={2} label="생년월일">
                {dayjs(marketingInfo?.birthDate).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item span={1} label="성별">
                {marketingInfo?.gender}
              </Descriptions.Item>
              <Descriptions.Item span={3} label="SNS 연동">
                {marketingInfo?.snsLoginStatus}
              </Descriptions.Item>
              <Descriptions.Item span={3} label="정보동의">
                {marketingInfo?.memberConsent?.join(', ') || '없음'}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <DividingLine border={false} />

          {/* 회원 도수 정보 */}
          <div id="purchaseInfo">
            <Descriptions title="회원 도수 정보" labelStyle={{ width: '250px' }} bordered column={3}>
              <Descriptions.Item span={3} label="좌">
                <RowGrid gutter={20}>
                  <ColGrid span={1.1} css={alignCenter}>
                    근시:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="myopiaLeft"
                      control={control}
                      render={({ field: { ref, value, ...rest }, fieldState }) => {
                        return <Select style={{ width: '100%' }} value={value} options={myopiaOption} {...rest} />;
                      }}
                    />
                  </ColGrid>
                  <ColGrid span={1.1} css={alignCenter}>
                    난시:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="astiLeft"
                      control={control}
                      render={({ field: { ref, value, ...rest }, fieldState }) => (
                        <Select style={{ width: '100%' }} value={value} options={astiOption} {...rest} />
                      )}
                    />
                  </ColGrid>
                  <ColGrid span={1.1} css={alignCenter}>
                    ADD:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="lensAddLeft"
                      control={control}
                      render={({ field: { ref, value, ...rest }, fieldState }) => (
                        <Select style={{ width: '100%' }} value={value} options={addOption} {...rest} />
                      )}
                    />
                  </ColGrid>
                  <ColGrid span={1.1} css={alignCenter}>
                    축:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="axisLeft"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, value, ...rest }, fieldState }) => (
                        <Select style={{ width: '100%' }} value={value} options={axisOption} {...rest} />
                      )}
                    />
                  </ColGrid>
                </RowGrid>
              </Descriptions.Item>
              <Descriptions.Item span={3} label="우">
                <RowGrid gutter={20}>
                  <ColGrid span={1.1} css={alignCenter}>
                    근시:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="myopiaRight"
                      control={control}
                      render={({ field: { ref, value, ...rest }, fieldState }) => {
                        return <Select style={{ width: '100%' }} value={value} options={myopiaOption} {...rest} />;
                      }}
                    />
                  </ColGrid>
                  <ColGrid span={1.1} css={alignCenter}>
                    난시:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="astiRight"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, value, ...rest }, fieldState }) => (
                        <Select style={{ width: '100%' }} value={value} options={astiOption} {...rest} />
                      )}
                    />
                  </ColGrid>
                  <ColGrid span={1.1} css={alignCenter}>
                    ADD:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="lensAddRight"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, value, ...rest }, fieldState }) => (
                        <Select style={{ width: '100%' }} value={value} options={addOption} {...rest} />
                      )}
                    />
                  </ColGrid>
                  <ColGrid span={1.1} css={alignCenter}>
                    축:
                  </ColGrid>
                  <ColGrid span={3}>
                    <Controller
                      name="axisRight"
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, value, ...rest }, fieldState }) => (
                        <Select style={{ width: '100%' }} value={value} options={axisOption} {...rest} />
                      )}
                    />
                  </ColGrid>
                </RowGrid>
              </Descriptions.Item>
            </Descriptions>
          </div>
          <DividingLine border={false} />

          {/* 부가 정보 */}
          <div id="additionalInfo">
            <Descriptions id="additionalInfo" title="부가 정보" labelStyle={{ width: '250px' }} bordered column={3}>
              <Descriptions.Item span={3} label="Description">
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, value, ...rest }, fieldState }) => {
                    return <TextAreas value={value || null} placeholder={'회원에 대한 설명을 작성해주세요.'} {...rest} />;
                  }}
                />
              </Descriptions.Item>

              <Descriptions.Item span={3} label="마이스토어">
                <RowGrid>
                  <ColGrid css={alignStyle} span={18}>
                    {myStoreData?.storeCode} | {myStoreData?.storeName}
                  </ColGrid>
                  <ColGrid span={6} css={tableSearch}>
                    <Buttons type={'primary'} htmlType={'button'} name={'스토어 변경'} onClick={() => showPopup('스토어 변경')} />
                    <Popup title="스토어 변경" />
                  </ColGrid>
                </RowGrid>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </CardContainer>
        <DividingLine border={false} />

        {/* 마이 스토어 변경 이력 */}
        <CardContainer id="myPointStoreChangeHistory">
          <Descriptions title="마이 스토어 변경 이력" />
          <Tables scroll={{ y: 300 }} detail={false} columns={myPointColumns} listData={storeChangeHistoryInfo} rowKey={'modifiedDate'} />
        </CardContainer>
        <DividingLine border={false} />

        {/* 구매이력 */}
        <CardContainer id="productPurchaseHistory">
          <Descriptions title="구매 이력" />
          <Tables scroll={{ y: 300 }} rowKey={'transactionCode'} columns={productBuyLogColumn} listData={transactionHistoryInfo} detail={false} />
        </CardContainer>
        <DividingLine border={false} />

        {/* 하단 */}
        <CardContainer>
          <RowGrid>
            <ColGrid span={24} css={buttonFlexBetweenRowStyle}>
              <div>
                <Buttons type={'default'} name={'이전'} htmlType={'button'} css={marginRightStyle(5)} onClick={() => router.push('/admin/member')} />
                <Buttons
                  type={'danger'}
                  name={'회원탈퇴'}
                  htmlType={'button'}
                  css={marginRightStyle(5)}
                  onClick={() => withdrawMemberConfirmHandler(router.query.id)}
                />
              </div>
              <div>
                <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
              </div>
            </ColGrid>
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

AdminUserDetailTemplate.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default AdminUserDetailTemplate;

const alignStyle = css`
  display: flex;
  align-items: center;
`;

const activeTabStyle = css`
  padding-top: 30px;
  .ant-tabs-tab a {
    color: black;
  }

  .ant-tabs-tab:hover a {
    color: #04848c;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn a {
    color: #04848c;
  }
`;
const scrollTabStyle = css`
  display: none;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-direction: column;
  max-width: 22px;
  overflow: hidden;
  transition: all 0.4s;
  white-space: nowrap;
  &:hover {
    max-width: 200px;
  }
  /* 순차적인 번호를 추가하기 위해 counter 사용 */
  counter-reset: tab-index;

  .scrollTab {
    background: #fff;
    color: #000;
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.4s;
    font-size: 12px;
    /* 각 항목의 번호를 나타내는 스타일 */
    counter-increment: tab-index; /* 각 항목에 번호를 부여 */
  }
  .scrollTab::before {
    content: counter(tab-index); /* 각 항목에 순차적인 번호 추가 */
    margin-right: 5px;
  }
  .scrollTab:hover {
    background: #f4f2f6;
  }
`;
