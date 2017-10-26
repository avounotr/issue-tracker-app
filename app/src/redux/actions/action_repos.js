export const CLEAR_REPO = 'CLEAR_REPO';
export const SET_REPO = 'SET_REPO';

function clearRepoAction() {
  return { type: CLEAR_REPO };
}

function setRepoAction(repo) {
  return {
    type: SET_REPO,
    payload: repo,
  };
}

export function setRepo(repo) {
  return dispatch => {
    dispatch(clearRepoAction());
    return dispatch(setRepoAction(repo));
  }
}
