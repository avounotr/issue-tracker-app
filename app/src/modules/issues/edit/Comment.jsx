import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, Overlay, Popover } from 'react-bootstrap';

import MDEditor from 'react-markdown-editor-hybrid';

import { updateComment, removeComment } from '../../../redux/actions/action_comments';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = { edit: false, comment: this.props.data.body, deleteAlert: false };
    this.changeEditableState = this.changeEditableState.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.editComment = this.editComment.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  changeEditableState(edit = true) {
    this.setState({ edit });
  }

  changeContent(comment) {
    this.setState({ comment });
  }

  editComment() {
    const { dispatch, data, issueNumber } = this.props;
    dispatch(updateComment(issueNumber, data.id, this.state.comment));
    this.changeEditableState(false);
  }

  setAlert() {
    this.setState({ deleteAlert: true })
  }

  removeAlert() {
    this.setState({ deleteAlert: false })
  }

  deleteComment() {
    const { dispatch, data, issueNumber } = this.props;
    dispatch(removeComment(issueNumber, data.id));
  }

  render() {
    const { user, createdAt, body } = this.props.data;
    const title = `by ${ user.name } (${ createdAt.split('T')[0] })`;

    return (
      <li>
        <img src={user.avatar} className="thumb" />
        <Popover
          id="popover-basic"
          placement="right"
          title={title}
        >
          { !this.state.edit &&
            <div>
              { body }

              <hr />
              <div style={{ textAlign: 'right' }}>
                <Button bsStyle="primary" bsSize="small" onClick={this.changeEditableState}>
                  Edit
                </Button>
                <Button bsStyle="danger" bsSize="small" onClick={this.setAlert}>
                  Delete
                </Button>
              </div>
              <Modal show={this.state.deleteAlert} onHide={this.removeAlert}>
                <Modal.Header closeButton>
                  <Modal.Title> Alert </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4> Are you sure that you want to move this comment? </h4>
                </Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="default" bsSize="small" onClick={this.removeAlert}>Close</Button>
                  <Button bsStyle="danger" bsSize="small" onClick={this.deleteComment}>Delete</Button>
                </Modal.Footer>
              </Modal>
            </div>
          }
          { this.state.edit &&
            <div>
              <MDEditor value={this.state.comment} onChange={this.changeContent} />
              <div style={{ textAlign: 'right' }}>
                <Button
                  bsStyle="warning"
                  bsSize="small"
                  onClick={() => { this.changeEditableState(false) }}
                >
                  Cancel
                </Button>
                <Button bsStyle="primary" bsSize="small" onClick={this.editComment}>
                  Save
                </Button>
              </div>
            </div>
          }
        </Popover>
      </li>
    );
  }
};

Comment.propTypes = {
  dispatch: PropTypes.func.isRequired,
  issueNumber: PropTypes.number.isRequired,
  data: PropTypes.shape().isRequired,
};

export default connect()(Comment);
