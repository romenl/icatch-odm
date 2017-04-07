import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import { DeviceInfomation, TimeSettings,
         NetworkSettings, HttpHttps, 
         Users } from './';

const { SubMenu } = Menu,
      { Content, Sider } = Layout;

export default class Configuration extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            defaultOpenKeys: [props.location.pathname.split('/')[2]],
            defaultSelectedKeys: [props.location.pathname.split('/')[props.location.pathname.split('/').length -1]]
        };
    }
    render(){
        const { match } = this.props;
        const { defaultOpenKeys, defaultSelectedKeys } = this.state;

        return(
            <Layout style={{ margin: '24px 0', padding: '24px 0', background: '#fff' }}>
                <Sider style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={ defaultOpenKeys }
                        defaultSelectedKeys={ defaultSelectedKeys }
                        style={{ height: '100%' }}
                    >
                        <SubMenu key="video_image" title={<span><Icon type="video-camera" />Video & Image</span>}>
                        <Menu.Item key="encoder_settings">Encoder Settings</Menu.Item>
                        <Menu.Item key="display_settings">Display Settings</Menu.Item>
                        <Menu.Item key="osd_settings">OSD Settings</Menu.Item>
                        </SubMenu>
                        <SubMenu key="system" title={<span><Icon type="laptop" />System</span>}>
                        <Menu.Item key="device_infomation">
                            <Link to={`${match.url}/system/device_infomation`}>Device Infomation</Link>
                        </Menu.Item>
                        <Menu.Item key="time_settings">
                            <Link to={`${match.url}/system/time_settings`}>Time Settings</Link>
                        </Menu.Item>
                        <Menu.Item key="maintenance">Maintenance</Menu.Item>
                        </SubMenu>
                        <SubMenu key="network" title={<span><Icon type="share-alt" />Network</span>}>
                        <Menu.Item key="network_settings">
                            <Link to={`${match.url}/network/network_settings`}>Network Settings</Link>
                        </Menu.Item>
                        <Menu.Item key="http_https">
                            <Link to={`${match.url}/network/http_https`}>HTTP/HTTPS</Link>
                        </Menu.Item>
                        </SubMenu>
                        <SubMenu key="users" title={<span><Icon type="user" />Users</span>}>
                        <Menu.Item key="management">
                            <Link to={`${match.url}/users/management`}>Management</Link>
                        </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Route exact path={`${match.url}`} render={()=>(
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2em', height:'100%' }}>
                            <Icon type="setting" style={{marginRight:5}}/>Configure your settings.
                        </div>)} />
                    <Route path={`${match.url}/system/device_infomation`} component={DeviceInfomation}/>
                    <Route path={`${match.url}/system/time_settings`} component={TimeSettings}/>
                    <Route path={`${match.url}/network/network_settings`} component={NetworkSettings}/>
                    <Route path={`${match.url}/network/http_https`} component={HttpHttps}/>
                    <Route path={`${match.url}/users/management`} component={Users}/>
                </Content>
            </Layout>
        );
    }
}