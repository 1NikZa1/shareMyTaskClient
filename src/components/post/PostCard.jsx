import React, {Component} from 'react'
import {ReactComponent as Close} from './assets/times.svg';
import {ReactComponent as Edit} from './assets/edit.svg';
import PostDataService from '../../api/main/PostDataService';
import Editable from './Editable';
import moment from 'moment';
import Avatar from './Avatar';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import AccountProfileService from "../../api/main/AccountProfileService";

export default class PostCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            target: this.props.username,
            username: '',
            show: false,
            comments: [],
            content: ''
        }
    }

    toggleShow() {
        this.setShow(!this.state.show);
    }

    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    componentDidMount() {
        this.setState({comments: this.props.post.comments});

        AccountProfileService.getCurrentUser()
            .then(response => this.setState({username: response.data.username}))
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleComment = () => {
        let comment = {
            message: this.state.content,
        }

        PostDataService.postComment(this.props.post.id, comment)
            .then(response => this.setState({comments: [...this.state.comments, response.data]})
            );
        this.setState({content: ''});
    }

    deletePost = postId => {
        PostDataService.deletePost(postId).then(() => this.props.refreshFeed())
    }

    deleteComment = commentId => {
        PostDataService.deleteComment(commentId)
            .then(() => this.setState({comments: this.state.comments.filter(comment => comment.id !== commentId)}))
    }

    render() {
        const isPostCreator = this.props.username === this.state.username;
        return (
            <div className="ui-block ui-custom" key={this.props.post.id}>
                <div className="status-head">
                    <div className="status-left">
                        <Avatar username={this.props.username}/>
                        <div style={{float: 'left'}}>
                            <a href={'/profile/' + this.props.username}>{this.props.username}</a>
                            <div className="date">{moment(this.props.post.createdDate).fromNow()}</div>
                        </div>
                    </div>
                    {isPostCreator ? <div className="status-right">
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id={"tooltip-bottom"}>Edit this post</Tooltip>}><Edit
                            onClick={this.toggleShow}/></OverlayTrigger>
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id={"tooltip-bottom"}>Delete this post</Tooltip>}><Close
                            name="deletePost" onClick={() => this.deletePost(this.props.post.id)}/></OverlayTrigger>
                    </div> : ""}
                </div>
                <div className="status-content">
                    {!this.state.show && this.props.post.caption}
                    {this.state.show &&
                        <Editable post={this.props.post} toggleShow={this.toggleShow} username={this.props.username}
                                  refreshFeed={this.props.refreshFeed} content={this.props.post.description}/>}
                </div>
                <div className="comments">
                    <div className="commentHolder" ref="comments">
                        {this.state.comments.map((comment) => <div className="comment" key={comment.id}><Avatar
                            username={comment.username}/>
                            <div className="commenter"><a href={'/profile/' + comment.username}>{comment.username}</a>
                                {comment.username === this.state.username && <div className="status-right-comment">
                                    <OverlayTrigger placement="bottom"
                                                    overlay={<Tooltip id={"tooltip-bottom"}>Delete this
                                                        comment</Tooltip>}><Close
                                        name="deletePost"
                                        onClick={() => this.deleteComment(comment.id)}/></OverlayTrigger></div>}
                                <div style={{fontSize: '.8em', color: "lightgray"}}
                                     className="date">{moment(comment.createdDate).fromNow()}</div>
                            </div>
                            <div className="comment-desc">{comment.message}</div>
                        </div>)}
                    </div>
                    <div className="comment-control form-row">
                        <input type="text" className="col-md-9 col-sm-9 col-xs-9" onChange={this.handleChange}
                               value={this.state.content} placeholder="Write a comment.."  onKeyDown={event => {
                            if (event.key === 'Enter') {
                                this.handleComment();
                            }
                        }}></input>
                        <button className="btn btn-primary btn-status col-md-2 col-sm-2 col-xs-2"
                                onClick={this.handleComment}>Comment
                        </button>
                    </div>
                </div>
            </div>);
    }
}