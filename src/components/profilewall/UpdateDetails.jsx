import React from "react";

import "./profile.scss";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AccountProfileService from "../../api/main/AccountProfileService";

class UpdateDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            aboutme: this.props.aboutme ? this.props.aboutme : '',
        }
        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.refreshInfo();
    }

    refreshInfo() {
        AccountProfileService.getCurrentUser()
            .then(response =>
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    aboutme: response.data.bio
                })
            )
    }

    onSubmit(values) {
        AccountProfileService.updateDetails(
            values.firstname,
            values.lastname,
            values.aboutme
        ).then(() => {
            this.props.triggerEditState();
        });
    }

    validate(values) {
        let errors = {}

        const nameCheck = /^[a-zA-Z\s]*$/

        if (!values.firstname) {
            errors.firstname = 'Enter your first name'
        } else if (!nameCheck.test(values.firstname)) {
            errors.firstname = 'Please enter a valid name'
        }

        if (!values.lastname) {
            errors.lastname = 'Enter your last name'
        } else if (!nameCheck.test(values.lastname)) {
            errors.lastname = 'Please enter a valid name'
        }

        return errors
    }

    render() {
        return (
            <div className="col-lg-4 row-md">
                <div className="ui-block">
                    <div className="ui-title">
                        <h5 style={{marginBottom: 0}}>Update Details</h5>
                    </div>
                    <div className="ui-content">
                        <div className="personal-info">
                            <Formik
                                onSubmit={this.onSubmit}
                                initialValues={this.state}
                                validateOnChange={true}
                                validateOnBlur={true}
                                validateOnSubmit={this.validate}
                                validate={this.validate}
                                enableReinitialize={false}
                            >
                                <Form>
                                    <fieldset className="form-group">
                                        <label className="title">First name</label>
                                        <Field className="form-control" type="text" name="firstname"/>
                                    </fieldset>
                                    <ErrorMessage name="firstname" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label className="title">Last name</label>
                                        <Field className="form-control" type="text" name="lastname"/>
                                    </fieldset>
                                    <ErrorMessage name="lastname" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label className="title">About me</label>
                                        <Field className="form-control" type="text" name="aboutme"
                                               component='textarea'/>
                                    </fieldset>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: "space-around",
                                        justifyItems: "center"
                                    }}>
                                        <button className="btn btn-success" name={"update"} type="submit">Save
                                        </button>
                                        <button className="btn btn-close"
                                                onClick={this.props.triggerEditState}>Cancel
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateDetails