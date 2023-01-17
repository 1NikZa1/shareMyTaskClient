import React from "react";
import "./profile.scss";
import ProfileContainer from "../profilewall/ProfileContainer";
import ContentContainer from "../profilewall/ContentContainer";

class AccountProfile extends React.Component {
    render() {
        const username = this.props.match.params.username;
        return (
            <div className="profilePage" key={username}>
                <ProfileContainer username={username}/>
                <ContentContainer username={username}/>
            </div>
        );
    }
}

export default AccountProfile;
