import React, {Component} from 'react'
import '../styles/components/nav.css'
import {Link, Route, Switch} from 'react-router-dom'
import {Checkbox} from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome'



class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lang: false,
        };
    }


    handleChange = () => {
        this.setState((prevState) => ({lang: !prevState.lang}));

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