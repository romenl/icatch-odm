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
            main:{
                options:{
                    h264: {
                        resolution: [],
                        fps: {
                            min: 0,
                            max: 30
                        }
                    },
                    quality: {
                        min: 1,
                        max: 5
                    }
                },
                setting:{
                    resolution: '',
                    fps: 0,
                    quality: 0
                }
            },
            sub:{
                options:{
                    h264: {
                        resolution: [],
                        fps: {
                            min: 0,
                            max: 30
                        }
                    },
                    quality: {
                        min: 1,
                        max: 5
                    }
                },
                setting:{
                    resolution: '',
                    fps: 0,
                    quality: 0
                }
            },
            isModified: false,
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
            console.log( '[ERROR] Users: ', e );
        }
    }
    componentDidMount(){
        this.refreshInformation();
    }
    handleSubmit(e){
        e.preventDefault();
        this.deliver('Saving ...', 'Saved your configuration.');

        this.setState({isModified: false});
    }
    deliver(tip, msg='Your configuration is changed.'){
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                this.setState({
                    isModified: true,
                    spin_tip: tip,
                    isSpinning: true
                });
                
                await SetVideoEncoderConfiguration({
                    main: this.state.main,
                    sub: this.state.sub
                }, values );
                
                // Close Spinning
                this.setState({ isSpinning: false });
                
                message.success(msg);
            }
            else
                message.error(err);
        });
    }
    render() {
        const { isModified, spin_tip, isSpinning } = this.state;
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
                            <Card title={<h3 style={{marginBottom: 24, textAlign: 'center'}}>Main Stream</h3>}>
                                <FormItemSelect 
                                    label='Resolution' 
                                    id='main_resolution' 
                                    value={ this.state.main.setting.resolution } 
                                    options={ this.state.main.options.h264.resolution } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                                
                                <FormItemSlider 
                                        label='FPS'
                                        id='main_fps'
                                        value={this.state.main.setting.fps}
                                        min={this.state.main.options.h264.fps.min}
                                        max={this.state.main.options.h264.fps.max}
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>

                                <FormItemSlider 
                                        label='Quality'
                                        id='main_quality'
                                        value={this.state.main.setting.quality}
                                        min={this.state.main.options.quality.min}
                                        max={this.state.main.options.quality.max}
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<h3 style={{marginBottom: 24, textAlign: 'center'}}>Sub Stream</h3>}>
                                <FormItemSelect 
                                    label='Resolution' 
                                    id='sub_resolution'
                                    value={ this.state.sub.setting.resolution } 
                                    options={ this.state.sub.options.h264.resolution } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                                
                                <FormItemSlider 
                                        label='FPS'
                                        id='sub_fps'
                                        value={this.state.sub.setting.fps}
                                        min={this.state.sub.options.h264.fps.min}
                                        max={this.state.sub.options.h264.fps.max}
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>

                                <FormItemSlider 
                                        label='Quality'
                                        id='sub_quality'
                                        value={this.state.sub.setting.quality}
                                        min={this.state.sub.options.quality.min}
                                        max={this.state.sub.options.quality.max}
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>
                            </Card>
                        </Col>
                    </Row>

                    <FormItem className='submit' wrapperCol={{ span: 2, offset: 20 }} style={{marginTop: 20}}>
                        <Button type="primary" htmlType="submit" disabled={!isModified}>Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default EncoderSettings = Form.create()(EncoderSettings);