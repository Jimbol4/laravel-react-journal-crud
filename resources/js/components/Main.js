import React, { Component } from "react";
import ReactDom from "react-dom";
import Post from "./Post";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import Axios from "axios";

export default class Main extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPost: null,
      editButtonClicked: false,
      // store api token sent through from the laravel backend
      api_token: window.Laravel.api_token
    };

    this.handleAddPost = this.handleAddPost.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirmation = this.handleDeleteConfirmation.bind(this);
  }

  componentDidMount() {

    // get index list of resource
    axios.get("/api/posts?api_token=" + this.state.api_token)
      .then(response => {
        return response.data;
      })
      .then(posts => {
        this.setState({ posts });
      });
  }

  renderPosts() {
    return this.state.posts.map(post => {
      return (
        <li className="list-group-item" key={post.id} onClick={() => this.handleClick(post)}>
          {post.title}
        </li>
      );
    });
  }

  // set current post for the 'show' aspect
  handleClick(post) {
    this.state.editButtonClicked = false;
    this.setState({ currentPost: post });
  }

  // create a new post
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

  // delete chosen post after confirmation
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
    
    // TODO - use something like SweetAlert for this prompt
    if (confirm("Are you sure you want to delete this post?")) {
      this.handleDelete();
    }
  }

  handleEdit() {
    this.setState({ editButtonClicked: true });
  }

  // update an existing post
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
      <div className="row">
        <div className="col-md-6">
          <h3>All posts ({this.state.posts.length})</h3>
          <ul className="list-group">{this.renderPosts()}</ul>
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