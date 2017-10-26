import ApiCallHelper from '../../utils/api_call_helper';

export const CLEAN_COMMENTS = 'CLEAN_COMMENTS';
export const SET_COMMENTS = 'SET_COMMENTS';

const apiHelper = new ApiCallHelper();

function cleanCommentsAction() {
  return { type: CLEAN_COMMENTS };
}

function setCommentsAction(comments) {
  return {
    type: SET_COMMENTS,
    payload: comments,
  };
}

export function setComments(issueNumber) {
  return (dispatch, getState) => {
    dispatch(cleanCommentsAction());

    const { repo } = getState().repoState;
    const comments = apiHelper.get(
      `repos/${repo}/issues/${issueNumber}/comments`,
    );

    return dispatch(setCommentsAction(comments));
  }
}

export function submitComment(issueNumber, body) {
  return (dispatch, getState) => {
    const { repo } = getState().repoState;

    return apiHelper.post(
      `repos/${repo}/issues/${issueNumber}/comments`, { body },
    ).then(() => {
      return dispatch(setComments(issueNumber));
    }).catch((error) => {
      console.error(error);
      return dispatch(setComments(issueNumber));
    });
  }
}

export function updateComment(issueNumber, commentId, body) {
  return (dispatch, getState) => {
    const { repo } = getState().repoState;

    return apiHelper.patch(
      `repos/${repo}/issues/comments/${commentId}`, { body },
    ).then(() => {
      return dispatch(setComments(issueNumber));
    }).catch((error) => {
      console.error(error);
      return dispatch(setComments(issueNumber));
    })
  }
}

export function removeComment(issueNumber, commentId) {
  return (dispatch, getState) => {
    const { repo } = getState().repoState;

    return apiHelper.delete(
      `repos/${repo}/issues/comments/${commentId}`,
    ).then(() => {
      return dispatch(setComments(issueNumber));
    }).catch((error) => {
      console.error(error);
      return dispatch(setComments(issueNumber));
    })
  }
}
