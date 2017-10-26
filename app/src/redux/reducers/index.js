import { combineReducers } from 'redux';
import RepoState from './reducer_repos';
import IssuesState from './reducer_issues';
import CommentsState from './reducer_comments';

const rootReducer = combineReducers({
  debugOption: (state = {}) => state,
  allRepos: (state = {}) => state,
  repoState: RepoState,
  issuesState: IssuesState,
  commentsState: CommentsState,
});

export default rootReducer;
