import React, { Component } from 'react';
import { Spin, Form, Button } from 'antd';
import { FormItemSelectInput } from '../CustomInput';

const FormItem = Form.Item;

class HttpHttps extends Component{
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

                    <FormItemSelectInput label='HTTP ports' id='http_ports' layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSelectInput label='HTTPs ports' id='https_ports' layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSelectInput label='RTSP ports' id='rtsp_ports' layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default HttpHttps = Form.create()(HttpHttps);