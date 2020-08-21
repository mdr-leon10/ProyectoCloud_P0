import { Redirect } from "react-router-dom"
import axios from 'axios';
import React, { Component } from "react";

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {}
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

    onClick(){
        return(<Redirect to='/events'/>)
    }

    drawForm(){
        return(
            <div class="columns">
                <h1>{this.state.event.event_name}</h1>
                <div class="column"> Column 1 </div>
                <div class="column"> 
                    <div>
                        <label> Event's category:</label>
                        <h5>{this.state.event.event_name}</h5>
                    </div>

                    <div>
                    <label> Event's category:</label>
                        <h5>{this.state.event.event_category}</h5>
                    </div>

                    <div>
                    <label> Event's place:</label>
                        <h5>{this.state.event.event_place}</h5>
                    </div>

                    <div>
                    <label> Event's place address:</label>
                        <h5>{this.state.event.event_address}</h5>
                    </div>

                    <div>
                    <label> Event's initial date:</label>
                        <h5>{this.state.event.event_initial_date}</h5>
                    </div>

                    <div>
                    <label> Event's final date:</label>
                        <h5>{this.state.event.event_final_date}</h5>
                    </div>

                    <div>
                    <label> Event's final date:</label>
                        <h5>{this.state.event.event_type}</h5>
                    </div>

                    <div>
                        <button className="btn btn-primary btn-block">Edit Event</button>
                        <button className="btn btn-primary btn-block">Delete Event</button>
                    </div>
                </div>
            </div>
        )
    }


    render() {
      
        return (
            <div className="auth-inner-table">
                {this.drawForm()}
            </div>
        );
    }

}