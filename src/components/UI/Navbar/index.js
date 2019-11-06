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
      <Menu.Item key="/user-management/edit-user">
        <NavLink to={{
          pathname: '/user-management/edit-user',
          state: {
            pageTitle: 'Edit User'
          }
        }}>
          Edit User
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/user-management/delete-user">
        <NavLink to={{
          pathname: '/user-management/delete-user',
          state: {
            pageTitle: 'Delete User'
          }
        }}>
          Delete User
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar