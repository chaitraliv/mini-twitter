import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import RegistrationPage from './Registration.view'


export class Registration extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             firstname:'',
             lastname:'',
             email:'',
             password:''
        }
    }
    


    userDetails=dataObject=>{
        console.log('details of constructor-->',dataObject)
        this.setState({
            username:dataObject.username,
            firstname:dataObject.firstname,
            lastname:dataObject.lastname,
            email:dataObject.email,
            password:dataObject.password
        })
        return null

    }
    render() {
        return (
            <Fragment>
                <RegistrationPage 
                    userData={this.userDetails}
                
                />
            </Fragment>
        )
    }
}

export default withRouter(Registration)
