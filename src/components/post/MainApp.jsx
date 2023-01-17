import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import AccountProfile from '../profilewall/AccountProfile.jsx'

class MainApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            renderValue: ''
        }
        this.handleClick.bind();
        this.handleChange.bind();
    }

    handleClick = (e) => {
        e.preventDefault();
        this.redirect();
    }

    handleChange = e => {
        this.setState({ value: e.target.value }, function () {
        });
    };

    redirect() {
        window.location.href = "./profile/" + this.state.value;
    }

    render() {
        return (
            <div className="MainApp">
                <Router>
                    <>
                        <HeaderComponent handleClick={this.handleClick} handleChange={this.handleChange} />
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <AuthenticatedRoute path="/welcome" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/profile/:username" component={AccountProfile} />
                            <AuthenticatedRoute path="/logout" component={LoginComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default MainApp