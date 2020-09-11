import React, { Component } from 'react'
import './Menu.css'
import history from './../history';
import axios from 'axios';
import { Link,withRouter } from 'react-router-dom';
import logo from './logo.png'



// This component will render the navigation menu , tweet box on upper side and  search bar

export class Menu extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username:'user',
            firstname:'first name',
            lastname:'last name',
            id:this.props.id,
            tweets:null,
            isFollowing:'',
            tweetError:"",
            following_person:'',
            allUsers:[]
        }
       
    }
    
    // on click function to open the profile of user
    clickEventProfile=event=>{

        event.preventDefault();
        history.push('/minitwitter/userprofile/'+this.state.id)

    }
    
    // onclick function to provide home page which displays the timeline
    clickEventHome=event=>{

        event.preventDefault();
        history.push('/minitwitter/timeline/')

    }

    // onclick function to provide Followers page which displays the list of followers
    clickEventFollowers=event=>{

        event.preventDefault();
        history.push('/minitwitter/followers/'+this.state.id)

    }

     // onclick function to provide Followings page which displays the list of followings
    clickEventFollowings=event=>{

        event.preventDefault();
        history.push('/minitwitter/following/'+this.state.id)

    }

     // onclick function to post the tweet 
    clickEventPostTweet=event=>{

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        console.log('tweets-->',this.state.tweets)
        
        axios
        .post('http://127.0.0.1:8020/minitwitter/tweets/',{'content':this.state.tweets})
        .then(response=>{
            console.log('posting tweet -->',response)
            if(response['status']===201){

                
                alert('Tweet Posted')
                history.push('/minitwitter/userprofile/'+this.state.id)
                this.setState({tweets:''})
            }
   
        })
        .catch(error=>{
            console.log(error);
        })
        

    }

     // onclick function to logout 

    clickEventLogout=event=>{

        localStorage.clear('token') 

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }
        axios
        .get('http://127.0.0.1:8020/minitwitter/current_user/')
        .then(response=>{
            console.log(response)    // will return 200 code if token is null
            if(response['status']===200){

                event.preventDefault();
               history.push('/')

            }
            
        })
        .catch(error=>{
            if(error.response['status']===401){
                console.log('State:Logged Out')
                history.push('/')
            }
            else{
                console.log('State:Logged In')
            }
        })
        
    }

    // onclick function to follow the user
    followUserBtn=(userid,event)=>{

        console.log(userid)
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }


        const following_id = parseInt(userid)
        console.log('follow id- ',following_id)
        axios
        .post('http://127.0.0.1:8020/minitwitter/users/'+following_id+'/followings/',{'following_id':following_id})
        .then(response=>{
            console.log('follow-->',response) 
            console.log('IN MENU response of follow button-->',response)   
            
            if(response['status']===201){
                console.log('Followed Successfully!')
                history.push('/minitwitter/following/'+this.state.id)

            }
            
        })
        .catch(error=>{
            if(error.response['status']===406){
                console.log('already followed')
                alert('User already followed!')
                history.push('/minitwitter/following/')
            }
            else if(error.response['status']===400){
                console.log('following yourself')
                alert('You cannot follow yourself!')
                history.push('/minitwitter/userprofile/'+this.state.id)
            }
            else if(error.response['status']===500){
                console.log('following yourself')
                alert('already followed')
                history.push('/minitwitter/timeline/')
            }
        })



    }

    //onclick function to view the profile of other user
    viewProfileBtn=(userid,event)=>{

        console.log(userid)
        localStorage.setItem('otherUserName',userid)
        history.push('/minitwitter/userprofile/'+userid)


    }

     // onchange function to make the tweet from textarea present in upper menu part
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

    checkFollowing=username=>{

        const followingData=this.props.followingData

        console.log('checkFollowing array-->',followingData)


                let item=followingData.filter(index=>index.following.username===username)
                console.log('check item->',item)
                if(item.length===0){
                    return true;
                }
                else{return false;}
                

        

        
    }

    // function  calls bydefault whenever this component will  get mount on screen
    componentDidMount=()=>{


        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }


        axios
        .get('http://127.0.0.1:8020/minitwitter/current_user/')
        .then( response=>{
                console.log('menu-->',response)
                this.setState({
                    username:response.data.username,
                    firstname:response.data.first_name,
                    lastname:response.data.last_name,
                    id:response.data.id,
                })

                let loggedUserData={
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                username:this.state.username,
                id:this.state.id
                }

                this.props.loggedUserData({loggedUserData})

        })
        .catch(error=>{
           
            if(error['status']===400 || error['status']===401){
                history.push('/')
            }
        })
        
        axios
        .get('http://127.0.0.1:8020/minitwitter/users/')
        .then( response=>{
                console.log('menu all users-->',response)
                
                // const userArray=response.data
            
                this.setState({
                    
                    allUsers: response.data,
                })
                
                

        })
        .catch(error=>{
           
            // console.log(error.response['status'])
            if(error['status']===400 || error['status']===401){
                history.push('/')
            }
        })



        
    }



    

    render() {

        const{tweets,allUsers}=this.state
        console.log('followingss->',this.props.followingData)

        return (
            <div className="Menu">
                {/* Renders the side menu */}
                <div className="sideMenu">
                    <div id="user-info">
                        <div id="menu-fullname">{this.state.firstname} {this.state.lastname} </div>
                        <div id="menu-username">@{this.state.username}</div>
                        
                    </div>
                    <div>
                        <img src={logo} alt="logo"></img>
                    </div>

                    <div>
                        <button type="button" 
                        onClick={this.clickEventHome}>
                            {/* <i class="fa fa-home"></i> */}
                            Home
                        </button>
                    </div>

                    <div>
                        <button type="button" 
                        onClick={this.clickEventProfile}>
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
                         onClick={this.clickEventLogout}>
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
                            onClick={this.clickEventPostTweet}>Post Tweet</button> :
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
                          
                                                { this.checkFollowing(user.username)===true ?
                                                <button id="follow-button" onClick={()=>{this.followUserBtn(user.id)}}>follow</button>:

                                                <button id="follow-button"
                                                onClick={()=>{history.push('/minitwitter/following/'+this.state.id)}} >
                                                    following
                                                </button>
                                                


                                            }
        
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

export default withRouter(Menu);



