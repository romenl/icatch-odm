import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';

import { Configuration } from '../components/';
import { LocaleSelector } from '../components/tools/';

import './App.css';

const { Header, Content, Footer } = Layout;

const LiveView = () => (
  <Layout style={{ margin: '24px 0', padding: '24px 0', background: '#fff' }}>
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <h1>LiveView</h1>
    </Content>
  </Layout>
)
const About = () => (
  <Layout style={{ margin: '24px 0', padding: '24px 0', background: '#fff' }}>
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <h1>About</h1>
    </Content>
  </Layout>
)

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{height:'100vh'}}>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['configuration']}
              style={{ lineHeight: '64px' }}>
              <Menu.Item key="live_view">
                <Link to='/live_view'>Live View</Link>
              </Menu.Item>
              <Menu.Item key="configuration">
                <Link to='/config'>Configuration</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to='/about'>About</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', height:'100%' }}>
            <Route path='/live_view' component={LiveView}/>
            <Route path='/config' component={Configuration}/>
            <Route path='/about' component={About}/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <b>iCatch ODM</b> ©2017 Created by iCatch inc.
            <LocaleSelector style={{ width: 120, float:'right' }} />
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
