import React from 'react';

class CommentBox extends React.Component {
  // getInitialState() executes exactly once during the lifecycle of the component and sets up the initial state of the component.
  // The API is mostly what you would expect, with the exception of getInitialState(), this should be handled using the constructor
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.dataItems = []
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.loadCommentsFromFirebase = this.loadCommentsFromFirebase.bind(this);
  }

  loadCommentsFromFirebase() {
    console.log("updating from")
    this.firebaseRef = new Firebase("https://jtreactcomments.firebaseio.com/comments");
    this.dataItems = [];

    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.dataItems.push(dataSnapshot.val());

      this.setState({
        data: this.dataItems
      });
    }.bind(this));
  }

  componentWillMount() {
    this.loadCommentsFromFirebase();
    setInterval(this.loadCommentsFromFirebase, this.props.fetchInterval);
  }

  componentDidMount() {
    this.setState({
      data: []
    });
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments:</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }

  // event handlers
  handleCommentSubmit(comment) {
    // set values on firebase
    this.firebaseRef.push(comment);
    this.loadCommentsFromFirebase();
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
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      author: '',
      text: ''
    }

    // bind event handlers
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Username" value={this.state.author} onChange={this.handleAuthorChange} />
        <input type="text" placeholder="Write yor comment." value={this.state.text} onChange={this.handleTextChange} />
        <input type="submit" value="Comment!" />
      </form>
    )
  }

  // event handlers
  handleAuthorChange(e) {
    this.setState({ author : e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text : e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var author = this.state.author.trim();
    var text = this.state.text.trim();

    if( !author || !text ) {
      return;
    }

    // trigger custom event
    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        <div className="commentAuthor">
          <b>{this.props.author}</b> said:
        </div>
        { this.props.children }
      </div>
    )
  }
}

export default CommentBox;
