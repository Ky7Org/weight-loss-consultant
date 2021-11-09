import { useState, useEffect } from 'react';
import { Table, Tag, Spin } from 'antd';
import { Row, Col, Space, Modal, Descriptions, Badgem, Empty } from 'antd';
import Paper from '@mui/material/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@mui/material/Avatar';
import { transDateFormat } from '../../utils/commom';
import {
  ClockCircleOutlined,
  EyeFilled,
  DollarCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import { getContract } from '../../services/admin';
const Contract = () => {
  const fetchDataContract = () => {
    setLoading(true);
    var api = getContract();
    api
      .then(({ data }) => {
        setContractData(data);
      })
      .finally(setLoading(false));
  };
  useEffect(() => {
    fetchDataContract();
  }, []);
  const [loading, setLoading] = useState(false);
  const [contractData, setContractData] = useState();
  const columls = [
    {
      title: 'Contract ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, row) => (
        <Typography variant="h6" align="left">
          {row.contract_id}
        </Typography>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'campaign_fullname',
      key: 'campaign_fullname',
      render(text, row) {
        return (
          <Typography variant="h6" align="left">
            {row.campaign_fullname}
          </Typography>
        );
      },
    },
    {
      title: 'Trainer',
      dataIndex: 'timeOfApproved',
      key: 'timeOfApproved',
      render(text, row) {
        return (
          <Typography variant="h6" align="left">
            {row.package_fullname}
          </Typography>
        );
      },
    },
    {
      title: 'Time Of Create',
      dataIndex: 'timeOfExpired',
      key: 'timeOfExpired',
      render(text, row) {
        return (
          <Tag icon={<ClockCircleOutlined />} color="success">
            {transDateFormat(row.contract_timeOfCreate)}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render(text, row) {
        return (
          <div>
            {row?.status == 1 ? (
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
          </div>
        );
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render(text, row) {
        return (
          <Tag icon={<DollarCircleOutlined />} color="#87d068">
            {row.contract_totalPrice} $
          </Tag>
        );
      },
    },
    {
      title: 'View Contract',
      render(text, row) {
        return (
          <EyeFilled
            style={{ fontSize: '20px' }}
            onClick={() => handleShowModal(row)}
          />
        );
      },
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModalIsShowing, setDataModalIsShowing] = useState();
  const handleShowModal = (data) => {
    setDataModalIsShowing(data);
    showModal();
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <Descriptions
          title="Contract Detail"
          bordered
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label="Contract ID">
            {dataModalIsShowing?.contract_id}
          </Descriptions.Item>
          <Descriptions.Item label="Total Price">
            <Tag icon={<DollarCircleOutlined />} color="#87d068">
              {dataModalIsShowing?.totalPrice}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Time Of Create">
            <Tag icon={<ClockCircleOutlined />} color="processing">
              {transDateFormat(dataModalIsShowing?.timeOfCreate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Total Of Expired">
            <Tag icon={<ClockCircleOutlined />} color="warning">
              {transDateFormat(dataModalIsShowing?.timeOfExpired)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {dataModalIsShowing?.status == 1 ? (
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
        </Descriptions>
        <Descriptions
          title="Customer Campaign"
          bordered
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label="Campaign ID">
            {dataModalIsShowing?.campaign_id}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {dataModalIsShowing?.campaign_description}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {dataModalIsShowing?.campaign_status == 1 ? (
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
              {transDateFormat(dataModalIsShowing?.campaign_startDate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            <Tag icon={<ClockCircleOutlined />} color="warning">
              {transDateFormat(dataModalIsShowing?.campaign_endDate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Feedback">
            <Empty description={false} />
          </Descriptions.Item>
          <Descriptions.Item label="Target Weight ">
            <Tag color="gold">{dataModalIsShowing?.campaign_feedbackt} kg</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Current Weight ">
            <Tag color="gold">
              {dataModalIsShowing?.campaign_currentWeight} kg
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Spend Time For Training ">
            <Tag color="gold">
              {dataModalIsShowing?.campaign_spendTimeForTraining}day per week
            </Tag>
          </Descriptions.Item>
        </Descriptions>
        {/* package */}
        <Descriptions
          title="Trainer Package"
          bordered
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label="Package ID">
            {dataModalIsShowing?.package_id}
          </Descriptions.Item>
          <Descriptions.Item label="Trainer Name">
            {dataModalIsShowing?.package_fullname}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {dataModalIsShowing?.package_status == 1 ? (
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
          <Descriptions.Item label="Create Date">
            <Tag icon={<ClockCircleOutlined />} color="success">
              {transDateFormat(dataModalIsShowing?.package_createDate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            <Tag icon={<ClockCircleOutlined />} color="success">
              {transDateFormat(dataModalIsShowing?.package_startDate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            <Tag icon={<ClockCircleOutlined />} color="warning">
              {transDateFormat(dataModalIsShowing?.package_endDate)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Schedule ">
            <Tag color="gold">{dataModalIsShowing?.package_schedule} kg</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Diet Plan ">
            {dataModalIsShowing?.package_dietPlan}
          </Descriptions.Item>
          <Descriptions.Item label="Exercise Plan ">
            {dataModalIsShowing?.package_exercisePlan}
          </Descriptions.Item>
          <Descriptions.Item label="Spend Time For Training ">
            <Tag color="gold">
              {dataModalIsShowing?.ackage_spendTimeToTraining} day/week
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Session Length ">
            {dataModalIsShowing?.package_sessionLength}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
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
            <Spin spinning={loading}>
              <Table columns={columls} dataSource={contractData} />
            </Spin>
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default Contract;
