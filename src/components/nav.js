import React from 'react'
import './nav.css'
import {Link} from 'react-router-dom'

function Nav(){
    return(
        <nav>
            <h1>Pozhdema Nataliia <span> photographer</span> </h1>
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
                <Link to="/signUp" className="link">
                    <li>Sign Up</li>
                </Link>
            </ul>
            <button>Login In</button>
        </nav>
    )
}
export default Nav