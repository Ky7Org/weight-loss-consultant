import {
  Table,
  Tag,
  Space,
  Modal,
  Row,
  Col,
  Button,
  Descriptions,
  Badgem,
  Empty,
} from 'antd';
import {
  ClockCircleOutlined,
  EyeFilled,
  SyncOutlined,
  DollarCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  UserOutlined,
} from '@ant-design/icons';
import Typography from '@material-ui/core/Typography';
import { EyeTwoTone } from '@ant-design/icons';

import { useState, useCallback } from 'react';
import { transDateFormat } from '../../../../utils/commom';
const ListItem = () => {
  const dataMockup = [
    {
      id: 1,
      description: 'i want to lose 10kg in 1 month',
      status: 2,
      startDate: '1635790000000',
      endDate: '1635790000000',
      feedback: 'I want to meet a trainer at U30',
    },
    {
      id: 2,
      description: 'i want to lose 2kg in 10days',
      status: 1,
      startDate: '1635790000000',
      endDate: '11635790000000',
      feedback: 'I want to meet a trainer at U30',
    },
  ];
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render(text, row) {
        return (
          <div>
            {row?.status == 1 ? (
              <Tag color="pink">InActive</Tag>
            ) : (
              <Tag color="blue">Active</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'StartDate',
      dataIndex: 'startDate',
      key: 'startDate',
      render(text, row) {
        return (
          <Tag icon={<ClockCircleOutlined />} color="success">
            {transDateFormat(row.startDate)}
          </Tag>
        );
      },
    },
    {
      title: 'EndDate',
      dataIndex: 'endDate',
      key: 'endDate',
      render(text, row) {
        return (
          <Tag icon={<ClockCircleOutlined />} color="warning">
            {transDateFormat(row.endDate)}
          </Tag>
        );
      },
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
      render(text, row) {
        return <Empty description={false} />;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, row) => (
        <Space size="middle">
          <EyeTwoTone onClick={() => handleOnShowModal(row)} />
        </Space>
      ),
    },
  ];
  const [isModalShow, setIsModalShow] = useState(false);
  const [dataSetGetter, setDataSetGetter] = useState();
  const handleOnShowModal = (row) => {
    setIsModalShow(true);
    setDataSetGetter(row);
  };
  const handleOk = () => {
    setIsModalShow(false);
  };

  const handleCancel = () => {
    setIsModalShow(false);
  };
  return (
    <div>
      <Typography variant="h4" align="left" style={{ fontWeight: 'bold' }}>
        Campaigns Manager
      </Typography>
      <Table
        columns={columns}
        dataSource={dataMockup}
        style={{ marginTop: '10px' }}
      />
      <Modal
        visible={isModalShow}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <Descriptions
          title="Customer Campaign"
          bordered
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label="Campaign ID">
            {dataSetGetter?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {dataSetGetter?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {dataSetGetter?.status == 1 ? (
              <div style={{ display: 'flex' }}>
                <div>
                  <CheckCircleFilled
                    style={{
                      color: 'green',
                      fontSize: '20px',
                    }}
                  />
                </div>
                <div style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                  Active
                </div>
              </div>
            ) : (
              <div div style={{ display: 'flex' }}>
                <CloseCircleFilled
                  style={{
                    color: 'red',
                    fontSize: '20px',
                  }}
                />
                <div style={{ marginLeft: '10px' }}>Inactive</div>
              </div>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            <Tag icon={<ClockCircleOutlined />} color="success">
              {transDateFormat(dataSetGetter?.startDate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            <Tag icon={<ClockCircleOutlined />} color="warning">
              {transDateFormat(dataSetGetter?.endDate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Feedback">
            <Empty description={false} />
          </Descriptions.Item>
        </Descriptions>
        {/* package */}
      </Modal>
    </div>
  );
};
export default ListItem;
