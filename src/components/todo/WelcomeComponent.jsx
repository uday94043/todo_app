import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from "../../api/todo/HelloWorldService.js"

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage:"",
            isCustomWelcomeClicked:false
        }
        //this.back = this.back.bind(this)
        this.retrievewWelcomeMessage = this.retrievewWelcomeMessage.bind(this)
        this.handleSuccessfulresponse = this.handleSuccessfulresponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render() {
        return (
            <div>
                <h1>welcome</h1>
                <div className="container">Welcome {this.props.match.params.name}, you can manage your Todos <Link to='/todos'>here</Link></div>
                <br></br>
                <div className="container">
                    Click this button for customised welcome from axios 
                    <button onClick= {this.retrievewWelcomeMessage} className ="btn btn-success">Get my welcome</button>
                </div>
                <div>
                    {this.state.isCustomWelcomeClicked && <h2>your custome welcome</h2>}
                    {this.state.welcomeMessage}
                </div>
            </div>
            //<button onClick={this.back}>back</button>
        )
    }

    retrievewWelcomeMessage(){
        HelloWorldService.executeHelloWorldService(this.props.match.params.name)
        .then(response=> this.handleSuccessfulresponse(response))
        .catch(error => this.handleError(error))


        //then is for what to do when we get a successful response .catch is for error
    }
    handleSuccessfulresponse(response){
        this.setState({
            isCustomWelcomeClicked:true,
            welcomeMessage: response.data.message
        })
    }
    handleError(error){
        let errorMessage=''
        errorMessage+=error.message
        if(error.response && error.data.response){
            errorMessage+= error.response.data.message
        }
        this.setState({
            welcomeMessage: errorMessage
        })
    }

    //back() {
    //    this.props.history.go(-1)
    //}
}

export default WelcomeComponent