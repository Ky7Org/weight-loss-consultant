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
                  <Menu.Item key="/user/customer" icon={<TableOutlined />}>
                    <NavLink to="/user/customer">
                      <a style={{ color: 'white' }}>Customer </a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/user/trainer" icon={<TableOutlined />}>
                    <NavLink to="/user/trainer">
                      <a style={{ color: 'white' }}>Trainer </a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/user/admin" icon={<TableOutlined />}>
                    <NavLink to="/user/admin">
                      <a style={{ color: 'white' }}>Admin </a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/user/contract" icon={<SolutionOutlined />}>
                    <NavLink to="/user/contract">
                      <a style={{ color: 'white' }}>Contract </a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/user/payment" icon={<CreditCardOutlined />}>
                    <NavLink to="/user/payment">
                      <a style={{ color: 'white' }}>Payment</a>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    key="/admin/user/report"
                    icon={<WarningOutlined />}
                  >
                    <NavLink to="/admin/user/report">
                      <a style={{ color: 'white' }}>Report</a>
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
