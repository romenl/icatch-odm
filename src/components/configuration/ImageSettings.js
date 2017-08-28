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
            console.log( '[ERROR] ', e );
        }
    }
    componentDidMount(){
        this.refreshInformation();
    }
    handleReset(){
        const defaultSettings = {
            backlight_compensation: {
                enable: false,
                content: 0
            },
            brightness: 50,
            color_saturation: 50,
            contrast: 50,
            sharpness: 10,
            ircut_filter: 'AUTO',
            wide_dynamic_range: {
                enable: false,
                content: 100
            },
            exposure: {
                enable: false,
                content: 50
            },
            white_balance_mode: 'AUTO',
            white_balance_cbgain: 0,
            white_balance_crgain: 0
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
                
                await SetImagingSettings( this.setSettings( reset, values ) );
                
                // Close Spinning
                this.setState({ isSpinning: false });
                
                message.success(msg);
            }
            else
                message.error(err);
        });
    }

    setSettings( reset, values ){
        let settings = this.state.settings.data;
        let nextSettings = reset ? reset : values;

        // BacklightCompensation
        settings.BacklightCompensation.Mode.v = !nextSettings.backlight_compensation.enable ? 0 : 1;
        settings.BacklightCompensation.Level.v = nextSettings.backlight_compensation.content;
        // Brightness
        settings.Brightness.v = nextSettings.brightness;
        // ColorSaturation
        settings.ColorSaturation.v = nextSettings.color_saturation;
        // Contrast
        settings.Contrast.v = nextSettings.contrast;
        // Exposure
        settings.Exposure.Mode.v = !nextSettings.exposure.enable ? 0 : 1;
        settings.Exposure.ExposureTime.v = nextSettings.exposure.content;
        // IrCutFilter
        settings.IrCutFilter.v = settings.IrCutFilter[ nextSettings.ircut_filter ];
        // Sharpness
        settings.Sharpness.v = nextSettings.sharpness;
        // WideDynamicRange
        settings.WideDynamicRange.Mode.v = !nextSettings.wide_dynamic_range.enable ? 0 : 1;
        settings.WideDynamicRange.Level.v = nextSettings.wide_dynamic_range.content ;
        // WhiteBalance
        settings.WhiteBalance.Mode.v = settings.WhiteBalance.Mode[ nextSettings.white_balance_mode ];
        settings.WhiteBalance.CbGain.v = nextSettings.white_balance_cbgain;
        settings.WhiteBalance.CrGain.v = nextSettings.white_balance_crgain;

        return settings;
    }
    render() {
        const { spin_tip, isSpinning } = this.state;
        const { settings, options } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        
        let selectInputList = [{
            label: 'Wide Dynamic Range',
            id: 'wide_dynamic_range',
            value: {
                enable: settings ? (settings.WideDynamicRange.Mode === 'ON' ? true : false) : true, 
                content: settings ? settings.WideDynamicRange.Level : 0
            },
            min: options ? options.WideDynamicRange.Level.Min : 0,
            max: options ? options.WideDynamicRange.Level.Max : 4095,
            options: {on: 'ON', off: 'OFF'}
        },{
            label: 'Exposure Time',
            id: 'exposure',
            value: {
                enable: settings ? (settings.Exposure.Mode === 'MANUAL' ? true : false) : true, 
                content: settings ? settings.Exposure.ExposureTime : 50
            },
            min: options ? options.Exposure.ExposureTime.Min : 50,
            max: options ? options.Exposure.ExposureTime.Max : 36384,
            options: {on: 'MANUAL', off: 'AUTO'}
        }, {
            label: 'Backlight Compensation',
            id: 'backlight_compensation',
            value: {
                enable: settings ? (settings.BacklightCompensation.Mode === 'ON' ? true : false) : true, 
                content: settings ? settings.BacklightCompensation.Level : 0
            },
            min: options ? options.BacklightCompensation.Level.Min : 50,
            max: options ? options.BacklightCompensation.Level.Max : 36384,
            options: {on: 'ON', off: 'OFF' }
        }];

        let sliderList = [{
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
                        <Col span={7}>
                            <Card title={<h3 style={{marginBottom: 24, textAlign: 'center'}}>Images</h3>}>
                                {
                                    sliderList.map((s, index) => (
                                        <FormItemSlider 
                                            key={s.label}
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
                        <Col span={7}>
                            <Card title={<h3 style={{marginBottom: 24, textAlign: 'center'}}>White Balance</h3>}>
                                <FormItemSelect 
                                    label='Mode'
                                    id='white_balance_mode' 
                                    value={ settings ? settings.WhiteBalance.Mode : 'AUTO' } 
                                    options={ options ? options.WhiteBalance.Mode : [{name: 'AUTO', value: 0}, {name: 'MANUAL', value: 1}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>

                                <FormItemSlider 
                                    label='CbGain'
                                    id='white_balance_cbgain'
                                    value={ settings ? settings.WhiteBalance.CbGain.v : 0 }
                                    min={ options ? options.WhiteBalance.CbGain.Min : 0 }
                                    max={ options ? options.WhiteBalance.CbGain.Max : 4096 }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>

                                <FormItemSlider 
                                    label='CrGain'
                                    id='white_balance_crgain'
                                    value={ settings ? settings.WhiteBalance.CrGain.v : 0 }
                                    min={ options ? options.WhiteBalance.CrGain.Min : 0 }
                                    max={ options ? options.WhiteBalance.CrGain.Max : 4096 }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card title={<h3 style={{marginBottom: 24, textAlign: 'center'}}>Others</h3>}>
                                <FormItemSelect 
                                    label='IrCut Filter' 
                                    id='ircut_filter'
                                    value={ settings ? settings.IrCutFilter : 'OFF' } 
                                    options={ options ? options.IrCutFilter : [{name: 'OFF', value: 0}, {name: 'ON', value: 1}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>

                                {
                                    selectInputList.map((s, index) => (
                                        <FormItemSelectInput
                                            key={s.label}
                                            label={s.label}
                                            id={s.id}
                                            value={s.value}
                                            min={s.min}
                                            max={s.max}
                                            options={s.options}
                                            layout={formItemLayout} decorator={getFieldDecorator}
                                            onChange={this.deliver.bind(this)}/>
                                    ))
                                }
                            </Card>
                        </Col>
                    </Row>

                    <FormItem wrapperCol={{ span: 2, offset: 22 }} style={{marginTop: 20}}>
                        <Button onClick={this.handleReset.bind(this)}>Default</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default ImageSettings = Form.create()(ImageSettings);