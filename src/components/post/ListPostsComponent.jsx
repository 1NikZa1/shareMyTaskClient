import React from 'react'
import PostDataService from '../../api/main/PostDataService.js'
import PostCard from "./PostCard"
class ListPostsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
        }
        this.refreshFeed = this.refreshFeed.bind(this)
        this.show = false;
    }

    componentDidMount() {
        this.refreshFeed();
    }

    refreshFeed() {
        PostDataService.retrieveAllPosts(this.props.username)
            .then(response => {this.setState({ posts: response.data.reverse() })})
    }

    render() {
        return (
            <div>
                <div className="wrap">
                    <div className="table">
                        <div>
                            {
                                this.state.posts.map(
                                    (post) =>
                                       <PostCard key={post.id} post={post} refreshFeed={this.refreshFeed} username={this.props.username}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPostsComponent