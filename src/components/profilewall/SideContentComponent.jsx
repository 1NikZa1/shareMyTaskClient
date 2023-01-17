import React from 'react';
import AccountProfileService from "../../api/main/AccountProfileService";
import {ReactComponent as Edit} from "./assets/wrench.svg"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class SideContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            aboutme: this.props.aboutme
        }
    }

    componentDidMount() {
        this.refreshInfo();
    }

    refreshInfo() {
        AccountProfileService.retrieveInfo(this.props.username)
            .then(response => {
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    aboutme: response.data.bio
                });
            })
        AccountProfileService.getCurrentUser()
            .then(response => this.setState({username: response.data.username}))
    }

    render() {
        return (
            <div className="col-lg-4 row-md">
                <div className="ui-block">
                    <div className="ui-title" style={{display: 'flex', minHeight: '61px'}}>
                        <h5 style={{
                            marginBottom: 0,
                            textAlign: "center",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)"
                        }}>Contact Details</h5>
                        {this.state.username === this.props.username ?
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id="tooltip-bottom">Edit your information</Tooltip>}>
                            <Edit width="20" className="editUpdate" onClick={this.props.edit}
                                  style={{marginLeft: "auto"}}/></OverlayTrigger> : ""}
                    </div>
                    <div className="ui-content">
                        <div className="personal-info">
                            <li><span className="title">Name</span>
                                <span className="text">{this.state.firstname} {this.state.lastname}</span></li>
                            <li><span className="title">About Me</span>
                                <span className="text">{this.state.aboutme}</span></li>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideContentComponent;