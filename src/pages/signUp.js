import React from 'react'
import {Link} from "react-router-dom";
import '../styles/pages/signIn.css';
import '../styles/pages/signUp.css'
import Input from "../components/input";
import Button from "../components/btn";
import ValidateEmail from "../components/validationEmail";
import ValidatePassword from "../components/validatePassword";
import ValidatePasswordConfirm from "../components/validatePasswordRe";
import {toast} from "react-toastify";


class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            isDisabled: true
    };

    this.handleInputUp = this.handleInputUp.bind(this);
    this.handleSubmitUp = this.handleSubmitUp.bind(this);
}

validateEmail = ValidateEmail;
validatePassword = ValidatePassword;
validatePasswordConfirm = ValidatePasswordConfirm;

handleInputUp = (e) => {

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
    if (target.name === 'confirmPassword') {
        this.validatePasswordConfirm(document.getElementById("password").value, target.value);
    }
    if (this.state.emailError === false && this.state.passwordError === false && this.state.passwordConfirmError === false) {
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

handleSubmitUp = (e) => {
    e.preventDefault();
    let form = e.target;

    fetch('http://qwe.loc/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:this.state.email, password:this.state.password, confirmPassword:this.state.confirmPassword})
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

render()
{
    return (
        <div className="container sign">
            <form
                onSubmit={this.handleSubmit}
                className="admin admin-up"
                id="signIn-form">
                <div className="wrapper-input">
                    <Input
                        id={"email"}
                        name={"email"}
                        type={"email"}
                        placeholder={"Your email"}
                        value={this.state.email}
                        required
                        handleChange={this.handleInputUp}
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
                        handleChange={this.handleInputUp}
                    />
                    {this.state.passwordError ?
                        <span className="error">Please enter some   value</span> : ''}
                </div>
                <div className="wrapper-input">
                    <Input
                        id={"confirmPassword"}
                        name={"confirmPassword"}
                        type={"password"}
                        placeholder={"Repeat the your password"}
                        value={this.state.confirmPassword}
                        required
                        handleChange={this.handleInputUp}
                    />
                    {this.state.passwordConfirmError ?
                        <span className="error">Please enter some   value</span> : ''}
                </div>
                <div className="admin-btn">
                    <Button
                        action={this.handleSubmitUp}
                        title={"Sign up"}
                    />
                    <Link to="/signIn">I'm already member</Link>
                </div>
            </form>
        </div>
    )
}
}

export default SignUp