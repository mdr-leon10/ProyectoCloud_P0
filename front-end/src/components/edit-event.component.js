import React, { Component } from "react";

export default class EditEvents extends Component {
    render() {
        return (
            <div className="auth-inner-table">
                <form>
                    <h1>Edit an event</h1>

                    <div className="form-group">
                        <label>What is the name of the event?</label>
                        <input type="text" className="form-control" placeholder="Event name" />
                    </div>

                    <div className="form-group">
                        <label>Select event's category:</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Course</option>
                            <option>Congress</option>
                            <option>Seminar</option>
                            <option>Conference</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Where will the event take place?</label>
                        <input type="text" className="form-control" placeholder="Event's place" />
                    </div>

                    <div className="form-group">
                        <label>What is the adress of the place?</label>
                        <input type="text" className="form-control" placeholder="Event's address" />
                    </div>

                    <div className="form-group">
                        <label>Select event's type:</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Virtual</option>
                            <option>Presencial</option>
                        </select>
                    </div>

                    <div class="form-group">
                    <label>Select event's image</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1"></input>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Create event</button>

                </form>
            </div>
        );
    }
}