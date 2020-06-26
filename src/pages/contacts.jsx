import React, {Component} from 'react'
import '../styles/pages/contacts.css'
import Input from "../components/input";
import Button from "../components/btn";
import {toast} from "react-toastify";
import Translate from "react-translate-component";


class Contacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            names: "",
            text: ""
        };

    }


    handleInput = ({target}) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({[target.name]: value})
    };

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/contact', {
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
                        <Translate content="phone" component="span"/>
                        <span><a href="tel: +380-73-046-94-75">+380-73-046-94-75</a></span>
                    </div>
                    <div className="wrapper-social">
                        <Translate content="email" component="span"/>
                        <span><a href="mailto: n.pozhdema@gmail.com">n.pozhdema@gmail.com</a></span>
                    </div>
                </div>
                <form
                    onSubmit={this.handleSubmit}
                    className="form-contact"
                >
                    <div className="wrapper-input">
                        <Translate
                            component={Input}
                            required
                            handleChange={this.handleInput}
                            id={"email"}
                            name={"email"}
                            type={"email"}
                            attributes={{placeholder: "contactEmail"}}
                            value={this.state.email}
                        />
                    </div>
                    <div className="wrapper-input">
                        <Translate
                            component={Input}
                            required
                            handleChange={this.handleInput}
                            id={"names"}
                            name={"names"}
                            type={"text"}
                            attributes={{placeholder: "contactName"}}
                            value={this.state.names}
                        />
                    </div>
                    <div className="wrapper-input">
                        <Translate
                            component="textarea"
                            id={"text"}
                            name={"text"}
                            className="text-contact"
                            attributes={{placeholder: "contactText"}}
                            value={this.state.text}
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="admin-btn" id="btn-contact">
                        <Translate
                            component={Button}
                            action={this.handleSubmit}
                            attributes={{title: "submit"}}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default Contacts