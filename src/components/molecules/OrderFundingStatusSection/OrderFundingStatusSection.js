import { CardContainer } from '@/components/atom';
import { Card, Descriptions } from 'antd';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';
import { formatToWon } from '@/common/utiles';
import { getPointProductListAction } from '@/store/reducers/admin/pointProductOrderReducer';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
const OrderFundingStatusSection = ({ pointStoreData, selectedCardId, handleSelectPoint }) => {
  const scrollRef = useRef(null);

  const bind = useGesture({
    onDrag: ({ offset: [dx] }) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += dx * -1;
      }
    },
  });

  return (
    <CardContainer>
      <Descriptions title="적립금 현황"></Descriptions>
      <div {...bind()} ref={scrollRef} css={scrollableRowStyle}>
        {pointStoreData?.map(item => (
          <div
            key={item.pointId}
            css={[cardContainer, selectedCardId === item.pointId ? selectedCardStyle : cardBox]}
            onClick={() => handleSelectPoint(item)}>
            <Card title={`${item.pointName} 적립금`} bordered={true} css={cardContentBox}>
              {formatToWon(item.balance)}원
            </Card>
          </div>
        ))}
      </div>
    </CardContainer>
  );
};

export default OrderFundingStatusSection;

const scrollableRowStyle = css`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  margin: 0 -8px;
  gap: 20px;
`;

const cardBox = css`
  width: 300px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const cardContentBox = css`
  width: 100%; /* 카드 내용의 전체 너비 설정 */
`;

const cardContainer = css`
  flex: 0 0 auto;
`;

const selectedCardStyle = css`
  width: 300px;
  text-align: center;
  transform: translateY(-10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
