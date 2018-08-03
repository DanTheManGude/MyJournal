import React, { Component } from 'react';
import { EntryBlurb } from './EntryBlurb.js';

export class APIStuff extends Component {
    constructor(props) {
        super(props);

        this.hostname = (process.env.NODE_ENV === 'production') ? '//myjournal-backend.herokuapp.com' : '//localhost:3030';
    }

    state = {
        response:<img id="loading" src="./DGS.png" alt="Loading" width="120" height="120" />

    };

    componentDidMount() {
        this.callApi()
          .then(res => this.setState({"response" : "entries", "entries" : res.entries}))
          .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(this.hostname + '/entries');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        switch (this.state.response) {
            case "entries":
            console.log(this.state)
                return (
                    <div>
                        {this.state.entries.map(entry =>
                            <li key={entry.time}>
                                <EntryBlurb state={entry}/>
                            </li>
                        )}
                    </div>
                );
                break;
            default:
                return ("wat");
        }
    }
}
