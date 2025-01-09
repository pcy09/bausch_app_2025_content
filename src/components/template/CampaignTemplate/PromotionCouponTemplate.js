import NoticeLabel from '@/components/atom/Notice';
import { Button, Select, Tabs } from 'antd';
import { css } from '@emotion/react';
import PromotionCouponSearchBox from '@/components/molecules/SearchBox/PromotionCouponSearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, Popup, RowGrid, ShowStatus, Tables } from '@/components/atom';
import { descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import { ListHeaderSection } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';
import {
  campaignReset,
  deleteCouponAction,
  deleteReissueCouponAction,
  getCampaignCouponListAction,
  updateCampaignCouponExposedAction,
  updateReissueCampaignCouponExposedAction,
} from '@/store/reducers/admin/campaignReducer';
import useCommonCode from '@/hooks/useCommonCode';
import { useForm } from 'react-hook-form';
import { openPops } from '@/store/reducers/popupsReducer';
import CouponCreateModalBox from '../../molecules/ModalBox/CouponCreateModalBox';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { getOfflineCouponAction } from '@/store/reducers/admin/offlineCouponReducer';
import { transFilterSelectBox, transSelectBox } from '../../../common/utiles';

const PromotionCouponTemplate = ({}) => {
  // 테이블 칼럼 설정
  const columns = [
    { title: '쿠폰ID', dataIndex: 'couponId', align: 'center' },
    { title: '쿠폰 유형', dataIndex: 'couponType', align: 'center' },
    { title: '쿠폰 구분', dataIndex: 'couponOnOffType', align: 'center' },
    { title: '쿠폰명', dataIndex: 'couponName', align: 'center' },
    {
      title: '유효기간',
      dataIndex: 'expirationPeriod',
      align: 'center',
      render: (text, record) => `${record.expirationStartDate} ~ ${record.expirationEndDate}`,
    },
    { title: '등록일', dataIndex: 'couponRegDate', align: 'center' },
    {
      title: '노출 여부',
      dataIndex: 'exposedStatus',
      align: 'center',
      render: (value, record) => {
        return (
          <Select
            style={{ width: '100%', height: 'auto' }}
            value={value}
            onChange={newValue => handleSelectChange(newValue, record)}
            options={exposedStatusSelectBox}
            onClick={e => e.stopPropagation()} // 셀렉트 박스 클릭 시 이벤트 전파 중지
          />
        );
      },
    },
    {
      title: '쿠폰번호 발행',
      dataIndex: 'couponId',
      align: 'center',
      render: (value, record) => (
        <>
          {couponOnOffType?.find(item => item.value === record?.couponOnOffType)?.key === 'OFFLINE' && (
            <>
              <Buttons
                type="primary"
                name={'발행'}
                onClick={e => {
                  e.stopPropagation();
                  showPopup('쿠폰번호 발급', value);
                }}
              />
            </>
          )}
        </>
      ),
    },
  ];

  // 재발급 테이블 칼럼 설정
  const reissueColumns = [
    { title: '재발급ID', dataIndex: 'couponReissueId', align: 'center' },
    { title: '쿠폰 유형', dataIndex: 'couponType', align: 'center' },
    { title: '쿠폰명', dataIndex: 'couponName', align: 'center' },
    { title: '쿠폰ID', dataIndex: 'couponId', align: 'center' },
    {
      title: '유효기간',
      dataIndex: 'expirationPeriod',
      align: 'center',
      render: (value, record) => `${record.expirationStartDate} ~ ${record.expirationEndDate}`,
    },
    {
      title: '발급 회원명',
      dataIndex: 'memberName',
      align: 'center',
      render: (value, record) => (
        <a target="_blank" href={`/admin/member/${record.memberId}`}>
          {value}
        </a>
      ),
    },
    { title: '수량', dataIndex: 'quantity', align: 'center' },
    { title: '등록일', dataIndex: 'regDate', align: 'center' },

    {
      title: '노출 여부',
      dataIndex: 'exposedStatus',
      align: 'center',
      render: (value, record) => {
        return (
          <Select
            style={{ width: '100%', height: 'auto' }}
            value={value}
            onChange={newValue => handleSelectChange(newValue, record)}
            options={exposedStatusSelectBox}
            onClick={e => e.stopPropagation()} // 셀렉트 박스 클릭 시 이벤트 전파 중지
          />
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const { push } = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tabMenuList, setTabMenuList] = useState([]);
  const [tabStatus, setTabStatus] = useState('BAUSCH');
  const [resetState, setResetState] = useState(false);
  const [couponSearchCodeOptions, setCouponSearchCodeOptions] = useState([]);
  const [couponTypeOptions, setCouponTypeOptions] = useState([]);
  const [couponOnOffTypeOptions, setCouponOnOffTypeOptions] = useState([]);
  const [exposedStatusOptions, setExposedStatusOptions] = useState([]);
  const [exposedStatusSelectBox, setExposedStatusSelectBox] = useState([]);
  const [initialParams, setInitialParams] = useState({
    couponTab: 'BAUSCH',
    channelType: 'BAUSCH',
  });
  // 공통코드 호출
  const { couponType, exposedStatus, couponOnOffType, couponSearchCode, couponTab } = useCommonCodeBatch([
    'couponType',
    'exposedStatus',
    'couponOnOffType',
    'couponSearchCode',
    'couponTab',
  ]);

  const { content } = useSelector(state => state?.campaign);
  const { handlePageChange, getInitData, pagination } = usePagination(state => state?.campaign, getCampaignCouponListAction, null, initialParams);

  // 테이블 헤더 옵션
  useEffect(() => {
    if (couponSearchCode) {
      setCouponSearchCodeOptions(transSelectBox(couponSearchCode));
    }
  }, [couponSearchCode]);

  // 쿠폰 유형 옵션
  useEffect(() => {
    if (couponType) {
      setCouponTypeOptions(transFilterSelectBox(couponType));
    }
  }, [couponType]);

  // 쿠폰 구분 옵션
  useEffect(() => {
    if (couponOnOffType) {
      setCouponOnOffTypeOptions(transFilterSelectBox(couponOnOffType));
    }
  }, [couponOnOffType]);

  // 노출 여부 옵션
  useEffect(() => {
    if (exposedStatus) {
      setExposedStatusOptions(transFilterSelectBox(exposedStatus));
      setExposedStatusSelectBox(transSelectBox(exposedStatus));
    }
  }, [exposedStatus]);

  // 회원 쿠폰 재발급 페이지 이동
  const handleReissueClick = () => {
    push('/admin/campaign/coupon/set-reissue');
  };

  // 탭 메뉴 넣기
  useEffect(() => {
    if (couponTab?.length > 0) {
      setTabMenuList(
        couponTab.map(type => ({
          label: type.value,
          key: type.key,
        })),
      );
    }
  }, [couponTab]);

  // 리스트 가져오기
  useEffect(() => {
    getInitData({ page: 0, size: 10 });
    return () => {
      dispatch(campaignReset());
    };
  }, [dispatch, getInitData, initialParams]);

  // 탭 변경
  const handleChangeTabMenu = key => {
    setTabStatus(key);
    setInitialParams({
      couponTab: key,
      ...(key !== 'REISSUE' && { channelType: key }), // 조건부로 channelType 추가
    });
  };

  // 리스트 체크
  const selectListItem = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 테이블 헤더 검색
  const handleSearch = data => {
    const { selectOptions, searchText } = data;

    const searchData = {
      couponSearchCode: selectOptions,
      searchText,
    };
    getInitData({ page: 0, size: 10 }, searchData);
  };

  // 리스트 삭제
  const handleDeleteCoupon = () => {
    const params = {
      page: 0,
      size: 10,
      couponTab: tabStatus,
      ...(tabStatus !== 'REISSUE' && { channelType: tabStatus }), // 조건부로 channelType 추가
    };

    const sendObject = {
      initialParams: params,
      ids: selectedRowKeys,
    };
    if (tabStatus === 'REISSUE') {
      dispatch(deleteReissueCouponAction({ sendObject }));
    } else {
      dispatch(deleteCouponAction({ sendObject }));
    }
    setSelectedRowKeys([]);
  };

  // 노출여부 변경
  const handleSelectChange = (value, record) => {
    const currentParams = {
      page: 0,
      size: 10,
      couponTab: tabStatus,
      ...(tabStatus !== 'REISSUE' && { channelType: tabStatus }), // 조건부로 channelType 추가
    };
    if (tabStatus !== 'REISSUE') {
      dispatch(
        updateCampaignCouponExposedAction({
          params: `ids=${record.key}&exposedStatus=${value}`,
          initialParams: currentParams,
        }),
      );
    } else {
      dispatch(
        updateReissueCampaignCouponExposedAction({
          id: record.couponReissueId,
          params: value,
          initialParams: currentParams,
        }),
      );
    }
  };

  // 쿠폰번호 발행 (쿠폰구분이 오프라인인 경우)
  const showPopup = (popupTitle, couponId) => {
    dispatch(getOfflineCouponAction({ params: { page: 0, size: 5 }, id: couponId }));
    // Popup
    dispatch(
      openPops({
        width: 720,
        isModalOpen: true,
        content: <CouponCreateModalBox couponId={couponId} />,
        title: popupTitle,
      }),
    );
  };

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel
          title={'👉🏼 바슈롬에서 소비자에게 혜택을 제공하는 쿠폰 리스트이며 쿠폰과 연결되어있는 제품 및 스토어 그룹을 확인할 수 있습니다.'}
        />
        <ColGrid span={8} />
        <Buttons
          type={'primary'}
          onClick={handleReissueClick}
          icon={<SettingOutlined />}
          name={'회원 쿠폰 재발급'}
          htmlType={'submit'}
          css={marginRightStyle(10)}
        />
      </div>
      <DividingLine border={false} />
      {/* 탭 */}
      <Tabs onTabClick={handleChangeTabMenu} items={tabMenuList} type="line" centered size={'smail'} />
      {/* 필터 */}
      <PromotionCouponSearchBox
        selectOptions1={couponTypeOptions}
        selectOptions2={couponOnOffTypeOptions}
        selectOptions3={exposedStatusOptions}
        onHandleSearchData={getInitData}
        setResetState={setResetState}
        tabStatus={tabStatus}
      />
      {/* 테이블 */}
      <CardContainer>
        <ListHeaderSection
          handleSearch={handleSearch}
          selectOptions={couponSearchCodeOptions}
          resetState={resetState}
          setResetState={setResetState}
          defaultValue="COUPON_NAME"
        />
        <Tables
          checkbox={true}
          selectedRowKeys={selectedRowKeys}
          onSelectListItem={selectListItem}
          listData={content}
          columns={tabStatus === 'REISSUE' ? reissueColumns : columns}
          detail={tabStatus === 'REISSUE' ? false : true} // 추가된 부분
          // onRow={record => ({
          //   onClick: () => handleRowClick(record), // 클릭 핸들러 추가
          // })}
          handleChangePageOption={handlePageChange}
          pagination={pagination}
          option={<Buttons htmlType={'danger'} type={'danger'} name="삭제" css={marginLeftStyle(5)} onClick={handleDeleteCoupon}></Buttons>}
        />
      </CardContainer>
      <DividingLine border={false} />
      <CardContainer>
        <RowGrid css={buttonRowStyle}>
          <Buttons
            type={'primary'}
            name={'쿠폰 등록'}
            htmlType={'submit'}
            css={marginLeftStyle(5)}
            onClick={() => push('/admin/campaign/coupon/sub')}
          />
        </RowGrid>
      </CardContainer>
      <Popup />
    </>
  );
};

export default PromotionCouponTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
