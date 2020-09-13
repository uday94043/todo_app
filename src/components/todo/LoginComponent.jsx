import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'


class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    loginClicked() {
        // if (this.state.username === 'in28minutes' && this.state.password === 'dummy') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     this.setState({
        //         showSuccessMessage: true,
        //         hasLoginFailed: false
        //     })
        // } else {
        //     this.setState({
        //         showSuccessMessage: false,
        //         hasLoginFailed: true
        //     })
        // }
        AuthenticationService.executeBasicAuthenticationService(this.state.username,this.state.password)
        .then(
            () =>{
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.props.history.push(`/welcome/${this.state.username}`)
                this.setState({
                showSuccessMessage: true,
                hasLoginFailed: false
                })
            }

        )
        .catch(
            () => {
                this.setState({
                    showSuccessMessage: false,
                    hasLoginFailed: true
                })
            }
        )
    }

    handleChange(event) {
        //console.log(this.state)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} showSuccess={this.state.showSuccessMessage}/>*/}
                    {this.state.hasLoginFailed && <div className="aler alert-warning"> Invalid Credentials </div>}
                    {/*{this.state.showSuccessMessage && <div> Successful Login </div>}*/}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className="btn" onClick={this.loginClicked}>login</button>
                </div>
            </div>
        )
    }


/*function ShowInvalidCredentials(props) {
    if (props.hasLoginFailed) {
        return <div> Invalid Credentials </div>
    } else if (props.showSuccess) {
        return <div> Successful Login </div>
    }
    return null
}*/
}

export default LoginComponent