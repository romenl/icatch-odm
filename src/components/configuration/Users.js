import React, { Component } from 'react';
import update from 'react/lib/update';
import { Spin, Table, Button, Icon, Popconfirm, message } from 'antd';
import { FormItemUserModal } from '../CustomInput';

export default class Users extends Component{
    constructor(props){
        super(props);

        this.columns = [{
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
            width: '30%',
            render: text => <b>{text}</b>,
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
            datas: [{
                key:0,
                user_name: 'admin',
                user_level: 'Administrator'
            }],
            isOpen: false,
            modify_user: {
                name: '',
                level: ''
            },
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({ isSpinning: false });
        }, 500);
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
    handleDelete(index){
        const datas = [...this.state.datas];
        datas.splice(index, 1);
        this.setState({ datas });
    }
    handleSubmit(e){
        this.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    isOpen: false
                });

                message.success('Update users list success.');
            }
        });

        // Initial modal form
        this.form.resetFields();
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
                <Button onClick={this.handleCreate.bind(this)} style={{marginBottom: 5}}>Add</Button>
                <Table columns={this.columns} dataSource={ datas } locale={{emptyText: <span><Icon type="info-circle" />Have no any users now.</span>}}></Table>
                <FormItemUserModal 
                    title="Create a new User"
                    visible={this.state.isOpen}
                    modify_user={modify_user}
                    onOk={this.handleSubmit.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    ref={this.saveFormRef.bind(this)} />
            </Spin>
        );
    }
}