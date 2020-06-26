import React from 'react'
import FontAwesome from 'react-fontawesome'
import '../styles/components/footer.css'
import Translate from "react-translate-component";

function Footer() {
    return (
        <footer className="footer-global">
            <ul className="navigations footer">
                <li><a href="https://www.facebook.com/profile.php?id=100005189898824" aria-label="Facebook" target="_blank" rel="noopener">
                    <FontAwesome name="facebook" className="fa-facebook-f"/></a>
                </li>
                <li><a href="https://www.instagram.com/nataliia_pozhdema/" aria-label="Instagram" target="_blank" rel="noopener">
                    <FontAwesome name="instagram" className="fa-instagram"/></a>
                </li>
                <li><a href="mailto:n.pozhdema@gmail.com" aria-label="Gmail" target="_blank" rel="noopener">
                    <FontAwesome name="gmail" className="fa-envelope"/></a>
                </li>
            </ul>
            <div className="copyright">
                <Translate content="copyright" component="span"/>
                &copy; {new Date().getFullYear()}
                <Translate content="footer" component="span"/>
            </div>
        </footer>
    )
}

export default Footer