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
                <Link to="admin" className="link">
                    <li>Admin</li>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav