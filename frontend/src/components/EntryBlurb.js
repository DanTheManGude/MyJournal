import React from 'react';

export class EntryBlurb extends React.Component {

    render() {
        return (<span>
            {this.props.state.date}&nbsp;{this.props.state.tldr}
        </span>)
    }
}
