import React, { Component } from 'react';
import { Form, Button, Spin } from 'antd';
import { FormItemInput, FormItemSelect, FormItemSwitch, FormItemRadio, FormItemDatePicker } from '../CustomInput';
import { timezone } from '../tools/';
import moment from 'moment';

// Onvif API
import { 
    GetSystemDateAndTime,
    GetNTP
} from '../../onvif/';

const FormItem = Form.Item;
let   timer;

class TimeSettings extends Component{
    constructor(props){
        super(props);

        this.state ={
            datas: [],
            time_zone: 'Asia/Taipei',
            sync_type: 'Manual',
            sync_pc: false,
            manual_time: moment(),
            currentTime: moment(),
            ntp_server: 'tick.stdtime.gov.tw',
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            // Get Information from devise.
            let data = await Promise.all([ GetSystemDateAndTime(), GetNTP() ]);
            let sdt = data[0],
                ntp = data[1];
            
            this.setState({
                sync_type: sdt.sync_type,
                ntp_server: ntp[0].DNSname.v,
                isSpinning: false
            });
        } catch(e) {
            console.log( '[ERROR] Users: ', e );
        }
    }
    componentDidMount(){
        // current timer start
        timer = setInterval(()=>{
            this.setState({ 
                currentTime: moment()
            })
        }, 500);

        this.refreshInformation();
    }
    componentWillUnmount(){
        clearInterval(timer);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    ...values,
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
        const { time_zone, sync_type, sync_pc, manual_time, currentTime, ntp_server, spin_tip, isSpinning } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 6 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItemSelect label='Time zone' id='time_zone' showSearch={true} value={ time_zone } options={ timezone } layout={formItemLayout} decorator={getFieldDecorator}/>

                    <FormItemRadio label='Sync with' 
                                id='sync_type'
                                value={ sync_type }
                                options={[{
                                        value:'Manual', 
                                        content:'Manual Settings'
                                    },{
                                        value:'NTP', 
                                        content:'NTP Server'
                                    }]} layout={formItemLayout} decorator={getFieldDecorator} />
                    {
                        (getFieldValue('sync_type') || sync_type) === 'Manual' ?
                        <div>
                            <FormItemSwitch label='Sync with Computer' id='sync_pc' value={ sync_pc } layout={formItemLayout} decorator={getFieldDecorator} />
                            <FormItemDatePicker label='Current time (PC)' id='current_time' value={ currentTime } disabled={true}layout={formItemLayout} decorator={getFieldDecorator} />
                            <FormItemDatePicker label='Set time' id='manual_time' value={ manual_time } layout={formItemLayout} decorator={getFieldDecorator} />
                        </div>
                        :
                        <div>
                            <FormItemInput label='NTP server' id='ntp_server' value={ ntp_server } placeholder='NTP server address' layout={formItemLayout} decorator={getFieldDecorator} />
                        </div>
                    }
                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default TimeSettings = Form.create()(TimeSettings);