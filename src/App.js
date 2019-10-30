import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Button, Drawer } from 'antd';

//!! Components 
import Sidebar from './components/UI/Sidebar';
import MobileSider from './components/UI/Sider/MobileSider'
import Responsive from './components/UI/Responsive';

//!! Containers (pages)
import Dashboard from './containers/Dashboard';
import Profiles from './containers/Profiles';
import Admin from './containers/Admin';
import Logout from './containers/Logout';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const [collapse, setCollapse] = useState(false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Responsive device="mobile">
        <Sider
          collapsible
          collapsed={collapse}
          breakpoint="lg"
          onCollapse={() => setCollapse(!collapse)}
          theme="light"
          collapsedWidth="0"
          style={{
            minHeight: '100vh',
            left: 0
          }}
        >
          <Sidebar />
        </Sider>
      </Responsive>

      <Responsive device="pc">
        <Sider
          theme="light"
          collapsedWidth="0"
          style={{
            minHeight: '100vh',
            left: 0,
            position: 'fixed'
          }}
        >
          <Sidebar />
        </Sider>
      </Responsive>

      <Layout className="layout-body">
        <Header className="header-container" style={{ background: '#fff' }}>
          <Button size="large" type="link">Log Out</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="content-subcontainer" style={{ background: '#fff' }}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/admin" component={Admin} />
            </Switch>
          </div>
        </Content>
        <Footer className="footer-container">Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
