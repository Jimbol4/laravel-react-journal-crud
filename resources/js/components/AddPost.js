import React, { Component } from "react";

export default class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPost: {
        title: "",
        body: ""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(key, e) {
    var state = Object.assign({}, this.state.newPost);
    state[key] = e.target.value;
    this.setState({ newPost: state });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.newPost);
    this.addForm.reset();
  }

  render() {
    const divStyle = {marginTop: "50px"};
    const textAreaStyle = {height: "100%"};
    return (
      <div style={divStyle}>
        <h2>Add new post</h2>

        <div>
          <form
            onSubmit={this.handleSubmit}
            ref={input => (this.addForm = input)}
          >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              required
              onChange={e => this.handleInput("title", e)}
            />
            </div>

            <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea
                name="body"
                rows="4"
                className="form-control"
                required
                style={textAreaStyle}
                onChange={e => this.handleInput("body", e)}
                />
            </div>

            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}