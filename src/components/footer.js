import React from 'react'
import FontAwesome from 'react-fontawesome'
import './footer.css'

function Footer() {
    return (
        <ul className="navigations footer">
            <li><a className="facebook" href="https://www.facebook.com/profile.php?id=100005189898824"> <FontAwesome className="fa-facebook-f"/></a></li>
            <li><a className="facebook" href="https://www.instagram.com/pozhdema/?hl=uk"> <FontAwesome className="fa-instagram"/></a></li>
            <li><a className="facebook" href="mailto:pozhdema107@gmail.com"> <FontAwesome className="fa-envelope"/></a></li>
        </ul>
    )
}

export default Footer