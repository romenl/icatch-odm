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
            console.log( '[ERROR] Users: ', e );
        }
    }
    componentDidMount(){
        this.refreshInformation();
    }
    // handleSubmit(e){
    //     e.preventDefault();
    //     this.deliver('Saving ...', 'Saved your configuration.');
    // }
    deliver(tip, msg='Your configuration is changed.'){
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                this.setState({
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
                <Form>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title={<h3 style={{marginBottom: 24, textAlign: 'center'}}>Main Stream</h3>}>
                                <FormItemSelect 
                                    label='Resolution' 
                                    id='main_resolution' 
                                    value={ main ? main.setting.resolution : 'NaN' } 
                                    options={ main ? main.options.H264.Resolution : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                                
                                <FormItemSlider 
                                        label='FPS'
                                        id='main_fps'
                                        value={ main ? main.setting.fps : 1 }
                                        min={ main ? main.options.H264.FrameRateRange.Min : 1 }
                                        max={ main ? main.options.H264.FrameRateRange.Max : 30 }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>

                                <FormItemSlider 
                                        label='Quality'
                                        id='main_quality'
                                        value={ main ? main.setting.quality : 1 }
                                        min={ main ? main.options.Quality.Min : 1 }
                                        max={ main ? main.options.Quality.Max : 5 }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<h3 style={{marginBottom: 24, textAlign: 'center'}}>Sub Stream</h3>}>
                                <FormItemSelect 
                                    label='Resolution' 
                                    id='sub_resolution'
                                    value={ sub ? sub.setting.resolution : 'NaN' } 
                                    options={ sub ? sub.options.H264.Resolution : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                                
                                <FormItemSlider 
                                        label='FPS'
                                        id='sub_fps'
                                        value={ sub ? sub.setting.fps : 1 }
                                        min={ sub ? sub.options.H264.FrameRateRange.Min : 1 }
                                        max={ sub ? sub.options.H264.FrameRateRange.Max : 30 }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>

                                <FormItemSlider 
                                        label='Quality'
                                        id='sub_quality'
                                        value={ sub ? sub.setting.quality : 1 }
                                        min={ sub ? sub.options.Quality.Min : 1 }
                                        max={ sub ? sub.options.Quality.Max : 5 }
                                        layout={formItemLayout} decorator={getFieldDecorator}
                                        onChange={this.deliver.bind(this)}/>
                            </Card>
                        </Col>
                    </Row>

                    {
                    // <FormItem className='submit' wrapperCol={{ span: 2, offset: 20 }} style={{marginTop: 20}}>
                    //     <Button type="primary" htmlType="submit">Save</Button>
                    // </FormItem>
                    }
                </Form>
            </Spin>
        );
    }
}

export default EncoderSettings = Form.create()(EncoderSettings);