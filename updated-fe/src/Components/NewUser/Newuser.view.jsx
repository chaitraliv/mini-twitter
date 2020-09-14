import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom'
import "./Newuser.css";
// import { withRouter} from 'react-router-dom'

// This component will render welcome note and option of create profile whenever

export class NewUser extends Component {
  constructor(props) {
    super(props);

    console.log('props of new user component-->',this.props)

  }

  buttonClick = (event) => {
    event.preventDefault();
    this.props.history.push("/minitwitter/userprofile/edit/" + this.props.match.params.id);
  };
   


  render() {
      console.log('in render-- of new user component')
    return (
      
        <div className="Pages-">
          <h1>Welcome To Twitter</h1>
          <button id="welcome" type="button" onClick={this.buttonClick}>
            Create Profile
          </button>
        </div>
      
    );
  }
}

export default withRouter(NewUser);
