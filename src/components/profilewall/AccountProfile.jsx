import React from "react";
import "./profile.scss";
import ProfileContainer from "../profilewall/ProfileContainer";
import ContentContainer from "../profilewall/ContentContainer";
import AccountProfileService from "../../api/main/AccountProfileService"

class AccountProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.username,
            value: ''
        }
    }

    componentDidMount() {
        AccountProfileService.retrieveInfo(this.state.username)
            .then(response => {
                this.setState({
                    value: response.data.username
                });
            })
    }

    render() {
        return (
            <div className="profilePage">
                <ProfileContainer username={this.state.username}/>
                <ContentContainer username={this.state.username}/>
            </div>
        );
    }
}

export default AccountProfile;
