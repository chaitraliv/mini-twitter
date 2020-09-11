import React, { Component } from "react";
import "./NewUser.css";
import history from "./../history";

// This component will render welcome note and option of create profile whenever

export class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: null,
      lastname: null,
      username: null,
      bio: null,
      id: 0,
    };
  }

  buttonClick = (event) => {
    event.preventDefault();
    history.push("/minitwitter/userprofile/edit/" + this.props.match.params.id);
  };
   
  static getDerivedStateFromProps(state,props){

    console.log('new user id from props-->',props)

    return{id:props.loggedUserId}
  }

  render() {
    return (
      <div>
        {/* <Menu id={this.state.id}/>  */}
        <div className="Pages-">
          <h1>Welcome To Twitter</h1>
          <button id="welcome" type="button" onClick={this.buttonClick}>
            Create Profile
          </button>
        </div>
      </div>
    );
  }
}

export default NewUser;
