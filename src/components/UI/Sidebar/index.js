import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;

const Sidebar = ({ pathname, closeDrawer }) => {
  return (
    <Menu selectedKeys={[pathname]} mode="inline" style={{ height: '100vh' }}>

      <Menu.Item key="/" onClick={closeDrawer ? closeDrawer : ''}>
        <NavLink to={{
          pathname: '/',
          state: {
            pageTitle: 'Home'
          }
        }}>
          <Icon type="home" />
          Home
        </NavLink>
      </Menu.Item>

      <Menu.Item key="/verifications" onClick={closeDrawer ? closeDrawer : ''}>
        <NavLink to={{
          pathname: '/verifications',
          state: {
            pageTitle: 'Verifications'
          }
        }}>
          <Icon type="camera" />
          Verifications
        </NavLink>
      </Menu.Item>

      <Menu.Item key="/user-management" onClick={closeDrawer ? closeDrawer : ''}>
        <NavLink to={{
          pathname: '/user-management',
          state: {
            pageTitle: 'User Management'
          }
        }}>
          <Icon type="idcard" />
          User Management
          </NavLink>
      </Menu.Item>

      <SubMenu title={<span><Icon type="table" />Dashboard</span>}>

        <Menu.Item key="/dashboard/gwx" onClick={closeDrawer ? closeDrawer : ''}>
          <NavLink to={{
            pathname: '/dashboard/gwx',
            state: {
              pageTitle: 'GWX Dashboard'
            }
          }}>
            GWX Dashboard
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/dashboard/telegram" onClick={closeDrawer ? closeDrawer : ''}>
          <NavLink to={{
            pathname: '/dashboard/telegram',
            state: {
              pageTitle: 'Telegram Dashboard'
            }
          }}>
            Telegram Dashboard
          </NavLink>
        </Menu.Item>

      </SubMenu>

    </Menu>
  )
}

export default Sidebar;
