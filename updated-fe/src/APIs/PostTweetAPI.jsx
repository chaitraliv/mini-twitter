import React, { Component } from 'react'
import axios from 'axios'

export class PostTweetAPI extends Component {


    componentDidMount(){


        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        console.log('props in make tweet api -- ',this.props.tweet)
        
        axios
        .post('http://127.0.0.1:8020/minitwitter/tweets/',{'content':this.props.tweet})
        .then(response=>{
            console.log('posting tweet -->',response)
            this.props.returnResponse(response)
            // if(response['status']===201){

                
            //     alert('Tweet Posted')
            //     history.push('/minitwitter/userprofile/'+this.state.id)
            //     this.setState({tweets:''})
            // }
   
        })
        .catch(error=>{
            console.log(error);
            this.props.errorCode(error['status'])
        })
        
    
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default PostTweetAPI
