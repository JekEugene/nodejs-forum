import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

export default class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
        posts: [],
    }
  }

  componentDidMount = async () => {
      const res = await fetch('http://localhost:4000/post/get')
      const result = await res.json()
      console.log(result)
      const posts = result
      console.log(posts)
      this.setState({
          posts,
      })
      console.log(this.state.posts)
  }

  render(){
    if(this.state.posts === null) {
      return(
        <div className="jumbotron">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
      )
    }
    if(this.state.posts === undefined || this.state.posts.length == 0){
        return(
          <div className="jumbotron">
            <h2>No posts</h2>
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
    const posts = this.state.posts.map((post)=>{
    return  <><div className="row">
                <div className="col-md-1"></div>
                <div className="col-sm-12 col-md-10">
                  <p><strong>{post.user_name}</strong> {new Date(post.date).toLocaleString("en-US", options)}</p>
                  <h3>{post.title} </h3>
                  <p>{post.text.slice(0, 500)+"..."}</p>
                  <Link to={`/post/${post._id}`}>
                    <button className="btn btn-secondary">Read more</button>
                  </Link>
                </div>
              </div>
              <hr />
            </>
    })
    return(
      <div className="jumbotron">
        {posts}
      </div>
    )
  }
};