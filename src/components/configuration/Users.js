import React, { Component } from 'react';
import update from 'react/lib/update';
import { Row, Col, Card, Spin, Table, Button, Icon, Popconfirm, message } from 'antd';
import { FormItemUserModal } from '../CustomInput';

// Onvif API
import { GetUsers, CreateUsers, SetUser, DeleteUsers } from '../../onvif/';

export default class Users extends Component{
    constructor(props){
        super(props);

        this.columns = [{
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
            width: '30%',
            render: text => <b>{text}</b>
        }, {
            title: 'User Level',
            dataIndex: 'user_level',
            key: 'user_level',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <a href="#" onClick={() => this.handleModify(index)}>Modify</a>
                    <span className="ant-divider" />
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(index)}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),
        }];

        this.state = {
            datas: [],
            isOpen: false,
            modify_user: {
                name: '',
                level: ''
            },
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshUsers() {
        try {
            // Get Users from devise.
            let datas = await GetUsers();
            
            this.setState({
                datas,
                isSpinning: false
            });
        } catch(e) {
            console.log( '[ERROR] ', e );
        }
    }
    componentDidMount(){
        this.refreshUsers();
    }
    handleCreate(){
        this.setState(update( this.state, {
            isOpen: { $set: true },
            modify_user: {
                name: { $set: '' },
                level: { $set: '' }
            }
        }));
    }
    handleCancel(){
        this.setState({
            isOpen: false
        });

        // Initial modal form
        this.form.resetFields();
    }
    handleModify(index){
        const datas = [...this.state.datas];
        
        this.setState(update( this.state, {
            isOpen: { $set: true },
            modify_user: {
                name: { $set: datas[index].user_name },
                level: { $set: datas[index].user_level }
            }
        }));
    }
    async handleDelete(index){
        
        const { datas } = this.state;
        let userName = datas[index].user_name;

        await DeleteUsers( userName );

        message.success(`Delete ${ userName }.`);

        this.refreshUsers();
    }
    handleSubmit(e){
        const { modify_user } = this.state;

        this.form.validateFields( async (err, user) => {
            if (!err) {
                if ( modify_user.name === '' )
                    await CreateUsers( user );
                else
                    await SetUser( user );
                    
                this.setState({
                    isOpen: false
                });

                this.refreshUsers();

                message.success('Update users list.');
            }

            // Initial modal form
            this.form.resetFields();
        });
    }
    saveFormRef(form) {
        this.form = form;
    }
    render(){
        const { datas, modify_user, spin_tip, isSpinning } = this.state;

        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>User Management</h1>
                <br />
                <Row gutter={16}>
                    <Col span={12} offset={6}>
                        <Card title={<h3 style={{textAlign: 'center'}}>Users Information</h3>}>
                            <section id='user-management'>
                                <Button onClick={this.handleCreate.bind(this)} style={{marginBottom: 5}}>Add</Button>
                                <Table columns={this.columns} dataSource={ datas } locale={{emptyText: <span><Icon type="info-circle" />Have no any users now.</span>}}></Table>
                                <FormItemUserModal 
                                    visible={this.state.isOpen}
                                    modify_user={modify_user}
                                    onOk={this.handleSubmit.bind(this)}
                                    onCancel={this.handleCancel.bind(this)}
                                    ref={this.saveFormRef.bind(this)} />
                            </section>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        );
    }
}