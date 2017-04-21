import React, { Component } from 'react';
import { Spin, Form, Button } from 'antd';
import { FormItemInput, FormItemIPInput, FormItemSwitch } from '../CustomInput';

// Onvif API
import { 
    GetHostname, 
    GetNetworkInterfaces, 
    GetDiscoveryMode,
    GetDNS
} from '../../onvif/';

const FormItem = Form.Item;

class NetworkSettings extends Component{
    constructor(props){
        super(props);
        this.state ={
            dhcp: false,
            discoverable: false,
            zero_config: false,
            ip_address: {},
            hostname: '',
            dns: {},
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            // Get Information from devise.
            let hostname = await GetHostname();
            let networkinterface = await GetNetworkInterfaces();
            let discovermode = await GetDiscoveryMode();
            let dns_info = await GetDNS();

            let ip = networkinterface.IPv4.Config.FromDHCP.Address.v.split('.');
            let dns_address = dns_info[0].IPv4Address.v.split('.');
            
            this.setState({
                dhcp: networkinterface.IPv4.Config.DHCP.v,
                discoverable: discovermode,
                ip_address: {
                    '1': ip[0],
                    '2': ip[1],
                    '3': ip[2],
                    '4': ip[3]
                },
                dns: {
                    '1': dns_address[0],
                    '2': dns_address[1],
                    '3': dns_address[2],
                    '4': dns_address[3]
                },
                hostname,
                isSpinning: false
            });
        } catch(e) {
            console.log( '[ERROR] Users: ', e );
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

                // Close Spinning
                setTimeout(() => {
                    this.setState({ isSpinning: false });
                }, 500);
            }
        });
    }
    render() {
        const { dhcp, discoverable, ip_address, hostname, dns, spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 6 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <Form onSubmit={this.handleSubmit.bind(this)}>

                    <FormItemSwitch label='DHCP' id='dhcp' value={ dhcp } layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSwitch label='Discoverable' id='discoverable' value={ discoverable } layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSwitch label='Zero Config' id='zero_config' layout={formItemLayout} decorator={getFieldDecorator} />
                    
                    <FormItemIPInput label='IP Address' id='ip_address' value={ ip_address } layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemIPInput label='Subnet mask' id='subnet_mask' layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemIPInput label='Default gateway' id='default_gateway' layout={formItemLayout} decorator={getFieldDecorator} />
                    
                    <FormItemInput label='Hostname' id='hostname' value={ hostname } placeholder='localhost' layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItemIPInput label='DNS' id='dns' value={ dns } layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default NetworkSettings = Form.create()(NetworkSettings);