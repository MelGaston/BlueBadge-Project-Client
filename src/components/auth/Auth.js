import React, {Component} from 'react';
import Radium from 'radium';
import APIUrl from '../../helpers/environment';

import { Button, Form, Label, Input, Row, Col } from 'reactstrap';

var styles = {
    body:{
        width:'60%',
        textAlign:'center',
        backgroundColor:'rgba(255,255,255,0.25)',
        padding:'10vh 5vw',
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        borderRadius:'0.25vh',
        fontFamily:"'Open Sans', sans-serif"
    },
    label:{
        display:'none'
    },
    title:{
        fontFamily:"'Monoton', sans-serif",
        color:'#F6BF49',
        paddingBottom:'2.5vh',
        fontSize:'3rem'
    },
    buttonToggle:{
        margin:'2vh 15px',
        backgroundColor:'#F6BF49',
        cursor:'pointer',
        textTransform:'uppercase'
    },
    buttonSubmit:{
        margin:'2vh 15px',
        backgroundColor:'#F37E45',
        cursor:'pointer',
        textTransform:'uppercase'
    }
}

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            login:true,
            firstName:'',
            lastName:'',
            email:'',
            password:''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = this.state.login ? `${APIUrl}/api/user/login` : `${APIUrl}/api/user/create`;

        fetch(url, {
            method:'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        .then(
            response => response.json()
        )
        .then(data => {
            this.props.setToken(data.sessionToken)
        })
    }

    loginToggle = (event) => {
        event.preventDefault();
        const login = this.state.login;
        this.setState({
            login: !login,
            sessionToken: '',
            email: '',
            password: ''
        })
    }

    render(){
        let title = this.state.login ? "Login" : "Signup";
        let button = this.state.login ? "Signup" : "Login"

        let signupFields = this.state.login ? null : (
            <Row>
                <Col xs="12" sm="6">
                        <Label htmlFor="firstName" style={styles.label}>First Name</Label><br/>
                        <Input type="text" id="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="First Name"/><br/>
                </Col>
                <Col xs="12" sm="6">
                        <Label htmlFor="lastName" style={styles.label}>Last Name</Label><br/>
                        <Input type="text" id="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name"/><br/>
                </Col>
            </Row>
        )

        return(
            <div>
                <Form onSubmit={this.handleSubmit} style={styles.body}>
                    <h1 style={styles.title}>{title}</h1>
                    {signupFields}
                    <Row>
                        <Col xs="12" sm="6">
                                <Label htmlFor="email" style={styles.label}>Email</Label><br/>
                                <Input type="email" id="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" required/><br/>
                        </Col>
                        <Col xs="12" sm="6">
                                <Label htmlFor="password" style={styles.label}>Password:</Label><br/>
                                <Input type="password" id="password" onChange={this.handleChange} value={this.state.password} minLength="5" placeholder="Password" required/><br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={this.loginToggle} style={styles.buttonToggle}>{button}</Button>
                            <Button type="submit" style={styles.buttonSubmit}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <div id="error"></div>
            </div>
        )
    }
}

export default Radium(Auth);