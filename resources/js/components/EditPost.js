import React, { Component } from "react";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ post: this.props.post });
  }

  handleInput(key, e) {
    let state = Object.assign({}, this.state.post);
    state[key] = e.target.value;
    this.setState({ post: state });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update(this.state.post);
    this.editForm.reset();
  }

  render() {
    const divStyle = {};
    const post = this.state.post;

    return (
      <div>
        <h2>Edit post</h2>

        <div style={divStyle}>
          <form
            onSubmit={this.handleSubmit}
            ref={input => (this.editForm = input)}
          >
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              value={post.title}
              onChange={e => this.handleInput("title", e)}
            />
            <label htmlFor="description">Body</label>
            <textarea
              name="body"
              type="text"
              value={post.body}
              onChange={e => this.handleInput("body", e)}
            />

            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;