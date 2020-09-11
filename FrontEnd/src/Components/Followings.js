import React, { Component } from 'react'
import './Followings.css'
import history from './../history';
import axios from 'axios'
import { Link } from 'react-router-dom';


export class Followings extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            
            username:null,
             followings:[],
             msg:'',
             id:this.props.match.params.id
        }
    }

    viewProfile=(otherUserid,event)=>{

        console.log('here',otherUserid)
        const otheruserid = parseInt(otherUserid)
        localStorage.setItem('otherUserName',otheruserid)
        history.push('/minitwitter/userprofile/'+otheruserid)
    }
    
    componentDidMount(){
        

            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: "token "+localStorage.getItem('token')
            }

            const userid = this.props.match.params.id
            
            axios
            .get('http://127.0.0.1:8020/minitwitter/users/'+userid+'/followings/')
            .then(response=>{
                console.log('following people -->',response)
                const followingsArray=response.data
                this.props.followingData(response.data)
                // this.props.unfollowId(response.data.id)
    
                if(response['status']===200){
    
                    this.setState({
                        
                        followings:followingsArray
                    })
                    
                }
                
                
            })
            .catch(error=>{
                console.log(error)
                // console.log(error.response['status']);
                // if(error.response['status']===401){
                //     console.log('State Logged Out')
                //     history.push('/')
                // }
            })
            
        
    }
    
    // onclick function to unfollow the user
    unfollowUserBtn=(userid,event)=>{

        console.log(userid)

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

       const following_id= parseInt(userid)
       const id=this.props.match.params.id

        axios
        .delete('http://127.0.0.1:8020/minitwitter/users/'+id+'/followings/'+following_id+'/',{'id':id,'following_id':following_id})
        .then(response=>{
            console.log(response)    
            if(response['status']===204){
               console.log('UnFollowed Successfully!')
                history.push('/minitwitter/timeline/')

            }
            if(response['status']===208){
                console.log('Please follow again!')
                 history.push('/minitwitter/timeline/')
 
             }
            
        })
        .catch(error=>{
            if(error.response['status']===406){
                console.log('already unfollowed')
                history.push('/minitwitter/following/')
            }
            else if(error.response['status']===400){
                console.log('unfollowing yourself')
                history.push('/minitwitter/userprofile/'+this.state.id)
            }
        })



    }
    clickeventfollowers=event=>{
        const id=this.props.match.params.id
        console.log('id through params in followings->',this.props)
        this.props.history.push('/minitwitter/followers/'+id)
    }
    clickeventfollowings=event=>{
        const id=this.props.match.params.id
        console.log('id through params in followings->',this.props)
        this.props.history.push('/Followings/'+id)
    }

    render() {
        
        const{followings}=this.state
        return (
            <div>
                
                <div className="UserFollowings">
                <div id="logeed-fullname">{this.props.loggedUserFirstName} {this.props.loggedUserLastName}</div>
                <div id="logeed-username">@{this.props.loggedUserName}</div>
                <div id="upper-buttons">  
                    <button id="btn--followers" onClick={()=>{this.clickeventfollowers()}}> Followers</button>
                    <button id="btn--followings" onClick={()=>{this.clickeventfollowings()}}>Followings</button>
                 </div>

                <div id="followers-list"> 
                    {followings.map(follow => (
                                <div key={indexedDB}>
                                <div id='following-fullname'><i className="fa fa-user-circle"></i>{follow.following.first_name} {follow.following.last_name}</div>
                                <div id="followings-username">
                                    <Link onClick={()=>{this.viewProfile(follow.following.id)}}>
                                        @{follow.following.username}
                                    </Link>
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
