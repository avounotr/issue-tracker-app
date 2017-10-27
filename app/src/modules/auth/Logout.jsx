import React from 'react';
import PropTypes from 'prop-types';

import Helper from '../../utils/helper';

const Logout = () => {
  const logout = () => {
    window.localStorage.removeItem('accessToken');
    window.location.href = '/';
  }

  return (
    <div className='logout' onClick={() => { logout(); }}> Logout </div>
  );
}

Logout.propTypes = {};

export default Logout;
