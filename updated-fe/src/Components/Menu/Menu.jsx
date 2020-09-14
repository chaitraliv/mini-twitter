import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import CurrentUserAPI from './../../APIs/CurrentUserAPI'
import MenuPage from './Menu.view'
import PostTweetAPI from './../../APIs/PostTweetAPI'

export class Menu extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             firstname:'',
             lastname:'',
             id:0,
             tweet:'',
             shouldCallUI:false,
             shouldCallPostTweetAPI:false
        }
    }
    
    setLoggedUserData=response=>{
        console.log('logged user data from current user api-->',response)
        this.setState({
            username:response.data.username,
            firstname:response.data.first_name,
            lastname:response.data.last_name,
            id:response.data.id,
            shouldCallUI:true
        },
        ()=>console.log('ckecking set data-->',this.state.username))

        this.props.loggedUserData(this.state)
    }

    checkErrorCode=code=>{

        console.log('error code-->',code)

        if(code===400 || code===401){
        this.props.history.push('/')
        }

    }
    

    postTweet=tweet=>{

        console.log('tweet in parent Menu--',tweet)
        this.setState({tweet:tweet , shouldCallPostTweetAPI:true})
    }

    checkResponse=response=>{

        console.log('response of post tweet api-- ',response)

        if(response['status']===201){

            this.props.history.push('/minitwitter/userprofile/'+this.state.id)

        }
    }
    

    render() {
        const{shouldCallUI,shouldCallPostTweetAPI}=this.state
        let loggedUserData={
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            username:this.state.username,
            id:this.state.id
            }
        
        return (
            <div>
                <CurrentUserAPI getLoggedUser={this.setLoggedUserData}
                                    errorCode={this.checkErrorCode}/>
                {
                    shouldCallUI===true ?
                    <MenuPage loggedUserData={loggedUserData}
                            postTweet={this.postTweet}
                            
                />:
                    null
                }

                {   
                    shouldCallPostTweetAPI===true ?
                    <PostTweetAPI tweet={this.state.tweet}
                                    returnResponse={this.checkResponse}
                     />:
                    null
                }
                
                
            </div>
        )
    }
}

export default withRouter(Menu)
