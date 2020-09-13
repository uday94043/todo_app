import React, { Component } from 'react'
import './TodoApp.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from'./AuthenticatedRoute'
import LoginComponent from './LoginComponent'
import ListTodosComponent from './ListTodosComponent'
import HeaderComponent from './HeaderComponent'
import WelcomeComponent from'./WelcomeComponent'
import LogoutComponent from './LogoutComponent'
import todoComponent from './todoComponent'

class TodoApp extends Component {
    render() {
        return (
            <div>
                
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} /> 
                        <AuthenticatedRoute path="/todos/:id" component={todoComponent} />
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                        <Route path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent />
                </Router>
                
                {/*<LoginComponent />
                <WelcomeComponent/>*/}
             </div>
            )
    }
}



class FooterComponent extends Component {

    render() {
        return (
            <div>
                <hr/>
                <footer className="footer">
                    <span className="text-muted">
                        contact info
                    </span>
                </footer>
            </div>
        )
    }

}


function ErrorComponent(){
    return (
        <div> Error occured, Invalid url</div>
    )
}



export default TodoApp