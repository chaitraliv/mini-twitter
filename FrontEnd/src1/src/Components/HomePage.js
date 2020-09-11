import React, { Component } from 'react'
import Menu from './Menu'
import history from './../history';
import axios from 'axios'
import './HomePage.css'
import { Link } from 'react-router-dom';

// This component render the timeline page which is home page of twitter

export class HomePage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
             token:localStorage.getItem('token'),
             timelineArray:[],
             timelineContent:[]
                  
            
        }
    }

    // This function will get call automatically whenever this component will maount and will set the required feilds
    componentDidMount=()=>{

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        const id=localStorage.getItem('id')
        axios
        .get('http://127.0.0.1:8020/minitwitter/tweets/',id)
        .then(response=>{
            console.log('response of timeline-',response)

            if(response['status']==200){

                const tweetArray=response.data
                const{timelineArray,timelineContent}=this.state

                tweetArray.map(tweet=>(

                    timelineArray.push(tweet)
                ))
                
                console.log(timelineArray)
                this.setState({
                    timelineContent:timelineArray
                })

                // it will return the array which have data of timeline
                console.log(timelineContent)  
                
            }
        })
        .catch(error=>{
           
            console.log(error.response['status'])
            if(error.response['status']==401){
                history.push('/')
            }
        })
        
    }

    // This function will provide the profile details of clicked user
    viewProfile=(userid,event)=>{

        console.log(userid)
        localStorage.setItem('otherUserName',userid)
        history.push('/OtherUserProfile')
    }
    

    render() {
        const{timelineArray,timelineContent}=this.state
        return (
            <div>
                
                <Menu />

                <div className="timeline">

                    <div className="tweets-timeline"><div id="tweets-timeline-content">{timelineContent.map(tweet => (
                                <h4 key={tweet.id}>
                                    <div id="each-content">

                                        <div id="tweet-full-name">
                                        <i class="fa fa-user-circle"></i>
                                            {tweet.user.first_name} {tweet.user.last_name} 
                                            {/* <div id="tweet-user-name"> */}
                                                <Link id="tweet-user-name" onClick={()=>{this.viewProfile(tweet.user.id)}}>
                                                <span>@{tweet.user.username}</span>
                                                </Link> 
                                            {/* </div> */}
                                        </div>

                                        <div id="tweet-content">
                                            {tweet.content}
                                        </div>
                                    </div>
                                </h4>
                            ))}
                        </div>
                </div>

                </div>
            </div>
        )
    }
}

export default HomePage
