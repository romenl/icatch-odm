import React, { Component } from 'react';
import { Row, Col, Card, Spin, Form, Button, message } from 'antd';
import { FormItemInputNumber, FormItemSlider, FormItemSelect, FormItemSelectInput } from '../CustomInput';

// Onvif API
import { 
    GetOptions,
    GetImagingSettings,
    SetImagingSettings
} from '../../onvif/';

const FormItem = Form.Item;

class ImageSettings extends Component{
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
                GetOptions(0),
                GetImagingSettings(0)
            ]);

            this.setState({
                options: data[0],
                settings: data[1],
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
    handleReset(){
        const defaultSettings = {
            backlight_compensation: 0,
            brightness: 50,
            color_saturation: 50,
            contrast: 50,
            sharpness: 10,
            ircut_filter: 'AUTO',
            wide_dynamic_range: {
                enable: false,
                content: 100
            }
        };

        this.deliver('Reset Default ...', 'Reset your configuration.', defaultSettings);

        this.props.form.setFieldsValue(defaultSettings);
    }
    deliver(tip, msg='Your configuration is changed.', reset){
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                this.setState({
                    spin_tip: tip,
                    isSpinning: true
                });                
                
                await SetImagingSettings( 
                    this.state.settings.data, 
                    reset ? reset : values 
                );                
                
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
        const { settings, options } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        
        let settingList = [{
            label: 'Backlight Compensation',
            id: 'backlight_compensation',
            value: settings ? settings.BacklightCompensation.Level : 0,
            min: options ? options.BacklightCompensation.Level.Min : 0,
            max: options ? options.BacklightCompensation.Level.Max : 255
        },{
            label: 'Brightness',
            id: 'brightness',
            value: settings ? settings.Brightness : 0,
            min: options ? options.Brightness.Min : 0,
            max: options ? options.Brightness.Max : 100
        },{
            label: 'Color Saturation',
            id: 'color_saturation',
            value: settings ? settings.ColorSaturation : 0,
            min: options ? options.ColorSaturation.Min : 0,
            max: options ? options.ColorSaturation.Max : 100
        },{
            label: 'Contrast',
            id: 'contrast',
            value: settings ? settings.Contrast : 0,
            min: options ? options.Contrast.Min : 0,
            max: options ? options.Contrast.Max : 100
        },{
            label: 'Sharpness',
            id: 'sharpness',
            value: settings ? settings.Sharpness : 0,
            min: options ? options.Sharpness.Min : 0,
            max: options ? options.Sharpness.Max : 63
        }];
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Image Settings</h1>
                <Form>
                    <Row gutter={16}>
                        <Col span={12} offset={6}>
                            <Card>
                                <FormItemSelect 
                                    label='IrCut Filter' 
                                    id='ircut_filter' 
                                    showSearch={true} 
                                    value={ settings ? settings.IrCutFilter : 'OFF' } 
                                    options={ options ? options.IrCutFilter : [{name: 'OFF', value: 0}, {name: 'ON', value: 1}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                                {/*
                                <FormItemInputNumber
                                    label='Exposure Time'
                                    id='exposure'
                                    value={this.state.Exposure}
                                    min={50}
                                    max={56384}
                                    placeholder={50}
                                    layout={formItemLayout} decorator={getFieldDecorator}/>
                                */}
                                <FormItemSelectInput
                                    label='Wide Dynamic Range' 
                                    id='wide_dynamic_range' 
                                    value={{
                                        enable: settings ? (settings.WideDynamicRange.Mode === 'ON' ? true : false) : true, 
                                        content: settings ? settings.WideDynamicRange.Level : 0
                                    }} 
                                    min={options ? options.WideDynamicRange.Level.Min : 0}
                                    max={options ? options.WideDynamicRange.Level.Max : 4095}
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                                {
                                    settingList.map((s, index) => (
                                        <FormItemSlider 
                                            key={index}
                                            label={s.label}
                                            id={s.id}
                                            value={s.value}
                                            min={s.min}
                                            max={s.max}
                                            layout={formItemLayout} decorator={getFieldDecorator}
                                            onChange={this.deliver.bind(this)}/>
                                    ))
                                }
                            </Card>
                        </Col>
                    </Row>

                    <FormItem wrapperCol={{ span: 2, offset: 16 }} style={{marginTop: 20}}>
                        <Button onClick={this.handleReset.bind(this)}>Default</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default ImageSettings = Form.create()(ImageSettings);