import React, { Component } from "react";
import "./CreateEditProfile.css";
import axios from "axios";
import history from "./../history";

// This component will render the profile page of user where user can edit their personal
export class CreateEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: null,
      lastname: null,
      username: "",
      bio: null,
    };
  }

  // This function will call after render
  componentDidMount = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "token " + localStorage.getItem("token"),
    };

    console.log("props of create edit component--", this.props);

    const id = this.props.match.params.id;

    axios
      .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/")
      .then((response) => {
        console.log("before edit -->", response);

        if (response["status"] === 200) {
          this.setState({
            firstname: response.data.user["first_name"],
            lastname: response.data.user["last_name"],
            username: response.data.user["username"],
            bio: response.data["bio"],
            id: response.data.user["id"],
          });
        }
      })
      .catch((error) => {
        console.log(error["status"]);
        if (error["status"] === 504) {
          history.push("/");
        }
      });
  };

  // Function to edit and update the input values of First name Last name and bio of the user
  updateInputValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Function for onclick to save the edit
  clickEvent = (event) => {
    const id = this.props.match.params.id;

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "token " + localStorage.getItem("token"),
    };

    axios
      .put("http://127.0.0.1:8020/minitwitter/users/" + id + "/", {
        bio: this.state.bio,
      })
      .then((response) => {
        console.log("after edit-->", response);

        event.preventDefault();
        alert("Changes saved");
        history.push("/minitwitter/userprofile/" + id);
      })
      .catch((error) => {
        console.log(error.response["status"]);
        if (error.response["status"] === 400) {
          alert("empty feilds not allowed!!");
        }
      });
  };

  // Render the whole UI for edit profile form of user
  render() {
    const { firstname, lastname, bio, username } = this.state;

    return (
      <div>
        <div className="Profile-">
          <div id="label-upper"> Edit Profile </div>
          <div className="profileForm">
            <form>
              <label id="label-create-edit-profile">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={this.updateInputValue}
              ></input>

              <label id="label-create-edit-profile">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={this.updateInputValue}
              ></input>

              <label id="label-create-edit-profile">User Name</label>
              <input
                type="text"
                id="userName"
                name="username"
                maxLength="100"
                value={username}
              ></input>

              <label id="label-create-edit-profile">Bio</label>
              <input
                type="text"
                id="bio-"
                name="bio"
                value={bio}
                onChange={this.updateInputValue}
              ></input>

              <button type="button" onClick={this.clickEvent}>
                SAVE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEditProfile;
