import React from 'react'
import {Link} from "react-router-dom";
import '../styles/pages/signIn.css';
import '../styles/pages/signUp.css'

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            fullName: null,
            errors: {
                email: "",
                password: "",
                fullName: '',
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
            case 'fullName':
                errors.fullName =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
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
        let target = e.target;
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
                    className="admin admin-up">
                    <div className="wrapper-input">
                        <input
                            type="text"
                            id="fullName"
                            className="admin-input"
                            placeholder="Your full name"
                            name="fullName"
                            value={this.state.fullName}
                            onChange={this.handleChange}
                        />
                        {errors.fullName.length > 0 &&
                        <span>{errors.fullName}</span>}
                    </div>
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
                            value="Sign up"
                            className="admin-submit"
                        />
                        <Link to="/signIn">I'm already member</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp