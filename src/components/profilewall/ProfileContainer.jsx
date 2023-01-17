import React from "react";

import "./profile.scss";
import AccountProfileService from "../../api/main/AccountProfileService";
import Guest from "./assets/guest.jpeg"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";

class ProfileContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            firstname: '',
            lastname: '',
            show: false,
            avatar: '',
            background: '',
            showBG: false,
            showFileSizeWarn: false,
        }
    }

    componentDidMount() {
        this.refreshInfo();
    }

    refreshInfo() {
        AccountProfileService.getCurrentUser()
            .then(response => this.setState({username: response.data.username}))

        this.refreshAvatar();
        this.refreshBackground();
    }

    refreshAvatar() {
        AccountProfileService.getImageForUser(this.props.username)
            .then(response => {
                this.setState({avatar: response.data.imageBytes})
            })
    }

    refreshBackground() {
        AccountProfileService.getBackgroundForUser(this.props.username)
            .then(response => {
                this.setState({background: 'data:image/png;base64,' + response.data.imageBytes})
            })
    }

    handleError = (e) => {
        e.target.src = Guest;
    }

    setShow = (value) => {
        this.setState({show: value});
    }

    setShowFileSizeWarn = (value) => {
        this.setState({
            showFileSizeWarn: value
        });
        setTimeout(() => {
            this.setState({showFileSizeWarn: false})
        }, 2000);
    }

    handleShow = () => {
        AccountProfileService.getCurrentUser()
            .then(response => {
                this.setState({username: response.data.username})
                if (this.state.username === this.props.username)
                    this.setShow(true);
            })
    }

    handleAvatarFile = (event) => {
        if (event.target.files[0].size && event.target.files[0].size / (1024 ** 2) <= 10 && event.target.files[0].size > 0) {
            this.setState({
                avatarfile: event.target.files[0],
            });
        } else {
            this.setShow(false)
            this.setShowFileSizeWarn(true)
        }
    }

    handleBackgroundFile = (event) => {
        this.setState({
            backgroundfile: event.target.files[0],
        });
    }

    handleShowBG = () => {
       AccountProfileService.getCurrentUser()
            .then(response => {
                this.setState({username: response.data.username})
                if (this.state.username === this.props.username)
                    this.setShowBG(true);
            })
    }

    handleCloseBG = () => {
        this.setShowBG(false);
    }

    setShowBG = (value) => {
        this.setState({showBG: value});
    }

    onSaveAvatar = () => {
        AccountProfileService.uploadAvatar(this.state.avatarfile, this.state.username).then(() => {
            this.setShow(false)
            this.refreshAvatar();
        });
    }

    onSaveBackGround = () => {
        AccountProfileService.uploadBackground(this.state.backgroundfile).then(() => {
            this.handleCloseBG();
            this.refreshBackground()
        });
    }

    render() {
        return (
            <div className="container">
                <Alert className={"fix-alert"} show={this.state.showFileSizeWarn} variant={"danger"}
                       onClose={() => this.setShowFileSizeWarn(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error</Alert.Heading>
                    <p>
                        Image size should be less than <code>10mb</code>
                    </p>
                </Alert>
                <Modal show={this.state.showBG} onHide={this.handleCloseBG}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Cover Background</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Click to upload your background file, picture has to be either <strong>png/jpeg</strong></p>
                        <fieldset><input id="backgroundfile" name="backgroundfile" type="file"
                                         accept="image/png, image/jpeg" onChange={this.handleBackgroundFile}
                                         className="form-control"/></fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseBG}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onSaveBackGround}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.show} onHide={() => this.setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Avatar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Click to upload your avatar file, picture has to be either <strong>png/jpeg</strong></p>
                        <fieldset><input id="avatarfile" name="avatarfile" type="file" accept="image/png, image/jpeg"
                                         onChange={this.handleAvatarFile} className="form-control"/></fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onSaveAvatar}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="row">
                    <div className="col">
                        <div className="ui-block">
                            <div className="top-header-thumb">
                                <div
                                    className={"banner" + (this.state.username === this.props.username ? " uploadable" : "")}
                                    style={{
                                        background: 'url(' + this.state.background + ') no-repeat center center grey',
                                        minWidth: '100%',
                                        minHeight: 'auto',
                                    }} onClick={this.handleShowBG}></div>
                            </div>
                            <div className="profile-section">
                                <div className="row">
                                    <div className="avatar-container">
                                        <div
                                            className={"image-cropper" + (this.state.username === this.props.username ? " uploadable" : "")}
                                            onClick={this.handleShow}>
                                            <img
                                                src={`data:image/jpeg;base64,${this.state.avatar}`}
                                                className="profile-pic"
                                                alt="avatar"
                                                onError={this.handleError}
                                            ></img>
                                        </div>
                                        <div className="avatar-author-content">{this.props.username}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileContainer;
