import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            username: '',
        }
        this.validate = this.validate.bind(this)
    }

    validate(values) {
        let errors = {}

        const usernameRegex = /^[a-zA-Z0-9._-]*$/
        const nameCheck = /^[a-zA-Z\s]*$/
        const emailCheck = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/

        if (!values.username) {
            errors.username = "Please enter your username"
        } else if (!usernameRegex.test(values.username)) {
            errors.username = 'Please enter a valid username'
        }

        if (!passwordCheck.test(values.password)) {
            errors.password = "Minimum 8 characters long, 1 lower and upper case, 1 number"
        }

        if (values.retypepassword !== values.password) {
            errors.retypepassword = "Password doesn't match"
        }

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

        if (!values.email) {
            errors.email = 'Enter your email'
        } else if (!emailCheck.test(values.email)) {
            errors.email = 'Please enter a valid email'
        }

        return errors
    }

    render() {
        return (
            <div className="base-container">
                <div className="content">
                    <Formik className="form form-row"
                            onSubmit={this.props.handleRegister}
                            validateOnChange={true}
                            validateOnBlur={true}
                            validateOnSubmit={this.validate}
                            validate={this.validate}
                            enableReinitialize={true}
                            initialValues={{}}>
                        {
                            () => (
                                <Form>
                                    <div className="row">
                                        <div className="col">
                                            <fieldset className="form-group">
                                                <label htmlFor="firstname">First Name</label>
                                                <Field className="field" type="text" name="firstname"/>
                                                <ErrorMessage name="firstname" component="div"
                                                              className="checkError"/>
                                            </fieldset>
                                        </div>
                                        <div className="col">
                                            <fieldset className="form-group">
                                                <label htmlFor="lastname">Last Name</label>
                                                <Field className="field" type="text" name="lastname"/>
                                                <ErrorMessage name="lastname" component="div"
                                                              className="checkError"/>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <fieldset className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field className="field" type="text" name="email"/>
                                        <ErrorMessage name="email" component="div"
                                                      className="checkError"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field className="field" type="text" name="username"/>
                                        <ErrorMessage name="username" component="div"
                                                      className="checkError"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip id="tooltip-bottom">More than 8 chars, 1 lower
                                                            and upper case, 1 number</Tooltip>}>
                                            <Field className="field" type="password" name="password"/>
                                        </OverlayTrigger>
                                        <ErrorMessage name="password" component="div"
                                                      className="checkError"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label htmlFor="retypepassword">Retype Password</label>
                                        <Field className="field" type="password" name="retypepassword"/>
                                        <ErrorMessage name="retypepassword" component="div"
                                                      className="checkError"/>
                                    </fieldset>

                                    <div className={"footerBtn"}>
                                        <button type="submit" className="btn text-center btn-info center"
                                                name={"register"}>
                                            Register
                                        </button>
                                    </div>

                                    <p className={"loginLink"}>
                                        <button type="button" className="btn btn-close"
                                                onClick={this.props.changeState}>Wait, I already have an account ;)
                                        </button>
                                    </p>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>

        );
    }
}
