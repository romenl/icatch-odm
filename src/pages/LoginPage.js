import React, { Component } from 'react';
import { Spin, Card, Form, Icon, Button } from 'antd';
import cookie from 'react-cookie';

import { FormItemInput } from '../components/CustomInput';

import '../styles/loginPage.scss';

const FormItem = Form.Item;

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state={
            spin_tip: '',
            isSpinning: false
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    spin_tip: 'Login ...',
                    isSpinning: true
                });

                // Close Spinning
                setTimeout(() => {
                    this.setState({ isSpinning: false });
                    this.handleLogin();
                }, 1000);
            }
        });
    }

    handleLogin(){
        const { onLogin } = this.props;
        if ( onLogin ){
            // Save cookie for user login 3 min.
            cookie.save('usrLogin', true, {path: '/', maxAge: 180});
            onLogin(true);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isSpinning, spin_tip } = this.state;
        const formItemLayout = {
            wrapperCol: { span: 24 },
        };
        return (
            <Card id='login'>
                <h1>Login</h1>
                <Spin tip={ spin_tip } spinning={ isSpinning }>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItemInput 
                                id='user_name' placeholder='User Name' layout={formItemLayout} decorator={getFieldDecorator} 
                                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                rules={[{
                                    required: true, message: 'Please input user name!'
                                }]}/>
                        <FormItemInput 
                                id='user_password' type='password' hasFeedback={true} placeholder='User Password' layout={formItemLayout} decorator={getFieldDecorator}
                                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                rules={[{
                                    required: true, message: 'Please input user password!'
                                }]}/>

                        <FormItem {... formItemLayout}>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>Login</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
        )
    }
}

export default LoginPage = Form.create()(LoginPage);