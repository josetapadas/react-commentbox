import React from 'react';

class CommentBox extends React.Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Comments:</h1>
        <CommentList data={this.props.data}/>
        <CommentForm />
      </div>
    )
  }
}

class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map(function(commentNode) {
      return (
        <Comment author={commentNode.author} commentId={commentNode.id}>
          {commentNode.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <div className="commentForm">
        [I am a comment form.]
      </div>
    )
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        <div className="commentAuthor">
          <b>{this.props.author}:</b>
        </div>
        { this.props.children }
      </div>
    )
  }
}

export default CommentBox;
