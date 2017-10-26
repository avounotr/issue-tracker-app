class Helper {
  static variableExists(variable) {
    return variable !== undefined && variable !== null && variable !== '';
  }

  static parametrizeObject(jsonObject) {
    return Object.keys(jsonObject).map(key =>
      encodeURIComponent(key) + '=' + encodeURIComponent(jsonObject[key]),
    ).join('&');
  }

  static goto(location= '/') {
    window.location.href = location;
  }

  static isLoggedIn() {
    return Helper.variableExists(window.localStorage['accessToken']);
  }

  static windowParams() {
    return new URLSearchParams(window.location.search);
  }
}

export default Helper;
