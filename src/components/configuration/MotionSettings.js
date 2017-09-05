import React, { Component } from 'react';
import update from 'react/lib/update';
import { Row, Col, Spin, Card, Form, Button, message } from 'antd';
import { FormItemSelect, FormItemSlider } from '../CustomInput';
import { MotionSelector } from '../tools';
import { motionAreaEncode, motionAreaDecode } from './utils';

// Onvif API
import { 
    //GetAnalyticsConfigurations
} from '../../onvif/';

const FormItem = Form.Item;

class MotionSettings extends Component{
    constructor(props){
        super(props);
        this.state ={
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            //let data = await GetAnalyticsConfigurations(0);
            
            this.setState({
                // Set options and datas here
                isSpinning: false
            });
        } catch(e) {
            console.log( '[ERROR] ', e );
        }
    }
    componentDidMount(){
        this.refreshInformation();
    }
    handleReset(){
        const defaultSettings = {
            mode: 'AUTO',
            sensitivity: 70,
            min_count: 4,
            motion_area: '5QA=' // disable all region
        };

        this.deliver('Reset Default ...', 'Reset your configuration.', defaultSettings);

        this.props.form.setFieldsValue(defaultSettings);
    }
    handleSubmit(e){
        e.preventDefault();
        this.deliver('Saving ...', 'Saved your configuration.');
    }
    deliver(tip, msg='Your configuration is changed.', reset){
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                this.setState({
                    spin_tip: tip,
                    isSpinning: true
                });
                
                let motion_area = this.refs['motion_area'].state.value; 
                motion_area = motionAreaEncode( motion_area );
                values['motion_area'] = motion_area;                
                //await SetVideoEncoderConfiguration( this.setSettings( reset, values ) );
                
                // Close Spinning
                this.setState({ isSpinning: false });
                
                message.success(msg);
            }
            else
                message.error(err);
        });
    }

    setSettings( reset, values ){

        return {  };
    }
    render() {
        const { spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Motion Settings</h1>
                <Form>
                    <Row gutter={16}>
                        <Col span={10} offset={2}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Settings</h3>}>
                                <FormItemSelect 
                                    label='Mode' 
                                    id='mode' 
                                    value={ 'NaN' } 
                                    options={ [{value: 0, name: 'Manual'}, {value: 1, name: 'AUTO'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />

                                <FormItemSlider 
                                    label='Sensitivity'
                                    id='sensitivity'
                                    value={ 0 }
                                    min={ 0 }
                                    max={ 100 }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />

                                <FormItemSlider 
                                    label='Min Count'
                                    id='min_count'
                                    value={ 1 }
                                    min={ 1 }
                                    max={ 100 }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Motion Area</h3>}>
                                <MotionSelector 
                                    ref='motion_area'
                                    // value={`${motionAreaDecode( motion_area )}`}
                                    // Note: motion_area is the value of setting from device
                                    EnableAllButton={<Button></Button>}
                                    DisableAllButton={<Button></Button>}/>
                            </Card>
                        </Col>
                    </Row>

                    <FormItem className='submit' wrapperCol={{ span: 6, offset: 18 }} style={{marginTop: 20}}>
                        <Button onClick={this.handleReset.bind(this)} style={{ marginRight: 10 }}>Default</Button>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default MotionSettings = Form.create()(MotionSettings);