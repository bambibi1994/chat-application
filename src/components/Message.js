//React Components
import React from "react";

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='col-sm-6'>
                <div className="card card-view">
                    <p>ID: {this.props.id}</p>
                    <p>Message: {this.props.message}</p>
                    <p>time: {Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit',
                     day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' 
                     }).format(this.props.time)}</p>
                </div>
            </div>
        );
    }
}

export default Message;