import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <Menu mode="inline">
      <Menu.Item key="1">
        <NavLink to="/">
          <Icon type="home" />
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/verifications">
          <Icon type="camera" />
          Verifications
        </NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to="/admin">
          <Icon type="setting" />
          Admin
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default Sidebar;
