import React from 'react'
import {Link} from "react-router-dom";
import './signIn.css';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
};

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            errors: {
                email: "",
                password: ""
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    };

    render() {
        const {errors} = this.state;
        return (
            <div className="container">
                <form
                    onSubmit={this.handleSubmit}
                    noValidate
                    className="admin">
                    <div className="wrapper-input">
                        <input
                            type="text"
                            placeholder="Your email"
                            className="admin-input"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            noValidate
                        />
                        {errors.email.length > 0 &&
                        <span>{errors.email}</span>}
                    </div>
                    <div className="wrapper-input">
                        <input
                            type="password"
                            placeholder="Your password"
                            className="admin-input"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            noValidate
                        />
                        {errors.password.length > 0 &&
                        <span>{errors.password}</span>}
                    </div>
                    <div className="admin-btn">
                        <input
                            type="submit"
                            value="Sign in"
                            className="admin-submit"
                        />
                        <Link to="/signUp">Create an account</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn