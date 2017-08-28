import React, { Component } from 'react';
import { Spin, Form, Button } from 'antd';
import { FormItemSwitch } from '../CustomInput';

// Onvif API
import {
    GetDiscoveryMode,
} from '../../onvif/';

const FormItem = Form.Item;

class Wsd extends Component{
    constructor(props){
        super(props);
        this.state ={
            discoverable: false,
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            // Get Information from devise.
            let discovermode = await GetDiscoveryMode();

            
            
            this.setState({
                discoverable: discovermode,
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

                // Close Spinning
                setTimeout(() => {
                    this.setState({ isSpinning: false });
                }, 500);
            }
        });
    }
    render() {
        const { discoverable, spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>WSD</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>

                    <FormItemSwitch label='Discoverable' id='discoverable' value={ discoverable } layout={formItemLayout} decorator={getFieldDecorator} />

                    <FormItem className='submit' wrapperCol={{ span: 2, offset: 14 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default Wsd = Form.create()(Wsd);