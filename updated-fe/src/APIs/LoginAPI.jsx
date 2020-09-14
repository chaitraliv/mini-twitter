import React, { Component, Fragment } from 'react'
import axios from 'axios'
export class LoginAPI extends Component {
    
    componentDidMount(){

        console.log('login api props-->',this.props)

        const{username,password}=this.props.loginDetails
            axios
                .post("http://127.0.0.1:8020/minitwitter/login/", {
                  username: username,
                  password: password,
                })
                .then((response) => {
                  console.log("login-", response);
                  if (response["status"] === 200) {
                    const userToken = response.data.token;
                    console.log("token after rgtn ", response.data.token);
                    localStorage.setItem("token", userToken);
                    this.props.loginResponse(userToken)
                    
                    
                  } else {
                    alert(`Server Error Token is empty! `);
                    console.log("Token is empty");
                  }
                });
    }
    render(){
        return(
            <Fragment/>
            
        )
    }
}

export default LoginAPI
