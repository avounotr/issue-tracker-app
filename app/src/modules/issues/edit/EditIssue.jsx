import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MDEditor from 'react-markdown-editor-hybrid';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { setComments, submitComment } from '../../../redux/actions/action_comments';

import Comment from './Comment';
import Helper from '../../../utils/helper';
import Loader from '../../loader/Loader';

class EditIssue extends Component {
  constructor(props) {
    super(props);
    this.state = { newComment: '' }
    this.change = this.change.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentWillMount() {
    const { dispatch, issue } = this.props;
    if (Helper.variableExists(issue.id)) {
      dispatch(setComments(issue.number));
    }
  }

  change(newComment = '') {
    this.setState({ newComment });
  }

  submitComment() {
    const { dispatch, issue } = this.props;
    dispatch(submitComment(issue.number, this.state.newComment));
    this.change();
  }

  render() {
    const { issue, comments } = this.props;
    const { labels, assignees } = issue;

    return Helper.variableExists(issue.id) ? (
      <div id="wrapper">
        <div id='edit-issue'>
          <Loader />
          <div className="display-comments">
            <h1 className="issue-title">
              { issue.title }
            </h1>
            <ul>
              { comments.map((comment, index) => (
                <Comment key={index} data={comment} issueNumber={issue.number} />
              ))}
            </ul>
            <div style={{ margin: '30px 0 50px 0' }}>
              <MDEditor value={this.state.newComment} onChange={this.change} />
              <div style={{ textAlign: 'right' }}>
                <Link to='/'>
                  <Button bsStyle="warning" bsSize="small" onClick={this.submitComment}>
                    Cancel
                  </Button>
                </Link>
                <Button bsStyle="primary" bsSize="small" onClick={this.submitComment}>
                  Submit Comment
                </Button>
              </div>
            </div>
          </div>
          <div className='metadata'>
            <ListGroup>
              <ListGroupItem header="Assignees">
                { assignees.map((assignee, index) => (
                  <span key={index} style={{ display: 'inline-block' }}>
                    <img src={assignee.avatar_url} className="extra-small-thumb" />
                    { assignee.login }
                  </span>
                ))}
              </ListGroupItem>
              <ListGroupItem header="Labels">
                { labels.map((label, index) => (
                  <span
                    key={index}
                    style={{
                      width: '100%',
                      background: `#${label.color}`,
                      color: 'white',
                      display: 'inline-block',
                      padding: '3px',
                    }}
                  >
                    { label.name }
                  </span>
                ))}
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    ) : null;
  }
}

EditIssue.propTypes = {
  dispatch: PropTypes.func.isRequired,
  issue: PropTypes.shape().isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

function mapStateToProps(state) {
  const searchParams = Helper.windowParams();
  const issueState = searchParams.get('state');
  const index = searchParams.get('index');

  const { openIssues, closedIssues } = state.issuesState || {
    openIssues: [], closedIssues: [],
  };

  const issue = issueState === 'open' ?
    openIssues[index] : closedIssues[index];

  // Redirect if there is no issue
  if (!Helper.variableExists(issue)) {
    Helper.goto();
  }

  const comments = Helper.variableExists(state.commentsState.comments) ?
    state.commentsState.comments.map((comment) => {
      return {
        id: comment.id,
        user: {
          avatar: comment.user.avatar_url,
          name: comment.user.login,
        },
        createdAt: comment.created_at,
        body: comment.body,
      };
    }) : [];

  return { issue: issue || {}, comments };
}

export default connect(mapStateToProps)(EditIssue);
