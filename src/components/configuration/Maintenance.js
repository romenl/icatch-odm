import React, { Component } from 'react';
import { Form, Spin, message } from 'antd';
import { FormItemInput, FormItemButtom, FormItemUpdateFirmware } from '../CustomInput';

// Onvif API
import { GetDeviceInformation, SystemReboot } from '../../onvif/';

class Maintenance extends Component{
    constructor(props){
        super(props);

        this.state ={
            firmware: '',
            spin_tip: 'Loading ...',
            isSpinning: true,
            rebooting: false,
            restoring: false,
            defaulting: false,
            updating: false
        };
    }
    async refreshInformation() {
        try {
            // Get Information from devise.
            let info = await GetDeviceInformation();
            
            this.setState({
                firmware: info.FirmwareVersion,
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
    async handleReboot(){

        await SystemReboot();
        
        message.warning('Device reboot, please reload later ...', 20);
    }
    handleRestore(){
        this.setState({
            restoring: true
        });

        setTimeout(() => {
            this.setState({ restoring: false });
        }, 3000);
    }
    handleDefault(){
        this.setState({
            defaulting: true
        });

        setTimeout(() => {
            this.setState({ defaulting: false });
        }, 3000);
    }
    handleUpdate(){
        this.setState({
            updating: true
        });

        setTimeout(() => {
            this.setState({ updating: false });
        }, 3000);
    }
    render() {
        const { spin_tip, isSpinning, firmware, rebooting, restoring, defaulting, updating } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 6 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItemButtom label='Reboot device' type='primary' context='Reboot' loading={ rebooting } layout={formItemLayout} onClick={this.handleReboot.bind(this)} />
                    <FormItemButtom label='Recovery device parameters to the factory settings' context='Restore' loading={ restoring } layout={formItemLayout} onClick={this.handleRestore.bind(this)} />
                    <FormItemButtom label='Restore all parameters to default settings' context='Default' loading={ defaulting } layout={formItemLayout} onClick={this.handleDefault.bind(this)} />
                    
                    <FormItemInput label='Firmware' id='firmware' value={ firmware } disabled={true} layout={formItemLayout} decorator={getFieldDecorator} />
                    <FormItemUpdateFirmware label='Firmware Update' id='firmware_update' loading={ updating } layout={formItemLayout} decorator={getFieldDecorator} onClick={this.handleUpdate.bind(this)}/>
                </Form>
            </Spin>
        );
    }
}

export default Maintenance = Form.create()(Maintenance);