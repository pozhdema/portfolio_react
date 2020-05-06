import React from 'react'
import {Link} from "react-router-dom";
import './signIn.css';
import Input from "../components/input";
import Button from "../components/btn";
import { toast } from 'react-toastify';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                email: "",
                password: "",
            },
            isDisabled:true
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateEmail(email){
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if(result===true){
            this.setState({
                emailError:false,
                email:email
            })
        } else{
            this.setState({
                emailError:true
            })
        }
    }

    validatePassword(password){
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%\^&\*]))(?=.{8,20})/;
        const result = pattern.test(password);
        if(result===true){
            this.setState({
                passwordError:false,
                password:password
            })
        } else{
            this.setState({
                passwordError:true
            })
        }
    }

    handleInput = (e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let newUser = this.state.newUser;
        newUser[name] = value;


        if(e.target.name==='email'){
            this.validateEmail(e.target.value);
        }
        if(e.target.name==='password'){
            this.validatePassword(e.target.value);
        }
        if(this.state.emailError===false && this.state.passwordError===false){
            this.setState({
                isDisabled:false
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
                if(data["status"]==="success"){
                    this.props.history.push('/gallery')
                }else{
                    toast("Login or password incorrect", {
                        autoClose: 5000,
                        closeButton: true ,
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
                        {this.state.emailError ? <span style={{color: "#f87956"}}>Please Enter valid email address</span> : ''}
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
                        {this.state.passwordError ? <span style={{color: "#f87956"}}>Please enter some   value</span> : ''}
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