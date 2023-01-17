import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import PostDataService from '../../api/main/PostDataService.js'
import "../profilewall/status.scss"
import AccountProfileService from "../../api/main/AccountProfileService";

class PostComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        }

        return errors
    }

    onSubmit(values) {
        let post = {
            caption: values.description,
        }

        PostDataService.createPost(post).then(() => this.props.refreshFeed());
        this.setState({description: ''})
    }

    handleChange = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    render() {
        const description = this.state.description
        return (
            <div>
                <Formik
                    initialValues={{description}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    <Form>
                        <ErrorMessage name="description" component="div"
                                      className="alert alert-warning"/>

                        <fieldset className="form-group ui-block ui-custom">
                            <div className="create-content">
                                <Field className="form-control post-status" type="text" name="description"
                                       value={this.state.description}
                                       placeholder={"Hey " + this.props.username + ", what are you thinking?"}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="create-tool">
                                <button className="btn btn-primary btn-status" name={"post"} type="submit">Post</button>
                            </div>

                        </fieldset>
                    </Form>
                </Formik>
            </div>
        )
    }
}

export default PostComponent