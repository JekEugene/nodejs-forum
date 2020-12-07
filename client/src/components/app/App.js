import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import RegisterModal from "../register-modal/register-modal"
import LoginModal from "../login-modal/login-modal"
import Header from '../header/header'
import ForumService from '../../service/forum-service'
import { ForumServiceProvider } from '../forum-service-context/forum-service-context';

import {
  HomePage,
  UserPage,
  PostPage, } from '../pages';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forumService: new ForumService()
    };
  }

  render() {

    return (
      <ForumServiceProvider value={this.state.forumService} >
        
         <Router>
           <div className="forum-app">
             
              <LoginModal />
              <RegisterModal />  
              
              <Header />
              
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/user/:id" component={UserPage} />
                <Route path="/post/:id" component={PostPage} />

                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
              
           </div>
         </Router>
      </ForumServiceProvider>
    );
  }
}
