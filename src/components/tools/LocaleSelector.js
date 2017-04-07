import React, { Component } from 'react';
import { Select } from 'antd';
import cookie from 'react-cookie';

const { Option } = Select;

const localeOptions = [
  <Option value="en-gb" key="en-gb">English</Option>,
  <Option value="zh-tw" key="zh-tw">繁體中文</Option>,
  <Option value="zh-cn" key="zh-cn">简体中文</Option>,
  <Option value="ko" key="ko">한국어</Option>,
  <Option value="ja" key="js">日本語</Option>
];

export default class LocaleSelector extends Component {
    constructor(props){
        super(props);
        this.state={
            locale: cookie.load('usrLocale') || 'en-gb'
        }
    }
    handleChange(value){
        this.setState({
            locale: value
        }, cookie.save('usrLocale', value, { path: '/' }));
    }
    render() {
        const { style } = this.props;
        const { locale } = this.state;

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