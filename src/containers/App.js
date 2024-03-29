import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Redirect } from 'react-router-dom'
import enUS from 'antd/lib/locale-provider/en_US';
import cookie from 'react-cookie';

import { PrimaryPage, LoginPage } from '../pages/';
import { LocaleSelector } from '../components/tools/';

class App extends Component {
  constructor(props){
    super(props);

    const isAuthenticated = cookie.load('usrLogin') || false;
    this.state={
      isAuthenticated: isAuthenticated,
      localeProvider: enUS
    }
  }
  handleLocaleChange(value){
    this.setState({ localeProvider: value });
  }
  handleLogin(value){
    this.setState({ isAuthenticated: value });
  }
  render() {
    const { isAuthenticated, localeProvider } = this.state;
    const routes={
      root: '/',
      web: '/web',
      login: '/login'
    }

    return (
      <Router basename={ routes.web }>
        <div>          
          <Route path={ routes.root } render={
            ({ match, location }) => ( 
              isAuthenticated ?
              <PrimaryPage match={match} localeProvider={localeProvider} /> :
              <Redirect to={{
                pathname: routes.login,
                state: {from: location}
              }} />
            )} />
          <Route path={ routes.login } render={
            ({ location }) => (
              !isAuthenticated ?
              <LoginPage location={location} onLogin={this.handleLogin.bind(this)} /> :
              <Redirect to={ routes.root } />
            )} />

          <LocaleSelector
              onChange={this.handleLocaleChange.bind(this)}
              style={{ position: 'fixed', bottom: 24, right: 50,width: 120 }} />
        </div>
      </Router>
    );
  }
}

export default App;
