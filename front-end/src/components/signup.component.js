import { Redirect } from "react-router-dom"
import axios from 'axios';
import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            emailAddress: '',
            password: '',
            isLoggedIn: this.props.isLoggedIn 
          }
    }

    handleChangeFirstName = event => {
        this.setState({ firstName: event.target.value });
    }

    handleChangeLastName = event => {
        this.setState({ lastName: event.target.value });
    }

    handleChangeUserName = event => {
        this.setState({ userName: event.target.value });
    }

    handleChangeEmailAddress = event => {
        this.setState({ emailAddress: event.target.value });
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const user = new FormData();
        user.set('username', this.state.userName);
        user.set('first_name', this.state.firtsName);
        user.set('last_name', this.state.lastName);
        user.set('email', this.state.emailAddress);
        user.set('password', this.state.password);

        const userData = new FormData();
        userData.set('username', this.state.userName);
        userData.set('password', this.state.password);

        axios.post(`http://localhost:8080/api/create-user/`, 
        user,
        { 
            headers: {
                'Content-Type': 'multipart/form-data', 
            }
        }
        )
        .then(res => {
            console.log(res);
            console.log(res.data);
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
        }).catch(error => {
            console.log(error);
        })
    };


    drawSignUp (){
        return(
            <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={this.handleChangeFirstName}/>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={this.handleChangeLastName}/>
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" onChange={this.handleChangeUserName}/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleChangeEmailAddress}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChangePassword}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>
        )
    }

    drawContent(){
        if(this.state.isLoggedIn){
            return(<Redirect to='/events'/>)
        }
        else{
            return this.drawSignUp();
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