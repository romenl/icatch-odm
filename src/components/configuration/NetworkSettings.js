import React, { Component } from 'react';
import update from 'react/lib/update';
import { Spin, Form, Tabs, Button } from 'antd';
import { FormItemInput, FormItemIPInput, FormItemSwitch } from '../CustomInput';

// Onvif API
import { 
    GetHostname, 
    GetNetworkInterfaces, 
    GetDNS
} from '../../onvif/';

const FormItem = Form.Item,
      TabPane = Tabs.TabPane;

class NetworkSettings extends Component{
    constructor(props){
        super(props);
        this.state ={
            hostname: '',
            zero_config: false,
            ni_uuid:0,
            networkinterface:[],
            dns_uuid:0,
            dns: [],
            ni_activeKey:'0',
            dns_activeKey:'0',
            spin_tip: 'Loading ...',
            isSpinning: true
        };
    }
    async refreshInformation() {
        try {
            let { ni_uuid, dns_uuid } = this.state;

            // Get Information from devise.
            let data = await Promise.all([ GetHostname(), GetNetworkInterfaces(), GetDNS() ]);
            let hostname = data[0],
                ni = data[1],
                dns_info = data[2];

            // DHCP, IP Address, Subnet mask
            let networkinterface = [];
            ni.forEach((n) => {
                let dhcp = n.IPv4.Config.DHCP.v;
                let ip = n.IPv4.Config.FromDHCP.Address.v.split('.');
                let subnet_mask = n.IPv4.Config.FromDHCP.PrefixLength.v;
                subnet_mask = this.calSubnetMask( subnet_mask );

                networkinterface.push({
                    key: ni_uuid++,
                    dhcp,
                    ip_address: {
                        '1': ip[0],
                        '2': ip[1],
                        '3': ip[2],
                        '4': ip[3]
                    },
                    subnet_mask: {
                        '1': subnet_mask[0],
                        '2': subnet_mask[1],
                        '3': subnet_mask[2],
                        '4': subnet_mask[3]
                    }
                });
            });

            // DNS
            let dns = [];
            dns_info.forEach((d) => {
                let address = d.IPv4Address.v.split('.');

                dns.push({
                    key: dns_uuid++,
                    address:{
                        '1': address[0],
                        '2': address[1],
                        '3': address[2],
                        '4': address[3]
                    }
                })
            });

            this.setState({
                hostname,
                ni_uuid,
                networkinterface,
                dns_uuid,
                dns,
                isSpinning: false
            });
        } catch(e) {
            console.log( '[ERROR] ', e );
        }
    }
    componentDidMount(){
        this.refreshInformation();
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    spin_tip: 'Saving ...',
                    isSpinning: true
                });
                console.log(values);
                // Close Spinning
                setTimeout(() => {
                    this.setState({ isSpinning: false });
                }, 500);
            }
        });
    }
    handleChangeNI( key ) {
        this.setState({
            ni_activeKey: key
        });
    }
    handleChangeDNS( key ) {
        this.setState({
            dns_activeKey: key
        });
    }
    handleEditNI(key, action){
        this[`${action}`](key, 'networkinterface');
    }
    handleEditDNS(key, action){
        this[`${action}`](key, 'dns');
    }
    add(key, target) {
        if ( target === 'networkinterface' )
        {
            let { ni_uuid } = this.state
            ni_uuid++;

            this.setState( update( this.state, {
                ni_activeKey: {
                    $set: ni_uuid.toString()
                },
                ni_uuid: {
                    $set: ni_uuid
                },
                networkinterface: {
                    $push: [{
                        key: ni_uuid,
                        dhcp: true,
                        ip_address: {
                            '1': 0,
                            '2': 0,
                            '3': 0,
                            '4': 0
                        },
                        subnet_mask: {
                            '1': 0,
                            '2': 0,
                            '3': 0,
                            '4': 0
                        }
                    }]
                }
            }));
        }
        else {
            let { dns_uuid } = this.state;
            dns_uuid++;

            this.setState( update( this.state, {
                dns_activeKey: {
                    $set: dns_uuid.toString()
                },
                dns_uuid: {
                    $set: dns_uuid
                },
                dns: { 
                    $push: [{
                        key: dns_uuid,
                        address: {
                            '1': 0,
                            '2': 0,
                            '3': 0,
                            '4': 0
                        }
                    }]
                }
            }));
        }
            
    }
    remove( key, target ){
        let _target = this.state[ target ];
        
        _target = _target.filter( (t) => (
            t.key.toString() !== key
        ));
        
        let pre = _target[_target.length - 1].key.toString();
        
        if ( target === 'networkinterface' ){
            this.setState({
                ni_activeKey: pre,
                networkinterface: _target
            });
        }
        else{
            this.setState({
                dns_activeKey: pre,
                dns: _target
            });
        }
    }
    
    squar( v ) {
        return Math.pow( 2, v - 1 );
    }
    calSubnetMask( prefix ) {  
        let arr = [],
            ans = 0;
        
        for ( let a = 8 ; prefix >= 0 ; prefix-- ){
            if( a === 0 || prefix === 0){
                a = 8;
                arr.push(ans);
                ans = 0;
            }
            
            ans += this.squar(a);
            a--;
            
        }
        
        for( let len = arr.length ; len < 4 ; len++ )
            arr.push( 0 );

        return arr;
    }
    render() {
        const { networkinterface, hostname, dns, ni_activeKey, dns_activeKey, spin_tip, isSpinning } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        
        return (
            <Spin tip={ spin_tip } spinning={ isSpinning }>
                <h1>Network Settings</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItemInput label='Hostname' id='hostname' value={ hostname } placeholder='localhost' layout={formItemLayout} decorator={getFieldDecorator} />
                    
                    <Tabs activeKey={ ni_activeKey } type="editable-card" onChange={ this.handleChangeNI.bind(this) } onEdit={this.handleEditNI.bind(this)}>
                    {
                        networkinterface.map((n, index) => (
                            <TabPane tab={ `${index + 1}` } key={ `${ n.key }` } closable={ index === 0 ? false : true }>
                                <FormItemSwitch label='Zero Config' id={ `zero_config_${ n.key }` } layout={formItemLayout} decorator={getFieldDecorator} />
                                <FormItemSwitch label='DHCP' id={ `dhcp_${ n.key }` } value={ n.dhcp } layout={formItemLayout} decorator={getFieldDecorator} />
                                <FormItemIPInput label='IP Address' id={ `ip_address_${ n.key }` } value={ n.ip_address } layout={formItemLayout} decorator={getFieldDecorator} />
                                <FormItemIPInput label='Subnet mask' id={ `subnet_mask_${ n.key }` } value={ n.subnet_mask } layout={formItemLayout} decorator={getFieldDecorator} />
                            </TabPane>
                        ))
                    }
                    </Tabs>
                    
                    <Tabs activeKey={ dns_activeKey } type="editable-card" onChange={ this.handleChangeDNS.bind(this) } onEdit={this.handleEditDNS.bind(this)}>
                    {
                        dns.map((d, index) => (
                            <TabPane tab={ `${index + 1}` } key={ `${ d.key }` } closable={ index === 0 ? false : true }>
                                <FormItemIPInput label='Default gateway' id={ `default_gateway_${ d.key }` } layout={formItemLayout} decorator={getFieldDecorator} />
                                <FormItemIPInput label='DNS' id={ `dns_${ d.key }` } value={ d.address } layout={formItemLayout} decorator={getFieldDecorator} />
                            </TabPane>
                        ))
                    }
                    </Tabs>

                    <FormItem className='submit' wrapperCol={{ span: 2, offset: 14 }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default NetworkSettings = Form.create()(NetworkSettings);