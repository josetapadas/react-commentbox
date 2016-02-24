import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

var sample_data = [
  {id: 1, author: "Sandi Metz", text: "This controller is smaller than 100 lines."},
  {id: 2, author: "Luis Rocha", text: "This is taum baum."},
  {id: 3, author: "Rui Serra", text: "Merda"}
];

ReactDOM.render(
  <CommentBox data={sample_data}/>,
  document.getElementById('content')
);
