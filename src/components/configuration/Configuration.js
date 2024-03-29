import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import { 
    EncoderSettings, ImageSettings, OSDSettings, MotionSettings,
    DeviceInformation, TimeSettings, Maintenance,
    NetworkSettings, PortsWSD,
    Users 
} from './';

// Style
import '../../styles/public.scss';

const { SubMenu } = Menu,
      { Content, Sider } = Layout;

export default class Configuration extends Component{
    render(){
        const { match } = this.props;
        const routes = {
            video: {
                encoder_settings: `${match.url}/video_encoder_settings`,
                image_settings: `${match.url}/video_image_settings`,
                osd_settings: `${match.url}/video_osd_settings`,
                motion_settings: `${match.url}/video_motion_settings`
            },
            system: {
                device_infomation: `${match.url}/system_device_infomation`,
                time_settings: `${match.url}/system_time_settings`,
                maintenance: `${match.url}/system_maintenance`
            },
            network: {
                network_settings: `${match.url}/network_settings`,
                ports_wsd: `${match.url}/network_ports_wsd`
            },
            users: {
                management: `${match.url}/users_management`
            }
        };

        return(
            <Layout style={{ padding: '24px 0', background: '#fff', height: '100%' }}>
                <Sider style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        style={{ height: '100%' }}
                    >
                        <SubMenu key="video_image" title={<span><Icon type="video-camera" />Video & Image</span>}>
                            <Menu.Item key="encoder_settings">
                                <Link to={ routes.video.encoder_settings }>Encoder Settings</Link>
                            </Menu.Item>
                            <Menu.Item key="image_settings">
                                <Link to={ routes.video.image_settings }>Image Settings</Link>
                            </Menu.Item>
                            <Menu.Item key="osd_settings">
                                <Link to={ routes.video.osd_settings }>OSD Settings</Link>
                            </Menu.Item>
                            <Menu.Item key="motion_settings">
                                <Link to={ routes.video.motion_settings }>Motion Settings</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="system" title={<span><Icon type="laptop" />System</span>}>
                            <Menu.Item key="device_infomation">
                                <Link to={ routes.system.device_infomation }>Device Infomation</Link>
                            </Menu.Item>
                            <Menu.Item key="time_settings">
                                <Link to={ routes.system.time_settings }>Time Settings</Link>
                            </Menu.Item>
                            <Menu.Item key="maintenance">
                                <Link to={ routes.system.maintenance }>Maintenance</Link></Menu.Item>
                            </SubMenu>
                        <SubMenu key="network" title={<span><Icon type="share-alt" />Network</span>}>
                            <Menu.Item key="network_settings">
                                <Link to={ routes.network.network_settings }>Network Settings</Link>
                            </Menu.Item>
                            <Menu.Item key="ports_wsd">
                                <Link to={ routes.network.ports_wsd }>PortsWSD</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="users" title={<span><Icon type="user" />Users</span>}>
                            <Menu.Item key="management">
                                <Link to={ routes.users.management }>Management</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content className="camweb-content" style={{ padding: '0 24px', minHeight: 280 }}>
                    <Switch>
                        <Route exact path={`${match.url}`} render={()=>(
                            <div style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2em', height:'100%' }}>
                                <Icon type="setting" style={{marginRight:5}}/>Configure your settings.
                            </div>)} />
                        <Route path={ routes.video.encoder_settings } component={EncoderSettings}/>
                        <Route path={ routes.video.image_settings } component={ImageSettings}/>
                        <Route path={ routes.video.osd_settings } component={OSDSettings}/>
                        <Route path={ routes.video.motion_settings } component={MotionSettings}/>
                        <Route path={ routes.system.device_infomation } component={DeviceInformation}/>
                        <Route path={ routes.system.time_settings } component={TimeSettings}/>
                        <Route path={ routes.system.maintenance } component={Maintenance}/>
                        <Route path={ routes.network.network_settings } component={NetworkSettings}/>
                        <Route path={ routes.network.ports_wsd } component={PortsWSD}/>
                        <Route path={ routes.users.management } component={Users}/>
                    </Switch>
                </Content>
            </Layout>
        );
    }
}