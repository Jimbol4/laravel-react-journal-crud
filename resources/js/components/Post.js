import React, { Component } from "react";

const Post = props => {
  const {
    post,
    deletePost,
    handleDeleteConfirmation,
    handleEdit,
    update
  } = props;

  if (!post) {
    return <div className="col"><h2>No Post has been selected.</h2></div>;
  }

  return (
    <div className="col">
      <h2> {post.title} </h2>
      <p> {post.body} </p>
      <input type="button" value="Edit" className="btn btn-primary" onClick={e => handleEdit()} />
      <input
        type="button"
        className="btn btn-secondary"
        value="Delete"
        onClick={e => handleDeleteConfirmation()}
      />
    </div>
  );
};
export default Post;