import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, PageHeader } from 'antd'
import Responsive from '../Responsive'
const { SubMenu } = Menu;

const Sidebar = ({ pathname, closeDrawer, email }) => {
  return (
    <>
      <Responsive device="pc">
        <Menu selectedKeys={[pathname]} mode="inline" style={{ height: '100vh', width: '29vh' }}>
          <PageHeader title="Gameworks Bounty" subTitle={email ? 'Logged in as ' + email : null} />
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
          <SubMenu title={<span><Icon type="table" />Dashboard</span>}>
            <Menu.Item key="/airdrop/1" onClick={closeDrawer ? closeDrawer : ''}>
              <NavLink to={{
                pathname: '/airdrop/1',
                state: {
                  pageTitle: 'Airdrop Dashboard'
                }
              }}>
                Airdrop Dashboard
          </NavLink>
            </Menu.Item>

          </SubMenu>

          <SubMenu title={<span><Icon type="user" /><span>Configuration</span></span>}>

            <Menu.Item key="/administrators" onClick={closeDrawer ? closeDrawer : ''}>
              <NavLink to={{
                pathname: '/administrators',
                state: {
                  pageTitle: 'Administrators'
                }
              }}>
                Administrators
          </NavLink>
            </Menu.Item>
          </SubMenu>

        </Menu >
      </Responsive>

      <Responsive device="mobile">
        <Menu selectedKeys={[pathname]} mode="inline" style={{ height: '100vh', width: '16rem' }}>
          <PageHeader title="Gameworks Bounty" subTitle={ email ? 'Logged in as ' + email : null} />
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
          <SubMenu title={<span><Icon type="table" />Dashboard</span>}>
            <Menu.Item key="/airdrop/1" onClick={closeDrawer ? closeDrawer : ''}>
              <NavLink to={{
                pathname: '/airdrop/1',
                state: {
                  pageTitle: 'Airdrop Dashboard'
                }
              }}>
                Airdrop Dashboard
          </NavLink>
            </Menu.Item>

          </SubMenu>

          <SubMenu title={<span><Icon type="user" /><span>Configuration</span></span>}>

            <Menu.Item key="/administrators" onClick={closeDrawer ? closeDrawer : ''}>
              <NavLink to={{
                pathname: '/administrators',
                state: {
                  pageTitle: 'Administrators'
                }
              }}>
                Administrators
          </NavLink>
            </Menu.Item>
          </SubMenu>

        </Menu >
      </Responsive>
    </>
  )
}

export default Sidebar;
