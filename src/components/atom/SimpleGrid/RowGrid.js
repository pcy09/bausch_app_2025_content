import { Row } from 'antd';

const RowGrid = ({ children, ...props }) => {
  return <Row {...props}>{children}</Row>;
};

export default RowGrid;
