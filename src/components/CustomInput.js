import React, { Component } from 'react';
import { Modal, Form, Input, Select, Switch, Radio, DatePicker } from 'antd';
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
            const value = nextProps.value;
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
            enable: value.enable || 'disable',
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
        if (!('value' in this.props))
            this.setState({ enable: value });

        this.triggerChange({ enable: value });
    }

    render(){
        const state = this.state;
        return(
            <Input 
                value={state.content}
                style={{width:'100%', textAlign:'center'}}
                disabled={state.enable === 'disable' ? true : false}
                onChange={this.handleContentChange.bind(this)}
                addonBefore={
                    <Select
                        value={state.enable}
                        style={{ width: 80 }}
                        onChange={this.handleEnableChange.bind(this)}>
                        <Option value="enable">Enable</Option>
                        <Option value="disable">Disable</Option>
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
        if (value && value !== form.getFieldValue('user_password')) {
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
            name: 'Operator',
            value: 'operator'
        },{
            name: 'User',
            value: 'user'
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
                        label='User name' id='user_name' value={ modify_user.name } placeholder='user name' layout={formItemLayout} decorator={getFieldDecorator} 
                        rules={[{
                            required: true, message: 'Please input user name!'
                        }]}/>

                    <FormItemSelect 
                        label='User level' id='user_level' value={ modify_user.level !== '' ? modify_user.level : 'operator' } options={ userlevels } layout={formItemLayout} decorator={getFieldDecorator}/>

                    <FormItemInput 
                        label='User password' id='user_password' type='password' hasFeedback={true} layout={formItemLayout} decorator={getFieldDecorator}
                        rules={[{
                            required: true, message: 'Please input user password!'
                        },{
                            validator: this.checkConfirm.bind(this),
                        }]}/>
                    <FormItemInput 
                        label='Password confirm' id='password_confirm' type='password' hasFeedback={true} layout={formItemLayout} decorator={getFieldDecorator}
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
                type='text',
                hasFeedback=false, 
                disabled=false,
                placeholder,
                rules,
                onBlur,
                value } = this.props;

        return (
            <FormItem label={ label } hasFeedback={hasFeedback} {...layout} colon={false}>
            { decorator(id, { 
                valuePropName: 'value', 
                initialValue: value,
                rules:rules
            })( <Input type={ type } placeholder={ placeholder } disabled={ disabled } onBlur={ onBlur } style={{textAlign:'center'}} /> ) }
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
    render(){
        const { label, layout, id, decorator, 
                value={enable: 'disable', content: '80'} } = this.props;

        return (
            <FormItem label={label} {...layout} colon={false}>
                {decorator( id, {
                    initialValue: {...value}
                })(<SelectInput />)}
            </FormItem>
        );
    }
}

class FormItemSwitch extends Component {
    render(){
        const { label, layout, id, decorator,
                value=false } = this.props;

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
                    <Select showSearch={showSearch}>
                        {
                            options.map((opt)=>(
                                <Option key={opt.value} value={ opt.value }>{ opt.name }</Option>
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


const FormItemUserModal = Form.create()(UserModal);

export {
    FormItemInput,
    FormItemIPInput, 
    FormItemSelectInput,
    FormItemSwitch,
    FormItemRadio,
    FormItemSelect,
    FormItemDatePicker,
    FormItemUserModal
} ;