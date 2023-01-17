import React from 'react';
import SideContentComponent from '../profilewall/SideContentComponent';
import NewsFeedComponent from '../profilewall/NewsFeedComponent';
import UpdateDetails from '../profilewall/UpdateDetails'
import AccountProfileService from "../../api/main/AccountProfileService";


class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            bio: '',
            isEditing: false
        };
    }

    triggerEditState = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing
        }))
        this.refreshInfo();
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
                    email: response.data.email,
                    bio: response.data.bio
                });
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {!this.state.isEditing ?
                        <SideContentComponent
                            edit={this.triggerEditState}
                            username={this.props.username}
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            aboutme={this.state.bio}/> :
                        <UpdateDetails
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            aboutme={this.state.bio}
                            triggerEditState={this.triggerEditState}
                        />}
                    <NewsFeedComponent username={this.props.username}/>
                </div>
            </div>

        )
    }
}

export default ContentContainer;