import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom'

const Navbar = ({ children }) => {
  return (

    <Menu
      size="massive"
      fixed="top"
      inverted
      borderless
    >
      <Menu.Item as={Link} to="/profiles" header>
        GameWorks
      </Menu.Item>
      <Menu.Menu position="right">
        {/*<Menu.Item as={NavLink} to="/" exact>
          Dashboard
        </Menu.Item>
        <Menu.Item as={NavLink} to="/admin">
          Admin Settings
        </Menu.Item>*/
        }
        <Menu.Item as={NavLink} to="/logout">
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Navbar;