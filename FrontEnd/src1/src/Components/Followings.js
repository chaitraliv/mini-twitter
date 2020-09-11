import React, { Component } from 'react'
import Menu from './Menu'
import './Followings.css'
import history from './../history';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {loggedUserData} from './Menu'

export var followingUserArray=[]

export class Followings extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            token:localStorage.getItem('token'),
            username:null,
             followings:[],
             msg:''
        }
    }

    viewProfile=(otherUserid,event)=>{

        console.log('here',otherUserid)
        const otheruserid = parseInt(otherUserid)
        localStorage.setItem('otherUserName',otheruserid)
        history.push('/OtherUserProfile')
    }
    
    componentDidMount(){
        if(this.state.followings[0]=='helo'){
    
            alert('No Any Followings!')
            history.push('./HomePage') 
           
        }
        else{

            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: "token "+localStorage.getItem('token')
            }

            const userid = localStorage.getItem('id')
            
            axios
            .get('http://127.0.0.1:8020/minitwitter/users/'+userid+'/followings/')
            .then(response=>{
                console.log('following people -->',response)
                // const userData=response.data[0]
                const followingsArray=response.data

                // if(response.data.message='Start following !!'){
                //     this.setState({
                //         msg:'Start Following!'
                //     })
                //     return(this.state.msg)
                // }
    
                if(response['status']===200){
    
                    this.setState({
                        
                        // username:userData.username,
                        followings:followingsArray
                    })
                    followingUserArray=this.state.followings
                    // followingUserArray.first_name

                    if(this.state.followings===null || this.state.followings===undefined){

                        alert('No Any Followings!')
                        history.push('./HomePage') 

                    }
                    
                }
                // if(response['status']==206){

                //     this.setState({
                //         msg:'Start Following!'
                //     })
                //     return(this.state.msg)
    
                    
                // }
                
            })
            .catch(error=>{
                console.log(error)
                // console.log(error.response['status']);
                // if(error.response['status']==504){
                //     history.push('/')
                // }
            })
            
        }
    }
    
    // onclick function to unfollow the user
    unfollowUserBtn=(userid,event)=>{

        console.log(userid)
        // const unfollowuser={
        //     token:this.state.token,
        //     otheruser:user

        // }

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        const following_id= parseInt(userid)
        const id = localStorage.getItem('id')
        axios
        .delete('http://127.0.0.1:8020/minitwitter/users/'+id+'/followings/'+following_id+'/',{'id':id,'following_id':following_id})
        .then(response=>{
            console.log(response)    
            if(response['status']==204){
               console.log('UnFollowed Successfully!')
                history.push('/HomePage')

            }
            if(response['status']==208){
                console.log('Please follow again!')
                 history.push('/HomePage')
 
             }
            
        })
        .catch(error=>{
            if(error.response['status']==406){
                console.log('already unfollowed')
                history.push('/Followings')
            }
            else if(error.response['status']==400){
                console.log('unfollowing yourself')
                history.push('/UserProfile')
            }
        })



    }
    clickeventfollowers=event=>{
        history.push('/Followers')
    }
    clickeventfollowings=event=>{
        history.push('/Followings')
    }

    render() {
        const{followings,username}=this.state
        return (
            <div>
                <Menu />
                <div className="UserFollowings">
                <div id="logeed-fullname">{loggedUserData.firstname} {loggedUserData.lastname}</div>
                <div id="logeed-username">@{loggedUserData.username}</div>
                <div id="upper-buttons">  
                    <button id="btn--followers" onClick={()=>{this.clickeventfollowers()}}> Followers</button>
                    <button id="btn--followings" onClick={()=>{this.clickeventfollowings()}}>Followings</button>
                 </div>

                 {/* {
                     this.state.msg=='Start Following!' ?
                        <h3>{this.state.msg}</h3>:
                        null
                 } */}

                <div id="followers-list"> 
                    {followings.map(follow => (
                                <div key={indexedDB}>
                                <div id='following-fullname'><i class="fa fa-user-circle"></i>{follow.following.first_name} {follow.following.last_name}</div>
                                <div id="followings-username">
                                    <Link onClick={()=>{this.viewProfile(follow.following.id)}}>
                                        @{follow.following.username}
                                    </Link>
                                    {/* <div id="view-profile-btn">
                                        <button type="button"
                                        onClick={()=>{this.viewProfile(follow.username)}}>
                                            Profile
                                        </button>
                                        </div> */}
                                        <div id="unfollow-btn">
                                            <button type="button"
                                            onClick={()=>{this.unfollowUserBtn(follow.id)}}>
                                                Unfollow
                                            </button>
                                        </div>
                                </div>
                                </div>
                            ))}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Followings
