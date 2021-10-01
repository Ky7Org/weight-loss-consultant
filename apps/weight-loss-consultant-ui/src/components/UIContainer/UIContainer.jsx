import { Row, Col } from 'antd';

const Container = ({ children, className, style = {} }) => {
  return (
    <Row justify="center" className={className} style={style}>
      <Col xs={23} lg={22} xl={20} xxl={14}>
        {children}
      </Col>
    </Row>
  );
};

export default Container;
