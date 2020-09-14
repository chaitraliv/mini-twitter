import React, { Component, Fragment } from "react";
import "./Registration.css";
import logo from './../../logo.png'
import {withRouter} from 'react-router-dom'
import  RegistrationAPI  from './../../APIs/RegistrationAPI'


// regular expression for validating email-id entered by user
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);




// component to render Register Page
export class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      errors: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      },
      isSet:false,
    };
  }

  componentDidMount(){

    console.log('did mount--')
  }


getResponse=response=>{

    console.log('get response--',response)
    console.log('id fetched from registraion response-->',response.data.id)
    alert(`Hey ${this.state.firstname}.... Registration Successful! `);
    this.props.history.push("/minitwitter/newuser/" + response.data.id); //Rendering on next page
}

getErrorCode=code=>{

    if (code === 400) {
        alert(`Username Already Exist! `);
    }
    else if(code  === 406){
        alert(`Special characters are not allowed! `);
    }
    else{
        alert('Server Error!!')
    }
}

apicall=()=>{

    console.log('in api call function--')

    return(
        <div>
            <RegistrationAPI 
                    userDetails={this.state}
                    returnResponse={this.getResponse}  
                    returnErrorCode={this.getErrorCode} 
            />
        </div>
    );

}
  // Function to perform action on button click
  handleRegister = (event) => {

    event.preventDefault()
    this.props.userData(this.state)
    this.setState({isSet:true})

  }

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

              {firstname.length>2 &&
              lastname.length>2 &&
              email.length>7 &&
              username.length>5 &&
              password.length>8 ? (
                <button id="btnSignIn" type="Submit" onClick={this.handleRegister}>
                  Register
                </button>
              ) : null
              }


              {this.state.isSet===true ?
              this.apicall():
              null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(RegistrationPage);
