import { useState } from 'react';
import { Table, Tag } from 'antd';
import { initData } from './MockData';
import { Row, Col, Space } from 'antd';
import Paper from '@mui/material/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@mui/material/Avatar';
import { transDateFormat } from '../../utils/commom';
import {
  ClockCircleOutlined,
  SyncOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
const Contract = () => {
  const [contractData, setContractData] = useState(initData);
  const columls = [
    {
      title: 'Contract ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, row) => (
        <Typography variant="h6" align="left">
          {row.id}
        </Typography>
      ),
    },
    {
      title: 'Time Of Create',
      dataIndex: 'timeOfCreate',
      key: 'timeOfCreate',
      render(text, row) {
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            {transDateFormat(row.timeOfCreate)}
          </Tag>
        );
      },
    },
    {
      title: 'Time Of Approved',
      dataIndex: 'timeOfApproved',
      key: 'timeOfApproved',
      render(text, row) {
        return (
          <Tag icon={<ClockCircleOutlined />} color="success">
            {transDateFormat(row.timeOfApproved)}
          </Tag>
        );
      },
    },
    {
      title: 'Time Of Expired',
      dataIndex: 'timeOfExpired',
      key: 'timeOfExpired',
      render(text, row) {
        return (
          <Tag icon={<ClockCircleOutlined />} color="warning">
            {transDateFormat(row.timeOfExpired)}
          </Tag>
        );
      },
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render(text, row) {
        return (
          <Tag icon={<DollarCircleOutlined />} color="#87d068">
            {row.paymentMethod}
          </Tag>
        );
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render(text, row) {
        return <>{row.totalPrice} $ </>;
      },
    },
  ];
  return (
    <div>
      <Row justify="center">
        <Col xs={23} lg={22} xl={22} xxl={22}>
          <h1
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '300%',
            }}
          >
            Contracts
          </h1>
          <Paper elevation={3} style={{ padding: '10px' }}>
            <Table columns={columls} dataSource={contractData} />
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default Contract;
