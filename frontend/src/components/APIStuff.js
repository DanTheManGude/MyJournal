import React, { Component } from 'react';

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
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(this.hostname + '/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <div>
                {this.state.response}
            </div>
        );
    }
}
