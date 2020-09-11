import React, { Component } from 'react'
import './UserProfile.css'
import Menu from './Menu'
import history from './../history';
import axios from 'axios'

export class UserProfile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             username:null,
             firstname:null,
             lastname:null,
             bio:null,
             tweets:[],
             token:localStorage.getItem('token')
             
        }
    }

    clickForEdit=event=>{
        event.preventDefault();
        const id = localStorage.getItem('id')
        history.push('/CreateEditProfile')

    }

    clickForFollowers=event=>{
        event.preventDefault();
        history.push('/Followers')

    }

    clickForFollowing=event=>{
        event.preventDefault();
        history.push('/Followings')

    }

    componentDidMount=()=>{

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'token '+localStorage.getItem('token')
        }

        const id= localStorage.getItem('id')
        const following_id= parseInt(id)
        axios
        .get('http://127.0.0.1:8020/minitwitter/users/'+following_id+'/')
        .then(response=>{
            console.log('logged user profile -->',response)
            // const userData=response.data[0]
            // const tweetsArray=response.data[1]

            if(response['status']==200){

                this.setState({
                    firstname:response.data.user.first_name,
                    lastname:response.data.user.last_name,
                    username:response.data.user.username,
                    bio:response.data.bio,
                    tweets:response.data.user.tweets
                })
                
            }
        })
        .catch(error=>{
            // console.log(error.response['status']);
            // if(error.response['status']==504){
            //     history.push('/')
            // }
        })
    }
    
    render() {

       const{tweets}=this.state
    //    const flag='tr'
        return (
            <div>
             <Menu />  
            <div className="Profile">
                <div id="upper-portion">{this.state.firstname}  {this.state.lastname}
                </div>

                <i class="fa fa-user-alt"></i>
                <div id="full-name">{this.state.firstname}  {this.state.lastname}</div>
                <div id="user-id">@{this.state.username}</div>
                <div id="user-id">{this.state.bio}</div>
                <button id="tweets-available">Tweets</button>
                <div className="tweets">
                        <h4 id="tweets">
                        
                        {tweets.map(tweet => (
                                <h4 key={tweet.id}><div id="tweetuser"><i class="fa fa-user-circle"></i>@{this.state.username}<br/></div><div id="user-tweet"><div id="twitter">{tweet.content}</div></div></h4>
                            ))}
                        </h4>
                </div>
                <button id="edit" type="button" onClick={this.clickForEdit}>Edit</button>
                {/* <button id="followers" type="button" onClick={this.clickForFollowers}>Followers</button>
                <button id="following" type="button" onClick={this.clickForFollowing}>Following</button> */}
                
             
            </div>
            </div>
            
        )
    }
}

export default UserProfile