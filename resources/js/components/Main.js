import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            currentPost: null,
            api_token: window.Laravel.api_token
        };
    }

    componentDidMount() {
        axios.get("/api/posts?api_token=" + this.state.api_token)
          .then(response => {
            return response.data;
          })
          .then(posts => {
            this.setState({ posts });
          });
      }

    renderPosts() {
        return this.state.posts.map(post=> {
            return (
                <div className="col-md-4 d-flex" key={post.id}>
                    <div className="card mb-4 shadow-sm">
                        <img src="https://placeimg.com/300/225/any" width="100%" height="225" />
                        <div className="card-body flex-fill">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
