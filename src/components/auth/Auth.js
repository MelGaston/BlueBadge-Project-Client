import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
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
        const url = this.state.login ? 'http://localhost:3000/api/user/login' : 'http://localhost:3000/api/user/create';

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

        return(
            <Form onSubmit={this.handleSubmit}>
                <h1>{title}</h1>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label><br/>
                            <Input type="text" id="username" onChange={this.handleChange} value={this.state.username}/><br/>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label><br/>
                        <Input type="password" id="password" onChange={this.handleChange} value={this.state.password}/><br/>
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Button onClick={this.loginToggle} color="secondary">Login/Signup Toggle</Button><br/>
                <Button type="submit" color="primary">Submit</Button>
                </Row>
            </Form>
        )
    }
}

export default Auth;