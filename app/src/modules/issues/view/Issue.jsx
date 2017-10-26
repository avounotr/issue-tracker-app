import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Issue = ({ data }) => {
  const { index, state, number, title, createdAt, assignees, assigner } = data;

  return (
    <li className="issue">
      <div className='issue-number'> #{ number } </div>
      <div className="title"> { title } </div>
      <div className="created-at"> { createdAt.split('T')[0] } </div>
      <div className="assigner"> { assigner } </div>
      <div className='edit-issue'>
        <Link to={`/edit?state=${state}&index=${index}`}>
          Edit
        </Link>
      </div>
    </li>
  )
};

Issue.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Issue;
