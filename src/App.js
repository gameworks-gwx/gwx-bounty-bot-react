import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Layout, Button, Drawer, message, Typography } from "antd";
import { connect } from "react-redux";
import { removeError } from "./store/actions/error";
import { authInit } from "./store/actions/auth";

//!! Components
import Sidebar from "./components/UI/Sidebar";
import Responsive from "./components/UI/Responsive";

//!! Containers (pages)
import Home from "./containers/Home";
import Verifications from "./containers/Verifications";
import Administrators from "./containers/Administrators";
import EditUser from "./containers/Administrators/EditUser";
import AddUser from "./containers/Administrators/AddUser";
import Logout from "./containers/Logout";
import Airdrop from "./containers/Airdrop";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const App = ({ location, history, error, removeError, init, initData }) => {
  const [visible, setVisible] = useState(false);
  const { email } = initData;
  useEffect(() => {
    if (error) {
      switch (error.status) {
        case 400:
          message.error(error.message);
          break;
        case 401:
          history.push({
            pathname: "/logout",
            state: {
              message: "You are not authorized to view the page",
              type: "Error"
            }
          });
          removeError();
          break;
        case 404:
          message.error(error.message);
          removeError();
          break;
        case 409:
          message.error(error.message);
          removeError();
          break;
        case 422:
          message.error("There was an error!");
          removeError();
          break;
        default:
          message.error("No internet connection");
          break;
      }
    } else {
      init();
    }
  }, [error, history, init, removeError]);

  const closeDrawer = () => {
    setVisible(false);
  };

  const openDrawer = () => {
    setVisible(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Responsive device="pc">
        <Sider
          theme="light"
          collapsedWidth="0"
          style={{
            minHeight: "100vh",
            left: 0,
            position: "fixed",
            width: "50vh"
          }}
        >
          <Sidebar pathname={location.pathname} email={email} />
        </Sider>
      </Responsive>

      <Layout className="layout-body">
        <Header className="header-container" style={{ background: "#fff" }}>
          <Responsive device="mobile">
            <Button type="primary" icon="menu" onClick={openDrawer} ghost />
            <Drawer
              placement="left"
              closable={false}
              onClose={closeDrawer}
              visible={visible}
              width={250}
              bodyStyle={{ padding: "0 0 30vh 0vh" }}
            >
              <Sidebar
                pathname={location.pathname}
                closeDrawer={closeDrawer}
                email={email}
              />
            </Drawer>
          </Responsive>

          <Title level={4}>
            {location.state ? location.state.pageTitle : null}
          </Title>
          <h1>
            <Link to="/logout">Log Out</Link>
          </h1>
        </Header>

        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/verifications" component={Verifications} />
            <Route exact path="/airdrop" component={Airdrop} />
            <Route path="/airdrop/:page" component={Airdrop} />
            <Route exact path="/administrators" component={Administrators} />
            <Route exact path="/administrators/add" component={AddUser} />
            <Route exact path="/administrators/edit/:id" component={EditUser} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </Content>
        <Footer className="footer-container"></Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = ({ error, auth }) => {
  return {
    error: error.error,
    initData: auth.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeError: () => dispatch(removeError()),
    init: () => dispatch(authInit())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
