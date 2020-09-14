import React, { Component } from 'react'
import EditProfileAPI from './../../APIs/EditProfileAPI'
import EditProfilePage from './EditProfile.view'

export class EditProfile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {

            firstname:'',
            lastname:'',
            username:'',
            bio:null,
            id:0,
            edited:'',
            shouldRender:false,
            shouldCallSaveEditAPI:true
             
        }
        console.log('constructor of edit profile--')
    }
    

    componentWillMount(){
        console.log('props of edit profile--',this.props)
    }

    setUserData=response=>{
        console.log('response from edit profile api-->',response)
        this.setState({
                  firstname: response.data.user["first_name"],
                  lastname: response.data.user["last_name"],
                  username: response.data.user["username"],
                  bio: response.data["bio"],
                  id: response.data.user["id"],
                  shouldCallSaveEditAPI:false,
                  shouldRender:true,
                })
        
    }

    errorCode=code=>{
        console.log(code)
          if (code === 504 || code===401 || code===400) {
                this.props.history.push("/");
              }
        this.setState({shouldCallSaveEditAPI:false})
    }

    saveBio=bio=>{
        console.log('edited bio in parent edit profile',bio)
        this.setState({bio:bio, shouldCallSaveEditAPI:true},
            ()=>console.log('bio save in set state--',this.state.bio))

        
        
    }


    
    render() {
        const userid=this.props.match.params.id
        const{firstname,lastname,username,bio,id,shouldRender,shouldCallSaveEditAPI}=this.state
        const userData={
            firstname:firstname,
            lastname:lastname,
            username:username,
            bio:bio,
            id:id
        }
        
        return (
            <div>
                {
                    shouldCallSaveEditAPI===true?
                    <EditProfileAPI id={userid}
                        bio={this.state.bio}
                        returnResponse={this.setUserData}
                        errorCode={this.errorCode}
                    />:
                    null
                }
                {
                    shouldRender===true ?
                    <EditProfilePage userData={userData}
                        saveBio={this.saveBio}
                    />:
                    null

                }
                
                
                
            </div>
        )
    }
}

export default EditProfile
