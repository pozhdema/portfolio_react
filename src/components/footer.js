import React from 'react'
import FontAwesome from 'react-fontawesome'
import './footer.css'

function Footer() {
    return (
        <footer>
            <ul className="navigations">
                <li><a  href="https://www.facebook.com/profile.php?id=100005189898824"> <FontAwesome name="facebook"
                    className="fa-facebook-f"/></a></li>
                <li><a  href="https://www.instagram.com/pozhdema/?hl=uk"> <FontAwesome name="instagram"
                    className="fa-instagram"/></a></li>
                <li><a  href="mailto:pozhdema107@gmail.com"> <FontAwesome name="gmail" className="fa-envelope"/></a>
                </li>
            </ul>
            <p className="copyright">Copyright &copy; {new Date().getFullYear()} Pozhdema Nataliia. All rights reserved.</p>
        </footer>
    )
}

export default Footer