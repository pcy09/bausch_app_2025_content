import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, InputSearchAtom, Popup, Radios, RowGrid, Tables } from '@/components/atom';
import { Checkbox, Collapse, Descriptions, Input, List, Modal, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { descStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { transFormRadioValue, transSelectBox } from '@/common/utiles';
import useCommonCode from '@/hooks/useCommonCode';
import { StatisticsCards } from '@/components/molecules';
import NoticeLabel from '@/components/atom/Notice';
import {
  getStoreDetailAction,
  getStoreDetailOpticianAction,
  getStoreDetailPointAction,
  getStoreListAction,
  storeReset,
  updateStoreDetailAction,
} from '@/store/reducers/admin/storeReducer';
import StoreDetailPointListTemplate from './StoreDetailPointListTemplate';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// 테이블 컬럼 설정
const columns = [
  {
    title: 'No',
    dataIndex: 'opticianId',
    align: 'center',
  },
  {
    title: '안경사 코드',
    dataIndex: 'opticianCode',
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'opticianName',
    align: 'center',
  },
  {
    title: '휴대폰 번호',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: '이메일',
    dataIndex: 'email',
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'opticianStatus',
    align: 'center',
  },
];

const StoreManageDetailTemplate = () => {
  const clickHandlerRef = useRef(null); // 클릭 핸들러 참조 저장
  const inputRef = useRef(null); // Inputs의 ref 생성
  const { query, back, push } = useRouter();
  const router = useRouter();
  const id = query.id;
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue, getValues, watch } = useForm({});
  const onSubmit = data => handleSendData(data);
  const onError = errors => handleError(errors);

  // 공통코드 호출
  const { autoOrderStatus, storeGroup, lenslyStatus } = useCommonCodeBatch(['autoOrderStatus', 'storeGroup', 'lenslyStatus']);

  const { storeDetailData } = useSelector(state => state?.store);

  const { appStoreHistories } = useSelector(state => state?.store);
  const { storeOpticianList } = useSelector(state => state?.store);
  const { pointGroups } = useSelector(state => state?.store);

  // 옵션
  const [storeLenslyStatus, setStoreLenslyStatus] = useState([]);
  const [storeAutoOrderStatus, setAutoOrderStatus] = useState([]);
  const [storeGroupOptions, setStoreGroupOptions] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 관리
  const [isAppStore, setIsAppStore] = useState(false);

  // 수정
  const handleSendData = data => {
    const { storeName, storeGroup, autoOrderStatus, lenslyStatus, salesPerson, storeType, lat, lng } = data;
    const sendObject = {
      storeName: storeName,
      storeGroupId: storeGroup,
      autoOrderStatus: autoOrderStatus,
      lenslyStatus: lenslyStatus,
      salesPerson: salesPerson,
      storeType: storeType,
      lat: Number(lat),
      lng: Number(lng),
    };
    console.log(sendObject);
    dispatch(updateStoreDetailAction({ id: id, sendObject: sendObject, callback: router }));
  };

  // 스토어그룹 옵션
  useEffect(() => {
    if (storeGroup) {
      const options = transSelectBox(storeGroup);
      setStoreGroupOptions(options);
    }
  }, [storeGroup]);

  // 자동발주 옵션
  useEffect(() => {
    if (autoOrderStatus && autoOrderStatus.length > 0) {
      setAutoOrderStatus(transFormRadioValue(autoOrderStatus));
    }
  }, [autoOrderStatus]);

  // lensly 옵션
  useEffect(() => {
    if (lenslyStatus && lenslyStatus.length > 0) {
      setStoreLenslyStatus(transFormRadioValue(lenslyStatus));
    }
  }, [lenslyStatus]);

  // useEffect(() => {
  //   if (!storeDetailData.length) {
  //     dispatch(getStoreListAction());
  //   }
  //   console.log(storeDetailData.length, '??');
  // }, [dispatch, storeDetailData.length]);

  // 상세 데이터 호출
  useEffect(() => {
    if (query.id) {
      dispatch(getStoreDetailAction({ id: query.id, callback: push }));
      dispatch(getStoreDetailOpticianAction({ id: query.id, callback: push }));
      dispatch(getStoreDetailPointAction({ params: { storeId: id } }));
    }
    return () => {
      dispatch(storeReset());
    };
  }, [query, dispatch]);

  useEffect(() => {
    if (storeDetailData) {
      setValue('lenslyStatus', storeDetailData.lenslyStatus);
      setValue('autoOrderStatus', storeDetailData.autoOrderStatus);
      setValue('storeName', storeDetailData.storeName);
      setValue('abc_segment', storeDetailData.abcSM);
      setValue('storeType', storeDetailData.storeType);
      setValue('store_phone', storeDetailData.storePhone);
      setValue('reg_num', storeDetailData.regNumber);
      setValue('salesPerson', storeDetailData.salesPerson);
      setValue('storeGroup', storeDetailData.storeGroupId);
      setValue('fsStoreAddr1', storeDetailData.basicAddress);
      setValue('fsStoreAddr2', storeDetailData.detailAddress);
      if (storeDetailData.storeType === 'APP_STORE') {
        setValue('lat', storeDetailData?.lat);
        setValue('lng', storeDetailData?.lng);
        setSelectedLocation({ lat: storeDetailData.lat, lng: storeDetailData.lng });
      }
    }
  }, [storeDetailData, setValue]);

  const handleError = errors => {
    if (errors?.storeName) {
      dispatch(
        errorSnackOpen({
          message: '스토어 명 누락',
          description: '스토어 명을 입력해주세요.',
        }),
      );
    }
    if (errors?.storeGroup) {
      dispatch(
        errorSnackOpen({
          message: '스토어 그룹 누락',
          description: '스토어 그룹을 선택해주세요.',
        }),
      );
    }
    if (errors?.lat || errors?.lng) {
      dispatch(
        errorSnackOpen({
          message: '주소 정보 누락',
          description: '앱 스토어 가입 시 주소를 입력해주세요.',
        }),
      );
    }
  };

  // 주소 수정 모달창 열기
  const handleAddressSearch = () => {
    setIsModalVisible(true);
    const { lat, lng } = getValues();
    if (lat && lng) {
      setSelectedLocation({ lat, lng });
      getAddressFromLatLng(lat, lng);
    }
  };

  // 좌표로 주소 변환
  const getAddressFromLatLng = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newData = result[0];
        const updatedAddress = {
          address_name: newData?.address?.address_name || null,
          road_address_name: newData?.road_address?.address_name || null,
          place_name: newData?.road_address?.building_name || '알수없음',
        };
        setSelectedAddress(updatedAddress);
      }
    });
  };

  // 주소 수정 모달 OK
  const handleOk = () => {
    if (selectedLocation.lat && selectedLocation.lng) {
      Modal.confirm({
        title: '수정 확인',
        content: '해당 주소로 수정하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk() {
          setValue('lat', selectedLocation.lat);
          setValue('lng', selectedLocation.lng);
          setValue('storeType', 'APP_STORE');
          setIsModalVisible(false);
          resetSearchAddress();
        },
        onCancel() {
          console.log('취소 클릭');
        },
      });
    } else {
      alert('주소를 검색해주세요');
    }
  };

  // 주소 수정 모달 CANCEL (초기화)
  const handleCancel = () => {
    setIsModalVisible(false);
    resetSearchAddress();
  };

  // 주소 검색관련 초기화
  const resetSearchAddress = () => {
    setValue('searchAddress', '');
    setIsFocused(false);
    setSelectedAddress(null);
    setSelectedLocation({ lat: null, lng: null });
  };

  // 주소 검색하기(실시간)
  const searchAddress = value => {
    if (value !== '') {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(value, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      });
    }
  };

  // 주소 선택하기
  const selectAddress = (address_name, road_address_name, place_name) => {
    setIsFocused(false);
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address_name, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { y: lat, x: lng } = result[0];
        setSelectedLocation({ lat, lng });
        setSelectedAddress({ address_name, road_address_name, place_name });
      }
    });
  };

  // 클릭한 곳으로 좌표 수정
  const handleMapClick = (map, mouseEvent) => {
    const latLng = mouseEvent.latLng;
    if (latLng) {
      const lat = latLng.getLat();
      const lng = latLng.getLng();
      setSelectedLocation({ lat, lng });

      // 좌표로 주소 변환
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const newData = result[0];
          const updatedAddress = {
            address_name: newData?.address?.address_name || null,
            road_address_name: newData?.road_address?.address_name || null,
            place_name: newData?.road_address?.building_name || '알수없음',
          };
          setSelectedAddress(updatedAddress);
        }
      });
    }
  };

  // 해등스토어 적립금 내역 모달 열기
  const handlePointModalOpen = () => {
    setIsPointModalOpen(true);
  };
  // 해등스토어 적립금 내역 모달 CANCEL
  const handlePointModalCancel = () => {
    setIsPointModalOpen(false);
  };

  // Modal 상태 변화 감지 후 포커스 설정
  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isModalVisible]);

  // 앱 스토어 가입여부 체크하기
  useEffect(() => {
    const { storeType } = getValues();
    if (storeType) {
      setIsAppStore(storeType === 'APP_STORE');
    }
  }, [watch(['storeType']), getValues]);

  return (
    <>
      <div css={descStyle}>
        <NoticeLabel title={'👉🏼 스토어 상세 페이지입니다. 스토어의 내용을 수정할 수 있습니다.'} />
      </div>
      <DividingLine border={false} />

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 기본 정보 */}
        <CardContainer>
          <Descriptions title="기본 정보" bordered={true} column={4} labelStyle={{ width: '200px' }}>
            <Descriptions.Item span={2} label="스토어 코드">
              {storeDetailData.storeCode}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="스토어 이름⭐️">
              <Controller
                name="storeName"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="스토어 그룹⭐️">
              <Controller
                name="storeGroup"
                control={control}
                defaultValue={storeDetailData?.storeGroupId}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Select value={value} options={storeGroupOptions} style={{ width: '100%' }} placeholder={'입력해주세요.'} {...rest} />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="자동 발주⭐️">
              <Controller
                name="autoOrderStatus"
                control={control}
                defaultValue={'NO'}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Radios options={storeAutoOrderStatus} value={value} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="Lensly⭐️">
              <Controller
                name="lenslyStatus"
                control={control}
                defaultValue={'온라인'}
                render={({ field: { ref, value, ...rest }, fieldState }) => {
                  return <Radios options={storeLenslyStatus} value={value} {...rest} />;
                }}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="담당 영업사원">
              <Controller
                name="salesPerson"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs value={value || null} type="text" placeholder={'입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          <Descriptions title="상세 정보" bordered={true} column={4} labelStyle={{ width: '200px' }}>
            <Descriptions.Item span={2} label="ABC 세그먼트">
              {storeDetailData.abcSM}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="전화번호">
              {storeDetailData.storePhone}
            </Descriptions.Item>

            <Descriptions.Item span={2} label="대표자명">
              {storeDetailData.owner}
            </Descriptions.Item>

            <Descriptions.Item span={2} label="사업자번호">
              {storeDetailData.regNumber}
            </Descriptions.Item>
            <Descriptions.Item span={4} label="주소">
              <RowGrid gutter={16}>
                <ColGrid span={16}>
                  {storeDetailData.basicAddress} {storeDetailData.detailAddress}
                </ColGrid>
              </RowGrid>
            </Descriptions.Item>
          </Descriptions>
          <DividingLine border={false} />
          <Descriptions title="앱 스토어 가입" bordered={true} column={4} labelStyle={{ width: '200px' }}>
            <Descriptions.Item span={4} label="앱 스토어 가입">
              <Controller
                name="storeType"
                control={control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <Checkbox
                    checked={value === 'APP_STORE'}
                    onChange={e => {
                      const checked = e.target.checked;
                      // 체크하면 지도창 오픈
                      if (checked) {
                        handleAddressSearch();
                      }

                      if (!checked) {
                        Modal.confirm({
                          icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '30px' }} />,
                          title: '정말로 가입을 해제하시겠습니까?',
                          content: '기존 lat/lng 좌표가 초기화됩니다',
                          okText: '예',
                          cancelText: '아니요',
                          maskClosable: true,
                          onOk() {
                            setValue('lat', '');
                            setValue('lng', '');
                            resetSearchAddress();
                            onChange('GENERAL_STORE');
                          },
                        });
                      }
                      // onChange(checked ? 'APP_STORE' : 'GENERAL_STORE');
                    }}
                    {...rest}>
                    앱 스토어 가입
                  </Checkbox>
                )}
              />
              {isAppStore && <Buttons name="주소 수정" onClick={handleAddressSearch} />}
              {/* 주소검색 모달 */}
              <Modal
                title="주소 검색"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="확인"
                cancelText="취소"
                bodyStyle={{ minHeight: '400px', maxHeight: '610px', overflowY: 'auto', position: 'relative' }}>
                <Controller
                  name="searchAddress"
                  control={control}
                  render={({ field: { ref, value, onChange, ...rest }, fieldState }) => (
                    <Inputs
                      {...rest}
                      ref={inputRef} // ref 전달
                      value={value || ''}
                      type="text"
                      onChange={e => {
                        const value = e.target.value;
                        onChange(value);
                        searchAddress(value);
                        if (value === '') {
                          setIsFocused(false);
                        } else {
                          setIsFocused(true);
                        }
                      }}
                      placeholder={'주소를 입력하세요'}
                      onFocus={() => {
                        const value = getValues('searchAddress');
                        if (value && value !== '') {
                          setIsFocused(true);
                        }
                      }}
                    />
                  )}
                />

                {/* 검색결과 */}
                {isFocused && (
                  <>
                    {/* 리스트 */}
                    <List
                      itemLayout="horizontal"
                      dataSource={searchResults}
                      locale={{ emptyText: '검색 결과가 없습니다' }}
                      renderItem={item => (
                        <List.Item onClick={() => selectAddress(item.address_name, item.road_address_name, item.place_name)} css={listStyle}>
                          <List.Item.Meta
                            title={item.place_name}
                            description={
                              <>
                                <div>{item.address_name}</div>
                                <div>{item.road_address_name}</div>
                              </>
                            }
                            onClick={e => {
                              e.stopPropagation(); // List.Item의 onClick 이벤트가 발생하지 않도록 막음
                              selectAddress(item.address_name, item.road_address_name, item.place_name);
                            }}
                          />
                        </List.Item>
                      )}
                      style={{
                        position: 'absolute',
                        width: 'calc(100% - 48px)',
                        top: '60px',
                        left: 24,
                        cursor: 'pointer',
                        background: '#fff',
                        zIndex: '99999',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 효과
                        border: '1px solid #ddd', // 테두리
                      }}
                    />
                    {/* 위쪽 투명 배경 */}
                    <div
                      css={transparentStyle}
                      style={{
                        top: 0,
                        height: '24px',
                      }}
                      onClick={() => {
                        setIsFocused(false);
                      }}
                    />
                    {/* 아래쪽 투명 배경 */}
                    <div
                      css={transparentStyle}
                      style={{
                        top: '60px',
                        height: 'calc(100% - 60px)',
                      }}
                      onClick={() => {
                        setIsFocused(false);
                      }}
                    />
                  </>
                )}
                {/* 선택된 주소 */}
                {selectedAddress && (
                  <div style={{ height: '100px' }}>
                    <DividingLine border={false} />
                    <div css={addressBoxStyle}>
                      <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{selectedAddress?.place_name}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                        {selectedAddress?.road_address_name && (
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <span css={addressTagStyle}>도로명</span>
                            {selectedAddress?.road_address_name}
                          </div>
                        )}
                        {selectedAddress?.address_name && (
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <span css={addressTagStyle}>지번</span>
                            {selectedAddress?.address_name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <DividingLine border={false} />
                {/* 지도 */}
                {selectedLocation.lat && selectedLocation.lng ? (
                  <>
                    <Map
                      center={selectedLocation}
                      style={{ width: '100%', height: '350px', border: '2px solid #e9e9ec' }}
                      level={1}
                      onCreate={map => {
                        // 기존 리스너 제거
                        if (clickHandlerRef.current) {
                          map.setCenter(new kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng));
                          map?.setLevel(1);
                          window.kakao.maps.event.removeListener(map, 'click', clickHandlerRef.current);
                        }
                        // 새 핸들러 등록
                        const newHandler = mouseEvent => handleMapClick(map, mouseEvent);
                        clickHandlerRef.current = newHandler;
                        window.kakao.maps.event.addListener(map, 'click', newHandler);
                      }}>
                      <MapMarker position={selectedLocation} />
                    </Map>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                      <span>LAT : {selectedLocation.lat}</span>
                      <span>LNG : {selectedLocation.lng}</span>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '250px',
                      color: '#939396',
                    }}>
                    도로명 또는 지번을 입력해주세요
                  </div>
                )}
              </Modal>
            </Descriptions.Item>

            {isAppStore && (
              <Descriptions.Item span={4} label="지도 LAT / LNG">
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Controller
                    name="lat"
                    control={control}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <>
                        <span>LAT</span>
                        <Inputs style={{ width: '200px' }} value={value} type="number" {...rest} disabled={true} />
                      </>
                    )}
                  />
                  <span>/</span>
                  <Controller
                    name="lng"
                    control={control}
                    render={({ field: { ref, value, ...rest }, fieldState }) => (
                      <>
                        <span>LNG</span>
                        <Inputs style={{ width: '200px' }} value={value} type="number" {...rest} disabled={true} />
                      </>
                    )}
                  />
                </div>
              </Descriptions.Item>
            )}
          </Descriptions>
          <DividingLine border={false} />
          <Collapse>
            <Collapse.Panel header={'앱 스토어 가입이력 보기'} key={'log'}>
              {appStoreHistories?.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </Collapse.Panel>
          </Collapse>
        </CardContainer>
        <DividingLine border={false} />

        {/* 안경사 관리 */}
        {/* <CardContainer bordered={false}>
          <Descriptions title="안경사 관리"></Descriptions>
          <Tables detail={false} columns={columns} listData={storeOpticianList} rowKey={'opticianId'} scroll={{ y: 200 }} />
        </CardContainer>
        <DividingLine border={false} /> */}

        {/* 적립금 현황 */}
        <StatisticsCards cardData={pointGroups} handlePointModalOpen={handlePointModalOpen} />
        <DividingLine border={false} />

        {/* 해당 스토어 적립금 세부내역 */}
        <Modal
          title="적립금 내역"
          open={isPointModalOpen}
          onCancel={handlePointModalCancel}
          css={modalStyles}
          style={{ top: 20 }}
          footer={null}
          width={1200}>
          <StoreDetailPointListTemplate id={id} />
        </Modal>

        {/* 푸터 */}
        <CardContainer>
          <RowGrid>
            <ColGrid span={24} css={buttonRowStyle}>
              <Buttons
                type={'default'}
                name={'이전'}
                htmlType={'button'}
                onClick={() => router.push('/admin/store/manage')}
                css={marginRightStyle(5)}
              />
              <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
            </ColGrid>
          </RowGrid>
        </CardContainer>
      </Form>

      <DividingLine border={false} />
    </>
  );
};

export default StoreManageDetailTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const modalStyles = css`
  .ant-modal-content {
    background-color: #ececec;
  }
`;
const listStyle = css`
  padding: 5px 10px;
  &:hover {
    background: #f4fef6;
  }
`;
const addressBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 0 6px 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  border-radius: 4px;
`;
const addressTagStyle = css`
  padding: 1px 4px;
  border: 1px solid rgba(217, 217, 220, 1);
  border-radius: 2px;
  font-size: 10px;
`;
const transparentStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 2;
`;
