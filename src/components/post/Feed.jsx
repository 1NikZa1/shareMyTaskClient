import React, {Component} from 'react'
import PostDataService from '../../api/main/PostDataService'
import {ReactComponent as Empty} from './assets/empty.svg';
import PostCard from './PostCard'
import PostComponent from './PostComponent';
import AccountProfileService from "../../api/main/AccountProfileService";
import {Tab, Tabs} from "react-bootstrap";
import TicketCard from "./TicketCard";
import TicketDataService from "../../api/main/TicketDataService";
import TicketComponent from "./TicketComponent";

class Feed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            tickets: [],
            username: '',
        }
    }

    componentDidMount() {
        this.retrieveAllPosts();
        this.retrieveAllTickets();
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

    retrieveAllTickets = () => {
        TicketDataService.retrieveAllTickets().then(response => {
            this.setState({
                tickets: response.data
            })
        });
    }

    render() {
        return (
            <div className="feed">
                <Tabs defaultActiveKey="posts" className="mb-3">
                    <Tab eventKey="posts" title="Posts">
                        <PostComponent refreshFeed={this.retrieveAllPosts} username={this.state.username}/>
                        {this.state.posts.length > 0 ? <>
                            {this.state.posts.map(
                                (post) =>
                                    <PostCard key={post.id} post={post} refreshFeed={this.retrieveAllPosts}
                                              username={post.username}/>
                            )}
                        </> : <Empty width={'50vw'} style={{maxWidth: 500}}/>}
                    </Tab>

                    <Tab eventKey="tickets" title="Tickets">
                        <TicketComponent refreshFeed={this.retrieveAllTickets} username={this.state.username}/>
                        {this.state.tickets.length > 0 ? <>
                            {this.state.tickets.map(
                                (ticket) =>
                                    <TicketCard key={ticket.id} ticket={ticket} refreshFeed={this.retrieveAllTickets}
                                              username={ticket.username}/>
                            )}
                        </> : <Empty width={'50vw'} style={{maxWidth: 500}}/>}
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Feed