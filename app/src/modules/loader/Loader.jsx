import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Helper from '../../utils/helper';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = { reposLoaded: false };
  }

  componentWillMount() {
    this.props.allRepos.then(() => { this.setState({ reposLoaded: true }); });
  }

  render() {
    const { commentsFetching, issuesFetching, repoFetching } = this.props;

    const showLoader = !(
      this.state.reposLoaded && !commentsFetching &&
      !issuesFetching && !repoFetching
    );

    return showLoader ? (
      <div className="loader"> Loading.... </div>
    ) : null;
  }
}

Loader.propTypes = {
  allRepos: PropTypes.shape().isRequired,
  commentsFetching: PropTypes.bool.isRequired,
  issuesFetching: PropTypes.bool.isRequired,
  repoFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const allRepos = state.allRepos;
  const { commentsFetching } = state.commentsState;
  const { issuesFetching } = state.issuesState;
  const { repoFetching } = state.repoState;

  return { allRepos, commentsFetching, issuesFetching, repoFetching };
}

export default connect(mapStateToProps)(Loader);
