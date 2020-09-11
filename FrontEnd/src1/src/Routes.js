import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import history from './history';
import InstaTwitter from './InstaTwitter';
import Menu from './Components/Menu'
import NewUser from './Components/NewUser'
import UserProfile from './Components/UserProfile'
import CreateEditProfile from './Components/CreateEditProfile'
import HomePage from './Components/HomePage'
import Followers from './Components/Followers'
import Followings from './Components/Followings'
import OtherUserProfile from './Components/OtherUserProfile'




export default class Routes extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            otherUserName:localStorage.getItem('otheUserName'),
        }
    }
    

    render() {
        return (
            <Router history={history}>
                <Switch>
                     <Route path="/" exact component={InstaTwitter} /> 
                    <Route path="/LoginPage" component={LoginPage} />
                    <Route path="/RegistrationPage" component={RegistrationPage} />
                    <Route path="/Menu" component={Menu} />
                    <Route path="/NewUser/:id" component={NewUser} />
                    <Route path="/UserProfile" component={UserProfile} />
                    <Route path="/CreateEditProfile" component={CreateEditProfile} />
                    <Route path="/HomePage" component={HomePage} />
                    <Route path="/Followers" component={Followers} />
                    <Route path="/Followings" component={Followings} />
                    <Route path="/OtherUserProfile" component={OtherUserProfile} />
                    

                    
                </Switch>
            </Router>
        )
    }
}
