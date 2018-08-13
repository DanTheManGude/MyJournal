import React, { Component } from 'react';
import { store } from '../index.js';
const axios = require('axios');

export class APIStuff extends Component {
    constructor(props) {
        super(props);

        this.state = {"status" : "loading"};

        this.hostname = (process.env.NODE_ENV === 'production') ? '//myjournal-backend.herokuapp.com' : '//localhost:3030';
    }

    componentDidMount() {
        this.showEntries();
    }

    showEntries = () => {
        axios.get(this.hostname + '/api/entries')
        .then(res => {
            this.setState( {
                "status" : "showEntries",
                "entries" : res.data.entries
            }
        )})
        .catch(err => {
            console.log(err);
        });
    }

    newEntry = () => {
        this.setState({"status" : "newEntry"})
        var timeOptions = {
            weekday : 'long',
            year : 'numeric',
            month : 'long',
            day : 'numeric',
            hour : 'numeric',
            minute : 'numeric',
            timeZoneName : 'short'
        }
        var time = new Date().getTime();
        var date = new Date(time).toLocaleString('en-US', timeOptions);
        this.setState({"entry" : {
            "time" : time,
            "date" : date,
            "tldr" : "",
            "full" : ""
        }})
    }

    handleSubmit = () => {
        axios({
            method: 'post',
            url: this.hostname + '/api/entries',
            data: this.state.entry
        }).then(res => {
            //console.log(res.data);
            store.dispatch({
                type: 'ADD_BANNER',
                message: "Successfully created a new Entry",
                'kind': 'alert-success'
            });
            this.showEntries();
        })
        .catch(err => {
            console.log(err);
            store.dispatch({
                type: 'ADD_BANNER',
                message: "Something went wrong when trying to create a new Entry",
                'kind': 'alert-danger'
            });
        });
    }

    handleTLDR = (event) => {
        this.setState({"entry" : {...this.state.entry,
            "tldr" : event.target.value
        }})
    }

    handleFull = (event) => {
        this.setState({"entry" : {...this.state.entry,
            "full" : event.target.value
        }})
    }

    handleBlurb = (time) => {
        axios.get(this.hostname + '/api/entry/' + time)
        .then(res => {
            this.setState({"entry" : {
                "time" : time,
                "date" : res.data.entry.date,
                "tldr" : res.data.entry.tldr,
                "full" : res.data.entry.full
            }});
            this.setState({"status" : "viewEntry"})
        })
        .catch(err => {
            console.log(err);
        });
    }

    updateEntry = () => {
        axios({
            method: 'post',
            url: this.hostname + '/api/entry/' + this.state.entry.time,
            data: this.state.entry
        }).then(res => {
            //console.log(res.data);
            store.dispatch({
                type: 'ADD_BANNER',
                message: "Successfully updated an Entry",
                'kind': 'alert-success'
            });
            this.showEntries();
        })
        .catch(err => {
            console.log(err);
            store.dispatch({
                type: 'ADD_BANNER',
                message: "Something went wrong when trying to update an Entry",
                'kind': 'alert-danger'
            });
        });
    }

    render() {
        switch (this.state.status) {
            case "showEntries":
                return (
                    <div>
                        <button type="button" onClick={this.newEntry} className="btn btn-success">New Entry</button>
                        {this.state.entries.map(entry =>
                            <li key={entry.time}>
                                <span>
                                    {entry.date}
                                    <button className="btn btn-link blurb" onClick={this.handleBlurb.bind(null, entry.time)}>
                                        <strong>{entry.tldr}</strong>
                                    </button>
                                </span>
                            </li>
                        )}
                    </div>
                );
            case "newEntry":
                return (
                    <div>
                        {/*Edit form*/}
                        <div className="form-group">
                            <label className="control-label">TLDR: </label>
                            <input type="text" className="form-control" value={this.state.entry.tldr} placeholder="1 line description" onChange={this.handleTLDR}/>
                            <label className="control-label">Full Entry: </label>
                            <input type="text" className="form-control" value={this.state.entry.full} placeholder="Full entry here" onChange={this.handleFull}/>
                        </div>
                        <button type="button" onClick={this.showEntries} className="btn btn-danger">Cancel</button>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success">Submit Entry</button>
                    </div>
                );
            case "viewEntry":
                return (
                    <div>
                        {/*Update form*/}
                        <div className="form-group">
                            <label className="control-label">TLDR: </label>
                            <input type="text" className="form-control" value={this.state.entry.tldr} placeholder="1 line description" onChange={this.handleTLDR}/>
                            <label className="control-label">Full Entry: </label>
                            <input type="text" className="form-control" value={this.state.entry.full} placeholder="Full entry here" onChange={this.handleFull}/>
                        </div>
                        <button type="button" onClick={this.showEntries} className="btn btn-danger">Cancel</button>
                        <button type="button" onClick={this.updateEntry} className="btn btn-success">Update Entry</button>
                    </div>
                );
            case "loading":
                return (<img id="loading" src="./DGS.png" alt="Loading" width="120" height="120" />);
            default:
                return (<p>Something went wrong :(</p>);
        }
    }
}
