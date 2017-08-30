import React, { Component } from 'react';
import update from 'react/lib/update';
import { Row, Col, Spin, Card , Form, Button, message } from 'antd';
import { FormItemSelect, FormItemSlider, FormColorPicker, FormItemInputNumber } from '../CustomInput';

// Onvif API
import { 
    GetOSDOptions,
    GetOSDs,
    SetOSD
} from '../../onvif/';

const FormItem = Form.Item;

class OSDSettings extends Component{
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
                GetOSDOptions(0),
                GetOSDs(0)
            ]);
            
            this.setState({
                options: data[0],
                settings: data[1][0],
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
            background_color: {
                color: {r: 0, g: 0, b: 0, a: 0.6}
            },
            dateformat: "yyyy/MM/dd",
            font_color: {
                color:{r: 255, g: 255, b: 255, a: 1}
            },
            font_size: 40,
            position_type: "UpperLeft",
            position_x: 0,
            position_y: 0,
            text_type:"DateAndTime",
            timeformat:"HH:mm:ss"
        };

        this.deliver('Reset Default ...', 'Reset your configuration.', defaultSettings);

        this.props.form.setFieldsValue(defaultSettings);
        this.handlePositionChange();
    }
    handlePositionChange(){
        const type = this.props.form.getFieldValue('position_type');
        
        if ( this.state.settings )
            this.setState( update( this.state, {
                settings: {
                    Position: { 
                        Type: { $set: type }
                    }
                }
            }));
        
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
                
                await SetOSD( this.setSettings( reset, values ) );
                
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
        
        // Position
        settings.Position.Type.v = nextSettings.position_type;
        settings.Position.Pos.x.v = nextSettings.position_x ? parseInt(nextSettings.position_x, 10) : 0;
        settings.Position.Pos.y.v = nextSettings.position_y ? parseInt(nextSettings.position_y, 10) : 0;
        // TextString
        settings.TextString.Type.v = nextSettings.text_type;
        settings.TextString.DateFormat.v = nextSettings.dateformat;
        settings.TextString.TimeFormat.v = nextSettings.timeformat;
        settings.TextString.FontSize.v = nextSettings.font_size;

        settings.TextString.FontColor.Color.X.v = nextSettings.font_color.color.r;
        settings.TextString.FontColor.Color.Y.v = nextSettings.font_color.color.g;
        settings.TextString.FontColor.Color.Z.v = nextSettings.font_color.color.b;
        settings.TextString.FontColor.Transparent.v = parseInt(nextSettings.font_color.color.a * 255, 10);

        settings.TextString.BackgroundColor.Color.X.v = nextSettings.background_color.color.r;
        settings.TextString.BackgroundColor.Color.Y.v = nextSettings.background_color.color.g;
        settings.TextString.BackgroundColor.Color.Z.v = nextSettings.background_color.color.b;
        settings.TextString.BackgroundColor.Transparent.v = parseInt(nextSettings.background_color.color.a * 255, 10);
        
        return settings;
    }
    render() {
        const { spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        
        const { options, settings } = this.state;

        const fontColor = settings ? {
            r: settings.TextString.FontColor.Color.X,
            g: settings.TextString.FontColor.Color.Y,
            b: settings.TextString.FontColor.Color.Z,
            a: settings.TextString.FontColor.Transparent
        } : {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        };
        const bgColor = settings ? {
            r: settings.TextString.BackgroundColor.Color.X,
            g: settings.TextString.BackgroundColor.Color.Y,
            b: settings.TextString.BackgroundColor.Color.Z,
            a: settings.TextString.BackgroundColor.Transparent
        } : {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        };

        const costum_pos = (settings && settings.Position.Type === 'Custom') ? true : false;
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>OSD Settings</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Position</h3>}>
                                <FormItemSelect 
                                    label='Type' 
                                    id='position_type' 
                                    value={ settings ? settings.Position.Type : 'NaN' } 
                                    options={ options ? options.PositionOption : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    onChange={this.handlePositionChange.bind(this)}
                                />                            
                                <FormItemInputNumber
                                    label='X' 
                                    id='position_x' 
                                    value={ settings ? settings.Position.Pos.x : 0 } 
                                    disabled={!costum_pos}
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    min={0}
                                />
                                <FormItemInputNumber
                                    label='Y' 
                                    id='position_y' 
                                    value={ settings ? settings.Position.Pos.y : 0 } 
                                    disabled={!costum_pos}
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                    min={0}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Format</h3>}>
                                <FormItemSelect 
                                    label='Text Type'
                                    id='text_type' 
                                    value={ settings ? settings.TextString.Type : 'NaN' } 
                                    options={ options ? options.TextOption.Type : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                />
                                <FormItemSelect 
                                    label='Date Format' 
                                    id='dateformat' 
                                    value={ settings ? settings.TextString.DateFormat : 'NaN' } 
                                    options={ options ? options.TextOption.DateFormat : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                />
                                <FormItemSelect 
                                    label='Time Format' 
                                    id='timeformat' 
                                    value={ settings ? settings.TextString.TimeFormat : 'NaN' } 
                                    options={ options ? options.TextOption.TimeFormat : [{value: 0, name: 'NaN'}] } 
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={<h3 style={{textAlign: 'center'}}>Style</h3>}>
                                <FormItemSlider 
                                    label='Font Size'
                                    id='font_size'
                                    value={ settings ? settings.TextString.FontSize : 12 }
                                    min={ options ? options.TextOption.FontSizeRange.Min : 12 }
                                    max={ options ? options.TextOption.FontSizeRange.Max : 40 }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                />
                                <FormColorPicker
                                    label='Font Color'
                                    id='font_color'
                                    value={ fontColor }
                                    layout={formItemLayout} decorator={getFieldDecorator}
                                />
                                <FormColorPicker
                                    label='Background Color'
                                    id='background_color'
                                    value={ bgColor }
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

export default OSDSettings = Form.create()(OSDSettings);