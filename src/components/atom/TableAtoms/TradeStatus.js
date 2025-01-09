const TradeStatus = ({ status }) => {
  let color;
  switch (status) {
    case '거래중':
    case '주문대기':
      color = 'var(--activeColor)';
      break;
    case '거래취소':
      color = 'var(--nonActiveColor)';
      break;
    case '거래 완료':
    case '배송완료':
      color = 'var(--mainColor)';
      break;
    default:
      color = 'black';
  }
  return <span style={{ color: color }}>{status}</span>;
};

export default TradeStatus;
