import { Redirect } from "react-router-dom"
import axios from 'axios';
import React, { Component } from "react";

export default class Events extends Component {
    state = {
        events: [],
        currentEvent: 0,
        seeEvent: false
    }

    componentDidMount() {
        axios.get(`http://172.24.98.144:8080/api/events/`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${this.props.userToken}`
            }
        })
          .then(res => {
            const events = res.data;
            this.setState({events: res.data});
        })
    }

    onClick(key){
        this.setState({currentEvent: key.id, seeEvent: true})
    }

    drawForm(){
        return (
            <div className="auth-inner-table">
                <h1>My events</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Place</th>
                            <th scope="col">Address</th>
                            <th scope="col">Initial Date</th>
                            <th scope="col">Final Date</th>
                            <th scope="col">Event type</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.events.map((event) => {
                        return(
                            <tr key={event.id}>
                                <td>{event.event_name}</td>
                                <td>{event.event_category}</td>
                                <td>{event.event_place}</td>
                                <td>{event.event_address}</td>
                                <td>{event.event_initial_date}</td>
                                <td>{event.event_final_date}</td>
                                <td>{event.event_type}</td>
                                <td><button className="btn btn-primary btn-block" onClick={() => this.onClick(event)}>Event</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    drawContent(){
        if(this.state.seeEvent){
            return(<Redirect to={{pathname:'/event', state: {id: this.state.currentEvent, token: this.props.userToken}}}/>)
        }
        else{
            return this.drawForm();
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