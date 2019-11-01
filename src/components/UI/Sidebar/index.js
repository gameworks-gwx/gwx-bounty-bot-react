import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;

const Sidebar = ({ pathname }) => {
  return (
    <Menu selectedKeys={[pathname]} mode="inline">

      <Menu.Item key="/">
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

      <Menu.Item key="/verifications">
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

      <SubMenu title={<span><Icon type="table" />Dashboard</span>}>

        <Menu.Item key="/dashboard/gwx">
          <NavLink to={{
            pathname: '/dashboard/gwx',
            state: {
              pageTitle: 'GWX Dashboard'
            }
          }}>
            GWX Dashboard
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/dashboard/telegram">
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

      <SubMenu title={<span><Icon type="user" /><span>Admin</span></span>}>
        <Menu.Item key="/settings">
          <NavLink to={{
            pathname: '/settings',
            state: {
              pageTitle: 'Account Settings'
            }
          }}>
            <Icon type="setting" />
            Account Settings
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/user-management">
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
      </SubMenu>
    </Menu>
  )
}

export default Sidebar;
