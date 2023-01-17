import React, { Component } from 'react'
import PostDataService from '../../api/main/PostDataService'
import { ReactComponent as Empty } from './assets/empty.svg';
import PostCard from './PostCard'
import PostComponent from './PostComponent';
import AccountProfileService from "../../api/main/AccountProfileService";

class Feed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            username: '',
        }
    }

    componentDidMount() {
        this.retrieveAllPosts();
        AccountProfileService.getCurrentUser()
            .then(response => this.setState({username: response.data.username}))
    }

    retrieveAllPosts = () => {
        PostDataService.retrieveAll().then(response => {
            this.setState({
                posts: response.data
            })
        });
    }

    render() {
        return (
            <div className="generalTodo">
                <PostComponent refreshFeed={this.retrieveAllPosts} username={this.state.username}/>
                {this.state.posts.length > 0 ? <>
                {this.state.posts.map(
                    (post) =>
                        <PostCard key={post.id} post={post} refreshFeed={this.retrieveAllPosts} username={post.username}/>
                )}
                </> : <Empty width={'50vw'} style={{maxWidth: 500}}/>}
            </div>
        )
    }
}

export default Feed