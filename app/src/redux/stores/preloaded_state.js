import ApiCallHelper from '../../utils/api_call_helper';

function getAllRepos() {
  const apiHelper = new ApiCallHelper();
  const repos = apiHelper.get('user/repos');
  return repos;
}

function setDebugOption() {
  return false;
}

export default {
  getAllRepos, setDebugOption,
};
