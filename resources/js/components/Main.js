import React, { Component } from "react";
import ReactDom from "react-dom";
import Post from "./Post";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import Axios from "axios";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      currentPost: null,
      editButtonClicked: false,
      api_token: window.Laravel.api_token
    };

    this.handleAddPost = this.handleAddPost.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirmation = this.handleDeleteConfirmation.bind(this);
  }

  componentDidMount() {
    /* fetch API in action */
    axios.get("/api/posts?api_token=" + this.state.api_token)
      .then(response => {
        return response.data;
      })
      .then(posts => {
        //Fetched post is stored in the state
        this.setState({ posts });
      });
  }

  renderPosts() {
    return this.state.posts.map(post => {
      return (
        /* When using list you need to specify a key
        * attribute that is unique for each list item
        */
        <li key={post.id} onClick={() => this.handleClick(post)}>
          {post.title}
        </li>
      );
    });
  }

  handleClick(post) {
    this.state.editButtonClicked = false;
    this.setState({ currentPost: post });
  }

  handleAddPost(post) {

    axios("/api/posts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + this.state.api_token
      },
      data: JSON.stringify(post)
    })
      .then(response => {
        return response.data;
      })
      .then(data => {
        this.setState(prevState => ({
          posts: prevState.posts.concat(data),
          currentPost: data
        }));
      });
  }

  handleDelete() {
    const currentPost = this.state.currentPost;
    axios("/api/posts/" + this.state.currentPost.id, {
      method: "delete",
      headers: {
        "Authorization": 'Bearer ' + this.state.api_token
      }
    }).then(response => {
      var newPosts = this.state.posts.filter(function(item) {
        return item !== currentPost;
      });

      this.setState({ posts: newPosts, currentPost: null });
    });
  }

  handleDeleteConfirmation(event) {
    if (confirm("Are you sure you want to delete it?")) {
      this.handleDelete();
    }
  }

  handleEdit() {
    this.setState({ editButtonClicked: true });
  }

  handleUpdate(post) {
    const currentPost = this.state.currentPost;
    axios("/api/posts/" + currentPost.id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + this.state.api_token
      },
      data: JSON.stringify(post)
    })
      .then(response => {
        return response.data;
      })
      .then(data => {
        /** updating the state */
        var newPosts = this.state.posts.filter(function(item) {
          return item !== currentPost;
        });
        this.setState(prevState => ({
          posts: newPosts.concat(post),
          currentPost: post
        }));
      });
  }

  render() {
    return (
      <div>
        <div className="col-md-6">
          <h3>All posts ({this.state.posts.length})</h3>
          <ul>{this.renderPosts()}</ul>
        </div>
        <div className="col-md-6">
          {this.state.editButtonClicked === true ? (
            <EditPost
              post={this.state.currentPost}
              update={this.handleUpdate}
            />
          ) : (
            <React.Fragment>
              <Post
                handleDeleteConfirmation={this.handleDeleteConfirmation}
                post={this.state.currentPost}
                deletepost={this.handleDelete}
                handleEdit={this.handleEdit}
              />
              <AddPost onAdd={this.handleAddPost} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

if (document.getElementById("root")) {
  ReactDom.render(<Main />, document.getElementById("root"));
}