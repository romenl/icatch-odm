import React, { Component } from 'react';
import { Select } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import koKR from 'antd/lib/locale-provider/ko_KR';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import cookie from 'react-cookie';

const { Option } = Select;

const localeOptions = [
  <Option value="en" key="en">English</Option>,
  <Option value="zh-tw" key="zh-tw">繁體中文</Option>,
  <Option value="zh-cn" key="zh-cn">简体中文</Option>,
  <Option value="ko" key="ko">한국어</Option>,
  <Option value="ja" key="js">日本語</Option>
];

export default class LocaleSelector extends Component {
    constructor(props){
        super(props);
        this.state={
            locale: cookie.load('usrLocale') || 'en',
        }
    }
    componentDidMount(){
        const { onChange } = this.props;
        const { locale } = this.state;
        const selectedLocale = this.selectedLocale( locale );

        // init locale select from cookie.
        onChange( selectedLocale );
    }
    handleChange(value){
        const { onChange } = this.props;
        const selectedLocale = this.selectedLocale( value );

        onChange( selectedLocale );        
        cookie.save('usrLocale', value, {path: '/'});
    }
    
    /**
     * Trans selected locale to locale-provider Object.
     * 
     * @param {string} [value='en'] 
     *
     * @memberOf LocaleSelector
     */
    selectedLocale( value='en' ){
        switch(value){
            case 'en':
                return enUS;
            case 'zh-tw':
                console.log('繁體中文');
                return {} ;
            case 'zh-cn':
                return {} ;             
            case 'ko':
                return koKR;
            case 'ja':
                return jaJP;
            default:
                return {};
        }
    }
    render() {
        const { locale } = this.state;
        const { style } = this.props;

        return (
            <Select
              showSearch
              style={ style }
              placeholder="Choose language"
              defaultValue={ locale }
              optionFilterProp="children"
              onChange={this.handleChange.bind(this)}
              filterOption={(input, option) => 
                  option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              { localeOptions }
            </Select>
        );
    }
}