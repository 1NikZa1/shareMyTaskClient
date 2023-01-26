import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import PostDataService from '../../api/main/PostDataService.js'
import "../profilewall/status.scss"
import AccountProfileService from "../../api/main/AccountProfileService";
import TicketDataService from "../../api/main/TicketDataService";

class TicketComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        AccountProfileService.getCurrentUser()
            .then(response => this.setState({username: response.data.username}))
    }

    validate(values) {
        const errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        }
        if (!values.title) {
            errors.title = 'Enter a Title'
        } else if (values.title.length < 5) {
            errors.title = 'Enter at least 5 Characters in Title'
        }

        return errors
    }

    onSubmit(values) {
        let ticket = {
            title: values.title,
            description: values.description,
        }

        // TicketDataService.createTicket(ticket).then(() => this.props.refreshFeed());
        this.setState({description: '', title: ''})
    }

    handleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    render() {
        const title = this.state.title
        const description = this.state.description

        return (
            <div>
                <Formik
                    initialValues={{title, description}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    <Form>
                        <ErrorMessage name="title" component="div"
                                      className="alert alert-warning"/>
                        <ErrorMessage name="description" component="div"
                                      className="alert alert-warning"/>
                        <fieldset className="form-group ui-block ui-custom">
                            <label className="title">Title</label>
                            <Field className="form-control" type="text" name="title"  onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group ui-block ui-custom">
                            <label className="title">Description</label>
                            <Field className="form-control" type="text" name="description"/>
                        </fieldset>
                        <button className="btn btn-primary btn-status" name={"post"} type="submit">Create</button>
                    </Form>
                </Formik>
            </div>
        )
    }
}

export default TicketComponent