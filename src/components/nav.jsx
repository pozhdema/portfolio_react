import React, {Component} from 'react'
import '../styles/components/nav.css'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import Translate from 'react-translate-component';
import {Button} from "semantic-ui-react";
import {toast} from "react-toastify";


class Nav extends Component {
    refreshPage() {
        window.location.reload(false);
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch('/api/user/logout')
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    this.refreshPage()
                } else {
                    toast("Your don't exit", {
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
            <div className="nav">
                <nav className="global-nav">
                    <div className="title">
                        <Translate content="title.h1" component="h1" className="h1"/>
                        <Translate content="title.span" component="span" className="nav-title"/>
                    </div>
                    <ul className="navigations">
                        <Link to="/" className="link">
                            <Translate content="nav.home" component="li"/>
                        </Link>
                        <Link to="/gallery" className="link">
                            <Translate content="nav.gallery" component="li"/>
                        </Link>
                        <Link to="/contacts" className="link">
                            <Translate content="nav.contacts" component="li"/>
                        </Link>
                        {this.props.roles === "admin" || this.props.roles === "user" ?
                            <Translate
                                component={Button}
                                onClick={this.handleSubmit}
                                content="exit"
                                type="submit"
                                id="exit"
                            />
                            : <Link to="/signIn" className="link">
                                <Translate content="nav.signIn" component="li"/>
                            </Link>}
                        {this.props.roles === "admin" ? <Link to="/settings" className="link">
                            <Translate content="nav.settings" component="li"/>
                        </Link> : null}
                    </ul>
                </nav>
                <div className="lang">
                    <select
                        className="lang-select"
                        value={this.props.lang}
                        onChange={this.props.handleChange}
                    >
                        <option value="uk" className="lang-option">UK</option>
                        <option value="en" className="lang-option">EN</option>
                    </select>
                    <FontAwesome id="lang-fa" name="language" className="fa-language"/>
                </div>
            </div>
        )
    }
}

export default Nav