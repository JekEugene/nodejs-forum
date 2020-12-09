import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import RegisterModal from "../register-modal/register-modal"
import LoginModal from "../login-modal/login-modal"
import Header from '../header/header'
import Alert from "../alert/alert"
import ForumService from '../../service/forum-service'
import { ForumServiceProvider } from '../forum-service-context/forum-service-context';

import {
  HomePage,
  UserPage,
  PostPage, } from '../pages';
export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
        alert: false,
        alertMsg: '',
        alertType: '',
        forumService: new ForumService(),
        id: null,
        name: '',
        email: '',
        role: 0,
        inputName: '',
        inputEmail: '',
        inputPassword: '',
    }
  }

  alertCreate = (text, type) => {
    this.setState({
        alert: true,
        alertMsg: text,
        alertType: type
      })
    setTimeout(()=>{
      this.setState({
          alert: false,
          alertMsg: "",
          alertType: ""
        })
    }, 5000)
  }

  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value })
  }

  registerSubmit = async (e) => {
      e.preventDefault()
      let user = {
          name: this.state.nameInput,
          email: this.state.emailInput,
          password: this.state.passwordInput,
      }
      let res = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(user)
      });
      const result = await res.json()
      this.alertCreate(result.msg, result.type)
  } 

  loginSubmit = async (e) => {
    e.preventDefault()
    let user = {
        email: this.state.emailInput,
        password: this.state.passwordInput,
    }
    let res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    const result = await res.json()
    document.cookie = `accessToken=${result.accessToken}`
    document.cookie = `refreshToken=${result.refreshToken}`
    this.alertCreate(result.msg, result.type)
    if(result.type === "hide"){
      this.setState({
        id: result.id,
        name: result.name,
        role: result.role
      })
    }
  } 

  logoutSubmit = async (e) => {
    e.preventDefault()
    let res = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include',
    });
    const result = await res.json()
    this.setState({
      name: result.name,
      role: result.role
    })
    document.cookie = `accessToken=`
    document.cookie = `refreshToken=`
  }

  componentDidMount = async () => {
    console.log("gg")
    //try {
      const res = await fetch('http://localhost:4000/', {
      method: "GET",
      credentials: 'include',
      //mode: 'cors',
      })
      const result = await res.json()
      
      console.log(result)
      if(result.accessToken=="" && result.refreshToken==""){
        document.cookie = `accessToken=${result.accessToken}`
        document.cookie = `refreshToken=${result.refreshToken}`
      }
      if(result.role === 0){
        this.setState({
          name: result.name,
          role: result.role
        })
      } else {
        this.setState({
          id: result.id,
          name: result.name,
          role: result.role
        })
      }
    // } catch (err) {
    //   console.log(err)
    // }
    // const res1 = await fetch('http://localhost:4000/', {
    //   method: "GET",
    //   credentials: 'include',
    //   //mode: 'cors',
    // })
    
  }

  render() {
    const alert = this.state.alert
    console.log("role: " + this.state.role)
    return (
      <ForumServiceProvider value={this.state.forumService} >
        
         <Router>
           <div className="container">
              {alert === true ? <Alert 
                msg={this.state.alertMsg} 
                type={this.state.alertType} 
                /> : null}
              <LoginModal 
                loginSubmit={this.loginSubmit}
                handleChange={this.handleChange}
                inputEmail={this.state.inputEmail}
                inputPassword={this.state.inputPassword}
                />
              <RegisterModal 
                registerSubmit={this.registerSubmit}
                handleChange={this.handleChange}
                inputName={this.state.inputName}
                inputEmail={this.state.inputEmail}
                inputPassword={this.state.inputPassword}
                />  
              
              <Header 
                name={this.state.name}
                rating={this.state.rating}
                email={this.state.email}
                role={this.state.role}
                logoutSubmit={this.logoutSubmit}
                id={this.state.id}/>
                
              
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
