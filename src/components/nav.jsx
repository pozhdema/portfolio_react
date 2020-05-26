import React, {Component} from 'react'
import '../styles/components/nav.css'
import {Link} from 'react-router-dom'
import {Checkbox} from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome'
import Cookies from 'universal-cookie';

class Nav extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        if (cookies.get("lang") === "EN") {
            this.state = {
                lang: true,
            };
        } else {
            this.state = {
                lang: false,
            };
        }
    }

    handleChange = () => {
        const cookies = new Cookies();
        this.setState((prevState) => ({lang: !prevState.lang}));

        cookies.set("lang", this.state.lang ? "UA" : "EN", {path: '/'});
    };

    render() {
        const CheckboxSlider = () =>
            <Checkbox
                slider
                onChange={this.handleChange}
                checked={this.state.lang}
                name="lang"
            />;

        return (
            <div className="nav">
                <nav>
                    <h1>Pozhdema Nataliia <span> photographer</span></h1>
                    <ul className="navigations">
                        <Link to="/" className="link">
                            <li>Home</li>
                        </Link>
                        <Link to="/gallery" className="link">
                            <li>Gallery</li>
                        </Link>
                        <Link to="/contacts" className="link">
                            <li>Contacts</li>
                        </Link>
                        <Link to="/signIn" className="link">
                            <li>Sign In</li>
                        </Link>
                        <Link to="/settings" className="link">
                            <li>Settings</li>
                        </Link>
                    </ul>
                </nav>
                <div className="lang">
                    <CheckboxSlider
                        id="lang-check"
                    />
                    <FontAwesome id="lang-fa" name="language" className="fa-language"/>
                </div>
            </div>
        )
    }
}

export default Nav