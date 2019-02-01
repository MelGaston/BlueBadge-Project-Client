import React, { Component } from 'react';
import Radium from 'radium';
import Auth from './components/auth/Auth';
import Main from './components/main/Main';
import Sitebar from './components/main/Navbar';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

var styles = {
  authBody:{
    height:'100vh',
    width:'100vw',
    backgroundColor:'#344167',
    backgroundImage:'url("https://www.transparenttextures.com/patterns/cubes.png")'
  },
  movieBody:{
    height:'100%',
    width:'100vw',
    backgroundColor:'#5E7293',
    backgroundImage:'url("https://www.transparenttextures.com/patterns/cubes.png")'
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token:''
    }
  }

  componentDidMount() {
    document.title="MovieLog";
    const token = sessionStorage.getItem('token')
    if (token && !this.state.token) {
      this.setState({ token: token });
    }
  }

  setSessionState = (token) => {
    sessionStorage.setItem('token', token);
    this.setState({ token: token });
  }

  logout = () => {
    this.setState({ token: ''});
    sessionStorage.clear();
  }

  protectedViews = () => {
    if (this.state.token === sessionStorage.getItem('token')) {
      return (
        <Route path='/' exact >
          <div style={styles.movieBody}>
            <Sitebar clickLogout={this.logout}/>
            <Main token={this.state.token}/>
          </div>
        </Route>
      )
    } else {
      return (
        <Route path="/auth" >
          <div style={styles.authBody}>
            <Auth setToken={this.setSessionState}/>
          </div>
        </Route>
      )
    }
  }

  render() {
    return (
      <Router style={styles.body}>
        {this.protectedViews()}
      </Router>
    );
  }
}

export default Radium(App);