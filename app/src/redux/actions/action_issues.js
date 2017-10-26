import ApiCallHelper from '../../utils/api_call_helper';

export const CLEAN_ISSUES = 'CLEAN_ISSUES';
export const SET_OPEN_ISSUES = 'SET_OPEN_ISSUES';
export const SET_CLOSED_ISSUES = 'SET_CLOSED_ISSUES';

function cleanIssuesAction() {
  return { type: CLEAN_ISSUES };
}

function setIssuesAction(state, issues) {
  const type = state === 'open' ? SET_OPEN_ISSUES : SET_CLOSED_ISSUES;

  return {
    type,
    payload: issues,
  };
}

export function setIssues(state = 'open', direction = 'asc') {
  return (dispatch, getState) => {
    if (state === 'open') {
      dispatch(cleanIssuesAction());
    }

    const apiHelper = new ApiCallHelper();
    const { repo } = getState().repoState;

    const issues = apiHelper.get(
      `repos/${repo}/issues`, { state, direction },
    );

    return dispatch(setIssuesAction(state, issues));
  }
}
