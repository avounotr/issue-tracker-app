import { renderComponent, expect, store } from '../../utils/test_helper';

import ViewIssues from '../../../app/src/modules/issues/view/ViewIssues';

describe('Issue List Testing', () => {
  let component;
  let repos = [];

  before((done) => {
    component = renderComponent(ViewIssues);
    store.getState().allRepos.then((allRepos) => {
      repos = allRepos
        .filter(repo => repo.open_issues_count > 0 )
        .map((repo) => {
          return {
            id: repo.id,
            name: repo.full_name,
          };
        });

      if (!repos.length > 0) {
        console.error('No repo with issues');
      } else {
        done();
      }
    });
  });

  it('shows all issues of selected repository', (done) => {
    setTimeout(() => {
      component = renderComponent(ViewIssues);

      const issues = store.getState().issuesState.openIssues;
      const lastIssue = component.find('.edit-issue').last().html().split('=');
      const lastIssueIndex = lastIssue[lastIssue.length - 1].split('"')[0];

      expect(parseInt(lastIssueIndex, 10) + 1).to.eql(parseInt(issues.length, 10));
      done();
    }, 5000)
  });
});
