import { useState } from 'react';
import { logoutHandler } from '../../states-manager/authentication/authentication-action';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  TableOutlined,
  CreditCardOutlined,
  SolutionOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import wlc from '../../assets/image/LogoTextWhite.png';
import AppRouter from '../../router/AppRouter';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../../components/header/AppHeader/AppHeader';
import useWindowDimensions from '../../components/hook-custom/useWindowDimensions';
import './styles.css';
const { Sider } = Layout;
const WelcomePage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthUser, user } = useSelector((state) => state.authentication);
  const location = useLocation();
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const { width } = useWindowDimensions();
  const signout = () => {
    dispatch(logoutHandler());
  };

  return (
    <div className="wrapper">
      <div className="menu">
        {isAuthUser && (
          <Sider
            breakpoint="lg"
            collapsedWidth={width > 500 ? '70' : '0'}
            collapsible
            collapsed={siderCollapsed}
            onCollapse={(collapsed, type) => {
              setSiderCollapsed(collapsed);
            }}
            className="sider-ant"
          >
            <div className="sider">
              <div
                className="sider__logo"
                onClick={() => history.push('/home')}
              >
                <img
                  src={wlc}
                  alt="wlc"
                  className={
                    siderCollapsed ? 'sider__logo-imgRound' : 'sider__logo-img'
                  }
                />
              </div>
              <hr className="sider__lineDivider" />
              {/* menu */}
              <div className="sider__menu">
                <Menu
                  mode="inline"
                  selectedKeys={[location.pathname]}
                  defaultSelectedKeys={['1']}
                >
                  <Menu.Item key="/" icon={<UserOutlined />}>
                    <NavLink to="/">
                      <a style={{ color: 'white' }}>{`Hi, ${user?.email}`}</a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/home" icon={<HomeOutlined />}>
                    <NavLink to="/home">
                      <a style={{ color: 'white' }}> Home Page </a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/admin/user/manager" icon={<TableOutlined />}>
                    <NavLink to="/admin/user/manager">
                      <a style={{ color: 'white' }}> User Manager </a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    key="/admin/user/contract"
                    icon={<SolutionOutlined />}
                  >
                    <NavLink to="/admin/user/contract">
                      <a style={{ color: 'white' }}> User Contract </a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    key="/admin/user/payment"
                    icon={<CreditCardOutlined />}
                  >
                    <NavLink to="/admin/user/payment">
                      <a style={{ color: 'white' }}> User Payment</a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    key="/admin/user/report"
                    icon={<WarningOutlined />}
                  >
                    <NavLink to="/admin/user/report">
                      <a style={{ color: 'white' }}> User Report</a>
                    </NavLink>
                  </Menu.Item>
                  <hr className="sider__lineDivider" />
                  <Menu.Item
                    key="/signout"
                    icon={<LogoutOutlined />}
                    onClick={signout}
                  >
                    {'Sign out'}
                  </Menu.Item>
                </Menu>
              </div>
              {/* footer social */}
              <div className={siderCollapsed ? 'displayNone' : 'footerSider'}>
                <div className="footerSider__copyRight">
                  &copy; 2021 Ky7Org.
                  <br />
                  {'All rights reserved'}.
                </div>
              </div>
            </div>
          </Sider>
        )}
      </div>
      <div className="container">
        <div className="headerFixed">
          <AppHeader />
        </div>
        <div className={isAuthUser ? 'content' : ''}>
          <AppRouter />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
