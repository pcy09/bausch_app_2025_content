const AnswerStatus = ({ status }) => {
  let color;
  switch (status) {
    case '답변대기':
      color = 'var(--activeColor)';
      break;
    case '답변완료':
      color = 'var(--mainColor)';
      break;
    default:
      color = 'black';
  }
  return <span style={{ color: color }}>{status}</span>;
};

export default AnswerStatus;
