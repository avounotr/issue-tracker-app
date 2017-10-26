import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';

import Helper from '../../utils/helper';
import { setRepo } from '../../redux/actions/action_repos';

class Repos extends Component {
  constructor(props) {
    super(props);
    this.showSelectedRepo = this.showSelectedRepo.bind(this);
    this.state = { repoOptions: [] };
  }

  componentWillMount() {
    const { allRepos, dispatch } = this.props;

    allRepos.then((repos) => {
      const repoOptions = repos
        .filter(repo => repo.open_issues_count > 0)
        .map(({ full_name }) => {
          return {
            label: full_name,
            value: full_name,
          };
        });
      if (repoOptions.length > 0) {
        const selectedRepo = Helper.variableExists(this.props.repo) ?
          this.props.repo : repoOptions[0].value;

        this.setState({ repoOptions });
        dispatch(setRepo(selectedRepo));
      }
    });
  }

  showSelectedRepo(event) {
    this.props.dispatch(setRepo(event.target.value));
  }

  render() {
    return (
      <div className='repo-selector'>
        <FormControl
          componentClass="select"
          placeholder="Select Repository..."
          onChange={ this.showSelectedRepo }
        >
          { this.state.repoOptions.map((option, key) => (
            <option key={key} value={option.value}> {option.label} </option>
          ))}
        </FormControl>
      </div>
    );
  }
}

Repos.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allRepos: PropTypes.shape().isRequired,
  repo: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const allRepos = state.allRepos;
  const { repo } = state.repoState || '';

  return { allRepos, repo };
}

export default connect(mapStateToProps)(Repos);
