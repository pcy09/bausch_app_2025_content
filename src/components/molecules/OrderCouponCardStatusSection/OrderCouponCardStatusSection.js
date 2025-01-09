import { CardContainer } from '@/components/atom';
import { Card, Descriptions } from 'antd';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';
import { formatToWon } from '@/common/utiles';
import { useDispatch } from 'react-redux';
import { getCouponOrderDropAction } from '@/store/reducers/admin/couponOrderReducer';

const OrderCouponCardStatusSection = ({ couponCardList, setSelectedCards, selectedCards, watch, setValue }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const bind = useGesture({
    onDrag: ({ offset: [dx] }) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += dx * -1;
      }
    },
  });

  const handleCardClick = card => {
    setSelectedCards(prevSelected => {
      if (prevSelected.includes(card.couponId)) {
        // 이미 선택된 카드면 제거
        return prevSelected.filter(id => id !== card.couponId);
      } else {
        // 선택되지 않은 카드면 추가
        return [...prevSelected, card.couponId];
      }
    });

    const params = {
      couponId: card.couponId,
      couponIssueId: card.couponIssueId,
    };
    dispatch(getCouponOrderDropAction({ params }));
  };

  return (
    <CardContainer>
      <Descriptions title="사용 쿠폰"></Descriptions>
      {couponCardList ? (
        <div {...bind()} ref={scrollRef} css={scrollableRowStyle}>
          {couponCardList?.map(couponCardList => (
            <div
              key={couponCardList.couponId}
              css={[cardContainer, selectedCards.includes(couponCardList.couponId) ? selectedCardStyle : cardBox]}
              onClick={() => handleCardClick(couponCardList)}>
              <Card title={`${couponCardList.couponType}`} bordered={true} css={cardContentBox}>
                <p>{`${couponCardList.couponName}`}</p>
              </Card>
            </div>
          ))}
        </div>
      ) : null}
    </CardContainer>
  );
};

export default OrderCouponCardStatusSection;

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
  cursor: pointer;
  border: 1px solid black;
  text-align: center;
  transform: translateY(-10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
