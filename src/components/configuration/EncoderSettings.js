import React, { Component } from 'react';
import update from 'react/lib/update';
import { Row, Col, Spin, Card , Form, Button, message } from 'antd';
import { FormItemSelect, FormItemSlider } from '../CustomInput';

// Onvif API
import { 
    GetVideoEncoderConfigurationOptions,
    GetVideoEncoderConfiguration,
    GetVideoEncoderConfigurations,
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
                GetVideoEncoderConfigurations(0),
                GetVideoEncoderConfigurationOptions(1),
                GetVideoEncoderConfigurations(1)
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
    handleEncoderChange(stream){
        const encoding = this.props.form.getFieldValue(`${stream}_Encoding`);

        if ( this.state[stream] )
            this.setState( update( this.state, {
                [stream]: {
                    setting: {
                        Encoding: { $set: encoding }
                    }
                }
            }));
        
    }
    handleReset(){
        const defaultSettings = {
            main_Encoding: 'H264',
            main_Resolution: '2592x1520',
            main_FPS: 30,
            main_Bitrate: 2048,

            sub_Encoding: 'H265',
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
        
        const encoder = {
            main: main ? ( main.setting.Encoding === 'H265' ? 0 : 1 ) : 0,
            sub: sub ? ( sub.setting.Encoding === 'H265' ? 0 : 1 ) : 0
        };
        const options = {
            main: {
                Resolution: main ? main.options[ encoder.main ].Resolution : [{value: 0, name: 'NaN'}],
                FrameRateRange: {
                    Min: main ? main.options[ encoder.main ].FrameRateRange.Min : 1,
                    Max: main ? main.options[ encoder.main ].FrameRateRange.Max : 30
                },
                BitrateRange: {
                    Min: main ? main.options[ encoder.main ].BitrateRange.Min : 1024,
                    Max: main ? main.options[ encoder.main ].BitrateRange.Max : 9216
                }
            },
            sub: {
                Resolution: sub ? sub.options[ encoder.sub ].Resolution : [{value: 0, name: 'NaN'}],
                FrameRateRange: {
                    Min: sub ? sub.options[ encoder.sub ].FrameRateRange.Min : 1,
                    Max: sub ? sub.options[ encoder.sub ].FrameRateRange.Max : 30
                },
                BitrateRange: {
                    Min: sub ? sub.options[ encoder.sub ].BitrateRange.Min : 256,
                    Max: sub ? sub.options[ encoder.sub ].BitrateRange.Max : 2048
                }
            }
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Encoder Settings</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Main Stream</h3>}>
                                <FormItemSelect 
                                    label='Encoder' 
                                    id='main_Encoding' 
                                    value={ main ? main.setting.Encoding : 'NaN' } 
                                    options={ [{value: 0, name: 'H265'}, {value: 1, name: 'H264'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.handleEncoderChange.bind(this, 'main')}
                                    />

                                <FormItemSelect 
                                    label='Resolution' 
                                    id='main_Resolution' 
                                    value={ main ? main.setting.Resolution : 'NaN' } 
                                    options={ options.main.Resolution } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />
                                
                                <FormItemSlider 
                                    label='FPS'
                                    id='main_FPS'
                                    value={ main ? main.setting.FPS : 1 }
                                    min={ options.main.FrameRateRange.Min }
                                    max={ options.main.FrameRateRange.Max }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />

                                <FormItemSlider 
                                    label='Bitrate'
                                    id='main_Bitrate'
                                    value={ main ? main.setting.Bitrate : 1 }
                                    min={ options.main.BitrateRange.Min }
                                    max={ options.main.BitrateRange.Max }
                                    step={ main ? options.main.BitrateRange.Min : undefined }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Sub Stream</h3>}>
                                <FormItemSelect 
                                    label='Encoder' 
                                    id='sub_Encoding' 
                                    value={ sub ? sub.setting.Encoding : 'NaN' } 
                                    options={ [{value: 0, name: 'H265'}, {value: 1, name: 'H264'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.handleEncoderChange.bind(this, 'sub')}
                                    />

                                <FormItemSelect 
                                    label='Resolution' 
                                    id='sub_Resolution'
                                    value={ sub ? sub.setting.Resolution : 'NaN' } 
                                    options={ options.sub.Resolution } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />
                                
                                <FormItemSlider 
                                    label='FPS'
                                    id='sub_FPS'
                                    value={ sub ? sub.setting.FPS : 1 }
                                    min={ options.sub.FrameRateRange.Min }
                                    max={ options.sub.FrameRateRange.Max }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    />

                                <FormItemSlider 
                                    label='Bitrate'
                                    id='sub_Bitrate'
                                    value={ sub ? sub.setting.Bitrate : 1 }
                                    min={ options.sub.BitrateRange.Min }
                                    max={ options.sub.BitrateRange.Max }
                                    step={ sub ? options.sub.BitrateRange.Min : undefined }
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