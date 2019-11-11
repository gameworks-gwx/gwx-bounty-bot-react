import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';

const Navbar = ({ pathname }) => {
  return (
    <Menu selectedKeys={[pathname]} mode="horizontal" >
      <Menu.Item key="/user-management">
        <NavLink to={{
          pathname: '/user-management',
          state: {
            pageTitle: 'Add User'
          }
        }}>
          Add User
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/user-management/manage-users">
        <NavLink to={{
          pathname: '/user-management/manage-users',
          state: {
            pageTitle: 'Manage Users'
          }
        }}>
          Manage Users
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar