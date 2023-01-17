import React from "react";
import AuthenticationService from "./AuthenticationService";
import {Login} from "../login/login";
import {Register} from "../login/register";
import {Alert} from "react-bootstrap";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            registerSuccessful: false,
            registerFailShow: false,
            registerSuccessShow: false,
            show: false
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        if (AuthenticationService.isUserLoggedIn()) {
            window.location.replace('/welcome')
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRegister(values) {
        AuthenticationService.registerNewAccount(
            values.email,
            values.username,
            values.firstname,
            values.lastname,
            values.password,
            values.retypepassword
        ).then(response => {
            if (response.status === 200) {
                this.setState({registerSuccessful: true})
                this.setRegisterSuccessShow(true);

                this.changeState();

            }
        }).catch(() => {
            this.setState({showSuccessMessage: false});
            this.setState({hasLoginFailed: true});
            this.setRegisterFailShow(true);
        });
    }

    handleLogin() {
        AuthenticationService.executeJwtAuthenticationService(
            this.state.username,
            this.state.password
        ).then(response => {
            AuthenticationService.saveToken(response.data.token);
            AuthenticationService.saveUser(response.data);
            window.location.replace('/welcome')
        }).catch(() => {
            this.setState({showSuccessMessage: false});
            this.setState({hasLoginFailed: true});
            this.setShow(true);
        });
    }

    changeState() {
        this.setState(prevState => ({isLogginActive: !prevState.isLogginActive}));
    }

    setShow = (value) => {
        this.setState({
            show: value
        });
        setTimeout(() => {
            this.setState({show: false})
        }, 2000);
    }

    setRegisterFailShow = (value) => {
        this.setState({
            registerShow: value
        });
        setTimeout(() => {
            this.setState({registerShow: false})
        }, 2000);
    }

    setRegisterSuccessShow = (value) => {
        this.setState({
            registerSuccessShow: value
        });
        setTimeout(() => {
            this.setState({registerSuccessShow: false})
        }, 2000);
    }

    render() {
        const isLogginActive = this.state.isLogginActive;

        return (
            <div className="App">
                <div className="LoginComponent">
                    <div className="Description">
                        <h1>Share<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Task</h1>
                        <p>
                            A fully-responsive, mobile friendly social media built with <b>ReactJS</b>,
                            <b> Springboot</b>, <b>Maven</b>, <b>MySQL</b>.
                        </p>
                    </div>

                    <Alert className={"fix-alert"} show={this.state.show} variant={"danger"}
                           onClose={() => this.setShow(false)} dismissible>
                        <Alert.Heading>Oh snap! You got an error</Alert.Heading>
                        <p>
                            The credentials you put in just now is <code>Invalid</code>. Please try again.
                        </p>
                    </Alert>

                    <Alert className={"fix-alert"} show={this.state.registerFailShow} variant={"danger"}
                           onClose={() => this.setRegisterFailShow(false)} dismissible>
                        <Alert.Heading>Hmmm! We got a problem</Alert.Heading>
                        <p>
                            It could be invalid credential. Or we ran out of money to host the backend :(.
                        </p>
                    </Alert>

                    <Alert className={"fix-alert"} show={this.state.registerSuccessShow} variant={"success"}
                           onClose={() => this.setRegisterSuccessShow(false)} dismissible>
                        <Alert.Heading>Look who just got an account!</Alert.Heading>
                        <p>
                            Just type in your username and password now to join the community!
                        </p>
                    </Alert>

                    <div className="login">

                        <div className="container">
                            {!isLogginActive && (
                                <Login
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleLogin}
                                    containerRef={ref => (this.current = ref)}
                                    changeState={this.changeState}
                                />
                            )}
                            {isLogginActive && (
                                <Register
                                    containerRef={ref => (this.current = ref)} handleChange={this.handleChange}
                                    handleRegister={this.handleRegister}
                                    changeState={this.changeState}
                                />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
