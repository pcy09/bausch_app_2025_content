import { contentsContainerStyle, marginBottomStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { Buttons, CardContainer, ColGrid, Form, RowGrid } from '@/components/atom';
import { DownloadOutlined } from '@ant-design/icons';
import Tables from '../../atom/Tables';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ReservationSearchBox } from '@/components/molecules/SearchBox';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/store/reducers/modalReducer';
import { getReservationListAction, changeTabMenu } from '@/store/reducers/lensly/reservationReducer';
import { getReturnOrderDataAction, getWebOrderDataAction } from '@/store/reducers/lensly/webOrderReducer';
import { useForm } from 'react-hook-form';

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
    width: 40,
    align: 'center',
  },
  {
    title: '제품명',
    dataIndex: 'product_name',
  },
  {
    title: '예약번호',
    dataIndex: 'reservation_number',
    align: 'center',
  },
  {
    title: '안경원명',
    dataIndex: 'fsStoreName',
    align: 'center',
  },
  {
    title: '안경원 코드',
    dataIndex: 'fiStoreID',
    align: 'center',
  },
  {
    title: '신청 수량',
    dataIndex: 'reservation_quantity',
    width: 70,
    align: 'center',
  },
  {
    title: '신청일',
    dataIndex: 'reservation_date',
    align: 'center',
  },
  {
    title: '예약자명',
    dataIndex: 'user_name',
    align: 'center',
  },
  {
    title: '전화번호',
    dataIndex: 'user_phone',
    align: 'center',
  },
];

const ReservationListTemplate = () => {
  const dispatch = useDispatch();
  const { reservationList, tab, paging, searchData } = useSelector(state => state.reservation);

  // 체크박스
  // const [selectionType, setSelectionType] = useState([]);
  const [selectionIds, setSelectionIds] = useState([]);
  // 체크박스 선택 값
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 회원 상태 변경
  const onSubmit = data => handleSendData(data);

  // 상품 상태 변경 함수
  const handleSendData = data => {
    const sendObject = {
      ...data,
      ids: selectedRowKeys,
    };
    dispatch(productDeleteAction({ sendObject }));
    setSelectedRowKeys([]);
  };

  const getInitData = ({ offset = 1, pageSize = 100, status = tab } = {}) => {
    const params = {
      pageSize,
      offset,
      status,
      ...searchData,
    };
    dispatch(getReservationListAction({ params }));
  };

  useEffect(() => {
    getInitData();
  }, []);

  const selectListItem = newSelectedRowKeys => {
    setSelectionIds(newSelectedRowKeys);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // 탭 메뉴 배열 만들기
  const tabMenuList = () => {
    return [
      {
        label: '예약완료',
        key: 'R',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
            option={
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Buttons type={'default'} name="삭제" htmlType={'submit'} css={marginLeftStyle(5)}></Buttons>
              </Form>
            }
          />
        ),
      },
      {
        label: '배송시작',
        key: 'S',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
          />
        ),
      },
      {
        label: '배송완료',
        key: 'D',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
          />
        ),
      },
      {
        label: '재고부족실패',
        key: 'F',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
          />
        ),
      },
      {
        label: '예약취소',
        key: 'RC',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
          />
        ),
      },
      {
        label: '예약취소(반품가능)',
        key: 'CW',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
          />
        ),
      },
      {
        label: '반품',
        key: 'RE',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
          />
        ),
      },
      {
        label: '반품완료',
        key: 'IC',
        children: (
          <Tables
            checkbox
            detail={false}
            pagination={paging}
            handleChangePageOption={getInitData}
            listData={reservationList}
            columns={columns}
            selectedRowKeys={selectionIds}
            onSelectListItem={selectListItem}
          />
        ),
      },
    ];
  };
  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e) => {
    setSelectionIds([]);
    dispatch(changeTabMenu({ tab: key }));
    const params = {
      pageSize: paging.pageSize,
      offset: 1,
      status: key,
    };
    getInitData(params);
  };

  // 웹오더 연동 모달 보기
  const handleSendWebOrder = () => {
    const sendObject = {
      ids: selectionIds,
    };
    dispatch(getWebOrderDataAction({ sendObject }));
    dispatch(
      openModal({
        modalInfo: {
          show: true,
          title: '웹 오더 신청',
          description: '웹 오더를 처리하시겠습니까?',
          okText: '확인',
          cancelText: '취소',
          okFunction: 'webOrder',
          ids: selectionIds,
        },
      }),
    );
  };

  // 반품 오더 연동 모달 보기
  // 웹오더 연동 모달 보기
  const handleSendReturnOrder = () => {
    const sendObject = {
      ids: selectionIds,
    };
    console.log(sendObject);
    dispatch(getReturnOrderDataAction({ sendObject }));
    dispatch(
      openModal({
        modalInfo: {
          show: true,
          title: '반품 오더 신청',
          description: '반품 오더를 처리하시겠습니까?',
          okText: '확인',
          cancelText: '취소',
          okFunction: 'returnOrder',
        },
      }),
    );
  };

  // 배송상태 변경
  const handleChangeProductStatus = () => {
    const selectedOption = () => {
      switch (tab) {
        // 예약 완료
        // 재고부족 실패
        case 'R':
        case 'F':
          return [{ value: 'RC', label: '예약취소' }];
        // 배송 시작
        case 'S':
          return [
            { value: 'D', label: '배송완료' },
            { value: 'CW', label: '예약취소(반품가능)' },
          ];
        // 예약취소(반품가능)
        case 'CW':
          return [{ value: 'RE', label: '반품' }];
        // 배송완료
        default:
          return [{ value: 'CW', label: '예약취소(반품가능)' }];
      }
    };

    const sendData = {
      ids: selectionIds,
      tab,
    };

    dispatch(
      openModal({
        modalInfo: {
          show: true,
          title: '예약 상태 변경',
          description: '상태를 선택해주세요.',
          selectedOption: selectedOption(),
          okText: '변경하기',
          cancelText: '취소',
          okFunction: 'changeProductStatus',
          sendData,
        },
      }),
    );
  };

  return (
    <>
      <ReservationSearchBox getSearchData={getInitData} />

      <CardContainer>
        <RowGrid css={marginBottomStyle(12)}>
          <ColGrid span={8}>
            <span>
              조회된 컨텐츠는 총 <strong>{paging?.total}</strong>건 입니다.
            </span>
          </ColGrid>
          <ColGrid span={8} />
          <ColGrid span={8} css={buttonRowStyle}>
            <Buttons type={'dashed'} icon={<DownloadOutlined />} name={'엑셀 다운로드'} />
            {tab !== 'RE' && tab !== 'RC' && tab !== 'IC' && (
              <Buttons
                type={'primary'}
                ghost
                name={'배송상태 변경'}
                disabled={selectionIds.length <= 0}
                htmlType={'button'}
                css={marginLeftStyle(10)}
                onClick={handleChangeProductStatus}
              />
            )}

            {(tab === 'R' || tab === 'F') && (
              <Buttons
                type={'primary'}
                ghost
                name={'웹오더 신청'}
                disabled={selectionIds.length <= 0}
                htmlType={'button'}
                css={marginLeftStyle(10)}
                onClick={handleSendWebOrder}
              />
            )}

            {tab === 'RE' && (
              <Buttons
                type={'primary'}
                ghost
                name={'반품 오더 신청'}
                disabled={selectionIds.length <= 0}
                htmlType={'button'}
                css={marginLeftStyle(10)}
                onClick={handleSendReturnOrder}
              />
            )}
          </ColGrid>
        </RowGrid>

        <Tabs onTabClick={(key, e) => handleChangeTabMenu(key, e)} defaultActiveKey={tab} type="card" centered size={'smail'} items={tabMenuList()} />

        {/*<Tables listData={reservationData} columns={columns} rowSelection={checkboxOption} />*/}
      </CardContainer>
    </>
  );
};

export default ReservationListTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
