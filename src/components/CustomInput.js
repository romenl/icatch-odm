import React, { Component } from 'react';
import { 
    Modal, Form, 
    Input, InputNumber, Select, Switch, Slider, Radio, 
    DatePicker, Button, Upload, Icon, 
    message 
} from 'antd';
import moment from 'moment';

const FormItem    = Form.Item,
      InputGroup  = Input.Group,
      Option      = Select.Option,
      RadioButton = Radio.Button,
      RadioGroup  = Radio.Group;

/* =============== Custom Input Components =============== */

class CustomInputComponent extends Component {
    componentWillReceiveProps(nextProps){
        if( 'value' in nextProps ){
            const value = {...nextProps.value};
            this.setState(value);
        }
    }
    triggerChange( changeValue ){
        const onChange = this.props.onChange;
        
        if (onChange)
            onChange(Object.assign({}, this.state, changeValue));
    }
    
}

class IPInput extends CustomInputComponent {
    constructor(props){
        super(props);
        
        const value = this.props.value || {};

        this.state = {
            '1': value['1'] || 0,
            '2': value['2'] || 0,
            '3': value['3'] || 0,
            '4': value['4'] || 0     
        };
    }
    handleChange(e){
        const target = e.target;
        const value = parseInt(target.value || 0, 10);
        const name   = target.name;

        if (isNaN(value))
            return;

        if (!('value' in this.props))
            this.setState({ [name]: value });

        this.triggerChange({ [name]: value });
    }
    render(){
        const { disabled } = this.props;
        const state = this.state;
        return(
            <InputGroup>
            {
                Object.keys(state).map((s) => (
                    <Input 
                        key={s}
                        name={s}
                        value={state[s]}
                        disabled={disabled}
                        style={{width:'25%', textAlign:'center'}}
                        onChange={this.handleChange.bind(this)}
                    />
                ))
            }                
            </InputGroup>            
        );
    }
}

class SelectInput extends CustomInputComponent {
    constructor(props){
        super(props);
        
        const value = this.props.value || {};

        this.state = {
            enable: value.enable || false,
            content: value.content || '80'
        };
    }
    handleContentChange(e){
        const value = parseInt(e.target.value || 0, 10);
        
        if (isNaN(value))
            return;

        if (!('value' in this.props))
            this.setState({ content: value });

        this.triggerChange({ content: value });
    }
    handleEnableChange(value){
        value = value === 'enable' ? true : false;
        
        if (!('value' in this.props))
            this.setState({ enable: value });

        this.triggerChange({ enable: value });
    }

    render(){
        let { enable, content } = this.state;
        enable = enable ? 'enable' : 'disable';

        const { options } = this.props;
        
        return(
            <Input 
                value={ content }
                style={{width:'100%', textAlign:'center'}}
                disabled={ enable === 'disable' ? true : false }
                onChange={this.handleContentChange.bind(this)}
                addonBefore={
                    <Select
                        value={ enable }
                        style={{ width: 80 }}
                        onChange={this.handleEnableChange.bind(this)}>
                        <Option value='enable'>{ options ? options.on : 'Enable' }</Option>
                        <Option value='disable'>{ options ? options.off : 'Disable' }</Option>
                    </Select>
                }
            />
        );
    }
}

class UserModal extends Component {
    constructor(props){
        super(props);
        this.state={
            confirmLoading: false,
            confirmDirty: false
        };
    }
    handleOk(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                confirmLoading: true
                });
                
                setTimeout(() => {
                    this.setState({
                        confirmLoading: false,
                    });
                    this.props.onOk(e);
                }, 1500);
            }
        });
    }
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback){
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
        form.validateFields(['password_confirm'], { force: true });
        }
        callback();
    }
    render(){
        const { title, visible, modify_user, onCancel } = this.props;
        const { confirmLoading } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        const userlevels = [{
            name: 'Administrator',
            value: 'Administrator'
        },{
            name: 'Operator',
            value: 'Operator'
        },{
            name: 'User',
            value: 'User'
        }];

        return (
            <Modal 
                title={ title }
                visible={ visible }
                confirmLoading={ confirmLoading }
                onOk={ this.handleOk.bind(this) }
                onCancel={ onCancel } >
                <Form>
                    <FormItemInput 
                        label='User name' id='name' value={ modify_user.name } placeholder='User Name' layout={formItemLayout} decorator={getFieldDecorator} 
                        rules={[{
                            required: true, message: 'Please input user name!'
                        }]}/>

                    <FormItemSelect 
                        label='User level' id='level' value={ modify_user.level !== '' ? modify_user.level : 'Operator' } options={ userlevels } layout={formItemLayout} decorator={getFieldDecorator}/>

                    <FormItemInput 
                        label='User password' id='password' type='password' hasFeedback={true} placeholder='User Password' layout={formItemLayout} decorator={getFieldDecorator}
                        rules={[{
                            required: true, message: 'Please input user password!'
                        },{
                            validator: this.checkConfirm.bind(this),
                        }]}/>
                    <FormItemInput 
                        label='Password confirm' id='password_confirm' type='password' hasFeedback={true} placeholder='Confirm User Password' layout={formItemLayout} decorator={getFieldDecorator}
                        onBlur={this.handleConfirmBlur.bind(this)}
                        rules={[{
                            required: true, message: 'Please confirm the password!'
                        },{
                            validator: this.checkPassword.bind(this)
                        }]}/>
                </Form>
            </Modal>
        );
    }
}

/* =============== Package as FormItem =============== */

class FormItemInput extends Component {
    render(){
        const { label, id, layout, decorator, 
                hasFeedback=false, 
                rules,
                type='text',
                disabled=false,
                placeholder,
                prefix,
                onBlur,
                value } = this.props;

        return (
            <FormItem label={ label } hasFeedback={hasFeedback} {...layout} colon={false}>
            { decorator(id, { 
                valuePropName: 'value', 
                initialValue: value,
                rules:rules
            })( 
                prefix ?
                <Input type={ type } placeholder={ placeholder } disabled={ disabled } prefix={ prefix } onBlur={ onBlur } />
                :
                <Input type={ type } placeholder={ placeholder } disabled={ disabled } onBlur={ onBlur } style={{textAlign:'center'}} /> 
            )}
            </FormItem>
        );
    }
}

class FormItemInputNumber extends Component {
    render(){
        const { label, id, layout, decorator, 
                hasFeedback=false,
                placeholder,
                min, max, value } = this.props;

        return (
            <FormItem label={ label } hasFeedback={hasFeedback} {...layout} colon={false}>
            { decorator(id, { 
                valuePropName: 'value', 
                initialValue: value
            })( <InputNumber min={min} max={max} placeholder={ placeholder }/> )}
            </FormItem>
        );
    }
}

class FormItemIPInput extends Component {

    validateIP(rule, value, callback) {
        for( let k of Object.keys(value) ){
            if (value[k] < 0 || value[k] > 255)
                callback('Out of range, please check. (0 - 255)');
        }
        
        callback();
    }
    render(){
        const { label, id, layout, decorator,
                disabled = false,
                value={'1': 0, '2': 0, '3': 0, '4': 0} } = this.props;

        return (        
            <FormItem label={label} {...layout} colon={false}>
                {decorator( id, {
                    initialValue: {...value},
                    rules: [{ validator: this.validateIP }]
                })(<IPInput disabled={ disabled } />)}
            </FormItem>        
        );
    }
}

class FormItemSelectInput extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            error: false,
            msg: ''
        };
    }
    handleChange( value ){
        const { onChange } = this.props;
        
        if( onChange && this.validate( value ) )
            setTimeout(()=>{onChange();}, 250);
    }
    validate(value) {
        const { min=0, max=65535 } = this.props;
        
        if (value.content < min || value.content > max){
            this.setState({
                error: true,
                msg: `Out of range, please check. (${min} - ${max})`
            });

            return false;
        }
        else{
            this.setState({ error: false, msg: '' });

            return true;
        }
    }
    render(){
        const { label, layout, id, decorator,
                options,
                value={enable: false, content: 80} } = this.props;

        const { error, msg } = this.state;
        return (
            <FormItem label={label} {...layout} colon={false} validateStatus={ error ? 'error' : '' } help={ msg }>
                {decorator( id, {
                    initialValue: {...value}
                })(<SelectInput options={options} onChange={this.handleChange.bind(this)}/>)}
            </FormItem>
        );
    }
}

class FormItemSwitch extends Component {
    render(){
        const { label, layout, id, decorator } = this.props;

        let { value=false } = this.props;
        
        if ( value === 'ON' )
            value = true;
        else 
            value = false;


        return (        
            <FormItem label={ label } {...layout} colon={false}>
                { decorator(id, {
                    valuePropName: 'checked',
                    initialValue :  value
                })( <Switch /> ) }
            </FormItem>
        );
    }
}

class FormItemRadio extends Component {
    render(){
        const { label, layout, id, decorator,
                options=[{value:true, content:'Enable'}, {value:false, content:'Disable'}],
                value=false } = this.props;

        return (        
            <FormItem label={ label } {...layout} colon={false}>
                { decorator( id, {
                    valuePropName: 'value',
                    initialValue :  value
                })( 
                    <RadioGroup>
                    {
                        options.map((opt) => 
                            <RadioButton value={opt.value} key={opt.value}>{ opt.content }</RadioButton>
                        )
                    }
                    </RadioGroup>
                )}
            </FormItem>      
        );
    }
}

class FormItemSelect extends Component {
    handleChange(){
        const { onChange } = this.props;
        if (onChange)
            setTimeout(()=>{onChange();}, 250);
    }
    render(){
        const { label, layout, id, decorator,
                showSearch = false,
                options=[{}],
                value } = this.props;
        return (        
            <FormItem label={ label } {...layout} colon={false}>
                { decorator( id, {
                    valuePropName: 'value',
                    initialValue :  value
                })( 
                    <Select showSearch={showSearch} onChange={this.handleChange.bind(this)}>
                        {
                            options.map((opt)=>(
                                <Option key={opt.value} value={ opt.name }>{ opt.name }</Option>
                            ))
                        }
                    </Select>
                 )}
            </FormItem>      
        );
    }
}

class FormItemDatePicker extends Component {
    render(){
        const { label, layout, id, decorator,
                showTime = true,
                disabled = false,
                value=moment() } = this.props;

        return (        
            <FormItem label={ label } {...layout} colon={false}>
                { decorator(id, {
                    valuePropName: 'value',
                    initialValue :  value
                })(
                    <DatePicker
                            disabled={disabled}
                            showTime={showTime}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Time" />
                ) }
            </FormItem>
        );
    }
}

class FormItemUpdateFirmware extends Component {
    constructor(props){
        super(props);
        this.state={
            disabled: true
        };
    }
    handleChange(info){
        if (info.file.status !== 'uploading')
            if ( info.fileList.length > 0 )
                this.setState({disabled: false});
            else
                this.setState({disabled: true});

        if (info.file.status === 'done')
            message.success(`${info.file.name} file uploaded successfully`);
        else if (info.file.status === 'error'){
            message.error(`${info.file.name} file upload failed.`);
            this.setState({disabled: true});
        }
    }
    handleClick(){
        const { onClick } = this.props;
        
        if ( onClick )
            onClick();
    }
    render(){
        const { label, layout, id, decorator, loading } = this.props;
        const { disabled } = this.state;

        const settings = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            }
        };

        return (        
            <FormItem label={ label } {...layout} colon={false}>
                { decorator(id, {
                })(
                    <div>
                        <Upload {...settings} onChange={this.handleChange.bind(this)}>
                            <Button type='dashed'>
                                <Icon type="upload" /> Click to upload firmware
                            </Button>
                        </Upload>
                        <Button type='primary' loading={ loading } disabled={ disabled } onClick={this.handleClick.bind(this)}>update</Button>
                    </div>
                ) }
            </FormItem>
        );
    }
}

class FormItemButtom extends Component {
    handleClick(){
        const { onClick } = this.props;

        if ( onClick )
            onClick();
    }
    render(){
        const { label, layout,
                type,
                loading=false,
                context } = this.props;

        return (        
            <FormItem label={ label } {...layout} colon={false}>
                <Button type={ type } loading={ loading } onClick={this.handleClick.bind(this)}>{ context }</Button>
            </FormItem>
        );
    }
}

class FormItemSlider extends Component {
    handleChange(){
        const { onChange } = this.props;
        if (onChange)
            onChange();
    }
    render(){
        const { label, layout, id, decorator,
                min, max, marks, step,
                value } = this.props;

        return (        
            <FormItem label={ label } {...layout} colon={false}>
                { decorator(id, {
                    initialValue :  value
                })( 
                    <Slider 
                        min={min} 
                        max={max} 
                        step={step ? step : 1}
                        marks={marks ? marks : { [min]: min, [max]: max }} 
                        onAfterChange={this.handleChange.bind(this)}/>
                ) }
            </FormItem>
        );
    }
}


const FormItemUserModal = Form.create()(UserModal);

export {
    FormItemInput,
    FormItemInputNumber,
    FormItemIPInput, 
    FormItemSelectInput,
    FormItemSwitch,
    FormItemRadio,
    FormItemSelect,
    FormItemDatePicker,
    FormItemUserModal,
    FormItemButtom,
    FormItemUpdateFirmware,
    FormItemSlider
} ;