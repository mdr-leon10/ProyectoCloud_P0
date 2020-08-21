import { Redirect } from "react-router-dom"
import axios from 'axios';
import React, { Component } from "react";

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            isDeleted: false
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/api/events/${this.props.location.state.id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${this.props.location.state.token}`
            }
        })
          .then(res => {
            const event = res.data;
            this.setState({event: res.data});
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        console.log(`${this.props.location.state.token}`)

        axios.delete(`http://localhost:8080/api/events/${this.props.location.state.id}`,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${this.props.location.state.token}`
                }
            })
            .then(res => {
                this.setState({isDeleted: true})
                console.log(res);
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            })
    }

    onClick(){
        return(<Redirect to='/events'/>)
    }

    drawForm(){
        return(
            <div className="auth-inner-table">
                <form onSubmit={this.handleSubmit}>
                    <h1>{this.state.event.event_name}</h1>
                    <div>
                    <label> Event's category:</label>
                        <h6>{this.state.event.event_category}</h6>
                    </div>

                    <div>
                    <label> Event's place:</label>
                        <h6>{this.state.event.event_place}</h6>
                    </div>

                    <div>
                    <label> Event's place address:</label>
                        <h6>{this.state.event.event_address}</h6>
                    </div>

                    <div>
                    <label> Event's initial date:</label>
                        <h6>{this.state.event.event_initial_date}</h6>
                    </div>

                    <div>
                    <label> Event's final date:</label>
                        <h6>{this.state.event.event_final_date}</h6>
                    </div>

                    <div>
                    <label> Event's final date:</label>
                        <h6>{this.state.event.event_type}</h6>
                    </div>

                    <div>
                        <button className="btn btn-primary btn-block">Edit Event</button>
                        <button type="submit" className="btn btn-primary btn-block">Delete Event</button>
                    </div>

                </form>
            </div>

                
        )
    }

    drawContent(){
        console.log(this.state.isDeleted)
        if(this.state.isDeleted){
            return(<Redirect to={{pathname:'/events'}}/>)
        }
        else{
            return this.drawForm();
        }
    }


    render() {
      
        return (
            <div className="auth-inner-table">
                {this.drawContent()}
            </div>
        );
    }

}