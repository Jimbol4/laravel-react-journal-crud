import React, { Component } from "react";

const Post = props => {
  const {
    post,
    deletePost,
    handleDeleteConfirmation,
    handleEdit,
    update
  } = props;

  const divStyle = {
    fontSize: 14
  };

  if (!post) {
    return <div style={divStyle}> No Post was selected. </div>;
  }

  return (
    <div style={divStyle}>
      <h2> {post.title} </h2>
      <p> {post.body} </p>
      <input type="button" value="edit" onClick={e => handleEdit()} />
      <input
        type="button"
        value="delete"
        onClick={e => handleDeleteConfirmation()}
      />
    </div>
  );
};
export default Post;