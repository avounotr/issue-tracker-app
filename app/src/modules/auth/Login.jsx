import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Config from '../../../config/config';
import Helper from '../../utils/helper';
import ApiCallHelper from '../../utils/api_call_helper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.apiCall = new ApiCallHelper();
    const oathUrl = 'https://github.com/login/oauth/authorize';
    this.loginUrl = `${oathUrl}?scope=${Config.loginScope}&client_id=${Config.clientId}`;
  }

  componentWillMount() {
    const searchParams = Helper.windowParams();
    const code = searchParams.get('code');
    this.loading = false;

    if (Helper.variableExists(code)) {
      this.loading = true;
      this.apiCall.get(`${Config.issueTrackerApi}/access_token`, { code }, false)
        .then((res) => {
          window.localStorage.setItem('accessToken', res.accessToken);
          Helper.goto();
        })
        .catch((error) => {
          Helper.goto();
        });
    }
  }

  render() {
    return this.loading ?
      ( <div> Loading... </div> ) :
      ( <div id="login">
          <a href={this.loginUrl}>
            <Button bsStyle="success" bsSize="large"> Login! </Button>
          </a>
        </div>
      );
  }
}

export default Login;
