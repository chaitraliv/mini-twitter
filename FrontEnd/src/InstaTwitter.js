import React, { Component } from 'react'
import './App.css';
import history from './history';

// This is the very first compenent which renders on screen 

export class InstaTwitter extends Component {


  render() {


    return (
      <div className="App">
        {/* Whole page is splitted in two parts */}

          <div className="split left">
            <div className="centered">
                <img src="logo.png" alt="logo InstaTwitter"></img>   
            </div>
            <div id="textInLeft">Hear what people are talking about.</div>
          </div>

          <div className="split right">
            <img src={require('./logo.gif')}  />
            <h1>See what’s happening in the world right now</h1>
            <button id="btn-SignIn" type="Submit" onClick={()=>history.push('/RegistrationPage')} >Sign Up</button>
            <button id="btn-LogIn" type="Submit" onClick={()=>history.push('/LoginPage')} >Log In</button>
          </div>
   
     
    </div>
    )
  }
}

export default InstaTwitter