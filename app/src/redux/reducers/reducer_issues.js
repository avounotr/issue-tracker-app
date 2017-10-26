import objectAssign from 'object-assign';
import {
  CLEAN_ISSUES, SET_OPEN_ISSUES, SET_CLOSED_ISSUES,
} from '../actions/action_issues';

function setIssues(state = {
  issuesFetching: true, openIssues: [], closedIssues: [],
}, action) {
  switch (action.type) {
    case SET_OPEN_ISSUES: {
      return objectAssign({}, state, {
        issuesFetching: false,
        openIssues: action.payload,
      });
    }
    case SET_CLOSED_ISSUES: {
      return objectAssign({}, state, {
        issuesFetching: false,
        closedIssues: action.payload,
      });
    }
    case CLEAN_ISSUES: {
      return objectAssign({}, state, { issuesFetching: true });
    }
    default: {
      return state;
    }
  }
}

export default setIssues;
