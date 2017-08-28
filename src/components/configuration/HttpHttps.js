import React, { Component } from 'react';
import { Spin, Form, Button } from 'antd';
import { FormItemSelectInput } from '../CustomInput';

// Onvif API
import { 
    GetNetworkProtocols
} from '../../onvif/';

const FormItem = Form.Item;

class HttpHttps extends Component{
    constructor(props){
        super(props);
        this.state ={
            HTTP:{
                enable: false,
                port: []
            },
            HTTPS:{
                enable: false,
                port: []
            },
            RTSP:{
                enable: false,
                port: []
            },
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            // Get Information from devise.
            let protocols = await GetNetworkProtocols();
            
            this.setState({
                ...protocols,
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
        const { HTTP, HTTPS, RTSP, spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Http/Https</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>

                    <FormItemSelectInput label='HTTP ports' id='http_ports' value={{enable: HTTP.enable, content: HTTP.port[0]}} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSelectInput label='HTTPs ports' id='https_ports' value={{enable: HTTPS.enable, content: HTTPS.port[0]}} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemSelectInput label='RTSP ports' id='rtsp_ports' value={{enable: RTSP.enable, content: RTSP.port[0]}} layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItem className='submit' wrapperCol={{ span: 2, offset: 14 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default HttpHttps = Form.create()(HttpHttps);