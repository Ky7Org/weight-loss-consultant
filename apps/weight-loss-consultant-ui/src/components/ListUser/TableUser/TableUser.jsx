import { useMemo, useState } from 'react';
import { Button, Table, Row, Modal, Select, Tag, Card } from 'antd';
import './TableUser.scss';
import { Sorter } from '../../../utils/sorter';
import { useSelector, useDispatch } from 'react-redux';
import { filterActions } from '../../../states-manager/filter/filter-slice';
import {
  EditOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';

const TableUser = (props) => {
  const dispatch = useDispatch();
  const [editableColumns, setEditableColumns] = useState([
    'fullName',
    'email',
    'action',
    'phone',
    'gender',
    'status',
  ]);
  const { dataEmpl } = props;
  const { RawDataOutput } = props;
  const [dataFilter, setDataFilter] = useState(RawDataOutput);
  const defaultColumns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
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
      title: (
        <Row justify="end" xs={{ span: 1 }}>
          <p>Edit profile</p>
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
    console.log(dataFilter);
    dispatch(filterActions.saveObjectFilter(dataFilter));
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
          pagination={{
            onChange: handleOnChangePaging,
            showTotal: (total) => `${'Total'} ${total} ${'items'}`,
            total: 0,
            responsive: true,
          }}
          scroll={{ x: 700, y: 700 }}
        />
      </Card>
    </div>
  );
};

export default TableUser;
