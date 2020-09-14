import React, { Component } from 'react'
import axios from 'axios'

export class EditProfileAPI extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             bio:this.props.bio
        }
    }
    

    componentDidMount(){

        console.log('props of edit profile api',this.props)
        console.log('bio in edit profile api',this.props.bio)

        const id=this.props.id

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };

        if(this.props.bio===undefined || this.props.bio===null){

          axios
            .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/")
            .then((response) => {
              console.log("response of edit api -->", response);
              this.props.returnResponse(response)
            })
            .catch((error) => {
              console.log(error["status"]);
              
            
            });

        }
        else{


          axios
      .put("http://127.0.0.1:8020/minitwitter/users/" + id + "/", {
        bio: this.props.bio,
      })
      .then((response) => {
        console.log("response after edit-->", response);
        this.props.returnResponse(response)
        
       
      })
      .catch((error) => {

        const errorCode=error['status']
        this.props.errorCode(errorCode)
        
      });


        }

        
          

    }

    render() {
        
        return (
            <div>
                
            </div>
        )
    }
}

export default EditProfileAPI
