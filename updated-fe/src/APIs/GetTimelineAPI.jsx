import React, { Component } from 'react'
import axios from 'axios'

export class GetTimelineAPI extends Component {

    componentDidMount(){
        console.log('props of timeline api--',this.props)
        const id = this.props.id
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token")
        };
      
          axios
            .get("http://127.0.0.1:8020/minitwitter/tweets/",{'id':id})
            .then((response) => {
              console.log("response of timeline-", response);
              this.props.returnResponse(response)
            })
            .catch((error) => {
              console.log(error.response["status"]);
              this.props.errorCode(error.response["status"])
            
            });
    }



    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default GetTimelineAPI
