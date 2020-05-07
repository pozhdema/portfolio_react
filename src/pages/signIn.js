import React from 'react'
import {Link} from "react-router-dom";
import '../styles/pages/signIn.css';
import Input from "../components/input";
import Button from "../components/btn";
import {toast} from 'react-toastify';
import ValidateEmail from "../components/validationEmail";
import ValidatePassword from "../components/validatePassword";


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                email: "",
                password: "",
            },
            isDisabled: true
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail = ValidateEmail;
    validatePassword = ValidatePassword;

    handleInput = (e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let newUser = this.state.newUser;
        newUser[name] = value;

        if (e.target.name === 'email') {
            this.validateEmail(e.target.value);
        }
        if (e.target.name === 'password') {
            this.validatePassword(e.target.value);
        }
        if (this.state.emailError === false && this.state.passwordError === false) {
            this.setState({
                isDisabled: false
            })
        }

        this.setState(prevState => {
                return {
                    newUser: {
                        ...prevState.newUser, [name]: value
                    }
                }
            }
        )
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let form = e.target;

        fetch('http://qwe.loc/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.newUser)
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    this.props.history.push('/gallery')
                } else {
                    toast("Login or password incorrect", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
        form.reset();
    };

    render() {
        return (
            <div className="container">
                <form
                    onSubmit={this.handleSubmit}
                    className="admin"
                    id="signIn-form">
                    <div className="wrapper-input">
                        <Input
                            id={"email"}
                            name={"email"}
                            type={"email"}
                            placeholder={"Your email"}
                            value={this.state.email}
                            required
                            handleChange={this.handleInput}
                        />
                        {this.state.emailError ?
                            <span className="error">Please Enter valid email address</span> : ''}
                    </div>
                    <div className="wrapper-input">
                        <Input
                            id={"password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Your password"}
                            value={this.state.password}
                            required
                            handleChange={this.handleInput}
                        />
                        {this.state.passwordError ?
                            <span className="error">Please enter some   value</span> : ''}
                    </div>
                    <div className="admin-btn">
                        <Button
                            action={this.handleSubmit}
                            title={"Sign in"}
                        />
                        <Link to="/signUp">Create an account</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn