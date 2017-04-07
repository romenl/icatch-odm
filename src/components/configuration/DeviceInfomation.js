import React, { Component } from 'react';
import { Spin, Form, Button } from 'antd';
import { FormItemInput, FormItemIPInput } from '../CustomInput';

const FormItem = Form.Item;

class DeviceInfomation extends Component{
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
                    <FormItemInput label='Name' id='name' placeholder="Device's name" layout={formItemLayout} decorator={getFieldDecorator} />
                    
                    <FormItemInput label='Model' id='model' value='model' disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemInput label='Firmware' id='firmware' value='V0.0.1' disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemInput label='MAC Address' id='mac_address' value='00-00-00-00-00-00' disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemIPInput label='IP Address' id='ip_address' disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default DeviceInfomation = Form.create()(DeviceInfomation);