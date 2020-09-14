
import React, { Component, Fragment } from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from './../../logo.png'
import './Menu.css'

export class MenuPage extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             tweets:'',
             tweetError:"",
             allUsers:[
                 {id:1,
                username:'vishakha'}
             ]
        }
    }
    
    

    handleProfile=event=>{
        event.preventDefault()
        this.props.history.push('/minitwitter/userprofile/'+this.props.loggedUserData.id)
    }
    handlePostTweet=event=>{
        event.preventDefault()
        this.props.postTweet(this.state.tweets)
    }
    handleHome=event=>{
        event.preventDefault()
        this.props.history.push('/minitwitter/timeline/')
    }
    handleLogout=event=>{
        event.preventDefault()
        localStorage.clear('token')
        this.props.history.push('/')

    }

    changeEvent=event=>{
        
        const{value}=event.target
        console.log(value.length)
        this.setState({tweetError:null})
        if(value.length>100){

            this.setState({
                tweetError:"oops.. Tweet is too long!"
            })
        }
        if(value.length===0){

            this.setState({
                tweetError:"oops.. Tweet is Empty!"
            })
        }
        
        this.setState({
            tweets:event.target.value
        })

        
    }


    render() {

        // const{tweets,allUsers}=this.state
        //console.log('followingss->',this.props.followingData)
        const{firstname,lastname,username}=this.props.loggedUserData
        const{tweets,allUsers}=this.state

        return (
        
            
            <div className="Menu">
                {/* Renders the side menu */}
                <div className="sideMenu">
                    <div id="user-info">
                        <div id="menu-fullname">{firstname} {lastname} </div>
                        <div id="menu-username">@{username}</div>
                        
                    </div>
                    <div>
                        <img src={logo} alt="logo"></img>
                    </div>

                    <div>
                        <button type="button" 
                        onClick={this.handleHome}>
                            {/* <i class="fa fa-home"></i> */}
                            Home
                        </button>
                    </div>

                    <div>
                        <button type="button" 
                        onClick={this.handleProfile}>
                            {/* <i class="fa fa-user"></i> */}
                            Profile
                        </button>
                    </div>

                    

                    <div>
                        <button type="button" 
                        onClick={this.clickEventFollowings}>
                            {/* <i class="fa fa-users"></i> */}
                            Following
                        </button>
                    </div>

                    <div id="adjust-f">
                         <button type="button" 
                         onClick={this.clickEventFollowers}>
                             {/* <i class="fas fa-user-friends"></i> */}
                             Followers
                         </button>
                    </div>
                    
                    <div>
                         <button type="button" 
                         onClick={this.handleLogout}>
                             Logout
                        </button>
                    </div>
                

                </div>
                {/* Will render the upper part from where user can tweet */}
                <div className="tweetContainer">
                    <div id='home-label'>
                            <h3>Home</h3>
                    </div>
                    <div className="tweetBox">
                        <form>
                        <textarea
                            value={tweets}
                            name="tweets"
                            placeholder="What's Happening?"
                            onChange={this.changeEvent}>
                        </textarea><br/><br/>
                        <div id="tweetError">{this.state.tweetError}</div>
                       
                        {
                            this.state.tweetError==null ?
                            <button type="button"
                            onClick={this.handlePostTweet}>Post Tweet</button> :
                            null

                        }
                        
                        
                         </form>
                        
                    </div>
                    

                </div>
                {/* Will render all available users on opposite side of navigation menu */}
                <div className="searchUser">
                    <div className="searchBar">
                        {/* <input type="text"
                        placeholder="Search">
                        </input>
                        <button type="button">
                            Search
                        </button> */}

                        <div className="users">
                        <h2>Who to follow</h2>
                            <h4 id="other-users-list">
                            
                             {allUsers.map((user) => (
                                   <div id="for-each"> 
                                        <h4 key={user.id}>
                                            
                                            <Link onClick={()=>{this.viewProfileBtn(user.id)}}>
                                            <div id="other-user-name">{user.username}</div>
                                            </Link>
                          
                                                {/* { this.checkFollowing(user.username)===true ?
                                                <button id="follow-button" onClick={()=>{this.followUserBtn(user.id)}}>follow</button>:

                                                <button id="follow-button"
                                                onClick={()=>{history.push('/minitwitter/following/'+this.state.id)}} >
                                                    following
                                                </button>
                                                


                                            } */}
        
                                        </h4>
                                    </div> 
                                ))} 
                            </h4>
                        </div>
                    </div>


                </div>

                </div>
               
        )
    }




}

export default withRouter(MenuPage)
