import axios from 'axios';
import objectAssign from 'object-assign';

import Config from '../../config/config';
import Helper from './helper';

class ApiCallHelper {
  constructor() {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  _setCallUrl(endpoint, data = {}) {
    const searchData = Helper.parametrizeObject(data);
    const basicUrl = endpoint.indexOf('http') === 0 ?
      endpoint : `${Config.githubApi}/${endpoint}`;

    return searchData !== '' ? `${basicUrl}?${searchData}` : basicUrl;
  }

  _setHeaders(apiToken = true) {
    return !apiToken ? this.headers :
      objectAssign({}, this.headers, {
        Authorization: `Bearer ${window.localStorage['accessToken']}`,
      });
  }

  get(endpoint, data = {}, apiToken = true) {
    const callUrl = this._setCallUrl(endpoint, data);
    const headers = this._setHeaders(apiToken);

    return new Promise((resolve, reject) => {
      axios
        .get(callUrl, { headers })
        .then((res) => { resolve(res.data); })
        .catch((err) => { reject(err); })
    });
  }

  post(endpoint, data = {}, apiToken = true) {
    const callUrl = this._setCallUrl(endpoint);
    const headers = this._setHeaders(apiToken);

    return new Promise((resolve, reject) => {
      axios
        .post(callUrl, data, { headers })
        .then((res) => { resolve(res.data); })
        .catch((err) => { reject(err); });
    });
  }

  patch(endpoint, data = {}, apiToken = true) {
    const callUrl = this._setCallUrl(endpoint);
    const headers = this._setHeaders(apiToken);

    return new Promise((resolve, reject) => {
      axios
        .patch(callUrl, data, { headers })
        .then((res) => { resolve(res.data); })
        .catch((err) => { reject(err); });
    });
  }

  delete(endpoint, apiToken = true) {
    const callUrl = this._setCallUrl(endpoint);
    const headers = this._setHeaders(apiToken);

    return new Promise((resolve, reject) => {
      axios
        .delete(callUrl, { headers })
        .then((res) => { resolve(res.data); })
        .catch((err) => { reject(err); });
    });
  }
}

export default ApiCallHelper;
