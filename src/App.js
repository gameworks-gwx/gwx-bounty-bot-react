import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Button, Drawer } from 'antd';

//!! Components 
import Sidebar from './components/UI/Sidebar';
import Responsive from './components/UI/Responsive';

//!! Containers (pages)
import Home from './containers/Home';
import Verifications from './containers/Verifications';
import Dashboard from './containers/Dashboard';
import Admin from './containers/Admin';
import UserManagement from './containers/UserManagement';
import Settings from './containers/Settings';
import Logout from './containers/Logout';
import Profiles from './containers/Profiles';

const { Header, Footer, Sider, Content } = Layout;

const App = ({ location }) => {
  const [visible, setVisible] = useState(false)
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
              <Sidebar pathname={location.pathname} />
            </Drawer>
          </Responsive>

          <h1>{location.state ? location.state.pageTitle : null}</h1>
          <h1>
            <Link to="/logout">
              Log Out
            </Link>
          </h1>
        </Header>

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {/*<div className="content-subcontainer" style={{ background: '#fff' }}>*/}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/verifications" component={Verifications} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/:typeof" component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route path="/user-management" component={UserManagement} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/admin" component={Admin} />
          </Switch>
          {/*</div>*/}
        </Content>
        <Footer className="footer-container">Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
