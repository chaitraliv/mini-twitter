import React, { Component, Fragment } from "react";
import { Router, Switch, Route} from "react-router-dom";

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






export default class Routes extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            otherUserName:localStorage.getItem('otheUserName'),
            id:0,
            username:'',
            firstname:'',
            lastname:'',
            followingData:[],
            unfollowId:0

        }

    }
    loggedUserData=data=>{
        console.log('parent router-->',data.loggedUserData.id)
        this.setState({
            id:data.loggedUserData.id,
            username:data.loggedUserData.username,
            firstname:data.loggedUserData.firstname,
            lastname:data.loggedUserData.lastname
        })
    }

    followingData=data=>{

        console.log('following array ->',data)
        data.map(val=><div>{console.log(val.following.first_name)}</div>)
        this.setState({

            followingData:Object.assign([],data)

        })
        
        console.log('in route follow-',this.state.followingData)

        
        
        
    }


    components(){

        return (
            <Fragment>

            
                    

                          <switch>

                          <Menu loggedUserData={this.loggedUserData}
                                followingData={this.state.followingData}/>

                            <Route path={`/minitwitter/newuser/:id`} render={props=>(<NewUser {...props}
                                   loggedUserId={this.state.id}

                            />)}
                            />

                            <Route path={`/UserProfile/:id`} 
                                    render={props=>(<UserProfile {...props} 
                                    loggedUserId={this.state.id}
                                    loggedUserName={this.state.username} />)} 
                            />
                            <Route path={`/CreateEditProfile/:id`} 
                                    component={CreateEditProfile} 
                            />

                            <Route path="/HomePage" render={props=>(<HomePage {...props}
                                   loggedUserId={this.state.id}

                            />)}
                                    
                            />

                            <Route path={`/Followers/:id`} render={props=>(<Followers {...props}
                                    loggedUserName={this.state.username}
                                    loggedUserFirstName={this.state.firstname}
                                    loggedUserLastName={this.state.lastname}
                                    followingData={this.state.followingData}
                                    unfollowId={this.state.unfollowId}
                            />)} />
                            <Route path={`/Followings/:id`} render={props=>(<Followings {...props}
                                    loggedUserName={this.state.username}
                                    loggedUserFirstName={this.state.firstname}
                                    loggedUserLastName={this.state.lastname}
                                    followingData={this.followingData} 
                            />)} />

                            
                            </switch>
        
    
            </Fragment>);
    }
    

    render() {
        return (
            <div>
            <Router history={history}>
                <Switch>
                     <Route path="/" exact component={InstaTwitter} /> 
                    <Route path="/LoginPage" component={LoginPage} />
                    <Route path="/RegistrationPage" component={RegistrationPage} />
                    {this.components()}
                    

                    
                </Switch>
            </Router>
            </div>
        )
    }
}

