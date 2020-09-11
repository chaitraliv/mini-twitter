import React, { Component } from "react";
import "./Followers.css";
import history from "./../history";
import axios from "axios";
import { Link } from "react-router-dom";

export class Followers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followers: [],
      msg: "",
      unfollow: [],
    };
  }

  viewProfile = (otheruserid, event) => {
    console.log(otheruserid);
    localStorage.setItem("otherUserName", otheruserid);
    history.push("/minitwitter/userprofile/" + otheruserid);
  };

  // onclick function to follow the user
  followUserBtn = (userid, event) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "token " + localStorage.getItem("token"),
    };
    const id = parseInt(userid);
    const loggedId = this.props.match.params.id;
    axios
      .post("http://127.0.0.1:8020/minitwitter/users/" + id + "/followings/", {
        following_id: id,
      })
      .then((response) => {
        console.log("successfully followed", response);

        if (response["status"] === 201) {
          console.log("Followed Successfully!");
          history.push("/minitwitter/following/" + loggedId);
        } else if (response["status"] === 208) {
          console.log("User unfollowed!!");
          history.push("/minitwitter/timeline/");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // onclick function to unfollow the user
  unfollowUserBtn = (userid, event) => {
    console.log(userid);
    const { unfollow } = this.state;

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "token " + localStorage.getItem("token"),
    };

    const id = this.props.match.params.id;
    console.log("param id", id);

    axios
      .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/followings/")
      .then((response) => {
        console.log("following in followers call people -->", response);

        if (response["status"] === 200) {
          console.log("following in followers call people -->", response.data);

          this.state.unfollow.push(response.data);
          console.log("array unfollow-->", unfollow);
          console.log("id getting on click unfollowBTN-->", userid);

          let unfollowid;

          for (let i = 0; i < response.data.length; i++) {
            console.log("response user id-->", response.data[i]["user"]["id"]);

            if (id == response.data[i]["user"]["id"]) {
              console.log("jhaaallll", response.data[i]["id"]);
              unfollowid = response.data[i]["id"];
              console.log("id to send in unfollow url--", unfollowid);
            }
          }

          axios
            .delete(
              "http://127.0.0.1:8020/minitwitter/users/" +
                id +
                "/followings/" +
                unfollowid +
                "/",
              { id: id, following_id: unfollowid }
            )
            .then((response) => {
              console.log("follower unfollow-->", response);

              if (response["status"] === 204) {
                console.log("UnFollowed Successfully!");
                history.push("/minitwitter/following/" + id);
              } else if (response["status"] === 208) {
                console.log("User already followed!!");
                history.push("/minitwitter/following/" + id);
              }
            })
            .catch((error) => {
              if (error.response["status"] === 406) {
                console.log("already unfollowed");
                history.push("/minitwitter/following/");
              } else if (error.response["status"] === 400) {
                console.log("unfollowing yourself");
                history.push("/minitwitter/userprofile/" + id);
              }
            });
        }
      })

      .catch((error) => {
        console.log(error);
        console.log(error.response["status"]);
        if (error.response["status"] === 401) {
          console.log("State Logged Out");
          history.push("/");
        }
      });
  };

  clickeventfollowers = (event) => {
    const id = this.props.match.params.id;
    console.log("id through params in followings->", this.props);
    history.push("/minitwitter/followers/" + id);
  };
  clickeventfollowings = (event) => {
    const id = this.props.match.params.id;
    console.log("id through params in followings->", this.props);
    history.push("/minitwitter/following/" + id);
  };

  componentDidMount() {
    if (this.state.followers[0] === "") {
      history.push("./HomePage");
      alert("No Any Followers!");
    } else {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: "token " + localStorage.getItem("token"),
      };

      // const id = localStorage.getItem("id");
      const id = this.props.match.params.id;
      axios
        .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/followers/", {
          id: id,
        })
        .then((response) => {
          console.log("followers response -->", response.data);

          this.setState(
            {
              followers: response.data,
            },
            () =>
              console.log("followers data from set-->", this.state.followers)
          );

          if (response.status === 200) {
            this.setState(
              {
                followers: response.data,
              },
              () =>
                console.log("followers data from set-->", this.state.followers)
            );
          }
          if (response["status"] === 206) {
            console.log(response.data.message);

            return response.data.message;
          }
        })
        .catch((error) => {
          console.log(error.response["status"]);
          if (
            error.response["status"] === 400 ||
            error.response["status"] === 400
          ) {
            history.push("/");
          }
        });
    }
  }

  isFollowing = (username) => {
    const followingData = this.props.followingData;

    console.log("checkFollowing array in followers file-->", followingData);

    let item = followingData.filter(
      (index) => index.following.username === username
    );
    console.log("check item->", item);
    if (item.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const{loggedUserFirstName,loggedUserLastName,loggedUserName}=this.props
    return (
      <div>
        <div className="UserFollowers">
          <div id="logeed-fullname">
            {loggedUserFirstName} {loggedUserLastName}
          </div>
          <div id="logeed-username"> @{loggedUserName}</div>
          <div id="upper-buttons">
            <button
              id="btn-followers"
              onClick={() => {
                this.clickeventfollowers();
              }}
            >
              {" "}
              Followers
            </button>
            <button
              id="btn-followings"
              onClick={() => {
                this.clickeventfollowings();
              }}
            >
              Followings
            </button>
          </div>

          <div id="followers-list">
            {this.state.followers.map((follow) => (
              <div key={follow.user.id}>
                <div id="followers-fullname">
                  <i class="fa fa-user-circle"></i>
                  <label id="followers-fullname">
                    {follow.user.first_name} {follow.user.last_name}
                  </label>
                </div>
                <div id="followers-username">
                  <Link
                    onClick={() => {
                      this.viewProfile(follow.user.id);
                    }}
                  >
                    @{follow.user.username}
                  </Link>
                  {this.isFollowing(follow.user.username) === true ? (
                    <div id="view-profile-btn">
                      <button
                        type="button"
                        onClick={() => {
                          this.followUserBtn(follow.user.id);
                        }}
                      >
                        follow
                      </button>
                    </div>
                  ) : (
                    <div id="unfollow-followers-btn">
                      <button
                        type="button"
                        onClick={() => {
                          this.unfollowUserBtn(follow.following.id);
                        }}
                      >
                        unfollow
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Followers;
