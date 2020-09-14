import React, { Component, Fragment } from "react";
import {  Switch, Route, BrowserRouter as Router} from "react-router-dom";

import Registration from './Components/Registration/Registration'
import Login from './Components/Login/Login'
import LandingPage from './Components/MinitwitterLandingpage/Landingpage.view'
import history from './History'
import NewUser  from "./Components/NewUser/Newuser.view";
import Menu from './Components/Menu/Menu.jsx'
import EditProfile from './Components/EditProfile/EditProfile' 
import UserProfile from './Components/UserProfile/UserProfile'
import Timeline from './Components/Timeline/Timeline'







export default class Routes extends Component {

    constructor(props) {
        super(props)
    
        this.state = {

            id:0,
            username:'',
            firstname:'',
            lastname:'',
            followingData:[],
            unfollowId:0

        }

    }
    loggedUserData=data=>{
        console.log('parent router-->',data)
        this.setState({
            id:data.id,
            username:data.username,
            firstname:data.firstname,
            lastname:data.lastname
        })
    }

    // followingData=data=>{

    //     console.log('following array ->',data)
    //     data.map(val=><div>{console.log(val.following.first_name)}</div>)
    //     this.setState({

    //         followingData:Object.assign([],data)

    //     })
        
    //     console.log('in route follow-',this.state.followingData)

        
        
        
    // }


    components(){

        return (
            <Fragment>

                
                    
                        <Menu loggedUserData={this.loggedUserData}
                                // followingData={this.state.followingData}
                        />
                          <Switch>


                            <Route exact path={`/minitwitter/newuser/:id`} 
                                   component={NewUser}/>

                            <Route exact path={`/minitwitter/userprofile/edit/:id`} 
                                    render={props=>(<EditProfile {...props}/>) }
                            />
                            
                            <Route exact path={`/minitwitter/userprofile/:id`} 
                                    render={props=>(<UserProfile {...props} 
                                    loggedUserId={this.state.id}
                                    loggedUserName={this.state.username} 
                                    />)} 
                            />

                            <Route exact path="/minitwitter/timeline/" 
                                   render={props=>(<Timeline {...props}
                                   loggedUserId={this.state.id}

                            />)}

                            />


                        </Switch>

                            {/* <Route exact path={`/minitwitter/userprofile/:id`} 
                                    render={props=>(<UserProfile {...props} 
                                    loggedUserId={this.state.id}
                                    loggedUserName={this.state.username} />)} 
                            />
                            <Route exact path={`/minitwitter/userprofile/edit/:id`} 
                                    component={CreateEditProfile} 
                            />

                            <Route exact path="/minitwitter/timeline/" render={props=>(<HomePage {...props}
                                   loggedUserId={this.state.id}

                            />)}
                                    
                            />

                            <Route exact path={`/minitwitter/followers/:id`} render={props=>(<Followers {...props}
                                    loggedUserName={this.state.username}
                                    loggedUserFirstName={this.state.firstname}
                                    loggedUserLastName={this.state.lastname}
                                    followingData={this.state.followingData}
                                    unfollowId={this.state.unfollowId}
                            />)} />
                            <Route  exact path={`/minitwitter/following/:id`} render={props=>(<Followings {...props}
                                    loggedUserName={this.state.username}
                                    loggedUserFirstName={this.state.firstname}
                                    loggedUserLastName={this.state.lastname}
                                    followingData={this.followingData} 
                            />)} /> */}

                            
                
        
    
            </Fragment>);
    }
    
    
    render() {
        return (
            <Fragment>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" exact component={LandingPage} /> 
                    <Route exact path="/minitwitter/login/" component={Login} />
                    <Route exact path="/minitwitter/registration/" component={Registration} />
                    {this.components()}
                    
                </Switch>
            </Router>
            </Fragment>
        )
    }
}


