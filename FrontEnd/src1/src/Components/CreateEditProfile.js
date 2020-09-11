import React, { Component } from 'react'
import Menu from './Menu'
import './CreateEditProfile.css'
import axios from 'axios'
import history from './../history';
import {loggedUserData} from './Menu'

// This component will render the profile page of user where user can edit their personal
export class CreateEditProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname:null,
            lastname:null,
            username:'',
            bio:null,
            id:0,
            token:localStorage.getItem('token')

        }
    }
    
    // This function will call automatically whenever this component get call
    componentDidMount=()=>{

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }
        
            const id= localStorage.getItem('id')
        

        axios
        .get('http://127.0.0.1:8020/minitwitter/users/'+id+'/')
        .then(response=>{
            console.log('before edit -->',response)

            if(response['status']==200){

                this.setState({
                    firstname:response.data.user['first_name'],
                    lastname:response.data.user['last_name'],
                    username:response.data.user['username'],
                    bio:response.data['bio'],
                    id:response.data['id'],
                })
                
            }
        })
        .catch(error=>{
            console.log(error['status']);
            if(error['status']==504){
                history.push('/')
            }
        })
        
    }


    // Function to edit and update the input values of First name Last name and bio of the user
    updateInputValue=event=>{
        this.setState({

            [event.target.name]:event.target.value
        });
    }


    // Function for onclick to save the edit
    clickEvent=event=>{

        console.log(this.state)

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        const id = localStorage.getItem('id')
        axios
        .put('http://127.0.0.1:8020/minitwitter/users/'+id+'/',{"bio":this.state.bio})
        .then(response=>{
            console.log('after edit-->',response)

            event.preventDefault();
            alert('Changes saved')
            
            
        })
        .catch(error=>{
            console.log(error.response['status']);
        })
        
        
    }

    // Render the whole UI for edit profile form of user
    render() {

        return (
            <div>
                <Menu />
                <div className="Profile-">
                    <div id="label-upper"> Edit Profile </div>
                    <div className="profileForm">

                    <form>
                        <label id="label-create-edit-profile">First Name</label>
                        <input type="text"
                        id="firstname"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.updateInputValue}>

                        </input>

                        <label id="label-create-edit-profile">Last Name</label>
                        <input type="text"
                        id="lastname"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.updateInputValue}>
                        </input>

                        <label id="label-create-edit-profile">User Name</label>
                        <input type="text"
                        id="userName"
                        name="username"
                        maxLength="100"
                        value={this.state.username}>
                        </input>

                        <label id="label-create-edit-profile">Bio</label>
                        <input type="text"
                        id="bio-"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.updateInputValue}>

                        </input>

                        <button type="button"
                        onClick={this.clickEvent}>
                            SAVE
                        </button>

                    </form>

                    </div>
                   
                
                    
                </div>
            </div>
        )
    }
}

export default CreateEditProfile
