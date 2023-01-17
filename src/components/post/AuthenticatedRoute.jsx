import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../../api/main/AuthenticationService.js'
import axios from 'axios'
export const TOKEN_KEY = 'auth-token'
export const USER_KEY = 'auth-user'

class AuthenticatedRoute extends Component {
    constructor(props) {
        super(props);
        this.setupAxiosInterceptors();
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_KEY);
        return user != null;
    }
    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = sessionStorage.getItem(TOKEN_KEY);
                }
                return config
            }
        )
    }
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <div className="content-wrapper"><div className="main-content"><Route {...this.props}/></div></div>
        } else {
            return <Redirect to="/login" />
        }
    }
}

export default AuthenticatedRoute