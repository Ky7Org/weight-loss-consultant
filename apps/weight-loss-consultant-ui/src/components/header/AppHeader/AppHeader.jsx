import { useMemo, useState } from 'react';
import { Modal, Row, Select } from 'antd';
import Container from '../../../components/UIContainer/UIContainer';
import Title from 'antd/lib/typography/Title';
import Search from 'antd/lib/input/Search';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/image/weightlossLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { searchActions } from '../../../states-manager/search/search-slice';
import styles from './AppHeader.module.scss';
import {
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
const AppHeader = () => {
  const location = useLocation();
  const { isAuthUser } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [isModalShown, setIsModalShown] = useState(false);
  const genderOption = ['Male', 'Female'];
  const roleOption = ['Trainer', 'Customer', 'Admin'];
  const [selectedRole, setSelectedRole] = useState();
  const [selectedGender, setSelectedGender] = useState();
  const [sortBySelected, setSortBySelected] = useState();
  const [orderSelected, setorderSelected] = useState(true);
  const [order, setOrder] = useState('ESC');
  const handlechangeOrder = () => {
    if (orderSelected) {
      setOrder('ESC');
      setorderSelected(false);
    } else {
      setOrder('DESC');
      setorderSelected(true);
    }
  };
  const { Option } = Select;
  const handleSortBySelected = (sortBy) => {
    setSortBySelected(sortBy);
  };
  const handleChangeGender = (gender) => {
    setSelectedGender(gender);
  };
  const handleChangeRole = (role) => {
    setSelectedRole(role);
  };
  const filteredGender = genderOption.filter(
    (o) => !selectedGender?.includes(o)
  );
  const filteredRole = roleOption.filter((o) => !selectedRole?.includes(o));
  const handleConfirmModal = () => {
    console.log('OK');
    setIsModalShown(false);
  };
  const handleCancelModal = () => {
    console.log('CANCEL');
    setIsModalShown(false);
  };
  const handleOpenModal = () => {
    setIsModalShown(true);
  };
  const pageTitle = useMemo(() => {
    let title = 'Page Not Found';
    if (location.pathname === '/' || location.pathname === '/home')
      return (title = 'Home Page');
    if (location.pathname === '/admin/user/list') return (title = 'User List');
    if (location.pathname === '/userInformation')
      return (title = 'My Information');
    if (location.pathname.includes('/admin/user/update/'))
      return (title = 'User Detail');
    return title;
  }, [location]);

  const handleSearch = (value) => {
    console.log(value);
    dispatch(searchActions.saveTextSearch(value));
  };

  return (
    <div className={styles.header}>
      <Container>
        <Row justify="space-between" align="middle">
          {!isAuthUser ? (
            <img src={logo} alt="WLC logo" className={styles.logo} />
          ) : (
            <>
              <Title level={1}>{pageTitle}</Title>
              {(pageTitle === 'User List' || pageTitle === 'User') && (
                <div className={styles.search}>
                  <div className={styles.searchField}>
                    <Search
                      onSearch={handleSearch}
                      placeholder={'search User by name/email'}
                    />
                  </div>
                  <div className={styles.modal}>
                    <FilterOutlined onClick={handleOpenModal} />
                    <Modal
                      maskClosable={false}
                      title="User Fillter"
                      visible={isModalShown}
                      onCancel={handleCancelModal}
                      onOk={handleConfirmModal}
                      style={{ top: 80, left: 500 }}
                      mask={false}
                    >
                      <div className={styles.modalItem}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <h5 style={{ fontWeight: 'bold' }}>User Gender</h5>
                            <Select
                              mode="multiple"
                              placeholder="Select Gender Filter"
                              value={selectedGender}
                              onChange={handleChangeGender}
                              style={{ width: '180px' }}
                            >
                              {filteredGender.map((item) => (
                                <Select.Option key={item} value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                          <div>
                            <h5 style={{ fontWeight: 'bold' }}>Sort By</h5>
                            <Select
                              defaultValue=""
                              style={{ width: 120 }}
                              onChange={handleSortBySelected}
                            >
                              <Option value="Name">Name</Option>
                              <Option value="Email">Email</Option>
                              <Option value="Address">Address</Option>
                              <Option value="Phone">Phone</Option>
                            </Select>
                          </div>
                          <div>
                            <h5 style={{ fontWeight: 'bold' }}>Order By</h5>
                            {orderSelected ? (
                              <div style={{ fontSize: '25px' }}>
                                <SortAscendingOutlined
                                  onClick={handlechangeOrder}
                                />
                              </div>
                            ) : (
                              <div style={{ fontSize: '25px' }}>
                                <SortDescendingOutlined
                                  onClick={handlechangeOrder}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '5px',
                          }}
                        >
                          <div>
                            <h5 style={{ fontWeight: 'bold' }}>User Gender</h5>
                            <Select
                              mode="multiple"
                              placeholder="Select Role Filter"
                              value={selectedRole}
                              onChange={handleChangeRole}
                              style={{ width: '300px' }}
                            >
                              {filteredRole.map((item) => (
                                <Select.Option key={item} value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AppHeader;
