import React, { Component } from "react";
import "./UserProfile.css";
import history from "./../history";
import axios from "axios";

export class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      firstname: null,
      lastname: null,
      bio: null,
      tweets: [],
      id: 0,
    };
  }

  clickForEdit = (event) => {
    const {id}=this.state
    history.push("/minitwitter/userprofile/edit/" + id);
  };

  componentDidMount = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "token " + localStorage.getItem("token"),
    };
    const following_id = this.props.match.params.id;

    console.log("profile ID of logged user-->", following_id);

    axios
      .get("http://127.0.0.1:8020/minitwitter/users/" + following_id + "/")
      .then((response) => {
        console.log("logged user profile -->", response);

        if (response["status"] === 200) {
          this.setState({
            firstname: response.data.user.first_name,
            lastname: response.data.user.last_name,
            username: response.data.user.username,
            bio: response.data.bio,
            tweets: response.data.user.tweets,
            id: this.props.loggedUserId,
          });
        }
      })
      .catch((error) => {
        console.log(error.response["status"]);
        if (
          error.response["status"] === 400 ||
          error.response["status"] === 401
        ) {
          history.push("/");
        }
      });
  };

  render() {
    const { tweets, firstname, lastname, username, bio } = this.state;
    return (
      <div>
        <div className="Profile">
          <div id="upper-portion">
            {firstname} {lastname}
          </div>

          <i className="fa fa-user-alt"></i>
          <div id="full-name">
            {firstname} {lastname}
          </div>
          <div id="user-id">@{username}</div>
          <div id="user-id">{bio}</div>
          <button id="tweets-available">Tweets</button>
          <div className="tweets">
            <h4 id="tweets">
              {tweets.map((tweet) => (
                <h4 key={tweet.id}>
                  <div id="tweetuser">
                    <i class="fa fa-user-circle"></i>@{username}
                    <br />
                  </div>
                  <div id="user-tweet">
                    <div id="twitter">{tweet.content}</div>
                  </div>
                  <button id="btn-delete">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </h4>
              ))}
            </h4>
          </div>
          {this.props.loggedUserName === this.state.username ? (
            <button id="edit" type="button" onClick={this.clickForEdit}>
              Edit
            </button>
          ) : null}
          <button
            id="exitbtn"
            onClick={() => {
              history.push("/minitwitter/timeline/");
            }}
          >
            Exit
          </button>
        </div>
      </div>
    );
  }
}

export default UserProfile;
