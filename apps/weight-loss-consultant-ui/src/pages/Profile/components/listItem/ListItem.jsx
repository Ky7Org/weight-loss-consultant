import { Table, Tag, Space, Modal } from 'antd';
import Typography from '@material-ui/core/Typography';
import { EyeTwoTone } from '@ant-design/icons';
import { useState, useCallback } from 'react';
const ListItem = () => {
  const dataMockup = [
    {
      id: 1,
      description: 'i want to lose 10kg in 10days',
      status: 2,
      startDate: '1632070800000',
      endDate: '1640883600000',
      feedback: 'I want to meet a trainer at U30',
    },
    {
      id: 2,
      description: 'i want to lose 10kg in 10days',
      status: 1,
      startDate: '1632070800000',
      endDate: '1640883600000',
      feedback: 'I want to meet a trainer at U30',
    },
    {
      id: 3,
      description: 'i want to lose 10kg in 10days',
      status: 1,
      startDate: '1632070800000',
      endDate: '1640883600000',
      feedback: 'I want to meet a trainer at U30',
    },
    {
      id: 4,
      description: 'i want to lose 10kg in 10days',
      status: 1,
      startDate: '1632070800000',
      endDate: '1640883600000',
      feedback: 'I want to meet a trainer at U30',
    },
    {
      id: 5,
      description: 'i want to lose 10kg in 10days',
      status: 1,
      startDate: '1632070800000',
      endDate: '1640883600000',
      feedback: 'I want to meet a trainer at U30',
    },
    {
      id: 6,
      description: 'i want to lose 10kg in 10days',
      status: 1,
      startDate: '1632070800000',
      endDate: '1640883600000',
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
    },
    {
      title: 'EndDate',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, row) => (
        <Space size="middle">
          <EyeTwoTone onClick={handleOnShowModal} />
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const [isModalShow, setIsModalShow] = useState(false);
  const handleRender = useCallback(() => {
    setIsModalShow(true);
  }, [isModalShow]);
  const handleOnShowModal = (row) => {
    handleRender();
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
        Campaigns Managerment
      </Typography>
      <Table
        columns={columns}
        dataSource={dataMockup}
        style={{ marginTop: '10px' }}
      />
      <Modal
        title="User Campaign"
        visible={isModalShow}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
};
export default ListItem;
