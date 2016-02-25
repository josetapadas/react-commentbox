import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

ReactDOM.render(
  <CommentBox fetchInterval={2000} />,
  document.getElementById('content')
);
