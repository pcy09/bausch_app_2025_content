const OrderStatus = ({ status }) => {
  let color;
  switch (status) {
    case '주문대기':
      color = 'var(--activeColor)';
      break;
    case '배송완료':
      color = 'var(--mainColor)';
      break;
    default:
      color = 'black';
  }
  return <span style={{ color: color }}>{status}</span>;
};

export default OrderStatus;
