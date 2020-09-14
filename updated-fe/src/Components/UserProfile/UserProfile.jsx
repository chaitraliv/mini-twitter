import React, { Component } from 'react'
import UserProfilePage from './UserProfile.view'
import EditProfileAPI from './../../APIs/EditProfileAPI'
import {withRouter} from 'react-router-dom'

export class UserProfile extends Component {


    constructor(props) {
        super(props)
    
        this.state = {

             shouldCallUI:false,
             tweets:[],
             firstname:'',
             lastname:'',
             username:'',
             id:0,
             bio:''
        }
    }

    

    setUserData=response=>{
        console.log('response from user profile api-->',response)
        this.setState({
                  firstname: response.data.user["first_name"],
                  lastname: response.data.user["last_name"],
                  username: response.data.user["username"],
                  bio: response.data["bio"],
                  id: response.data.user["id"],
                  tweets:response.data.user.tweets,
                  shouldCallUI:true
                })
        
    }
    errorCode=code=>{
        console.log(code)
          if (code === 504 || code===401 || code===400) {
                this.props.history.push("/");
              }
        
    }
    
    render() {

        const{shouldCallUI}=this.state

        return (
            <div>
                <EditProfileAPI id={this.props.loggedUserId}
                returnResponse={this.setUserData}
                errorCode={this.errorCode}
                        
                />
                {
                    shouldCallUI===true ?
                    <UserProfilePage userData={this.state}
                    loggedUserName={this.props.loggedUserName}
                    
                    />:
                    null
                }
                
            </div>
        )
    }
}

export default withRouter(UserProfile)
