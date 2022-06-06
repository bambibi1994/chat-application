//React Components
import React from 'react';
//My Own Components
import User from './User';
import ChatBox from './ChatBox';
import '../css/Main.css';

class Main extends React.Component {
    render() {
        return (
            <div className='main-body'>
                <div >
                    <User />
                </div>
                <div>
                    <ChatBox />
                </div>
            </div>

        );
    }
}

export default Main;