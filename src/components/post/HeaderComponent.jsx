import React from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from '../../api/main/AuthenticationService.js'
import SearchBarComponent from './SearchBarComponent.jsx'
import AccountProfileService from '../../api/main/AccountProfileService'
import Logo from './assets/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Avatar from './Avatar';
import {Tooltip, OverlayTrigger} from "react-bootstrap";

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            updateFlag: false,
        }
    }

    componentDidMount() {
        this.refreshInfo()
    }

    refreshInfo() {
        if (AuthenticationService.isUserLoggedIn()) {
            AccountProfileService.getCurrentUser()
                .then(response => this.setState({username: response.data.username}))
        }
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <>
                {isUserLoggedIn && <header>
                    <Navbar expand={"md"} className="navbar navbar-expand-md navbar-dark bg-dark">
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id="tooltip-bottom">Back to home</Tooltip>}><Link to="/welcome"><img src={Logo} alt="Logo" className="logo"/></Link>
                        </OverlayTrigger>
                        <SearchBarComponent/>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                        <Navbar.Collapse id="basic-navbar-nav">
                            <ul className="navbar-nav navbar-collapse justify-content-end">
                                <OverlayTrigger key="bottom" placement="bottom"
                                                overlay={<Tooltip id='tooltip-bottom'>Visit your profile</Tooltip>}>
                                    <li className={"toProfile"}><Avatar username={this.state.username}/>
                                        <Link className="nav-link" to={'/profile/' + this.state.username}>{this.state.username}</Link>
                                        </li>
                                </OverlayTrigger>
                                <Link className="nav-link d-md-none" to="/welcome">Home</Link>
                                <li><Link className="nav-link" name="logout" to="/logout"
                                          onClick={AuthenticationService.logout}>Logout</Link></li>
                            </ul>
                        </Navbar.Collapse>
                    </Navbar>
                </header>}
            </>
        )
    }
}

export default HeaderComponent