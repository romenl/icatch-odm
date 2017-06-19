import React, { Component } from 'react';
import { Layout, Menu, LocaleProvider } from 'antd';
import { Route, Redirect, Link } from 'react-router-dom';

import { 
  Configuration, 
  LiveView
} from '../components/';

const { Header, Content, Footer } = Layout;

const About = () => (
  <Layout style={{ margin: '24px 0', padding: '24px 0', background: '#fff' }}>
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <h1>About</h1>
    </Content>
  </Layout>
)
const Primary = (routes, locale) => (
  {
    header:
      <LocaleProvider locale={locale}>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}>
            <Menu.Item key="live_view">
              <Link to={routes.liveView}>Live View</Link>
            </Menu.Item>
            <Menu.Item key="configuration">
              <Link to={ routes.configuration }>Configuration</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to={ routes.about }>About</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </LocaleProvider>,
    content: 
      <LocaleProvider locale={locale}>
        <Content style={{ padding: '0 50px', height:'100%' }}>
          <Route path={ routes.root } render={ ()=>( <Redirect to={ routes.liveView } /> ) } />
          <Route path={routes.liveView} component={LiveView}/>
          <Route path={routes.configuration} component={Configuration}/>
          <Route path={routes.about} component={About}/>
        </Content>
      </LocaleProvider>
  }
)

export default class PrimaryPage extends Component {
    render() {
        const { localeProvider } = this.props;
        const routes = {
            root: '/',
            liveView: `/liveview`,
            configuration: `/config`,
            about: `/about`
        };
        
        return(
            <Layout style={{height:'100vh'}}>
                { Primary(routes, localeProvider).header }
                { Primary(routes, localeProvider).content }

                <Footer style={{ textAlign: 'center' }}>
                    <b>iCatch ODM</b> ©2017 Created by iCatch inc.
                </Footer>
            </Layout>
        )
    }
}