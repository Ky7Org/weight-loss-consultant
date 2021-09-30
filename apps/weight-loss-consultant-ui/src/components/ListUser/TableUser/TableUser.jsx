import { useMemo, useState } from 'react';
import { Button, Table, Row, Modal, Select } from 'antd';
import './TableUser.css';
import { Sorter } from '../../../utils/sorter';

const TableUser = (props) => {
  const [editableColumns, setEditableColumns] = useState([
    'fullName',
    'email',
    'action',
  ]);
  const { dataEmpl } = props;
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalOptions, setModalOptions] = useState(
    editableColumns.slice(0, editableColumns.length - 1)
  );
  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'id',
      sorter: (a, b) => Sorter.TEXT(a.fullname, b.fullname),
      render(text, row) {
        return <>{row?.fullname}</>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'id',
      sorter: (a, b) => Sorter.TEXT(a.email, b.email),
      render(text, row) {
        return <>{row?.email}</>;
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'id',
      sorter: (a, b) => Sorter.TEXT(a?.gender || '', b?.gender || ''),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'id',
      sorter: (a, b) => Sorter.TEXT(a?.address || '', b?.address || ''),
      render(text, row) {
        return <>{row?.address}</>;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'id',
      sorter: (a, b) => Sorter.TEXT(a?.phone || '', b?.phone || ''),
      render(text, row) {
        return <>{row?.phone}</>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'id',
      sorter: (a, b) => Sorter.TEXT(a?.status || '', b?.status || ''),
      render(text, row) {
        return <>{row?.status}</>;
      },
    },
    {
      title: (
        <Row justify="end">
          <Button
            className="secondary-button-outlined"
            onClick={() => setIsModalShown(true)}
          >
            'Edit Column'
          </Button>
        </Row>
      ),
      dataIndex: 'action',
      render(text, row) {
        return (
          <Row justify="end">
            <div>
              <div>Setting 1</div>
              <div>Setting 2</div>
              <div>Setting 3</div>
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
  const handleConfirmModal = () => {
    console.log('OK');
    setEditableColumns([...modalOptions, 'action']);
    setIsModalShown(false);
  };

  const handleCancelModal = () => {
    console.log('CANCEL');
    setIsModalShown(false);
    setModalOptions(editableColumns.slice(0, editableColumns.length - 1));
  };

  return (
    <div className="Container">
      <Table
        style={{ paddingTop: '10px' }}
        dataSource={dataEmpl}
        columns={columns}
        rowKey="email"
        responsive={true}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `${'Total'} ${total} ${'items'}`,
          total: dataEmpl?.length || 0,
          responsive: true,
        }}
        scroll={{ x: 700 }}
      />
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
              disabled={['fullName', 'email', 'status'].includes(
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
