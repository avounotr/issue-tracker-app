import objectAssign from 'object-assign';
import { CLEAR_REPO, SET_REPO } from '../actions/action_repos';

function setRepo(state = {
  repoFetching: true, repo: '',
}, action) {
  switch (action.type) {
    case SET_REPO: {
      return objectAssign({}, state, {
        repoFetching: false,
        repo: action.payload,
      });
    }
    case CLEAR_REPO: {
      return objectAssign({}, state, { repoFetching: true });
    }
    default: {
      return state;
    }
  }
}

export default setRepo;
