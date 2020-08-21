import { Redirect } from "react-router-dom"
import axios from 'axios';
import React, { Component } from "react";

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventCategory: '',
            eventPlace: '',
            eventAddress: '',
            eventInitialDate: '',
            eventFinalDate: '',
            eventType: '',
            eventFile: '',
            isPosted: false
        }
    }

    handleChangeName = event => {
        this.setState({ eventName: event.target.value});
    }

    handleChangeCategory = event => {
        this.setState({ eventCategory: event.target.value});
    }

    handleChangePlace = event => {
        this.setState({ eventPlace: event.target.value});
    }

    handleChangeAdress = event => {
        this.setState({ eventAddress: event.target.value});
    }

    handleChangeInitialDate = event => {
        this.setState({ eventInitialDate: event.target.value});
    }

    handleChangeFinalDate = event => {
        this.setState({ eventFinalDate: event.target.value});
    }

    handleChangeType = event => {
        this.setState({ eventType: event.target.value});
    }

    handleChangeFile = event => {
        this.setState({ eventFile: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const eventData = new FormData();
        eventData.set('event_name', this.state.eventName);
        eventData.set('event_category', this.state.eventCategory);
        eventData.set('event_place', this.state.eventPlace);
        eventData.set('event_address', this.state.eventAddress);
        eventData.set('event_initial_date', this.state.eventInitialDate);
        eventData.set('event_final_date', this.state.eventFinalDate);
        eventData.set('event_type', this.state.eventType);
        eventData.set('thumbnail', this.state.eventFile);

        axios.post(`http://localhost:8080/api/events/`,
        eventData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${this.props.usertoken}`
                }
            })
            .then(res => {
                this.setState({isPosted: true})
            }).catch(error => {
                console.log(error);
            })
    }

    drawForm(){
        return(
            <form onSubmit={this.handleSubmit}>
                    <h1>Create a new event</h1>

                    <div className="form-group">
                        <label>What is the name of the event?</label>
                        <input type="text" className="form-control" placeholder="Event name" onChange={this.handleChangeName}/>
                    </div>

                    <div className="form-group">
                        <label>Select event's category:</label>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChangeCategory}>
                            <option value="CURSE">Course</option>
                            <option value="CONGRESS">Congress</option>
                            <option value="SEMINAR">Seminar</option>
                            <option value="CONFERENCE">Conference</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Where will the event take place?</label>
                        <input type="text" className="form-control" placeholder="Event's place" onChange={this.handleChangePlace}/>
                    </div>

                    <div className="form-group">
                        <label>What is the adress of the place?</label>
                        <input type="text" className="form-control" placeholder="Event's address"  onChange={this.handleChangeAdress}/>
                    </div>

                    <div className="form-group">
                        <label>what is the initial date of the event?</label>
                        <div className='input-group date' id='datetimepicker1'>
                            <input type='date' className="form-control" name="initialDate" onChange={this.handleChangeInitialDate}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>what is the final date of the event?</label>
                        <div className='input-group date' id='datetimepicker1'>
                            <input type='date' className="form-control" onChange={this.handleChangeFinalDate}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Select event's type:</label>
                        <select className="form-control" id="exampleFormControlSelect2" name="type" onChange={this.handleChangeType}>
                            <option value="VIRTUAL">Virtual</option>
                            <option value="PRESENCIAL">Presencial</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label>Select event's image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" name="file" onChange={this.handleChangeFile}></input>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Create event</button>

                </form>
        )
    }

    drawContent(){
        if(this.state.isPosted){
            return(<Redirect to='/events'/>)
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