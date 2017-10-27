import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Helper from '../../../utils/helper';
import { setIssues } from '../../../redux/actions/action_issues';

import Issue from './Issue';
import Logout from '../../auth/Logout';
import Repos from '../../menu/Repos';
import Loader from '../../loader/Loader';

class ViewIssues extends Component {
  constructor(props) {
    super(props);
    this.repo = this.props.repo;
    this.state = { openIssues: true };
    this.showOpenIssues = this.showOpenIssues.bind(this);
    this.showClosedIssues = this.showClosedIssues.bind(this);
  }

  componentDidUpdate() {
    const { dispatch, repo, issues } = this.props;
    if (this.repo !== repo) {
      this.repo = repo;
      dispatch(setIssues());
      dispatch(setIssues('closed'));
    }
  }

  setIssues(issues) {
    return issues.map((issue, index) => {
      return {
        index: index,
        state: issue.state,
        number: issue.number,
        title: issue.title,
        createdAt: issue.created_at,
        assignees: issue.assignees.map((assignee) => {
          return {
            avatar: assignee.avatar_url,
            name: assignee.login,
          }
        }),
        assigner: issue.user.login,
      }
    });
  }

  showOpenIssues() {
    if (this.props.issues.openIssues.length > 0) {
      this.setState({ openIssues: true });
    }
  }

  showClosedIssues() {
    if (this.props.issues.closedIssues.length > 0) {
      this.setState({ openIssues: false });
    }
  }

  render() {
    const { issues } = this.props;
    const openIssues = this.setIssues(issues.openIssues);
    const closedIssues = this.setIssues(issues.closedIssues);

    return (
      <div id="wrapper">
        <Loader />
        <Logout />
        <div id='view-issues'>
          <Repos />
          <ul>
            <li className="header">
              <div className='issue-number'> # </div>
              <div className="title"> Title </div>
              <div className="created-at"> Created At </div>
              <div className="assigner"> Assigner </div>
              <div className='edit-issue'>
                <span onClick={this.showOpenIssues}> Open </span> /
                <span onClick={this.showClosedIssues}> Closed </span> Issues
              </div>
            </li>
            { this.state.openIssues && openIssues.map((issue, index) => (
              <Issue key={index} data={issue} />
            ))}

            { !this.state.openIssues && closedIssues.map((issue, index) => (
              <Issue key={index} data={issue} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ViewIssues.propTypes = {
  dispatch: PropTypes.func.isRequired,
  repo: PropTypes.string.isRequired,
  issues: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  const { repo } = state.repoState || '';
  const { openIssues, closedIssues } = state.issuesState || {
    openIssues: [], closedIssues: [],
  };

  const issues = { openIssues, closedIssues };
  return { repo, issues };
}

export default connect(mapStateToProps)(ViewIssues);
