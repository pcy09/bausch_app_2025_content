import { useEffect, useRef, useState } from 'react';
import { Button, Card, Descriptions, List } from 'antd';
import { Buttons, CardContainer, Popup, Tables } from '@/components/atom';
import { css } from '@emotion/react';
import { useGesture } from 'react-use-gesture';
import { useDispatch } from 'react-redux';
import { StatisticsCardsModalBox } from '../ModalBox';
import { openPops } from '@/store/reducers/popupsReducer';
import { postStoreDetailPointCreateAction } from '@/store/reducers/admin/storeReducer';
import { useRouter } from 'next/router';

const StatisticsCards = ({ cardData, handlePointModalOpen }) => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const id = query.id;

  // 적립금별 수정하기
  const handleRegisterClick = sendObject => {
    dispatch(postStoreDetailPointCreateAction({ id, sendObject })); //수정하기
    dispatch(openPops({ isModalOpen: false })); //팝업 닫기
  };

  // 적립/차감 팝업
  const showPopup = (popupTitle, pointGroupName) => {
    dispatch(
      openPops({
        width: 520,
        isModalOpen: true,
        content: <StatisticsCardsModalBox handleUpdate={handleRegisterClick} pointGroupName={pointGroupName} />,
        title: popupTitle,
        buttonsConfig: [],
      }),
    );
  };

  /*
   ************************************
   */

  const columns = [
    {
      title: '적립금명',
      dataIndex: 'pointGroupName',
      align: 'center',
    },
    {
      title: '총 적립금',
      dataIndex: 'pointTotal',
      align: 'center',
      render: value => `${value.toLocaleString()}원`, // 금액 포맷팅
    },
    {
      title: '발급 및 차감',
      key: 'action',
      align: 'center',
      render: (_, record) => <Buttons name={'관리'} type="primary" onClick={() => showPopup('적립금 관리', record.pointGroupName)} />,
    },
  ];

  return (
    <CardContainer>
      <Descriptions
        title="적립금 현황"
        extra={
          <div style={{ display: 'flex', gap: '12px' }}>
            <Buttons name={'적립금 내역'} onClick={handlePointModalOpen} />
          </div>
        }></Descriptions>
      <Tables detail={false} columns={columns} listData={cardData} rowKey={'pointId'} />
    </CardContainer>
  );
};

export default StatisticsCards;

const scrollableRowStyle = css`
  display: flex;
  overflow-x: auto;
  margin: 0 -8px;
`;

const cardBox = css`
  width: 400px;
  margin-bottom: 16px;
`;
