import axios from 'axios';
import { Redirect } from "react-router-dom"
import React, { Component } from "react";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isLoggedIn: this.props.isLoggedIn
        }
    }


    handleChangeUserName = event => {
        this.setState({ userName: event.target.value });
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const userData = new FormData();
        userData.set('username', this.state.userName);
        userData.set('password', this.state.password);

        axios.post(`http://localhost:8080/api/api-auth/`,
            userData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                this.props.submitToken(res.data.auth_token)
            }).catch(error => {
                console.log(error);
            })
    }

    drawLogin(){
        return(
            <form onSubmit={this.handleSubmit}>
            <h1>Sign In</h1>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Enter username" onChange={this.handleChangeUserName}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChangePassword}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
        )
    }

    drawContent(){
        if(this.state.isLoggedIn){
            return(<Redirect to='/events'/>)
        }
        else{
            return this.drawLogin();
        }
    }

    render() {

        return (
            <div className="auth-inner">
                {this.drawContent()}
            </div>
        );
    }
}