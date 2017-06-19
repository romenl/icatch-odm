import React, {Component} from 'react';
import { Layout } from 'antd';
import { ICPlayer } from './';

import '../../styles/ic_player.scss';

const { Content } = Layout;

export default class LiveView extends Component {
    render() {
        return (
            <Layout style={{ margin: '24px 0', padding: '24px 0', background: '#fff' }}>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <h1>LiveView</h1>
                    <ICPlayer></ICPlayer>
                </Content>
            </Layout>
        );
    }
}