import { useMemo, useState } from 'react';
import { Button, Table, Row, Modal, Select, Tag, Card } from 'antd';
import './TableUser.scss';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { filterActions } from '../../../states-manager/filter/filter-slice';
import {
  EditOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';

const TableUser = (props) => {
  const dispatch = useDispatch();
  const { dataEmpl } = props;
  const { currentRole } = props;
  const customerField = [
    'email',
    'fullname',
    'address',
    'phone',
    'gender',
    'status',
    'dob',
    'action',
  ];
  const adminField = [
    'email',
    'fullname',
    'address',
    'phone',
    'gender',
    'status',
    'dob',
    'action',
  ];
  const trainerField = [
    'email',
    'fullname',
    'address',
    'phone',
    'gender',
    'status',
    'dob',
    'yearOfExp',
    'rating',
    'action',
  ];
  const [editableColumns, setEditableColumns] = useState([]);
  useEffect(() => {
    if (currentRole === 'trainer') {
      setEditableColumns(trainerField);
    } else if (currentRole === 'customer') {
      setEditableColumns(customerField);
    } else if (currentRole === 'admin') {
      setEditableColumns(adminField);
    }
  }, [currentRole]);

  const [isModalShown, setIsModalShown] = useState(false);
  const { RawDataOutput } = props;
  const [dataFilter, setDataFilter] = useState(RawDataOutput);
  const [modalOptions, setModalOptions] = useState(
    editableColumns.slice(0, editableColumns.length - 1)
  );
  const defaultColumns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'id',
      render(text, row) {
        return (
          <div style={{ fontWeight: 'bold', marginRight: '10px' }}>
            {row?.fullname}
          </div>
        );
      },
    },
    {
      title: 'Avatar',
      dataIndex: 'profileImage',
      key: 'id',
      render(text, row) {
        return <Avatar alt="Remy Sharp" src={row?.profileImage} />;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'id',
      render(text, row) {
        return <>{row?.email}</>;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'id',
      render(text, row) {
        return <>{row?.phone}</>;
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'id',
      render(text, row) {
        return (
          <div>
            {row?.gender == 1 ? (
              <Tag color="blue">Male</Tag>
            ) : (
              <Tag color="pink">Female</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'id',
      render(text, row) {
        return <>{row?.address}</>;
      },
    },
    {
      title: 'yearOfExp',
      dataIndex: 'yearOfExp',
      key: 'id',
      render(text, row) {
        return <>{row?.yearOfExp}</>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'id',
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
                      marginLeft: '30px',
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
                    marginLeft: '30px',
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
      title: 'Rating',
      dataIndex: 'rating',
      key: 'id',
      render(text, row) {
        return <>{row?.rating}</>;
      },
    },
    {
      title: (
        <Row justify="end">
          <Button
            className="secondary-button-outlined"
            onClick={() => setIsModalShown(true)}
          >
            Edit Column
          </Button>
        </Row>
      ),
      dataIndex: 'action',
      render(text, row) {
        return (
          <Row justify="end">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <EditOutlined
                  style={{
                    fontSize: '20px',
                    color: '#ff3939',
                    marginRight: '30px',
                  }}
                />
              </div>
            </div>
          </Row>
        );
      },
    },
  ];

  const columns = useMemo(() => {
    return defaultColumns.filter((column) =>
      editableColumns.includes(column.dataIndex)
    );
  }, [editableColumns]);
  const handleOnChangePaging = (input) => {
    setDataFilter({ ...dataFilter, page: input });
    dispatch(filterActions.saveObjectFilter(dataFilter));
  };
  const handleConfirmModal = () => {
    setEditableColumns([...modalOptions, 'action']);
    setIsModalShown(false);
  };

  const handleCancelModal = () => {
    setIsModalShown(false);
    setModalOptions(editableColumns.slice(0, editableColumns.length - 1));
  };
  return (
    <div className="Container">
      <Card>
        <Table
          size="large"
          dataSource={dataEmpl}
          columns={columns}
          rowKey="email"
          responsive={true}
          pagination={false}
          scroll={{ x: 700, y: 400 }}
        />
      </Card>
      <Modal
        maskClosable={false}
        title="Edit Columns"
        visible={isModalShown}
        onCancel={handleCancelModal}
        onOk={handleConfirmModal}
      >
        <Select
          mode="multiple"
          defaultValue={editableColumns.slice(0, editableColumns.length - 1)}
          value={modalOptions}
          style={{ width: '100%' }}
          onChange={(values) => setModalOptions(values)}
        >
          {defaultColumns.slice(0, defaultColumns.length - 1).map((column) => (
            <Select.Option
              key={column.dataIndex}
              disabled={['fullName', 'email', 'status', 'action'].includes(
                column.dataIndex
              )}
            >
              {column.title}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default TableUser;
