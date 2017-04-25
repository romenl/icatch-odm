import React, { Component } from 'react';
import { Spin, Form, Button, message } from 'antd';
import { FormItemInput, FormItemIPInput } from '../CustomInput';

// Onvif API
import { 
    GetDeviceInformation, 
    GetHostname, 
    SetHostname,
    GetNetworkInterfaces
} from '../../onvif/';

const FormItem = Form.Item;

class DeviceInfomation extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: 'localhost',
            model: '',
            firmware: '',
            mac_address: '',
            ip_address: {
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0
            },
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            // Get Information from devise.
            let data = await Promise.all([GetDeviceInformation(), GetHostname(), GetNetworkInterfaces()]);
            let info = data[0],
                hostname = data[1],
                networkinterface = data[2];

            let ip = networkinterface.IPv4.Config.FromDHCP.Address.v.split('.');
            
            this.setState({
                name: hostname,
                model: info.Model,
                firmware: info.FirmwareVersion,
                mac_address: networkinterface.Info.HwAddress.v,
                ip_address: {
                    '1': ip[0],
                    '2': ip[1],
                    '3': ip[2],
                    '4': ip[3]
                },
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
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                this.setState({
                    spin_tip: 'Saving ...',
                    isSpinning: true
                });
                
                await SetHostname( values.name );

                // Close Spinning
                this.setState({ isSpinning: false });

                message.success('Saved your configuration.');
            }
            else
                message.error(err);
        });
    }
    render() {
        const { name, model, firmware, mac_address, ip_address, spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 6 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItemInput label='Name' id='name' value={ name } placeholder="Device's name" layout={formItemLayout} decorator={getFieldDecorator} />
                    
                    <FormItemInput label='Model' id='model' value={ model } disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemInput label='Firmware' id='firmware' value={ firmware } disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemInput label='MAC Address' id='mac_address' value={ mac_address } disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemIPInput label='IP Address' id='ip_address' value={ ip_address } disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default DeviceInfomation = Form.create()(DeviceInfomation);