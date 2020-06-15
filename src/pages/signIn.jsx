import React from 'react'
import {Link} from "react-router-dom";
import '../styles/pages/signIn.css';
import Input from "../components/input";
import {Button} from "semantic-ui-react";
import {toast} from 'react-toastify';
import ValidateEmail from "../components/validationEmail";
import ValidatePassword from "../components/validatePassword";


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            isDisabled: true
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail = ValidateEmail;
    validatePassword = ValidatePassword;


    handleInput =(e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.state[name] = value;


        if (target.name === 'email') {
            this.validateEmail(target.value);
        }
        if (target.name === 'password') {
            this.validatePassword(target.value);
        }
        if (this.state.emailError === false && this.state.passwordError === false) {
            this.setState({
                isDisabled: false
            })
        }


        this.setState(prevState => {
                return {
                    newUser: {
                        ...prevState, [name]: value
                    }
                }
            }
        )
    };

    handleSubmit = e => {
        let form = e.target;

        fetch('https://api.pozhdema.in.ua/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:this.state.email, password:this.state.password})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    this.props.history.push('/settings')
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
            <div className="container sign">
                <form
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
                            onClick={this.handleSubmit}
                            content="Sign in"
                            type="submit"
                        />
                        <Link to="/signUp">Create an account</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn