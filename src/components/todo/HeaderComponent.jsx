import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router'

class HeaderComponent extends Component {

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <div>
                        <a href = "/" className="navbar-brand"> TODO APP</a>
                    </div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to='/welcome/in28minutes'>Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to='/todos'>todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to='/login'>login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to='/logout' onClick={AuthenticationService.logout}>logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }

}
export default withRouter(HeaderComponent)
