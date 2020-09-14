import React, { Component } from 'react'
import axios from 'axios'

export class CurrentUserAPI extends Component {

    componentDidMount(){


        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }


        axios
        .get('http://127.0.0.1:8020/minitwitter/current_user/')
        .then( response=>{
                console.log('response of current user api -->',response)
                this.props.getLoggedUser(response)
                

        })
        .catch(error=>{

            console.log(error)
            const errorCode=error['status']
            this.props.errorCode(errorCode)
           
            
        })

    }


    render() {
        return (
            <div>
            </div>
        )
    }
}

export default CurrentUserAPI
