import React, { Component } from 'react'
import './Menu.css'
import history from './../history';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import history from './../history';
export var allUsersArray=[];
export var loggedUserData={
    firstname:'',
    lastname:'',
    username:'',
    id:0
}


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
            allUsers:[],
            allUserFullname:[],
            otheruser:'user',
            tweetError:"",
            token:localStorage.getItem('token'),
            following_person:''
        }
        // this.followUserBtn.bind(this)
    }
    
    // on click function to open the profile of user
    clickEventProfile=event=>{

        event.preventDefault();
        history.push('/UserProfile')

    }
    
    // onclick function to provide home page which displays the timeline
    clickEventHome=event=>{

        event.preventDefault();
        history.push('/HomePage')

    }

    // onclick function to provide Followers page which displays the list of followers
    clickEventFollowers=event=>{

        event.preventDefault();
        history.push('/Followers')

    }

     // onclick function to provide Followings page which displays the list of followings
    clickEventFollowings=event=>{

        event.preventDefault();
        history.push('/Followings')

    }

     // onclick function to post the tweet 
    clickEventPostTweet=event=>{


        console.log(this.state)

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        const id= localStorage.getItem('id')
        axios
        .post('http://127.0.0.1:8020/minitwitter/tweets/',{'content':this.state.tweets})
        .then(response=>{
            console.log('posting tweet -->',response)
            if(response['status']==201){

                alert('Tweet Posted')
                history.push('/UserProfile')  
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
            if(response['status']==200){

                event.preventDefault();
               history.push('/')

            }
            
        })
        .catch(error=>{
            if(error.response['status']==401){
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
        const followuser={
            token:this.state.token,
            // otheruser:user

        }
        
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
            this.setState({
                // following_person:user
            })
            if(response['status']==200){
                console.log('Followed Successfully!')
                history.push('/HomePage')

            }
            
        })
        .catch(error=>{
            if(error.response['status']==406){
                console.log('already followed')
                alert('User already followed!')
                history.push('/Followings')
            }
            else if(error.response['status']==400){
                console.log('following yourself')
                alert('You cannot follow yourself!')
                history.push('/UserProfile')
            }
        })



    }

    //onclick function to view the profile of other user
    viewProfileBtn=(userid,event)=>{

        console.log(userid)
        localStorage.setItem('otherUserName',userid)
        history.push('/OtherUserProfile')


    }

     // onchange function to make the tweet from textarea present in upper menu part
    changeEvent=event=>{
        
        const{name,value}=event.target
        console.log(value.length)
        this.setState({tweetError:null})
        if(value.length>100){

            this.setState({
                tweetError:"oops.. Tweet is too long!"
            })
        }
        if(value.length==0){

            this.setState({
                tweetError:"oops.. Tweet is Empty!"
            })
        }
        
        this.setState({
            tweets:event.target.value
        })

        
    }

    // function  calls bydefault whenever this component will get call or get mount on screen
    componentDidMount=()=>{


        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        
        const token=localStorage.getItem('token')

        axios
        .get('http://127.0.0.1:8020/minitwitter/current_user/')
        .then( response=>{
                console.log('menu-->',response)
                

                // const setusername=response.data[0]
                // const userArray=response.data[1]
                // const userDetails=response.data[2]

                

                this.setState({
                    username:response.data.username,
                    firstname:response.data.first_name,
                    lastname:response.data.last_name,
                    id:response.data.id,
                    // allUsers:Object.values(userArray),
                    // allUserFullname:Object.values(userDetails)
                })
                // allUsersArray=this.state.allUsers
                // console.log(this.state.allUserFullname)
                loggedUserData.firstname=this.state.firstname
                loggedUserData.lastname=this.state.lastname
                loggedUserData.username=this.state.username
                loggedUserData.id=this.state.id

        })
        .catch(error=>{
           
            console.log(error.response['status'])
            if(error.response['status']==504){
                history.push('/')
            }
        })
        const id=localStorage.getItem('id')
        axios
        .get('http://127.0.0.1:8020/minitwitter/users/')
        .then( response=>{
                console.log('menu all users-->',response)
                

                // const setusername=response.data[0]
                const userArray=response.data
                // const userDetails=response.data[2]

                

                this.setState({
                    
                    allUsers: userArray,
                    // allUserFullname:Object.values(userDetails)
                })
                allUsersArray= response.data
                console.log('all users -->',allUsersArray)
                // console.log(this.state.allUserFullname)
                // loggedUserData.firstname=this.state.firstname
                // loggedUserData.lastname=this.state.lastname
                // loggedUserData.username=this.state.username
                // loggedUserData.id=this.state.id

        })
        .catch(error=>{
           
            console.log(error.response['status'])
            if(error.response['status']==504){
                history.push('/')
            }
        })



        // axios
        // .post('http://127.0.0.1:8020/minitwitter/allusers/',this.state)
        // .then( response=>{
        //         console.log(response)
                

        //         const setusername=response.data[0]
        //         const userArray=response.data[1]
        //         const userDetails=response.data[2]

                

        //         this.setState({
        //             username:setusername.username,
        //             firstname:setusername.firstname,
        //             lastname:setusername.lastname,
        //             id:setusername.id,
        //             allUsers:Object.values(userArray),
        //             allUserFullname:Object.values(userDetails)
        //         })
        //         allUsersArray=this.state.allUsers
        //         console.log(this.state.allUserFullname)
        //         loggedUserData.firstname=this.state.firstname
        //         loggedUserData.lastname=this.state.lastname
        //         loggedUserData.username=this.state.username
        //         loggedUserData.id=this.state.id

        // })
        // .catch(error=>{
           
        //     console.log(error.response['status'])
        //     if(error.response['status']==504){
        //         history.push('/')
        //     }
        // })
    }


    render() {

        const{tweets,allUsers,allUserFullname,following_person}=this.state
        
        return (
            <div className="Menu">
                {/* Renders the side menu */}
                <div className="sideMenu">
                    <div id="user-info">
                        <div id="menu-fullname">{this.state.firstname} {this.state.lastname} </div>
                        <div id="menu-username">@{this.state.username}</div>
                        
                    </div>
                    <div>
                        <img src="./logo.png"></img>
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

                    <div id="adjust-f">
                         <button type="button" 
                         onClick={this.clickEventFollowers}>
                             {/* <i class="fas fa-user-friends"></i> */}
                             Follower
                         </button>
                    </div>

                    <div>
                        <button type="button" 
                        onClick={this.clickEventFollowings}>
                            {/* <i class="fa fa-users"></i> */}
                            Following
                        </button>
                    </div>

                    {/* <div>
                         <button type="button">
                             Post Tweet
                         </button>
                    </div> */}
                    
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
                        {/* {
                            this.state.tweetError=="Empty Tweet" ?
                            <button type="button"
                            onClick={this.clickEventPostTweet}>Post Tweet</button> :
                            null

                        } */}
                        
                         </form>
                        
                    </div>
                    {/* <div className="Pages">
                       
                    </div> */}
                    

                </div>
                {/* Will render search bar on opposite side of navigation menu */}
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
                                            
                                            <Link onClick={()=>{this.viewProfileBtn(user.id)}}><div id="other-user-name">{user.username}</div></Link>
                                            {
                                                following_person==user ?
                                                <button id="follow-button" >following</button>:
                                                <button id="follow-button" onClick={()=>{this.followUserBtn(user.id)}}>follow</button>


                                            }
                                            {/* <button id="follow-button" onClick={()=>{this.followUserBtn(user)}}>follow</button> */}
                                            {/* <Link>{allUserFullname[user]}</Link> */}
                                            {/* {isUnfollow==true ?
                                                <button id="follow-button" onClick={()=>{this.unfollowUserBtn(user)}}>Unfollow</button>:
                                                <button id="follow-button" onClick={()=>{this.followUserBtn(user)}}>follow</button>} */}
                                             {/* <button id="visit-profile-button" onClick={()=>{this.viewProfileBtn(user)}}>Profile</button>  */}
                                            
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

export default Menu;



