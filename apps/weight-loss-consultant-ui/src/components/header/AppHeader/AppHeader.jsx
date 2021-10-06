import { useMemo } from 'react';
import { Row } from 'antd';
import Container from '../../../components/UIContainer/UIContainer';
import Title from 'antd/lib/typography/Title';
import Search from 'antd/lib/input/Search';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/image/weightlossLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { searchActions } from '../../../states-manager/search/search-slice';
import styles from './AppHeader.module.scss';
const AppHeader = () => {
  const location = useLocation();
  const { isAuthUser } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
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
            <img
              src={logo}
              alt="WLC logo"
              className={styles.logo}
              style={{ width: '200px' }}
            />
          ) : (
            <>
              <Title level={1}>{pageTitle}</Title>
              {(pageTitle === 'User List' || pageTitle === 'User') && (
                <Search
                  className={styles.searchbox}
                  onSearch={handleSearch}
                  placeholder={'search User by name/email'}
                />
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AppHeader;
