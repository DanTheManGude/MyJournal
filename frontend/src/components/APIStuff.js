import React, { Component } from 'react';
import { EntryBlurb } from './EntryBlurb.js';

export class APIStuff extends Component {
    constructor(props) {
        super(props);

        this.NewEntry = this.NewEntry.bind(this);
        this.handleTLDR = this.handleTLDR.bind(this);
        this.handleFull = this.handleFull.bind(this);
        this.submitEntry = this.submitEntry.bind(this);
        this.showEntries = this.showEntries.bind(this);


        this.hostname = (process.env.NODE_ENV === 'production') ? '//myjournal-backend.herokuapp.com' : '//localhost:3030';
    }

    state = {
        response:<img id="loading" src="./DGS.png" alt="Loading" width="120" height="120" />

    };

    componentDidMount() {
        this.showEntries();
    }

    showEntries(){
        this.callApi()
          .then(res => this.setState({"response" : "entries", "entries" : res.entries}))
          .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(this.hostname + '/api/entries');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    NewEntry(event) {
        this.setState({"response" : "newEntry"})
        this.setState({"newEntry" : {
            "time" : (new Date()).getTime(),
            "tldr" : "",
            "full" : ""
        }})
    }

    submitEntry(event) {

        this.showEntries();
    }

    handleTLDR(event) {
        this.setState({"newEntry" : {...this.state.newEntry,
            "tldr" : event.target.value
        }})
    }

    handleFull(event){
        this.setState({"newEntry" : {...this.state.newEntry,
            "full" : event.target.value
        }})
    }

    render() {
        switch (this.state.response) {
            case "entries":
                return (
                    <div>
                        <button type="button" onClick={this.NewEntry} className="btn btn-success">New Entry</button>
                        {this.state.entries.map(entry =>
                            <li key={entry.time}>
                                <EntryBlurb state={entry}/>
                            </li>
                        )}
                    </div>
                );
                break;
            case "newEntry":
                return (
                    <div>
                        {/*Edit form*/}
                        <div className="form-group">
                            <label className="control-label">TLDR: </label>
                            <input type="text" className="form-control" value={this.state.newEntry.tldr} placeholder="1 line description" onChange={this.handleTLDR}/>
                            <label className="control-label">Full Entry: </label>
                            <input type="text" className="form-control" value={this.state.newEntry.full} placeholder="Full entry here" onChange={this.handleFull}/>
                        </div>
                        <button type="button" onClick={this.showEntries} className="btn btn-danger">Cancel</button>
                        <button type="button" onClick={this.submitEntry} className="btn btn-success">Submit Entry</button>
                    </div>
                );
                break;
            default:
                return (this.state.response);
        }
    }
}
