import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import GetTimelineAPI from './../../APIs/GetTimelineAPI'
import TimelinePage from './Timeline.view'

export class Timeline extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             timelineContent:[],
             shouldCallUI:false
        }
    }
    

    setTimelineData=response=>{
        console.log('response from the time line api in parent--',response)
        const { timelineContent } = this.state;
                this.setState(
                  {
                    timelineContent: response.data,
                    shouldCallUI:true
                  },
                  () => console.log("timeline content-->", timelineContent)
                );
    }
    errorCode=code=>{
          if (code === 401 || code===400) {
                this.props.history.push("/");
            }
    }
    render() {
        const id=this.props.loggedUserId
        const{shouldCallUI}=this.state
        console.log('logged user id in timeline--',this.props.loggedUserId)
        return (
            <div>
                <GetTimelineAPI id={id}
                        returnResponse={this.setTimelineData}
                        errorCode={this.errorCode}
                />
                {
                    shouldCallUI===true ?
                    <TimelinePage timelineContent={this.state.timelineContent}/>:
                    null  
                }
            </div>
        )
    }
}

export default withRouter(Timeline)
