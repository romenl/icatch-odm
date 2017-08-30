import React, { Component } from 'react';
import update from 'react/lib/update';
import { Row, Col, Card, Form, Button, Spin, Icon } from 'antd';
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
            ntp_uuid: 0,
            ntp_server: [],
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            let { ntp_uuid } = this.state;
            // Get Information from devise.
            let data = await Promise.all([ GetSystemDateAndTime(), GetNTP() ]);
            let sdt = data[0],
                ntp = data[1];

            let ntp_server = [];
            ntp.forEach( (n) => (
                    ntp_server.push({
                        key: ntp_uuid++,
                        value: n.DNSname.v
                    })
            ));
            
            this.setState({
                sync_type: sdt.sync_type,
                ntp_uuid,
                ntp_server,
                isSpinning: false
            });
        } catch(e) {
            console.log( '[ERROR] ', e );
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
    handleAddServer(){
        let { ntp_uuid } = this.state;
        ntp_uuid++;

        this.setState( update( this.state, {
            ntp_uuid: {
                $set: ntp_uuid
            },
            ntp_server: {
                $push: [{
                    key: ntp_uuid,
                    value: ''
                }]
            }
        }))
    }
    handleRemoveServer( ntp ){
        let { ntp_server } = this.state;

        this.setState({
            ntp_server: ntp_server.filter( (n) => n.key !== ntp.key )
        });
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
                console.log( values );
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
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const removeBTN = (ntp) => <Button shape="circle" icon="minus" size="small" onClick={this.handleRemoveServer.bind(this, ntp)}></Button>;
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Time Settings</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row gutter={16}>
                        <Col span={12} offset={6}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Time Settings</h3>}>
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
                                    {
                                        ntp_server.map( (ntp) => (
                                            <FormItemInput label={ ntp.key === 0 ? 'NTP server' : removeBTN(ntp) } id={ `ntp_server_${ ntp.key }` } key={ ntp.key } value={ ntp.value } placeholder='NTP server address' layout={formItemLayout} decorator={getFieldDecorator} />
                                        ))
                                    }
                                        <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                                            <Button type="dashed" onClick={this.handleAddServer.bind(this)} style={{ width: '100%' }}>
                                                <Icon type="plus" /> Add server
                                            </Button>
                                        </FormItem>
                                    </div>
                                }
                            </Card>
                        </Col>
                    </Row>

                    <FormItem className='submit' wrapperCol={{ span: 2, offset: 16 }} style={{marginTop: 20}}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default TimeSettings = Form.create()(TimeSettings);