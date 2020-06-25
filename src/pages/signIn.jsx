import React from 'react'
import {Link} from "react-router-dom";
import '../styles/pages/signIn.css';
import Input from "../components/input";
import {Button} from "semantic-ui-react";
import {toast} from 'react-toastify';
import ValidateEmail from "../components/validationEmail";
import ValidatePassword from "../components/validatePassword";
import Translate from "react-translate-component";


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            isDisabled: true
        };
    }

    validateEmail = ValidateEmail;
    validatePassword = ValidatePassword;


    handleInput =({target}) => {

        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.state[target.name] = value;


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

        this.setState({[target.name]: value})
    };

    refreshPage() {
        window.location.reload(false);
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:this.state.email, password:this.state.password})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Sign In", {
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
                    className="admin"
                    id="signIn-form"
                >
                    <div className="wrapper-input">
                        <Translate
                            component={Input}
                            id={"email"}
                            name={"email"}
                            type={"email"}
                            attributes={{placeholder:"contactEmail"}}
                            value={this.state.email}
                            required
                            handleChange={this.handleInput}
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
                            attributes={{placeholder:"contactPassword"}}
                            value={this.state.password}
                            required
                            handleChange={this.handleInput}
                        />
                        {this.state.passwordError ?
                            <Translate content="errorPassword" component="span" className="error"/>: ''}
                    </div>
                    <div className="admin-btn">
                        <Translate
                            component={Button}
                            onClick={this.handleSubmit}
                            content="nav.signIn"
                            type="submit"
                        />
                        <Link to="/signUp"><Translate content="signUPContent"/></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn