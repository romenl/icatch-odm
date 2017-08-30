import React, { Component } from 'react';
import { Row, Col, Card, Spin, Form, Button } from 'antd';
import { FormItemSelectInput, FormItemSwitch } from '../CustomInput';

// Onvif API
import { 
    GetNetworkProtocols,
    GetDiscoveryMode
} from '../../onvif/';

const FormItem = Form.Item;

class PortsWSD extends Component{
    constructor(props){
        super(props);
        this.state ={
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            let data = await Promise.all([ GetNetworkProtocols(), GetDiscoveryMode() ]);
            
            this.setState({
                protocols: data[0],
                discoveryMode: data[1],
                isSpinning: false
            });
        } catch(e) {
            console.log( '[ERROR] ', e );
        }
    }
    componentDidMount(){
        this.refreshInformation();
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    spin_tip: 'Saving ...',
                    isSpinning: true
                });

                console.log(values);

                // Close Spinning
                setTimeout(() => {
                    this.setState({ isSpinning: false });
                }, 500);
            }
        });
    }
    render() {
        const { protocols, discoveryMode, spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const protocol_setting = {
            HTTP: {
                enable: protocols ? protocols.HTTP.enable : false,
                port: protocols ? protocols.HTTP.port : 80
            },
            HTTPS: {
                enable: protocols ? protocols.HTTPS.enable : false,
                port: protocols ? protocols.HTTPS.port : 80
            },
            RTSP: {
                enable: protocols ? protocols.RTSP.enable : false,
                port: protocols ? protocols.RTSP.port : 80
            }
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Ports & WSD Settings</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row gutter={16}>
                        <Col span={12} offset={6}>
                            <Card title={<h3 style={{textAlign: 'center'}}>WSD & Http/Https</h3>}>
                                <FormItemSwitch label='Discoverable' id='discoverable' value={ discoveryMode } layout={formItemLayout} decorator={getFieldDecorator} />
                                <FormItemSelectInput label='HTTP ports' id='http_ports' value={{enable: protocol_setting.HTTP.enable, content: protocol_setting.HTTP.port}} layout={formItemLayout} decorator={getFieldDecorator} />
                                <FormItemSelectInput label='HTTPs ports' id='https_ports' value={{enable: protocol_setting.HTTPS.enable, content: protocol_setting.HTTPS.port}} layout={formItemLayout} decorator={getFieldDecorator} />
                                <FormItemSelectInput label='RTSP ports' id='rtsp_ports' value={{enable: protocol_setting.RTSP.enable, content: protocol_setting.RTSP.port}} layout={formItemLayout} decorator={getFieldDecorator} />
                            </Card>
                        </Col>
                    </Row>

                    <FormItem className='submit' wrapperCol={{ span: 2, offset: 16 }} style={{marginTop: 20}}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default PortsWSD = Form.create()(PortsWSD);