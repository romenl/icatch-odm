import React, { Component } from 'react';
import { Row, Col, Spin, Card , Form, Button, message } from 'antd';
import { FormItemSelect, FormItemSlider } from '../CustomInput';

// Onvif API
import { 
    GetVideoEncoderConfigurationOptions,
    GetVideoEncoderConfiguration,
    SetVideoEncoderConfiguration
} from '../../onvif/';

const FormItem = Form.Item;

class EncoderSettings extends Component{
    constructor(props){
        super(props);
        this.state ={
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            let data = await Promise.all([
                GetVideoEncoderConfigurationOptions(0),
                GetVideoEncoderConfiguration(0),
                GetVideoEncoderConfigurationOptions(1),
                GetVideoEncoderConfiguration(1)
            ]);
            
            this.setState({
                main: {
                    options: data[0],
                    setting: data[1]
                },
                sub: {
                    options: data[2],
                    setting: data[3]
                },
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
            main_Resolution: '2592x1520',
            main_FPS: 30,
            main_Bitrate: 2048,

            sub_Resolution: '640x480',
            sub_FPS: 30,
            sub_Bitrate: 512
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
                
                await SetVideoEncoderConfiguration( this.setSettings( reset, values ) );
                
                // Close Spinning
                this.setState({ isSpinning: false });
                
                message.success(msg);
            }
            else
                message.error(err);
        });
    }

    setSettings( reset, values ){
        let mainSettings = this.state.main.setting.data,
            subSettings  = this.state.sub.setting.data;

        let nextSettings = reset ? reset : values;

        // Main Stream
        mainSettings.Resolution.Width.v = parseInt(nextSettings.main_Resolution.split('x')[0], 10);
        mainSettings.Resolution.Height.v = parseInt(nextSettings.main_Resolution.split('x')[1], 10);
        mainSettings.RateControl.FrameRateLimit.v = parseInt(nextSettings.main_FPS, 10);
        mainSettings.RateControl.BitrateLimit.v = parseInt(nextSettings.main_Bitrate, 10);
        
        // Sub Stream
        subSettings.Resolution.Width.v = parseInt(nextSettings.sub_Resolution.split('x')[0], 10);
        subSettings.Resolution.Height.v = parseInt(nextSettings.sub_Resolution.split('x')[1], 10);
        subSettings.RateControl.FrameRateLimit.v = parseInt(nextSettings.sub_FPS, 10);
        subSettings.RateControl.BitrateLimit.v = parseInt(nextSettings.sub_Bitrate, 10);

        return { mainSettings, subSettings };
    }
    render() {
        const { spin_tip, isSpinning } = this.state;
        const { main, sub } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Encoder Settings</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Main Stream</h3>}>
                                <FormItemSelect 
                                    label='Resolution' 
                                    id='main_Resolution' 
                                    value={ main ? main.setting.Resolution : 'NaN' } 
                                    options={ main ? main.options.Resolution : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />
                                
                                <FormItemSlider 
                                        label='FPS'
                                        id='main_FPS'
                                        value={ main ? main.setting.FPS : 1 }
                                        min={ main ? main.options.FrameRateRange.Min : 1 }
                                        max={ main ? main.options.FrameRateRange.Max : 30 }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        />

                                <FormItemSlider 
                                        label='Bitrate'
                                        id='main_Bitrate'
                                        value={ main ? main.setting.Bitrate : 1 }
                                        min={ main ? main.options.BitrateRange.Min : 1024 }
                                        max={ main ? main.options.BitrateRange.Max : 9216 }
                                        step={ main ? main.options.BitrateRange.Min : undefined }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Sub Stream</h3>}>
                                <FormItemSelect 
                                    label='Resolution' 
                                    id='sub_Resolution'
                                    value={ sub ? sub.setting.Resolution : 'NaN' } 
                                    options={ sub ? sub.options.Resolution : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />
                                
                                <FormItemSlider 
                                        label='FPS'
                                        id='sub_FPS'
                                        value={ sub ? sub.setting.FPS : 1 }
                                        min={ sub ? sub.options.FrameRateRange.Min : 1 }
                                        max={ sub ? sub.options.FrameRateRange.Max : 30 }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        />

                                <FormItemSlider 
                                        label='Bitrate'
                                        id='sub_Bitrate'
                                        value={ sub ? sub.setting.Bitrate : 1 }
                                        min={ sub ? sub.options.BitrateRange.Min : 256 }
                                        max={ sub ? sub.options.BitrateRange.Max : 2048 }
                                        step={ sub ? sub.options.BitrateRange.Min : undefined }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        />
                            </Card>
                        </Col>
                    </Row>

                    <FormItem className='submit' wrapperCol={{ span: 6, offset: 18 }} style={{marginTop: 20}}>
                        <Button onClick={this.handleReset.bind(this)} style={{ marginRight: 10 }}>Default</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default EncoderSettings = Form.create()(EncoderSettings);