import React from 'react'
import {Link} from "react-router-dom";
import '../styles/pages/signIn.css';
import '../styles/pages/signUp.css'
import Input from "../components/input";
import {Button} from "semantic-ui-react";
import ValidateEmail from "../components/validationEmail";
import ValidatePassword from "../components/validatePassword";
import ValidatePasswordConfirm from "../components/validatePasswordRe";
import ValidateUsername from "../components/validateUsername";
import {toast} from "react-toastify";
import Translate from "react-translate-component";


class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            isDisabled: true
        };
    }


    validateEmail = ValidateEmail;
    validateUsername = ValidateUsername;
    validatePassword = ValidatePassword;
    validatePasswordConfirm = ValidatePasswordConfirm;

    handleInputUp = ({target}) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.state [target.name] = value;

        if (target.name === 'email') {
            this.validateEmail(target.value);
        }
        if (target.name === 'username') {
            this.validateUsername(target.value);
        }
        if (target.name === 'password') {
            this.validatePassword(target.value);
        }
        if (target.name === 'confirmPassword') {
            this.validatePasswordConfirm(document.getElementById("password").value, target.value);
        }
        if (this.state.emailError === false && this.state.usernameError === false && this.state.passwordError === false && this.state.passwordConfirmError === false) {
            this.setState({
                isDisabled: false
            })
        }

        this.setState({[target.name]: value})
    };

    refreshPage() {
        window.location.reload(false);
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Sign Up", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    this.props.history.push('/gallery')
                    this.refreshPage()
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    };

    render() {
        return (
            <div className="container sign">
                <form
                    className="admin admin-up"
                    id="signIn-form">
                    <div className="wrapper-input">
                        <Translate
                            component={Input}
                            required
                            handleChange={this.handleInputUp}
                            id={"username"}
                            name={"username"}
                            type={"text"}
                            attributes={{placeholder: "username"}}
                            value={this.state.username}
                        />
                        {this.state.usernameError ?
                            <Translate content="errorUsername" component="span" className="error"/> : ''}
                    </div>
                    <div className="wrapper-input">
                        <Translate
                            component={Input}
                            id={"email"}
                            name={"email"}
                            type={"email"}
                            attributes={{placeholder: "contactEmail"}}
                            value={this.state.email}
                            required
                            handleChange={this.handleInputUp}
                        />
                        {this.state.emailError ?
                            <Translate content="errorEmail" component="span" className="error"/> : ''}
                    </div>
                    <div className="wrapper-input">
                        <Translate
                            component={Input}
                            id={"password"}
                            name={"password"}
                            type={"password"}
                            attributes={{placeholder: "contactPassword"}}
                            value={this.state.password}
                            required
                            handleChange={this.handleInputUp}
                        />
                        {this.state.passwordError ?
                            <Translate content="errorPassword" component="span" className="error"/> : ''}
                    </div>
                    <div className="wrapper-input">
                        <Translate
                            component={Input}
                            id={"confirmPassword"}
                            name={"confirmPassword"}
                            type={"password"}
                            value={this.state.confirmPassword}
                            required
                            handleChange={this.handleInputUp}
                            attributes={{placeholder: "confirmPassword"}}
                        />
                        {this.state.passwordConfirmError ?
                            <Translate content="errorPassword" component="span" className="error"/> : ''}
                    </div>
                    <div className="admin-btn">
                        <Translate
                            component={Button}
                            onClick={this.handleSubmit}
                            content="nav.signUp"
                            type="submit"
                        />
                        <Link to="/signIn"><Translate content="signINContent"/></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp