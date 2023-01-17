import React, {Component} from 'react'
import Guest from "../profilewall/assets/guest.jpeg"
import AccountProfileService from "../../api/main/AccountProfileService";

export default class Avatar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            img: ''
        }
    }

    handleError = (e) => {
        e.target.src = Guest;
    }

    componentDidMount() {
        this.refreshInfo();
    }

    refreshInfo() {
        AccountProfileService.getImageForUser(this.props.username)
            .then(response => {
                this.setState({img: response.data.imageBytes})
            })
    }

    render() {
        return <div className="cmt-avatar">
            <img className={this.props.className} src={`data:image/jpeg;base64,${this.state.img}`}
                 onError={this.handleError} alt="avatar"/>
        </div>;
    }
}