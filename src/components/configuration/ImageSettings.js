import React, { Component } from 'react';
import { Row, Col, Card, Spin, Form, Button, message } from 'antd';
import { FormItemInputNumber, FormItemSlider, FormItemSelect, FormItemSelectInput } from '../CustomInput';

// Onvif API
import { 
    GetImagingSettings,
    SetImagingSettings
} from '../../onvif/';

const FormItem = Form.Item;

class ImageSettings extends Component{
    constructor(props){
        super(props);
        this.state ={
            BacklightCompensation: {
                mode: '',
                level: 0
            },
            Brightness: 0,
            ColorSaturation: 0,
            Contrast: 0,
            Exposure: 0,
            IrCutFilter: '',
            Sharpness: 0,
            WideDynamicRange: {
                mode: '',
                level: 0
            },

            isModified: false,
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            let data = await GetImagingSettings( 0 );

            this.setState({
                ...data,
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
                
                await SetImagingSettings( this.state.data, values );
                
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
        
        let settings = [{
            label: 'Backlight Compensation',
            id: 'backlight_compensation',
            value: this.state.BacklightCompensation.level,
            min: 0,
            max: 255
        },{
            label: 'Brightness',
            id: 'brightness',
            value: this.state.Brightness,
            min: 0,
            max: 100
        },{
            label: 'Color Saturation',
            id: 'color_saturation',
            value: this.state.ColorSaturation,
            min: 0,
            max: 100
        },{
            label: 'Contrast',
            id: 'contrast',
            value: this.state.Contrast,
            min: 0,
            max: 100
        },{
            label: 'Sharpness',
            id: 'sharpness',
            value: this.state.Sharpness,
            min: 0,
            max: 63
        }];

        const ircut_options = [{
            value: '0',
            name: 'ON'
        },{
            value: '1',
            name: 'OFF'
        },{
            value: '2',
            name: 'AUTO'
        }];
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Image Settings</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row gutter={16}>
                        <Col span={12} offset={6}>
                            <Card>
                                <FormItemSelect 
                                    label='IrCut Filter' 
                                    id='ircut_filter' 
                                    showSearch={true} 
                                    value={ this.state.IrCutFilter } 
                                    options={ ircut_options } 
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
                                        enable: this.state.WideDynamicRange.mode === 'ON' ? true : false, 
                                        content: this.state.WideDynamicRange.level
                                    }} 
                                    min={0}
                                    max={4095}
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.deliver.bind(this)}/>
                                {
                                    settings.map((s, index) => (
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

                    <FormItem className='submit' wrapperCol={{ span: 2, offset: 14 }} style={{marginTop: 20}}>
                        <Button type="primary" htmlType="submit" disabled={!isModified}>Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default ImageSettings = Form.create()(ImageSettings);