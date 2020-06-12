import React, {Component} from 'react'
import '../styles/pages/contacts.css'
import Input from "../components/input";
import Button from "../components/btn";
import {toast} from "react-toastify";


class Contacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            names: "",
            text: ""
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInput = (e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.state[name] = value;

        this.setState(prevState => {
                return {
                    newMessage: {
                        ...prevState, [name]: value
                    }
                }
            }
        )
    };

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('https:api.pozhdema.in.ua/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email, names: this.state.names, text: this.state.text})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Your message submit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    this.setState({
                        email: "",
                        names: "",
                        text: ""
                    })
                } else {
                    toast("Your message don't submit", {
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
            <div className="container" id="contact">
                <div className="contact-social">
                    <div className="wrapper-social">
                        <span>PHONE</span>
                        <span><a href="tel: +380-73-046-94-75">+380-73-046-94-75</a></span>
                    </div>
                    <div className="wrapper-social">
                        <span>EMAIL</span>
                        <span><a href="mailto: pozhdema107@gmail.com">pozhdema107@gmail.com</a></span>
                    </div>
                </div>
                <form
                    onSubmit={this.handleSubmit}
                    className="form-contact"
                >
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
                    </div>
                    <div className="wrapper-input">
                        <Input
                            id={"names"}
                            name={"names"}
                            type={"names"}
                            placeholder={"Your name"}
                            value={this.state.names}
                            required
                            handleChange={this.handleInput}
                        />
                    </div>
                    <div className="wrapper-input">
                        <textarea
                            id={"text"}
                            name={"text"}
                            className="text-contact"
                            placeholder="Your message"
                            value={this.state.text}
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="admin-btn" id="btn-contact">
                        <Button
                            action={this.handleSubmit}
                            title={"Submit"}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default Contacts