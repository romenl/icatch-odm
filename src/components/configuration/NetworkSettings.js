import React, { Component } from 'react';
import { Spin, Form, Button } from 'antd';
import { FormItemInput, FormItemIPInput, FormItemSwitch } from '../CustomInput';

const FormItem = Form.Item;

class NetworkSettings extends Component{
    constructor(props){
        super(props);
        this.state ={
            datas: [],
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({ isSpinning: false });
        }, 500);
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
        const { spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 6 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <Form onSubmit={this.handleSubmit.bind(this)}>

                    <FormItemSwitch label='DHCP' id='dhcp' layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSwitch label='Discoverable' id='discoverable' value={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSwitch label='Zero Config' id='zero_config' layout={formItemLayout} decorator={getFieldDecorator} />
                    
                    <FormItemIPInput label='IP Address' id='ip_address' layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemIPInput label='Subnet mask' id='subnet_mask' layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemIPInput label='Default gateway' id='default_gateway' layout={formItemLayout} decorator={getFieldDecorator} />
                    
                    <FormItemInput label='Hostname' id='hostname' value='localhost' placeholder='localhost' layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItemIPInput label='DNS' id='dns' value={{'1':8, '2':8, '3':8, '4':8}} layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default NetworkSettings = Form.create()(NetworkSettings);