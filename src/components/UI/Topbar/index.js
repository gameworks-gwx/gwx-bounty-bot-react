import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;

const Topbar = () => {
  return (
    <Menu mode="horizontal" style={{padding: '5px', borderBottom: '0', textAlign: 'right'}}>
      <Menu.Item key="1">
        <NavLink to="/">
          <Icon type="home" />
          Log out
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default Topbar;