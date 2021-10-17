import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col, Spin, Collapse, Radio, Select, Button } from 'antd';
import { getUserAPI } from '../../services/admin';
import TableUser from './TableUser/TableUser';
import Search from 'antd/lib/input/Search';
import Paper from '@mui/material/Paper';
import { FilterOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const { Option } = Select;
const ListUser = () => {
  const [dataEmpl, setDataEmpl] = useState([]);
  const [currentGender, setCurrentGender] = useState(['1']);
  const [loading, setLoading] = useState(false);
  const [isButtonDownDisabled] = useState(false);
  const [messageError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const searchRole = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  );
  const [dataFilter, setDataFilter] = useState({
    roleFilter: '1',
    genderFilter: 'Male',
    page: 1,
    limit: 10,
    sortBy: '',
    order: '',
    searchValue: '',
  });
  const [listSortBy, setListSortBy] = useState(['email', 'fullname']);
  const fetchAPIGetUser = (input) => {
    var api = getUserAPI(input);
    setLoading(true);
    api
      .then(({ data }) => {
        setDataEmpl(data);
      })

      .finally((x) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setDataFilter({ ...dataFilter, roleFilter: searchRole });
    fetchAPIGetUser(dataFilter);
  }, [searchRole]);

  const onNavigation = (id) => {
    history.push(`/admin/user/update/${id}`);
  };
  const handleSearch = (value) => {
    console.log(value);
  };
  const handleClickFilter = () => {
    console.log('Clicked');
  };
  const genExtra = () => (
    <FilterOutlined
      onClick={(event) => {
        event.stopPropagation();
      }}
      style={{ color: 'red', fontSize: '18px' }}
    />
  );
  const handleChangeGender = (value) => {
    setDataFilter({ ...dataFilter, genderFilter: value.target.value });
  };
  const handleChangeOrderBy = (value) => {
    setDataFilter({ ...dataFilter, order: value });
  };
  const handleChangeSortBy = (value) => {
    setDataFilter({ ...dataFilter, sortBy: value });
  };
  return (
    <div className="Container">
      <Row justify="center">
        <Col xs={23} lg={22} xl={22} xxl={22}>
          <h1
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '300%',
            }}
          >
            {searchRole} manage
          </h1>

          <div style={{ display: 'flex', width: '33%', paddingBottom: '10px' }}>
            <Search onSearch={handleSearch} placeholder={'Search user'} />
          </div>
          <Collapse
            onChange={handleClickFilter}
            style={{ marginBottom: '20px', width: '60%' }}
          >
            <Panel header="Filter" key="1" extra={genExtra()}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: '#161d4f',
                      fontSize: '12px',
                    }}
                  >
                    {searchRole} Gender
                  </div>
                  <Radio.Group
                    onChange={handleChangeGender}
                    value={dataFilter.genderFilter}
                  >
                    <Radio.Button value="1">Male</Radio.Button>
                    <Radio.Button value="2">Female</Radio.Button>
                  </Radio.Group>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: '#161d4f',
                      fontSize: '12px',
                    }}
                  >
                    Sort By
                  </div>
                  <div>
                    <Select
                      style={{ width: 120 }}
                      placeholder="Sort by "
                      onChange={handleChangeSortBy}
                    >
                      {listSortBy.map((item) => (
                        <Option value={item}>{item}</Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: '#161d4f',
                      fontSize: '12px',
                    }}
                  >
                    Order By
                  </div>
                  <div>
                    <Select
                      style={{ width: 120 }}
                      placeholder="Order by"
                      defaultValue={dataFilter.order}
                      onChange={handleChangeOrderBy}
                    >
                      <Option value="DESC">Z to A</Option>
                      <Option value="ASC">A to Z</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: '#161d4f',
                      fontSize: '12px',
                    }}
                  >
                    Clear Filter
                  </div>
                  <div>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        console.log(dataFilter);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
          <Spin spinning={loading}>
            <Paper elevation={2}>
              <TableUser
                dataEmpl={dataEmpl}
                onNavigation={(id) => onNavigation(id)}
                isButtonDownDisabled={isButtonDownDisabled}
                messageError={messageError}
              />
            </Paper>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default ListUser;
