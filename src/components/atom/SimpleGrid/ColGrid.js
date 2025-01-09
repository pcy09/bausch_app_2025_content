import { Col } from 'antd';

const ColGrid = ({ children, span = 12, ...props }) => {
  return (
    <Col span={span} {...props}>
      {children}
    </Col>
  );
};

export default ColGrid;
