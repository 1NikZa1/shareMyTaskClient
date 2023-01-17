import React from 'react';
import ListPostsComponent from '../post/ListPostsComponent.jsx'
import PostComponent from '../post/PostComponent.jsx';
import "./profile.scss";
import AccountProfileService from "../../api/main/AccountProfileService";

class NewsFeedComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
        }
    }

    componentDidMount() {
        this.refreshInfo()
    }

    refreshInfo() {
        AccountProfileService.getCurrentUser()
            .then(response => this.setState({username: response.data.username}))

    }

    refreshFeed() {

    }

    render() {
        return (
            <div className="col">
                {this.state.username === this.props.username ?
                    <div className="wrap">
                        <PostComponent refreshFeed={this.refreshFeed} username={this.props.username}/>
                    </div> : ""}
                <ListPostsComponent username={this.props.username}/>
            </div>
        )
    }
}

export default NewsFeedComponent;