//React Components
import React from "react";
//My Own Components
import Message from "./Message";
import MyFirebase from "../utility/MyFirebase";

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.messageContent = React.createRef();
        this.state = {
            messages: [
                // user: User Id
                // body: User Message
                // time: Current Time
            ],
            userId: "",
            login: false
        }
        this.firebaseDBRef = MyFirebase.getFirebaseRef().child("chatBox");
        this.firebaseDBRef.once('value').then((snapshot) => {
            this.addMessage(snapshot.val());
        });
        this.firebaseDBRef2 = MyFirebase.getFirebaseRef().child("userID");
        this.firebaseDBRef2.once('value').then((snapshot) => {
            this.getUserID(snapshot.val());
        });
    }

    getUserID(user) {
        this.state.userId = user["userId"];
        this.state.login = user["login"];

    }

    addMessage(messages) {
        let newMessage = this.messageContent.current.value;
        if (messages) {
            for (let key in messages) {
                this.state.messages.push({
                    id: key,
                    user: messages[key].user,
                    body: messages[key].body,
                    time: messages[key].time
                });
            }
        } else {
            if (newMessage.length > 0) {
                let pushRef = this.firebaseDBRef.push();
                pushRef.set({
                    user: this.state.userId,
                    body: newMessage,
                    time: Date.now()
                });
                this.state.messages.push(
                    {
                      id: pushRef.key,
                      user: this.state.userId,
                      body: newMessage,
                      time: Date.now()
                    }
                  );
            } else {
                console.log("Invalid Message")
            }
        }
        this.firebaseDBRef2.once('value').then((snapshot) => {
            this.getUserID(snapshot.val());
        });
        this.setState({ messages: this.state.messages });
        this.messageContent.current.value = "";
    }

    render() {
        return (
            <div>
                <div className="div-board">
                    <div className="row">
                        { 
                            this.state.messages.map(message => {
                                return <Message key={message.id} id={message.user} message={message.body}
                                 time={message.time} firebaseDBRef={this.firebaseDBRef} />
                            })
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <textarea ref={this.messageContent} className="message-textarea"></textarea>
                    </div>
                    <div>
                        <button className="btn btn-info" onClick={this.addMessage.bind(this, null)}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatBox;