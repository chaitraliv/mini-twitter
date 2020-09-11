import React, { Component } from "react";
import "./RegistrationPage.css";
import history from "./history";
import axios from "axios";
import logo from './logo.png'

// regular expression for validating email-id entered by user
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);



// component to render Register Page
export class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      firstname: null,
      lastname: null,
      id: 0,
      errors: {
        firstname: "please enter name",
        lastname: " please enter last name",
        username: "please enter username",
        email: "please enter mail-id",
        password: "please set password",
      },
    };
  }

  // Function to perform action on button click
  clickEvent = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8020/minitwitter/users/", {
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }) // link of backend api
      .then((response) => {
        console.log(response);

        if (response["status"] === 201) {
          console.info("Valid Form");
          console.log(this.state);
          this.setState({
            id: response.data.id,
          });

          axios
            .post("http://127.0.0.1:8020/minitwitter/login/", {
              username: this.state.username,
              password: this.state.password,
            })
            .then((response) => {
              console.log("login-", response);
              console.log("username-", this.state.username);
              if (response["status"] === 200) {
                const userToken = response.data.token;
                console.log("token after rgtn ", response.data.token);
                localStorage.setItem("token", userToken);
                alert(
                  `Hey ${this.state.firstname}.... Registration Successful! `
                );
                history.push("/minitwitter/newuser/" + this.state.id); //Rendering on next page
              } else {
                alert(`Server Error! `);
                console.log("Token is empty");
              }
            });
        }
      })
      .catch((error) => {
        console.log(error.response["status"]);

        if (error.response["status"] === 400) {
          console.log(this.state);
          alert(`Username Already Exist! `);
        }
        if(error.response['status']  === 406){
          console.log(this.state)
          alert(`Special characters are not allowed! `);
        }
      });
  };

  // Function to perform action for onchange event
  onChangeEvent = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    let errors = this.state.errors;

    // for catching the error in object and rendering  appropriate warning on UI
    switch (name) {
      case "firstname":
        errors.firstname =
          value.length < 2 ? "First Name must be 2 characters long!" : "";
        break;

      case "lastname":
        errors.lastname =
          value.length < 2 ? "Last Name must be 2 characters long!" : "";
        break;

      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "username":
        errors.username =
          value.length < 5 ? "First Name must be 5 characters long!" : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }); // error object contains all the feilds as property which have validation error
  };

  render() {
    const {
      username,
      password,
      email,
      firstname,
      lastname,
      
    } = this.state;
    const { errors } = this.state;
    return (
      <div className="reg">
        <h1 id="title">InstaTwitter</h1>
        <img src={logo} alt='logo'></img>
        <div className="box">
          <form>
            <div className="registrationPage">
              <br></br>
              <div id="textRegister">Registration</div>
              <h3 id="tagline">Create your account here!</h3>
              <div>
                <label id="registration-label"> Fisrt Name</label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Enter First Name"
                  name="firstname"
                  value={firstname}
                  required="text"
                  onChange={this.onChangeEvent}
                ></input>
                {errors.firstname.length > 0 && (
                  <span className="error">{errors.firstname}</span>
                )}
              </div>
              <div>
                <label id="registration-label">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Enter Last Name"
                  name="lastname"
                  value={lastname}
                  required=""
                  onChange={this.onChangeEvent}
                ></input>
                {errors.lastname.length > 0 && (
                  <span className="error">{errors.lastname}</span>
                )}
              </div>
              <div>
                <label id="registration-label">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email ID "
                  name="email"
                  value={email}
                  required=""
                  onChange={this.onChangeEvent}
                ></input>
                {errors.email.length > 0 && (
                  <span className="error">{errors.email}</span>
                )}
              </div>

              <div>
                <label id="registration-label">UserName</label>
                <input
                  type="text"
                  id="use-rname"
                  placeholder="Enter username "
                  name="username"
                  value={username}
                  required=""
                  onChange={this.onChangeEvent}
                ></input>
                {errors.username.length > 0 && (
                  <span className="error">{errors.username}</span>
                )}
              </div>
              <div>
                <label id="registration-label">Password</label>
                <input
                  type="password"
                  id="pass-word"
                  placeholder="Set Password of 8 Characters"
                  name="password"
                  value={password}
                  required=""
                  onChange={this.onChangeEvent}
                ></input>

                {errors.password.length > 0 && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              {errors.username === errors.lastname &&
              errors.lastname === errors.username &&
              errors.lastname === errors.email &&
              errors.lastname === errors.password ? (
                <button id="btnSignIn" type="Submit" onClick={this.clickEvent}>
                  Register
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
