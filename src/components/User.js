//React Components
import React from "react";
//My Own Components
import MyFirebase from "../utility/MyFirebase";

class User extends React.Component {
    //Constructor of class
    constructor() {
        super();
        this.IdContent = React.createRef();
        this.state = {
            id: "",
            login: false
        }
        this.firebaseDBRef = MyFirebase.getFirebaseRef().child("userID");
    }
    //Handle Login when User click log in
    handleLogin() {
        let LoginId = this.IdContent.current.value;
        if (LoginId.length > 1) {
            this.setState({
                id: this.IdContent.current.value,
                login: true
            }, () => this.firebaseDBRef.set({userId: this.state.id, login: this.state.login}));
        } else {
            alert('Invalid Id!!! Id must have more than 1 characters');
        }
    }
    //Handle LogOut when User click log out
    handleLogout() {
        this.setState({
            id: "",
            login: false
        },  () => this.firebaseDBRef.set({userId: this.state.id, login: this.state.login}));
    }
    //Render Element when return to parent class
    render() {
        let idArea, passwordArea, buttonArea;
        if (this.state.login) {
            //User have log in
            idArea = <div><h1>Hello {this.IdContent.current.value}</h1></div>;
            buttonArea = <div><button className="btn btn-info" onClick={this.handleLogout.bind(this)}>Log Out</button></div>;
        } else {
            //User have not log in
            idArea = <div><textarea ref={this.IdContent} className='title-textarea' placeholder="Enter You ID"></textarea></div>;
            buttonArea = <div><button className="btn btn-info" onClick={this.handleLogin.bind(this)}>Log In</button></div>;
        }
        return (
            <div>
                {idArea}
                {passwordArea}
                {buttonArea}
            </div>
        );
    }
}

export default User;