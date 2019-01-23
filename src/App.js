import React, { Component } from 'react';
import Auth from './components/auth/Auth';
import Main from './components/main/Main';
import Sitebar from './components/main/Navbar';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Container } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sessionToken:''
    }
  }

  componentDidMount() {
    document.title="Movie Diary";
    const token = sessionStorage.getItem('token')
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }

  setSessionState = (token) => {
    sessionStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }

  logout = () => {
    this.setState({ sessionToken: ''});
    sessionStorage.clear();
  }

  protectedViews = () => {
    if (this.state.sessionToken === sessionStorage.getItem('token')) {
      return (
        <Route path='/' exact >
          <Container>
            <Sitebar clickLogout={this.logout}/>
            <Main sessionToken={this.state.sessionToken}/>
          </Container>
        </Route>
      )
    } else {
      return (
        <Route path="/auth" >
          <Auth setToken={this.setSessionState}/>
        </Route>
      )
    }
  }

  render() {
    return (
      <div>
        <Router>
          {this.protectedViews()}
        </Router>
      </div>
    );
  }
}

export default App;