import objectAssign from 'object-assign';
import { CLEAN_COMMENTS, SET_COMMENTS } from '../actions/action_comments';

function setComments(state = {
  commentsFetching: false, comments: []
}, action) {
  switch (action.type) {
    case SET_COMMENTS: {
      return objectAssign({}, state, {
        commentsFetching: false,
        comments: action.payload,
      });
    }
    case CLEAN_COMMENTS: {
      return objectAssign({}, state, { commentsFetching: true });
    }
    default: {
      return state;
    }
  }
}

export default setComments;
