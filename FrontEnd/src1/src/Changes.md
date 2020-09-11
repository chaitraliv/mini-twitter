

------------------------------------ Headers in Axios------------------------------------------------


 post requests->

                    axios.defaults.headers = {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token')
                    }

                    axios.post('http://127.0.0.1:8000/HomePage', { tweet:this.state.tweet },headers)
                        .then(response => {
                            console.log('Response', response.data)
                        })
                        .catch(error => {
                            console.log('Error: ', error.response.data)
                        })

                      

get request-> 

                    axios.defaults.headers = {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token')
                    }
                    axios.get('http://127.0.0.1:8000/Homepage/Timeline',{ username:this.state.username })
                        .then(response => {
                            console.log('Response', response.data)
                        })
                        .catch(error => {
                            console.log('Error: ', error.response.data)
                        })


----------------------------------------- Dynamic Routing-------------------------------------------------------

in Menu.js->

                        showProfile(user_name,event){

                            let requestedUserProfile={}

                            if(user_name===this.state.username){
                                requestedUserProfile={
                                    edit:true,
                                    username:user_name
                                }
                            }
                            else{

                                requestedUserProfile={
                                    edit:false,
                                    username:user_name
                                }

                            }
                            history.push('/UserProfile:'+requestedUserProfile)
                            
                        }

in UserProfile.js->

                        componentDidMount(){

                            username=this.props.match.params.requestedUserProfile.username
                            this.state({
                                allowEdit:this.props.match.params.requestedUserProfile.edit
                            })
                            axios.get('url',{'username':username})
                            .then(response=>{
                                console.log(response)
                            })
                            .catch(error=>{
                                console.log(error.response)
                            })


                        }

                        render(){
                            const{allowEdit}=this.state
                            return(

                                {
                                    allowEdit==true ?(
                                        <button>Edit</button>
                                    ):
                                    null

                                }
                            )
                        }

---------------------------------------- Calling Menu Component ----------------------------------------------------------




