import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Row,
  Col,
  Spin,
  Collapse,
  Radio,
  Select,
  Button,
  Pagination,
} from 'antd';
import { getUserAPI } from '../../services/admin';
import TableUser from './TableUser/TableUser';
import Search from 'antd/lib/input/Search';
import Paper from '@mui/material/Paper';
import { FilterOutlined } from '@ant-design/icons';
import { debounce } from 'debounce';
const { Panel } = Collapse;
const { Option } = Select;
const ListUser = () => {
  const [dataEmpl, setDataEmpl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isButtonDownDisabled] = useState(false);
  const [messageError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const searchRole = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  );
  const [dataFilter, setDataFilter] = useState({
    roleFilter: 'customer',
    limit: 10,
    order: 'ASC',
    sortBy: '',
    page: 1,
    searchValue: '',
    genderFilter: '',
  });
  const [listSortBy, setListSortBy] = useState(['email', 'fullname']);
  const fetchAPIGetUser = (input) => {
    var api = getUserAPI(input);
    setLoading(true);
    api
      .then(({ data }) => {
        console.log(data);
        if (listSortBy.length < 3) {
          setListSortBy(Object.keys(data.data[1]));
        }
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
  const searchInDebount = useCallback(
    debounce((value) => fetchAPIGetUser(value), [500])
  );
  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, searchValue: e.target.value });
    searchInDebount(dataFilter);
  };
  const handleSearchEnter = (value) => {
    setDataFilter({ ...dataFilter, searchValue: value });
    searchInDebount(dataFilter);
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
  const handleClearFilter = () => {
    setDataFilter({
      roleFilter: 'customer',
      limit: 10,
      order: 'ASC',
      sortBy: '',
      page: 1,
      searchValue: '',
      genderFilter: '',
    });
    fetchAPIGetUser(dataFilter);
  };
  const handleFillterButton = () => {
    fetchAPIGetUser(dataFilter);
  };
  const handeOnChangePage = (value) => {
    setDataFilter({ ...dataFilter, page: value });
    fetchAPIGetUser(dataFilter);
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
            <Search
              onChange={handleSearch}
              onSearch={handleSearchEnter}
              placeholder={'Search user'}
            />
          </div>
          <Collapse style={{ marginBottom: '20px', width: '60%' }}>
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
                      defaultValue="ASC"
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
                    Filter Action
                  </div>
                  <div>
                    <Button
                      type="primary"
                      danger
                      onClick={handleClearFilter}
                      style={{ marginRight: '15px' }}
                    >
                      Clear
                    </Button>
                    <Button type="primary" onClick={handleFillterButton}>
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
          <Spin spinning={loading}>
            <Paper elevation={2}>
              <TableUser
                currentRole={searchRole}
                dataEmpl={dataEmpl.data}
                onNavigation={(id) => onNavigation(id)}
                isButtonDownDisabled={isButtonDownDisabled}
                messageError={messageError}
              />
              <div
                style={{
                  padding: '10px',
                  display: 'flex',
                  flexFlow: 'row-reverse',
                }}
              >
                <Pagination
                  showTotal={(total) => `Total ${total} accounts  `}
                  defaultCurrent={dataEmpl.page}
                  total={dataEmpl.totalCount}
                  onChange={handeOnChangePage}
                  showSizeChanger={false}
                />
              </div>
            </Paper>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default ListUser;
