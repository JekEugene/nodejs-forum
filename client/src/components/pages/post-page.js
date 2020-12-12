import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

export default class PostPage extends Component{

  constructor(props){
    super(props)
    this.state = {
      post: null
    }
  }

  componentDidMount = async () => {
    const res = await fetch(`http://localhost:4000${this.props.location.pathname}`)
    const result = await res.json()
    this.setState({post: result})
    //console.log(this.state.post)
  }

  render(){
    
    if(this.state.post === null) {
      return(
        <div className="jumbotron">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
      )
    }
    console.log(this.state.post)
    if(this.state.post === undefined){
        return(
          <div className="jumbotron text-center">
            <h2>Post not found</h2>
          </div>
        )
    }
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    return (
      <div className="jumbotron">
        <div className="row ">
          <div className="col-md-1"></div>
          <div className="col-sm-12 col-md-10">
            <p><strong>{this.state.post.user_name}</strong> {new Date(this.state.post.date).toLocaleString("en-US", options)}</p>
            <h3>{this.state.post.title} </h3>
            <p>{this.state.post.text}</p>
          </div>
        </div>
      </div>
    );
  }
};