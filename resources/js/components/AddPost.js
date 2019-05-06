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
    const divStyle = {marginTop: "50px"};
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
              onChange={e => this.handleInput("title", e)}
            />
            </div>

            <div className="form-group">
                <label htmlFor="body">Body</label>
                <input
                name="body"
                type="textarea"
                className="form-control"
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