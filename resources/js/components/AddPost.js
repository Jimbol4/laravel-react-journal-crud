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

    // Boilterplate code for binding meethods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /** this mthod dynamically accepts inputs and stores it in the state **/
  handleInput(key, e) {
    /**Duplicating and updating the state */
    var state = Object.assign({}, this.state.newPost);
    state[key] = e.target.value;
    this.setState({ newPost: state });
  }

  /**This methods is invoked when submit button is pressed */
  handleSubmit(e) {
    e.preventDefault();

    /**
     * A callback to the onAdd props. The current state is passed as a param
     */
    this.props.onAdd(this.state.newPost);
    this.addForm.reset();
  }

  render() {
    const divStyle = {};
    return (
      <div>
        <h2>Add new post</h2>

        <div style={divStyle}>
          <form
            onSubmit={this.handleSubmit}
            ref={input => (this.addForm = input)}
          >
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              onChange={e => this.handleInput("title", e)}
            />
            <label htmlFor="description">Description</label>
            <input
              name="body"
              type="text"
              onChange={e => this.handleInput("body", e)}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}