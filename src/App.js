import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Button, Drawer } from 'antd';
import { connect } from 'react-redux';

import { removeError } from './store/actions/error'

//!! Components 
import Sidebar from './components/UI/Sidebar';
import Responsive from './components/UI/Responsive';

//!! Containers (pages)
import Home from './containers/Home';
import Verifications from './containers/Verifications';
import Dashboard from './containers/Dashboard';
import UserManagement from './containers/UserManagement';
import Settings from './containers/Settings';
import Logout from './containers/Logout';
import Profiles from './containers/Profiles';
import GWXDashboard from './containers/Dashboard/GWXDashboard';
import TelegramDashboard from './containers/Dashboard/TelegramDashboard';

const { Header, Footer, Sider, Content } = Layout;

const App = ({ location, history, error, removeError }) => {
  const [visible, setVisible] = useState(false)
  if (error.status === 401) {
    history.push({
      pathname: '/logout',
      state: {
        message: "You are not authorized to view the page",
        type: 'Error'
      }
    })
    removeError()
  }
  const closeDrawer = () => {
    setVisible(false)
  }

  const openDrawer = () => {
    setVisible(true)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Responsive device="pc">
        <Sider
          theme="light"
          collapsedWidth="0"
          style={{
            minHeight: '100vh',
            left: 0,
            position: 'fixed',
          }}
        >
          <Sidebar pathname={location.pathname} />
        </Sider>
      </Responsive>

      <Layout className="layout-body">

        <Header className="header-container" style={{ background: '#fff' }}>
          <Responsive device="mobile">
            <Button type="primary" icon="menu" onClick={openDrawer} ghost />
            <Drawer
              placement="left"
              closable={false}
              onClose={closeDrawer}
              visible={visible}
            >
              <Sidebar pathname={location.pathname} closeDrawer={closeDrawer} />
            </Drawer>
          </Responsive>

          <h1>{location.state ? location.state.pageTitle : null}</h1>
          <h1>
            <Link to="/logout">
              Log Out
            </Link>
          </h1>
        </Header>

        <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/verifications" component={Verifications} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/:typeof" component={Dashboard} />
            <Route path="/dashboard/gwx/:page" component={GWXDashboard} />
            <Route path="/dashboard/telegram/:page" component={TelegramDashboard} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/user-management" component={UserManagement} />
            <Route exact path="/user-management/:typeof" component={UserManagement} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profiles" component={Profiles} />
          </Switch>
        </Content>
        <Footer className="footer-container">Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = ({ error }) => {
  return {
    error: error.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeError: () => dispatch(removeError())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
