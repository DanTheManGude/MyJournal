import React from 'react';

export class EntryBlurb extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(this.props.state)
        return (<span>
            {this.props.state.date}&nbsp;{this.props.state.tldr}
        </span>)
    }
}
